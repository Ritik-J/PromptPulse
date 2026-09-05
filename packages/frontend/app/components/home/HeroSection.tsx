'use client'

import { Zap, PlayCircle, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const METRICS = [
  { dot: '#34d399', value: '12.8M',  label: 'Evals / Day' },
  { dot: 'var(--primary-container)', value: '99.99%', label: 'Gateway SLA' },
  { dot: '#fbbf24', value: '<14ms',  label: 'Overhead' },
]

export default function HeroSection() {
  return (
    <section className="w-full max-w-6xl mx-auto px-6 pt-16 pb-12 text-center flex flex-col items-center">

      {/* Canary Status Pill */}
      <Badge variant="outline" className="inline-flex items-center gap-2 px-3 py-1 text-xs mb-6 font-normal">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
        </span>
        <span style={{ color: 'var(--on-surface)' }}>PromptPulse v1.0</span>
        <span style={{ color: 'var(--outline)' }}>/</span>
        <span style={{ color: 'var(--on-surface-variant)' }}>Git-Style Prompt CI/CD & Bayesian A/B Engine is Live</span>
        <ChevronRight size={13} style={{ color: 'var(--primary-color)' }} />
      </Badge>

      {/* Headline */}
      <h1 className="tracking-tight max-w-4xl mx-auto leading-[1.12]"
        style={{
          fontFamily: 'var(--font-space-grotesk)',
          fontSize: 'clamp(30px, 5vw, 48px)',
          fontWeight: 600,
          color: 'var(--primary-color)',
        }}>
        Version Control &amp; A/B Test LLM Prompts<br className="hidden md:block" /> with Production Confidence.
      </h1>

      {/* Sub-headline */}
      <p className="mt-5 max-w-2xl mx-auto leading-relaxed"
        style={{ color: 'var(--on-surface-variant)', fontSize: '16px', lineHeight: '24px' }}>
        Stop guessing in production. Roll out prompt updates with automated canary deployments,
        statistical significance scoring, token spend analytics, and instant zero-downtime rollbacks.
      </p>

      {/* CTA Row */}
      <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
        <Button
          variant="brand"
          size="lg"
          onClick={() => scrollTo('auth-section')}
          className="w-full sm:w-auto flex items-center justify-center gap-2 shadow-lg">
          <Zap size={17} />
          Get Started Free
          <span className="text-xs opacity-75 font-normal">(Free tier · No CC)</span>
        </Button>

        <Button
          variant="secondary"
          size="lg"
          asChild
          className="w-full sm:w-auto flex items-center justify-center gap-2">
          <a href="#demo-console">
            <PlayCircle size={17} />
            Explore Live Sandbox
          </a>
        </Button>
      </div>

      {/* Social Proof / Metrics Row */}
      <div className="mt-12 pt-8 w-full flex flex-col md:flex-row items-center justify-between gap-6"
        style={{ borderTop: '1px solid rgba(76,70,63,0.3)', color: 'var(--on-surface-variant)' }}>
        {/* Avatar stack + trust text */}
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {[
              { initials: 'AI', bg: 'var(--surface-high)',       color: 'var(--primary-color)' },
              { initials: 'ML', bg: 'var(--surface-variant)',    color: 'var(--secondary-color)' },
              { initials: '+9k', bg: 'var(--primary-container)', color: 'var(--on-primary-fixed)', bold: true },
            ].map(({ initials, bg, color, bold }) => (
              <div key={initials}
                className="inline-flex h-7 w-7 rounded-full ring-2 ring-[var(--surface-lowest)] items-center justify-center text-[10px] font-mono"
                style={{ background: bg, color, fontWeight: bold ? 700 : 400 }}>
                {initials}
              </div>
            ))}
          </div>
          <span className="text-xs" style={{ color: 'var(--on-surface)' }}>
            Trusted by 2,400+ AI Engineers &amp; Foundation Teams
          </span>
        </div>

        {/* Metric pills */}
        <div className="flex items-center gap-5 text-xs font-mono" style={{ color: 'var(--outline)' }}>
          {METRICS.map(({ dot, value, label }, i) => (
            <div key={label} className="flex items-center gap-1.5">
              {i > 0 && <span className="hidden sm:block" style={{ color: 'var(--outline-variant)' }}>•</span>}
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: dot }} />
              <span className="font-medium" style={{ color: 'var(--on-surface)' }}>{value}</span>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
