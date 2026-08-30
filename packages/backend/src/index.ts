import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import promptsRouter from './routes/prompts';
import projectsRouter from './routes/projects';
import analyticsRouter from './routes/analytics';
import dotenv from 'dotenv';
dotenv.config();

const app = new Hono();

app.use('/*', cors());

app.get('/health', (c) => c.json({ status: 'healthy', timestamp: new Date().toISOString() }));

// Mount modular routers
app.route('/api/v1/prompts', promptsRouter);
app.route('/api/v1/projects', projectsRouter);
app.route('/api/v1/analytics', analyticsRouter);

const port = Number(process.env.BACKEND_PORT) || 4000;
console.log(`Server is running on port ${port}`);

serve({ fetch: app.fetch, port });

export default app;