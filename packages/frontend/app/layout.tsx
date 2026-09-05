import type { Metadata } from 'next'
import { Space_Grotesk, Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'PromptPulse — AI Prompt Version Control & A/B Analytics',
  description:
    'Stop guessing in production. Roll out prompt updates with automated canary deployments, statistical significance scoring, token spend analytics, and instant zero-downtime rollbacks.',
  keywords: ['LLM', 'prompt engineering', 'A/B testing', 'version control', 'AI', 'canary deployment'],
  openGraph: {
    title: 'PromptPulse — AI Prompt Version Control & A/B Analytics',
    description: 'The standard prompt version control, canary rollout, and A/B statistical evaluation suite for LLM production applications.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${geist.variable} ${geistMono.variable} dark`}
    >
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  )
}
