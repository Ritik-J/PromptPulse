'use client'

import { useState } from 'react'
import { GitBranch, Verified, Gauge, Banknote, TrendingUp } from 'lucide-react'

const TELEMETRY = [
  { label: 'Bayesian Confidence', value: '99.4% (Statistically Sig.)', icon: Verified, color: '#34d399' },
  { label: 'Latency Delta (P95)',  value: '-38ms (-14.2%)',            icon: Gauge,    color: '#34d399' },
  { label: 'Hallucination Eval',  value: '0.02% (-82% drop)',         icon: TrendingUp, color: '#34d399' },
  { label: 'Cost / 1k Tokens',    value: '$0.0031 (-18.4%)',          icon: Banknote,  color: 'var(--on-surface)' },
]

export default function DemoConsole() {
  const [promoted, setPromoted] = useState(false)
  const [promoting, setPromoting] = useState(false)

  function handlePromote() {
    if (promoted) { setPromoted(false); return }
    setPromoting(true)
    setTimeout(() => { setPromoting(false); setPromoted(true) }, 800)
  }

  return (
    <section className="w-full max-w-6xl mx-auto px-6 my-8" id="demo-console">
      <div className="rounded-xl overflow-hidden"
        style={{
          background: 'var(--surface-low)',
          border: '1px solid var(--surface-variant)',
          boxShadow: '0 12px 48px rgba(0,0,0,0.7)',
        }}>

        {/* ── Window Chrome ── */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b"
          style={{ background: 'var(--surface-lowest)', borderColor: 'var(--surface-variant)' }}>
          {/* Traffic lights + branch */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              {['var(--surface-highest)', 'var(--surface-highest)', 'var(--surface-highest)'].map((bg, i) => (
                <span key={i} className="w-2.5 h-2.5 rounded-full"
                  style={{ background: bg, border: '1px solid rgba(152,143,135,0.4)' }} />
              ))}
            </div>
            <span style={{ color: 'var(--outline-variant)' }}>|</span>
            <div className="flex items-center gap-2 text-xs font-mono">
              <GitBranch size={13} style={{ color: 'var(--primary-container)' }} />
              <span style={{ color: 'var(--on-surface)', fontWeight: 500 }}>
                experiment/rag-customer-support-agent
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono"
                style={{ background: 'var(--surface-container)', color: 'var(--outline)' }}>
                active-canary
              </span>
            </div>
          </div>

          {/* Routing + Promote btn */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg text-xs font-mono"
              style={{ background: 'var(--surface-container)', border: '1px solid rgba(76,70,63,0.4)' }}>
              <span style={{ color: 'var(--on-surface-variant)' }}>Routing:</span>
              <span style={{ color: 'var(--on-surface)', fontWeight: 600 }}>
                {promoted ? '0% Baseline' : '80% Baseline'}
              </span>
              <span style={{ color: 'var(--outline)' }}>/</span>
              <span style={{ color: '#34d399', fontWeight: 600 }}>
                {promoted ? '100% Canary' : '20% Canary'}
              </span>
            </div>
            <button
              onClick={handlePromote}
              className="flex items-center gap-1 px-3 py-1 rounded text-xs transition-all"
              style={{
                background: promoted ? 'rgba(6,78,59,0.6)' : 'var(--surface-high)',
                border: promoted ? '1px solid #065f46' : '1px solid rgba(152,143,135,0.4)',
                color: promoted ? '#6ee7b7' : 'var(--primary)',
                opacity: promoting ? 0.75 : 1,
              }}>
              <TrendingUp size={13} />
              {promoting ? 'Deploying...' : promoted ? '100% Canary Active' : 'Promote to 100%'}
            </button>
          </div>
        </div>

        {/* ── Telemetry Strip ── */}
        <div className="px-4 py-2.5 grid grid-cols-2 sm:grid-cols-4 gap-3 border-b text-xs font-mono"
          style={{ background: 'rgba(31,31,34,0.5)', borderColor: 'var(--surface-variant)' }}>
          {TELEMETRY.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--outline)' }}>
                {label}
              </span>
              <div className="flex items-center gap-1.5 font-medium" style={{ color }}>
                <Icon size={13} />
                <span>{value}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Split Pane Diff ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x text-xs font-mono"
          style={{ divideColor: 'var(--surface-variant)' }}>

          {/* Left: Baseline */}
          <div className="p-4 flex flex-col" style={{ background: 'rgba(14,14,17,0.8)' }}>
            <div className="flex items-center justify-between pb-3 mb-3 border-b"
              style={{ borderColor: 'var(--surface-variant)', color: 'var(--on-surface-variant)' }}>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ background: 'var(--outline)' }} />
                <span style={{ color: 'var(--on-surface)', fontWeight: 600 }}>v2.4.0 (Production Baseline)</span>
                <span className="px-1.5 py-0.5 rounded text-[10px]"
                  style={{ color: 'var(--outline)', background: 'var(--surface-container)' }}>commit: 7f3bc8a</span>
              </div>
              <span style={{ color: 'var(--outline)' }}>Claude 3.5 Sonnet</span>
            </div>
            <div className="space-y-1.5 leading-relaxed terminal-scrollbar overflow-x-auto"
              style={{ color: 'var(--on-surface-variant)' }}>
              <div style={{ color: 'var(--outline)' }}>// System instructions</div>
              <p>You are a tier-1 customer success assistant for Acme Cloud infrastructure.</p>
              <p>Answer customer questions accurately using solely the provided context chunks.</p>
              <div className="p-2 rounded" style={{ background: 'var(--surface-low)', border: '1px solid rgba(53,52,56,0.6)', color: 'var(--secondary)' }}>
                Context Payload: <code style={{ color: 'var(--primary-container)' }}>{'{{documentation_context}}'}</code>
              </div>
              <p>Do not guess if unsure. Respond politely and concisely.</p>
              <div className="pt-2" style={{ color: 'var(--outline)' }}>// User prompt template</div>
              <p>User Question: <code style={{ color: 'var(--primary-container)' }}>{'{{customer_query}}'}</code></p>
            </div>
            <div className="mt-6 pt-3 border-t flex items-center justify-between text-[11px]"
              style={{ borderColor: 'rgba(53,52,56,0.5)', color: 'var(--outline)' }}>
              <span>Evaluated: 41,200 invocations</span>
              <span style={{ color: 'rgba(252,211,77,0.8)' }}>Avg latency: 412ms</span>
            </div>
          </div>

          {/* Right: Canary */}
          <div className="p-4 flex flex-col relative" style={{ background: 'var(--surface-lowest)' }}>
            <div className="flex items-center justify-between pb-3 mb-3 border-b"
              style={{ borderColor: 'var(--surface-variant)' }}>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span style={{ color: 'var(--on-surface)', fontWeight: 600 }}>v2.4.1 (Canary Candidate)</span>
                <span className="px-1.5 py-0.5 rounded text-[10px]"
                  style={{ color: '#6ee7b7', background: 'rgba(6,78,59,0.4)', border: '1px solid rgba(6,95,70,0.4)' }}>
                  commit: 91a4fd2
                </span>
              </div>
              <span style={{ color: 'var(--outline)' }}>Claude 3.5 Sonnet (Temp: 0.1)</span>
            </div>
            <div className="space-y-1.5 leading-relaxed terminal-scrollbar overflow-x-auto"
              style={{ color: 'var(--on-surface-variant)' }}>
              <div style={{ color: 'var(--outline)' }}>// Optimized System instructions (+chain of thought guard)</div>
              <p>You are a tier-1 customer success assistant for Acme Cloud infrastructure.</p>
              <p className="pl-2 py-0.5 rounded-r border-l-2"
                style={{ borderColor: '#10b981', background: 'rgba(6,78,59,0.3)', color: '#6ee7b7' }}>
                + Strict Constraint: Apply structured JSON citation markers for every cited SLA or pricing claim.
              </p>
              <div className="p-2 rounded" style={{ background: 'var(--surface-low)', border: '1px solid rgba(53,52,56,0.6)', color: 'var(--secondary)' }}>
                Context Payload: <code style={{ color: 'var(--primary-container)' }}>{'{{documentation_context}}'}</code>
              </div>
              <p className="pl-2 py-0.5 rounded-r border-l-2"
                style={{ borderColor: '#10b981', background: 'rgba(6,78,59,0.3)', color: '#6ee7b7' }}>
                + Guardrail: If query is outside domain scope, reject with error code{' '}
                <code style={{ color: 'var(--primary)', fontWeight: 600 }}>{'{{OUT_OF_DOMAIN}}'}</code>.
              </p>
              <div className="pt-2" style={{ color: 'var(--outline)' }}>// User prompt template</div>
              <p>User Question: <code style={{ color: 'var(--primary-container)' }}>{'{{customer_query}}'}</code></p>
            </div>
            <div className="mt-6 pt-3 border-t flex items-center justify-between text-[11px]"
              style={{ borderColor: 'rgba(53,52,56,0.5)' }}>
              <span className="text-emerald-400">Evaluated: 10,340 canary calls</span>
              <span className="text-emerald-400 font-medium">Avg latency: 374ms (-38ms)</span>
            </div>
          </div>
        </div>

        {/* ── Live Eval Footer ── */}
        <div className="px-3 py-2.5 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono"
          style={{ background: 'var(--surface-lowest)', borderColor: 'var(--surface-variant)', color: 'var(--outline)' }}>
          <div className="flex items-center gap-3 overflow-x-auto">
            <span className="font-bold" style={{ color: '#34d399' }}>LIVE_EVAL:</span>
            <span style={{ color: 'var(--on-surface)' }}>Trace #88921-prod</span>
            <span>eval_score: <span className="font-semibold" style={{ color: '#6ee7b7' }}>0.982</span></span>
            <span>cost: <span style={{ color: 'var(--on-surface)' }}>$0.0018</span></span>
            <span>tokens: <span style={{ color: 'var(--on-surface)' }}>542</span></span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span style={{ color: 'var(--on-surface-variant)' }}>Canary health 100% stable</span>
          </div>
        </div>
      </div>
    </section>
  )
}
