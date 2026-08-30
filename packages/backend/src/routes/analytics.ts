import { Hono } from 'hono';
import { db } from '../db';
import { analyticsLogs } from '../db/schema';

const analyticsRouter = new Hono();

analyticsRouter.post('/log', async (c) => {
  const body = await c.req.json();
  const newLog = {
    id: crypto.randomUUID(),
    promptId: body.promptId,
    model: body.model,
    tokensUsed: body.tokensUsed,
    latencyMs: body.latencyMs,
    costUsd: body.costUsd,
    timestamp: new Date().toISOString(),
  };
  await db.insert(analyticsLogs).values(newLog);
  return c.json({ success: true, logged: true });
});

export default analyticsRouter;