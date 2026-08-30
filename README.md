# Prompt Pulse

AI Prompt Version Control & A/B Analytics Tool

## Architecture

This is a monorepo setup containing the following packages:

- `packages/frontend`: Next.js web application for the dashboard.
- `packages/backend`: Hono-based API for handling prompt fetching and analytics ingestion, powered by PostgreSQL.
- `packages/sdk-js`: TypeScript/JavaScript SDK for Node.js clients.
- `packages/sdk-python`: Python SDK for Python clients.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start local development servers:
   ```bash
   npm run dev
   ```
