import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

// Enable CORS for your Next.js frontend and SDKs
app.use('/*', cors())

// Health check endpoint
app.get('/health', (c) => {
  return c.json({ status: 'healthy', timestamp: new Date().toISOString() })
})

// Placeholder prompt retrieval route
app.get('/api/v1/prompts/:name', (c) => {
  const promptName = c.req.param('name')
  return c.json({
    success: true,
    data: {
      name: promptName,
      version: '1.0.0',
      template: 'Hello, this is a test prompt for {{name}}!'
    }
  })
})

const port = 4000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})

export default app