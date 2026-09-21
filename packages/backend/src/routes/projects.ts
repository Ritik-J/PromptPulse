import { Hono } from "hono";
import { z } from "zod";
import { db } from "../db";
import { analyticsLogs, auditLogs, projects, prompts } from "../db/schema";
import { requireUser } from "../lib/auth-context";
import {
  formatCompact,
  formatPct,
  percentile,
  timeAgo,
} from "../lib/format";
import { and, desc, eq, gte, inArray } from "drizzle-orm";

const projectsRouter = new Hono();

const createProjectSchema = z.object({
  name: z
    .string()
    .min(2)
    .max(64)
    .regex(/^[a-z0-9_]+$/, "slug: lowercase letters, numbers, underscores"),
  title: z.string().min(2).max(100),
  description: z.string().max(500).optional(),
  environment: z.enum(["production", "staging"]).default("production"),
  model: z.string().max(80).optional(),
});

// POST /api/v1/projects — create + auto-audit (actor from session).
projectsRouter.post("/", async (c) => {
  const { id: userId, name: actor } = requireUser(c);
  const parsed = createProjectSchema.safeParse(await c.req.json());
  if (!parsed.success) {
    return c.json(
      { success: false, error: "Invalid project", details: parsed.error.flatten() },
      400,
    );
  }
  const now = new Date().toISOString();
  const project = {
    id: `proj_${crypto.randomUUID().substring(0, 8)}`,
    userId,
    name: parsed.data.name,
    title: parsed.data.title,
    description: parsed.data.description ?? null,
    environment: parsed.data.environment,
    model: parsed.data.model ?? null,
    createdAt: now,
    updatedAt: now,
  };
  await db.insert(projects).values(project);
  await db.insert(auditLogs).values({
    id: crypto.randomUUID(),
    userId,
    projectId: project.id,
    action: "project_created",
    ref: project.name,
    target: parsed.data.environment,
    author: `@${actor.split(" ")[0].toLowerCase()}`,
    createdAt: now,
  });
  return c.json({ success: true, data: project }, 201);
});

// GET /api/v1/projects — card-ready list scoped to the caller.
projectsRouter.get("/", async (c) => {
  const { id: userId } = requireUser(c);
  const own = await db.select().from(projects).where(eq(projects.userId, userId));
  const cutoff = new Date(Date.now() - 30 * 86400_000).toISOString();

  const cards = await Promise.all(
    own.map(async (p) => {
      const prs = await db
        .select()
        .from(prompts)
        .where(eq(prompts.projectId, p.id));
      const promptIds = prs.map((r) => r.id);
      const canaryPrompts = prs.filter((r) => r.status === "canary");

      let monthlyReqs = 0;
      let latencies: number[] = [];
      let errors = 0;
      let model = p.model ?? "—";
      if (promptIds.length > 0) {
        const logs = await db
          .select()
          .from(analyticsLogs)
          .where(
            and(
              inArray(analyticsLogs.promptId, promptIds),
              gte(analyticsLogs.timestamp, cutoff),
            ),
          );
        monthlyReqs = logs.length;
        latencies = logs.map((l) => l.latencyMs).sort((a, b) => a - b);
        errors = logs.filter((l) => l.ok === false).length;
        const byModel = new Map<string, number>();
        for (const l of logs) byModel.set(l.model, (byModel.get(l.model) ?? 0) + 1);
        const top = [...byModel.entries()].sort((a, b) => b[1] - a[1])[0];
        if (top) model = top[0];
      }

      const p95 = percentile(latencies, 95);
      const errorRate = monthlyReqs === 0 ? 0 : (errors / monthlyReqs) * 100;
      const status =
        p.environment === "staging"
          ? "staging"
          : p95 > 500 || errorRate > 0.1
            ? "degraded"
            : "healthy";
      const statusLabel =
        status === "staging"
          ? "Staging"
          : status === "degraded"
            ? "Degraded Latency"
            : "Healthy";

      const canaryInfo =
        canaryPrompts.length === 0
          ? "100% Stable"
          : canaryPrompts.length === 2 &&
              canaryPrompts.every((r) => r.trafficPct === 50)
            ? "50/50 Split"
            : `${canaryPrompts.length} Live ${canaryPrompts.length === 1 ? "Canary" : "Canaries"}`;
      const canaryType =
        canaryPrompts.length === 0 ? ("muted" as const) : ("warning" as const);

      const lastAuditRows = await db
        .select()
        .from(auditLogs)
        .where(eq(auditLogs.projectId, p.id))
        .orderBy(desc(auditLogs.createdAt))
        .limit(1);
      const lastAudit = lastAuditRows[0];

      return {
        id: p.id,
        name: p.name,
        title: p.title,
        environment: p.environment,
        status,
        statusLabel,
        model,
        promptsCount: prs.length,
        canaryInfo,
        canaryType,
        monthlyReqs: formatCompact(monthlyReqs),
        p95Latency: `${p95}ms`,
        latencyStatus: p95 > 500 ? ("degraded" as const) : ("normal" as const),
        errorRate: formatPct(errorRate),
        lastUpdatedAgo: timeAgo(lastAudit?.createdAt ?? p.updatedAt),
        lastUpdatedBy: lastAudit?.author ?? "@you",
      };
    }),
  );

  return c.json({ success: true, data: cards });
});

export default projectsRouter;
