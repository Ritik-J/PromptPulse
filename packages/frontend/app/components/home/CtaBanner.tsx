'use client'

import { useState } from 'react'
import { ArrowRight, Copy, Check } from 'lucide-react'

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
  const [selectedPm, setSelectedPm] = useState(0)
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard?.writeText(PACKAGE_MANAGERS[selectedPm].cmd)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <section className="w-full max-w-5xl mx-auto px-6 py-20 text-center">
      <div className="rounded-2xl p-8 md:p-14 relative overflow-hidden"
        style={{
          background: 'var(--surface-high)',
          border: '1px solid var(--surface-variant)',
        }}>
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(200,189,178,0.06) 0%, transparent 70%)',
          }} />

        <div className="relative z-10">
          <h2 className="font-bold tracking-tight"
            style={{
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: 'clamp(22px, 4vw, 34px)',
              color: 'var(--primary)',
            }}>
            Ready to bring engineering discipline to your prompts?
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-sm leading-relaxed"
            style={{ color: 'var(--on-surface-variant)', lineHeight: '24px' }}>
            Install the PromptPulse proxy in 2 lines of code. Run canary rollouts with zero config.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => scrollTo('auth-section')}
              className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all shadow-lg"
              style={{ background: 'var(--primary-container)', color: 'var(--on-primary-fixed)' }}>
              Start Building for Free
              <ArrowRight size={15} />
            </button>
            <button
              className="px-5 py-3 rounded-lg text-sm transition-all"
              style={{
                background: 'var(--surface-container)',
                border: '1px solid var(--surface-variant)',
                color: 'var(--on-surface)',
              }}>
              Schedule Architecture Review
            </button>
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
              {/* Package manager tabs */}
              <div className="flex items-center rounded-lg p-0.5 text-[11px]"
                style={{ background: 'var(--surface-container)', border: '1px solid rgba(76,70,63,0.3)' }}>
                {PACKAGE_MANAGERS.map(({ label }, i) => (
                  <button key={label} onClick={() => setSelectedPm(i)}
                    className="px-2 py-0.5 rounded transition-colors"
                    style={{
                      background: selectedPm === i ? 'var(--surface-high)' : 'transparent',
                      color: selectedPm === i ? 'var(--primary)' : 'var(--outline)',
                      fontWeight: selectedPm === i ? 500 : 400,
                    }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Command row */}
            <div className="flex items-center justify-between px-2 py-1 rounded-lg"
              style={{ background: 'var(--surface-low)', border: '1px solid rgba(53,52,56,0.4)' }}>
              <div className="flex items-center gap-2 overflow-x-auto">
                <span className="font-bold text-xs text-emerald-400 select-none">$</span>
                <code className="text-sm" style={{ color: 'var(--primary)', fontFamily: 'var(--font-geist-mono)' }}>
                  {PACKAGE_MANAGERS[selectedPm].cmd}
                </code>
              </div>
              <button onClick={handleCopy}
                className="p-1.5 rounded transition-colors flex items-center shrink-0 ml-2"
                style={{ color: copied ? '#34d399' : 'var(--outline)' }}
                title="Copy command">
                {copied ? <Check size={15} /> : <Copy size={15} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
