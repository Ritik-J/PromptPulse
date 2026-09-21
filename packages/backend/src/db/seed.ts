import { db } from "./index";
import {
  projects,
  prompts,
  analyticsLogs,
  auditLogs,
  workspaceSettings,
  user,
} from "./schema";
import { eq } from "drizzle-orm";

// Dev-only seed mirroring the dashboard mock content so the UI renders
// real DB-backed numbers. Idempotent: wipes the target user's app data first.
// Usage: SEED_EMAIL=you@x.com npm run db:seed (defaults to first user).

const PROJECTS = [
  {
    id: "proj_customer_support",
    name: "proj_customer_support",
    title: "Customer Support Core",
    environment: "production",
    model: "Claude 3.5 Sonnet",
    promptCount: 24,
    canaries: 3,
    baseLatencyMs: 148,
    monthlyReqs: 320,
  },
  {
    id: "proj_code_review",
    name: "proj_code_review",
    title: "Code Review & Security Linter",
    environment: "production",
    model: "GPT-4o",
    promptCount: 14,
    canaries: 1,
    baseLatencyMs: 210,
    monthlyReqs: 180,
  },
  {
    id: "proj_data_sql",
    name: "proj_data_sql",
    title: "Text-to-SQL Assistant",
    environment: "production",
    model: "DeepSeek-Coder V2",
    promptCount: 8,
    canaries: 2,
    canaryTrafficPct: 50,
    baseLatencyMs: 114,
    monthlyReqs: 140,
  },
  {
    id: "proj_doc_summarizer",
    name: "proj_doc_summarizer",
    title: "Document Summarizer & Reports",
    environment: "staging",
    model: "Gemini 1.5 Pro",
    promptCount: 6,
    canaries: 0,
    baseLatencyMs: 890,
    monthlyReqs: 60,
  },
] as const;

const AUDIT = [
  { project: 0, action: "rolled_out", ref: "commit c81f9a2", target: "to production", author: "@sarah", minsAgo: 24 },
  { project: 1, action: "started_split", ref: "v2.1.0-canary", target: "", author: "@marcus", minsAgo: 180 },
  { project: 2, action: "adjusted_model", ref: "deepseek-v2", target: "", author: "@alex", minsAgo: 1440 },
  { project: 3, action: "snapshot_created", ref: "snap_994d8e", target: "", author: "@karl", minsAgo: 2880 },
] as const;

const pick = <T,>(arr: readonly T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];
const jitter = (base: number, pct: number) =>
  Math.max(1, Math.round(base * (1 + (Math.random() * 2 - 1) * pct)));
const isoDaysAgo = (days: number) =>
  new Date(Date.now() - days * 86400_000).toISOString();

async function main() {
  const seedEmail = process.env.SEED_EMAIL;
  const owner = seedEmail
    ? await db.select().from(user).where(eq(user.email, seedEmail))
    : await db.select().from(user);
  if (owner.length === 0) {
    console.error("No users found — sign up via the frontend first.");
    process.exit(1);
  }
  const userId = owner[0].id;
  console.log(`Seeding for user ${owner[0].email} (${userId})`);

  // Fresh reseed: wipe app data for this user (auth rows untouched).
  const existing = await db.select().from(projects).where(eq(projects.userId, userId));
  for (const p of existing) {
    const prs = await db.select().from(prompts).where(eq(prompts.projectId, p.id));
    for (const pr of prs) {
      await db.delete(analyticsLogs).where(eq(analyticsLogs.promptId, pr.id));
    }
    await db.delete(prompts).where(eq(prompts.projectId, p.id));
    await db.delete(auditLogs).where(eq(auditLogs.projectId, p.id));
  }
  await db.delete(projects).where(eq(projects.userId, userId));

  const now = new Date().toISOString();
  let logCount = 0;

  // Namespaced per user so two seeded accounts never collide on PKs.
  const ns = (id: string) => `proj_${userId.substring(0, 8)}_${id}`;

  for (const p of PROJECTS) {
    const projectId = ns(p.id);
    await db.insert(projects).values({
      id: projectId,
      userId,
      name: p.name,
      title: p.title,
      environment: p.environment,
      model: p.model,
      createdAt: now,
      updatedAt: now,
    });

    const promptIds: string[] = [];
    for (let i = 0; i < p.promptCount; i++) {
      const id = `${projectId}_prompt_${i + 1}`;
      const isCanary = i < p.canaries;
      await db.insert(prompts).values({
        id,
        projectId,
        name: `prompt_${i + 1}`,
        version: `v1.${i}.0${isCanary ? "-canary" : ""}`,
        template: `Template for ${p.title} prompt ${i + 1} with {{variable}}.`,
        status: p.environment === "staging" ? "staging" : isCanary ? "canary" : "stable",
        trafficPct: isCanary ? ("canaryTrafficPct" in p ? p.canaryTrafficPct : 10) : 100,
        createdAt: now,
      });
      promptIds.push(id);
    }

    // Representative log volume over ~40 days (covers 30d + prev-30d windows).
    // The first canary of the first two projects gets heavy volume so the
    // "statistically significant" heuristic (>= 100 invocations) shows 2,
    // like the dashboard mock.
    const perPrompt = Math.max(1, Math.round(p.monthlyReqs / p.promptCount));
    for (const pid of promptIds) {
      const idx = promptIds.indexOf(pid);
      const mature = PROJECTS.indexOf(p) < 2 && idx === 0;
      const spanDays = mature ? 29 : 40;
      const volume = mature ? 140 : perPrompt;
      for (let i = 0; i < volume; i++) {
        const daysAgo = Math.random() * spanDays;
        const tokens = 400 + Math.floor(Math.random() * 1600);
        await db.insert(analyticsLogs).values({
          id: crypto.randomUUID(),
          promptId: pid,
          model: Math.random() < 0.9 ? p.model : pick(["GPT-4o", "Claude 3.5 Sonnet"] as const),
          tokensUsed: tokens,
          latencyMs: jitter(p.baseLatencyMs, 0.35),
          costUsd: ((tokens * 0.003) / 1000).toFixed(6),
          ok: Math.random() < 0.0004 ? false : true,
          timestamp: isoDaysAgo(daysAgo),
        });
        logCount++;
      }
    }
  }

  // A couple of deterministic errors so errorRate is nonzero somewhere.
  const sample = await db
    .select({ id: analyticsLogs.id })
    .from(analyticsLogs)
    .limit(2);
  for (const row of sample) {
    await db
      .update(analyticsLogs)
      .set({ ok: false })
      .where(eq(analyticsLogs.id, row.id));
  }

  for (const a of AUDIT) {
    const project = PROJECTS[a.project];
    await db.insert(auditLogs).values({
      id: crypto.randomUUID(),
      userId,
      projectId: ns(project.id),
      action: a.action,
      ref: a.ref,
      target: a.target,
      author: a.author,
      createdAt: new Date(Date.now() - a.minsAgo * 60_000).toISOString(),
    });
  }

  await db
    .insert(workspaceSettings)
    .values({ userId, monthlyBudgetUsd: 1000, updatedAt: now })
    .onConflictDoUpdate({
      target: workspaceSettings.userId,
      set: { monthlyBudgetUsd: 1000, updatedAt: now },
    });

  const promptTotal = PROJECTS.reduce((n, p) => n + p.promptCount, 0);
  console.log(
    `Seeded ${PROJECTS.length} projects, ${promptTotal} prompts, ${logCount} logs, ${AUDIT.length} audit rows.`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
