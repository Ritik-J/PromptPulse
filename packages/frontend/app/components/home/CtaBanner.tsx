'use client'

import { useState } from 'react'
import { ArrowRight, Copy, Check } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

const PACKAGE_MANAGERS = [
  { label: 'npm',  cmd: 'npm install @promptpulse/sdk' },
  { label: 'pip',  cmd: 'pip install promptpulse' },
  { label: 'pnpm', cmd: 'pnpm add @promptpulse/sdk' },
  { label: 'bun',  cmd: 'bun add @promptpulse/sdk' },
]

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function CtaBanner() {
  const [selectedPm, setSelectedPm] = useState('0')
  const [copied, setCopied] = useState(false)

  const pmIndex = parseInt(selectedPm, 10)

  async function handleCopy() {
    await navigator.clipboard?.writeText(PACKAGE_MANAGERS[pmIndex].cmd)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <section className="w-full max-w-5xl mx-auto px-6 py-20 text-center">
      <Card className="rounded-2xl p-8 md:p-14 relative overflow-hidden bg-[var(--surface-high)] border-[var(--surface-variant)]">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(200,189,178,0.06) 0%, transparent 70%)',
          }} />

        <CardContent className="relative z-10 p-0">
          <h2 className="font-bold tracking-tight"
            style={{
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: 'clamp(22px, 4vw, 34px)',
              color: 'var(--primary-color)',
            }}>
            Ready to bring engineering discipline to your prompts?
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-sm leading-relaxed"
            style={{ color: 'var(--on-surface-variant)', lineHeight: '24px' }}>
            Install the PromptPulse proxy in 2 lines of code. Run canary rollouts with zero config.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="brand"
              size="lg"
              onClick={() => scrollTo('auth-section')}
              className="flex items-center gap-2 shadow-lg">
              Start Building for Free
              <ArrowRight size={15} />
            </Button>
            <Button
              variant="secondary"
              size="lg">
              Schedule Architecture Review
            </Button>
          </div>

          {/* Install Snippet */}
          <div className="mt-8 max-w-lg mx-auto rounded-xl p-3 text-left font-mono"
            style={{
              background: 'var(--surface-lowest)',
              border: '1px solid var(--surface-variant)',
              boxShadow: '0 10px 25px -5px rgba(0,0,0,0.4)',
            }}>
            {/* Snippet header */}
            <div className="flex items-center justify-between border-b pb-2 px-1 mb-2"
              style={{ borderColor: 'rgba(53,52,56,0.4)' }}>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[0, 1, 2].map(i => (
                    <span key={i} className="w-2 h-2 rounded-full"
                      style={{ background: 'var(--surface-variant)' }} />
                  ))}
                </div>
                <span className="text-xs font-medium ml-1.5" style={{ color: 'var(--outline)' }}>
                  Quick Install
                </span>
              </div>
              {/* Package manager tabs using shadcn Tabs */}
              <Tabs value={selectedPm} onValueChange={setSelectedPm}>
                <TabsList className="h-7 p-0.5">
                  {PACKAGE_MANAGERS.map(({ label }, i) => (
                    <TabsTrigger key={label} value={String(i)} className="h-6 text-[11px] px-2">
                      {label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            {/* Command row */}
            <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg"
              style={{ background: 'var(--surface-low)', border: '1px solid rgba(53,52,56,0.4)' }}>
              <div className="flex items-center gap-2 overflow-x-auto">
                <span className="font-bold text-xs text-emerald-400 select-none">$</span>
                <code className="text-sm" style={{ color: 'var(--primary-color)', fontFamily: 'var(--font-geist-mono)' }}>
                  {PACKAGE_MANAGERS[pmIndex].cmd}
                </code>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCopy}
                className="h-7 w-7 shrink-0 ml-2"
                style={{ color: copied ? '#34d399' : 'var(--outline)' }}
                title="Copy command">
                {copied ? <Check size={14} /> : <Copy size={14} />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
