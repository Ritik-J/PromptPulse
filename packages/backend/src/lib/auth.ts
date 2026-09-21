import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import dotenv from "dotenv";
import path from "node:path";
import { db } from "../db/index";
import * as schema from "../db/schema";

for (const candidate of [
  ".env",
  "packages/backend/.env",
  "../.env",
  "../../.env",
  "../../../.env",
]) {
  dotenv.config({ path: path.resolve(process.cwd(), candidate) });
}

const trustedOrigins = (process.env.FRONTEND_URL ?? "http://localhost:3000")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL ?? "http://localhost:4000",
  basePath: "/api/v1/auth",
  secret: process.env.BETTER_AUTH_SECRET,
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema,
  }),
  trustedOrigins,
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    autoSignIn: true,
    requireEmailVerification: false,
    resetPasswordTokenExpiresIn: 60 * 60, // 1h
    revokeSessionsOnPasswordReset: true,
    sendResetPassword: async ({ user, url }) => {
      // TODO: send via SMTP (Resend/Postmark). Until then, surface the link
      // in dev logs only — never in production responses.
      if (process.env.NODE_ENV === "production") {
        console.warn(
          `[auth] password-reset requested for ${user.email} but no email provider is configured`,
        );
        return;
      }
      console.log(`[auth] password-reset link for ${user.email}: ${url}`);
    },
  },
  rateLimit: {
    enabled: true,
    window: 60,
    max: 100,
    customRules: {
      "/sign-up/email": { window: 60, max: 5 },
      "/sign-in/email": { window: 60, max: 10 },
      "/forget-password": { window: 300, max: 3 },
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    },
  },
  session: {
    // Short sliding lifetime: /get-session returns the raw session token to
    // the browser by Better-Auth design, so a short expiry bounds the damage
    // if a token is ever exfiltrated (XSS, malicious extension). Active users
    // stay signed in via sliding refresh; idle users re-authenticate daily.
    expiresIn: 60 * 60 * 24, // 24h
    updateAge: 60 * 60 * 12, // refresh after 12h of activity
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // 5 min — most useSession reads skip the network
    },
  },
  advanced: {
    useSecureCookies: process.env.NODE_ENV === "production",
  },
});

export type Auth = typeof auth;
