import { Hono } from "hono";
import { auth } from "../lib/auth";

const authRouter = new Hono();

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

authRouter.on(["POST", "GET"], "/*", (c) => auth.handler(c.req.raw));

export default authRouter;
