import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";

export const projects = sqliteTable("projects", {
  id: text("id").primaryKey(),
  // Ownership: every query must scope by the session user.
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  name: text("name").notNull(), // slug, e.g. proj_customer_support
  title: text("title").notNull(), // display name
  description: text("description"),
  environment: text("environment").notNull().$defaultFn(() => "production"),
  model: text("model"), // primary model shown on the card
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const prompts = sqliteTable("prompts", {
  id: text("id").primaryKey(),
  projectId: text("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  version: text("version").notNull(),
  template: text("template").notNull(),
  status: text("status").notNull().$defaultFn(() => "stable"), // stable | canary | staging
  trafficPct: integer("traffic_pct").$defaultFn(() => 100), // % of traffic, for splits
  createdAt: text("created_at").notNull(),
});

export const analyticsLogs = sqliteTable(
  "analytics_logs",
  {
    id: text("id").primaryKey(),
    promptId: text("prompt_id")
      .notNull()
      .references(() => prompts.id, { onDelete: "cascade" }),
    model: text("model").notNull(),
    tokensUsed: integer("tokens_used").notNull(),
    latencyMs: integer("latency_ms").notNull(),
    // Stored as TEXT (legacy); aggregate with CAST(cost_usd AS REAL).
    costUsd: text("cost_usd").notNull(),
    // 1 = success, 0 = error, NULL (legacy rows) = treated as success.
    ok: integer("ok", { mode: "boolean" }),
    timestamp: text("timestamp").notNull(), // ISO string, lexicographically sortable
  },
  (t) => [
    // Metrics endpoint filters by prompt + time window.
    index("analytics_logs_prompt_time_idx").on(t.promptId, t.timestamp),
  ],
);

// Chronological project activity for the audit feed.
export const auditLogs = sqliteTable("audit_logs", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  projectId: text("project_id").references(() => projects.id, {
    onDelete: "cascade",
  }),
  action: text("action").notNull(), // rolled_out | started_split | adjusted_model | snapshot_created | project_created
  ref: text("ref").notNull(), // commit hash / tag / snapshot id
  target: text("target").notNull().$defaultFn(() => ""),
  author: text("author"), // display handle, e.g. @sarah
  createdAt: text("created_at").notNull(),
});

// One row per user: budget + dashboard preferences.
export const workspaceSettings = sqliteTable("workspace_settings", {
  userId: text("user_id")
    .primaryKey()
    .references(() => user.id, { onDelete: "cascade" }),
  monthlyBudgetUsd: integer("monthly_budget_usd").notNull().$defaultFn(() => 1000),
  updatedAt: text("updated_at").notNull(),
});

// --- Better-Auth tables (SQLite + Drizzle) ---
// Table names (`user`, `session`, `account`, `verification`) match
// Better-Auth defaults, so `drizzleAdapter(db)` works without a schema map.

export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" })
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
});

export const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = sqliteTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(), // 'google' | 'credential'
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: integer("access_token_expires_at", {
    mode: "timestamp",
  }),
  refreshTokenExpiresAt: integer("refresh_token_expires_at", {
    mode: "timestamp",
  }),
  scope: text("scope"),
  password: text("password"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const verification = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
});
