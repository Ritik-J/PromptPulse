import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { db } from './db';
import {prompts} from './db/schema';
import { eq } from 'drizzle-orm';


const app = new Hono()

// Enable CORS for your Next.js frontend and SDKs
app.use('/*', cors())

// Health check endpoint
app.get('/health', (c) => {
  return c.json({ status: 'healthy', timestamp: new Date().toISOString() })
})

// Create a prompt
app.post('/api/v1/prompts', async (c) => {
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

// Get prompts
app.get('/api/v1/prompts/:name', async (c) => {
  const name = c.req.param('name');
  const result = await db.select().from(prompts).where(eq(prompts.name, name));
  return c.json({ success: true, data: result });
});

const port = 4000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})

export default app