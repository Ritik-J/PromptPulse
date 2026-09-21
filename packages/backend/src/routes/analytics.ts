import { Hono } from 'hono';
import { z } from 'zod';
import { db } from '../db';
import { analyticsLogs, projects, prompts } from '../db/schema';
import { requireUser } from '../lib/auth-context';
import { eq } from 'drizzle-orm';

const analyticsRouter = new Hono();

const logSchema = z.object({
  promptId: z.string().min(1),
  model: z.string().min(1).max(80),
  tokensUsed: z.number().int().min(0),
  latencyMs: z.number().int().min(0),
  costUsd: z.union([z.string(), z.number()]).transform(String),
  ok: z.boolean().optional(),
});

analyticsRouter.post('/log', async (c) => {
  const { id: userId } = requireUser(c);
  const parsed = logSchema.safeParse(await c.req.json());
  if (!parsed.success) {
    return c.json(
      { success: false, error: 'Invalid log entry', details: parsed.error.flatten() },
      400,
    );
  }
  // The prompt must exist and belong to the caller — no cross-account writes.
  const [prompt] = await db
    .select({ projectId: prompts.projectId })
    .from(prompts)
    .where(eq(prompts.id, parsed.data.promptId));
  if (!prompt) {
    return c.json({ success: false, error: 'Prompt not found' }, 404);
  }
  const [project] = await db
    .select({ userId: projects.userId })
    .from(projects)
    .where(eq(projects.id, prompt.projectId));
  if (!project || project.userId !== userId) {
    return c.json({ success: false, error: 'Prompt not found' }, 404);
  }

  const newLog = {
    id: crypto.randomUUID(),
    promptId: parsed.data.promptId,
    model: parsed.data.model,
    tokensUsed: parsed.data.tokensUsed,
    latencyMs: parsed.data.latencyMs,
    costUsd: parsed.data.costUsd,
    ok: parsed.data.ok ?? true,
    timestamp: new Date().toISOString(),
  };
  await db.insert(analyticsLogs).values(newLog);
  return c.json({ success: true, logged: true });
});

export default analyticsRouter;
