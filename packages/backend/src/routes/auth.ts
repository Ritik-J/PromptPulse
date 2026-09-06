import { Hono } from "hono";
import { auth } from "../lib/auth";

const authRouter = new Hono();

// Convenience routes must be registered BEFORE the catch-all handler,
// otherwise `/*` would intercept them.
authRouter.get("/session", async (c) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  return c.json({ success: true, data: session });
});

authRouter.get("/me", async (c) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  if (!session?.user) {
    return c.json({ success: false, error: "Unauthorized" }, 401);
  }
  return c.json({ success: true, data: session.user });
});

// Forward every other Better-Auth request (OAuth callbacks, session,
// sign-in/out) to the Better-Auth handler. Mounted at /api/v1/auth in
// index.ts, which matches `basePath: "/api/v1/auth"` in lib/auth.ts.
authRouter.on(["POST", "GET"], "/*", (c) => auth.handler(c.req.raw));

export default authRouter;
