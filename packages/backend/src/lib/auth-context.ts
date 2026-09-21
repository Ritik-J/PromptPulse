import type { Context } from "hono";

export interface AuthedUser {
  id: string;
  email: string;
  name: string;
}

// requireAuth middleware guarantees a session; this just types the lookup.
export function requireUser(c: Context): AuthedUser {
  const user = c.get("user") as AuthedUser | undefined;
  if (!user?.id) {
    throw new Error("Authenticated user missing from context");
  }
  return user;
}
