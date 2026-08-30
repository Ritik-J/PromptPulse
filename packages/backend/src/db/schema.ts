import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const projects = sqliteTable('projects', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  createdAt: text('created_at').notNull(),
});

export const prompts = sqliteTable('prompts', {
  id: text('id').primaryKey(),
  projectId: text('project_id').notNull(),
  name: text('name').notNull(),
  version: text('version').notNull(),
  template: text('template').notNull(),
  createdAt: text('created_at').notNull(),
});

export const analyticsLogs = sqliteTable('analytics_logs', {
  id: text('id').primaryKey(),
  promptId: text('prompt_id').notNull(),
  model: text('model').notNull(),
  tokensUsed: integer('tokens_used').notNull(),
  latencyMs: integer('latency_ms').notNull(),
  costUsd: text('cost_usd').notNull(),
  timestamp: text('timestamp').notNull(),
});