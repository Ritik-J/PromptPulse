import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:4000",
  // Must match `basePath` in packages/backend/src/lib/auth.ts
  basePath: "/api/v1/auth",
});

export const { signIn, signUp, signOut, useSession } = authClient;

export const appOrigin =
  process.env.NEXT_PUBLIC_APP_URL ??
  (typeof window !== "undefined"
    ? window.location.origin
    : "http://localhost:3000");

export const appCallbackURL = `${appOrigin}/`;
