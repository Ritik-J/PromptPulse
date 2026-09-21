import { Hono } from "hono";
import { z } from "zod";
import { db } from "../db";
import { auditLogs, projects } from "../db/schema";
import { requireUser } from "../lib/auth-context";
import { desc, eq } from "drizzle-orm";

const auditRouter = new Hono();

const createAuditSchema = z.object({
  projectId: z.string().min(1).optional(),
  action: z.enum([
    "rolled_out",
    "started_split",
    "adjusted_model",
    "snapshot_created",
    "project_created",
  ]),
  ref: z.string().min(1).max(120),
  target: z.string().max(120).default(""),
});

// POST /api/v1/audit-logs — manual entries; actor derived from session.
auditRouter.post("/", async (c) => {
  const { id: userId, name: actor } = requireUser(c);
  const parsed = createAuditSchema.safeParse(await c.req.json());
  if (!parsed.success) {
    return c.json(
      { success: false, error: "Invalid audit entry", details: parsed.error.flatten() },
      400,
    );
  }
  if (parsed.data.projectId) {
    const [project] = await db
      .select()
      .from(projects)
      .where(eq(projects.id, parsed.data.projectId));
    if (!project || project.userId !== userId) {
      return c.json({ success: false, error: "Project not found" }, 404);
    }
  }
  const entry = {
    id: crypto.randomUUID(),
    userId,
    projectId: parsed.data.projectId ?? null,
    action: parsed.data.action,
    ref: parsed.data.ref,
    target: parsed.data.target,
    author: `@${actor.split(" ")[0].toLowerCase()}`,
    createdAt: new Date().toISOString(),
  };
  await db.insert(auditLogs).values(entry);
  return c.json({ success: true, data: entry }, 201);
});

// GET /api/v1/audit-logs?limit= — newest first, scoped to the caller.
auditRouter.get("/", async (c) => {
  const { id: userId } = requireUser(c);
  const limit = Math.min(
    Math.max(parseInt(c.req.query("limit") ?? "20", 10) || 20, 1),
    100,
  );
  const rows = await db
    .select({
      id: auditLogs.id,
      projectId: auditLogs.projectId,
      action: auditLogs.action,
      ref: auditLogs.ref,
      target: auditLogs.target,
      author: auditLogs.author,
      createdAt: auditLogs.createdAt,
    })
    .from(auditLogs)
    .where(eq(auditLogs.userId, userId))
    .orderBy(desc(auditLogs.createdAt))
    .limit(limit);

  const projectNames = new Map<string, string>();
  for (const row of rows) {
    if (row.projectId && !projectNames.has(row.projectId)) {
      const [p] = await db
        .select({ name: projects.name })
        .from(projects)
        .where(eq(projects.id, row.projectId));
      projectNames.set(row.projectId, p?.name ?? row.projectId);
    }
  }

  return c.json({
    success: true,
    data: rows.map((r) => ({
      ...r,
      projectName: r.projectId ? (projectNames.get(r.projectId) ?? r.projectId) : "",
    })),
  });
});

export default auditRouter;
