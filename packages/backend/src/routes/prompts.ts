import { Hono } from "hono";
import { z } from "zod";
import { db } from "../db/index";
import { projects, prompts } from "../db/schema";
import { requireUser } from "../lib/auth-context";
import { and, eq, inArray } from "drizzle-orm";

const promptsRouter = new Hono();

const createPromptSchema = z.object({
  projectId: z.string().min(1),
  name: z.string().min(2).max(80),
  version: z.string().min(1).max(40),
  template: z.string().min(1).max(20000),
  status: z.enum(["stable", "canary", "staging"]).default("stable"),
  trafficPct: z.number().int().min(0).max(100).default(100),
});

// Create a prompt — project must belong to the caller.
promptsRouter.post("/", async (c) => {
  const { id: userId } = requireUser(c);
  const parsed = createPromptSchema.safeParse(await c.req.json());
  if (!parsed.success) {
    return c.json(
      { success: false, error: "Invalid prompt", details: parsed.error.flatten() },
      400,
    );
  }
  const [project] = await db
    .select()
    .from(projects)
    .where(eq(projects.id, parsed.data.projectId));
  if (!project || project.userId !== userId) {
    return c.json({ success: false, error: "Project not found" }, 404);
  }
  const newPrompt = {
    id: crypto.randomUUID(),
    projectId: parsed.data.projectId,
    name: parsed.data.name,
    version: parsed.data.version,
    template: parsed.data.template,
    status: parsed.data.status,
    trafficPct: parsed.data.trafficPct,
    createdAt: new Date().toISOString(),
  };
  await db.insert(prompts).values(newPrompt);
  return c.json({ success: true, data: newPrompt }, 201);
});

// Get caller's prompts by name.
promptsRouter.get("/:name", async (c) => {
  const { id: userId } = requireUser(c);
  const name = c.req.param("name");
  const ownProjects = await db
    .select({ id: projects.id })
    .from(projects)
    .where(eq(projects.userId, userId));
  const ownIds = ownProjects.map((p) => p.id);
  if (ownIds.length === 0) return c.json({ success: true, data: [] });
  const result = await db
    .select()
    .from(prompts)
    .where(and(eq(prompts.name, name), inArray(prompts.projectId, ownIds)));
  return c.json({ success: true, data: result });
});

export default promptsRouter;
