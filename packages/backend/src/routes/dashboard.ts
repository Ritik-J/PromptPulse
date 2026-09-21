import { Hono } from "hono";
import { db } from "../db";
import {
  analyticsLogs,
  projects,
  prompts,
  workspaceSettings,
} from "../db/schema";
import { requireUser } from "../lib/auth-context";
import { changePct, percentile } from "../lib/format";
import { and, count, desc, eq, gte, inArray, lt, sql } from "drizzle-orm";

const dashboardRouter = new Hono();

const DAY_MS = 86400_000;

async function userPromptIds(userId: string): Promise<string[]> {
  const ownProjects = await db
    .select({ id: projects.id })
    .from(projects)
    .where(eq(projects.userId, userId));
  if (ownProjects.length === 0) return [];
  const rows = await db
    .select({ id: prompts.id })
    .from(prompts)
    .where(
      inArray(
        prompts.projectId,
        ownProjects.map((p) => p.id),
      ),
    );
  return rows.map((r) => r.id);
}

// GET /api/v1/dashboard/metrics — global telemetry aggregates scoped to the caller.
dashboardRouter.get("/metrics", async (c) => {
  const { id: userId } = requireUser(c);
  const now = Date.now();
  const d30 = new Date(now - 30 * DAY_MS).toISOString();
  const d60 = new Date(now - 60 * DAY_MS).toISOString();

  const promptIds = await userPromptIds(userId);
  if (promptIds.length === 0) {
    return c.json({
      success: true,
      data: {
        invocations: { total: 0, previous: 0, changePct: 0 },
        canaries: { active: 0, significant: 0 },
        latency: { p95Ms: 0, deltaMs: 0 },
        spend: { usedUsd: 0, budgetUsd: 1000, pct: 0 },
      },
    });
  }

  const inWindow = (from: string, to?: string) =>
    to
      ? and(
          inArray(analyticsLogs.promptId, promptIds),
          gte(analyticsLogs.timestamp, from),
          lt(analyticsLogs.timestamp, to),
        )
      : and(
          inArray(analyticsLogs.promptId, promptIds),
          gte(analyticsLogs.timestamp, from),
        );

  const [cur, prev] = await Promise.all([
    db.select({ n: count() }).from(analyticsLogs).where(inWindow(d30)),
    db
      .select({ n: count() })
      .from(analyticsLogs)
      .where(inWindow(d60, new Date(now - 30 * DAY_MS).toISOString())),
  ]);

  // Canaries: prompts flagged canary across the caller's projects.
  // Significant = canary prompt with >= 100 invocations in the last 30d.
  const ownProjects = await db
    .select({ id: projects.id })
    .from(projects)
    .where(eq(projects.userId, userId));
  const canaryPrompts = await db
    .select({ id: prompts.id })
    .from(prompts)
    .where(
      and(
        inArray(
          prompts.projectId,
          ownProjects.map((p) => p.id),
        ),
        eq(prompts.status, "canary"),
      ),
    );
  let significant = 0;
  for (const cp of canaryPrompts) {
    const [{ n }] = await db
      .select({ n: count() })
      .from(analyticsLogs)
      .where(
        and(eq(analyticsLogs.promptId, cp.id), gte(analyticsLogs.timestamp, d30)),
      );
    if (n >= 100) significant++;
  }

  // P95: SQLite has no percentile function — sort in JS (fine at this scale).
  const latencyRows = (period: { from: string; to?: string }) =>
    db
      .select({ ms: analyticsLogs.latencyMs })
      .from(analyticsLogs)
      .where(inWindow(period.from, period.to))
      .orderBy(analyticsLogs.latencyMs);
  const [curLat, prevLat] = await Promise.all([
    latencyRows({ from: d30 }),
    latencyRows({ from: d60, to: new Date(now - 30 * DAY_MS).toISOString() }),
  ]);
  const p95 = percentile(curLat.map((r) => r.ms), 95);
  const prevP95 = percentile(prevLat.map((r) => r.ms), 95);

  const spendRows = await db
    .select({ total: sql<number>`sum(cast(${analyticsLogs.costUsd} as real))` })
    .from(analyticsLogs)
    .where(inWindow(d30));
  const usedUsd = spendRows[0]?.total ?? 0;
  const settings = await db
    .select()
    .from(workspaceSettings)
    .where(eq(workspaceSettings.userId, userId));
  const budgetUsd = settings[0]?.monthlyBudgetUsd ?? 1000;

  return c.json({
    success: true,
    data: {
      invocations: {
        total: cur[0]?.n ?? 0,
        previous: prev[0]?.n ?? 0,
        changePct: changePct(cur[0]?.n ?? 0, prev[0]?.n ?? 0),
      },
      canaries: { active: canaryPrompts.length, significant },
      latency: { p95Ms: p95, deltaMs: p95 - prevP95 },
      spend: {
        usedUsd,
        budgetUsd,
        pct: budgetUsd === 0 ? 0 : (usedUsd / budgetUsd) * 100,
      },
    },
  });
});

// GET /api/v1/dashboard/top-models — most-used models, for future widgets.
dashboardRouter.get("/top-models", async (c) => {
  const { id: userId } = requireUser(c);
  const promptIds = await userPromptIds(userId);
  if (promptIds.length === 0) return c.json({ success: true, data: [] });
  const rows = await db
    .select({ model: analyticsLogs.model, n: count() })
    .from(analyticsLogs)
    .where(inArray(analyticsLogs.promptId, promptIds))
    .groupBy(analyticsLogs.model)
    .orderBy(desc(count()))
    .limit(5);
  return c.json({ success: true, data: rows });
});

export default dashboardRouter;
