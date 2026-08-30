import { Hono } from 'hono';
import { db } from '../db/index';
import { prompts } from '../db/schema';
import { eq } from 'drizzle-orm';

const promptsRouter = new Hono();

// Create a prompt
promptsRouter.post('/', async (c) => {
  const body = await c.req.json();
  const newPrompt = {
    id: crypto.randomUUID(),
    projectId: body.projectId,
    name: body.name,
    version: body.version,
    template: body.template,
    createdAt: new Date().toISOString(),
  };
  await db.insert(prompts).values(newPrompt);
  return c.json({ success: true, data: newPrompt });
});

// Get prompts by name
promptsRouter.get('/:name', async (c) => {
  const name = c.req.param('name');
  const result = await db.select().from(prompts).where(eq(prompts.name, name));
  return c.json({ success: true, data: result });
});

export default promptsRouter;