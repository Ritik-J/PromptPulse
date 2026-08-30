import { Hono } from 'hono';
import { db } from '../db';
import { projects } from '../db/schema';

const projectsRouter = new Hono();

projectsRouter.post('/', async (c) => {
  const body = await c.req.json();
  const newProject = {
    id: `proj_${crypto.randomUUID().substring(0, 8)}`,
    name: body.name,
    createdAt: new Date().toISOString(),
  };
  await db.insert(projects).values(newProject);
  return c.json({ success: true, data: newProject });
});

projectsRouter.get('/', async (c) => {
  const result = await db.select().from(projects);
  return c.json({ success: true, data: result });
});

export default projectsRouter;