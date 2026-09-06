import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import promptsRouter from "./routes/prompts";
import projectsRouter from "./routes/projects";
import analyticsRouter from "./routes/analytics";
import authRouter from "./routes/auth";
import dotenv from "dotenv";
import path from "node:path";
import { requireAuth } from "./middleware/auth.middleware";

for (const candidate of [
  ".env",
  "packages/backend/.env",
  "../.env",
  "../../.env",
  "../../../.env",
]) {
  dotenv.config({ path: path.resolve(process.cwd(), candidate) });
}

const app = new Hono();

app.use(
  "/*",
  cors({
    origin: (process.env.FRONTEND_URL ?? "http://localhost:3000").split(","),
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    exposeHeaders: ["Set-Cookie"],
    credentials: true,
  }),
);

app.get("/health", (c) =>
  c.json({ status: "healthy", timestamp: new Date().toISOString() }),
);

// Apply auth middleware globally to these three route groups
app.use("/api/v1/prompts/*", requireAuth);
app.use("/api/v1/projects/*", requireAuth);
app.use("/api/v1/analytics/*", requireAuth);

// Mount modular routers
app.route("/api/v1/prompts", promptsRouter);
app.route("/api/v1/projects", projectsRouter);
app.route("/api/v1/analytics", analyticsRouter);
app.route("/api/v1/auth", authRouter);

const port = Number(process.env.BACKEND_PORT) || 4000;
console.log(`Server is running on port ${port}`);

serve({ fetch: app.fetch, port });

export default app;
