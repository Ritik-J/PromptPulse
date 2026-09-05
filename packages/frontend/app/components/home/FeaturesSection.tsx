'use client'

import { History, BarChart2, Activity, Globe } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const FEATURES = [
  {
    icon: History,
    title: 'Git-Native Versioning & Commits',
    description:
      'Every prompt tweak generates an immutable commit SHA. Review semantic line-by-line diffs, write PR descriptions for prompt iterations, and execute one-click rollbacks within 15 milliseconds.',
    preview: (
      <div className="mt-6 p-3 rounded-lg font-mono text-xs"
        style={{ background: 'var(--surface-lowest)', border: '1px solid var(--surface-variant)' }}>
        <div className="flex items-center justify-between pb-1.5 border-b mb-2"
          style={{ borderColor: 'rgba(53,52,56,0.4)' }}>
          <span className="font-medium" style={{ color: 'var(--primary-color)' }}>git prompt log --oneline</span>
          <Badge variant="success" className="text-[10px] py-0 h-4">SYNCED</Badge>
        </div>
        <div className="space-y-1 text-[11px]">
          <div className="text-emerald-400">91a4fd2 (HEAD → canary) feat: add strict JSON citation guard</div>
          <div style={{ color: 'var(--on-surface-variant)' }}>7f3bc8a (tag: v2.4.0) fix: reduce temperature for summarizer</div>
          <div style={{ color: 'var(--outline)' }}>4b19c2e initial baseline migration from hardcoded string</div>
        </div>
      </div>
    ),
  },
  {
    icon: BarChart2,
    title: 'Bayesian A/B Canary Routing',
    description:
      'Replace subjective gut-feel testing with mathematical rigor. Automated sample size calculations, continuous P-value significance, and guardrails to automatically halt regression variants.',
    preview: (
      <div className="mt-6 p-3 rounded-lg font-mono text-xs"
        style={{ background: 'var(--surface-lowest)', border: '1px solid var(--surface-variant)' }}>
        <div className="flex items-center justify-between pb-2 text-[11px]" style={{ color: 'var(--outline)' }}>
          <span>Traffic Distribution</span>
          <span style={{ color: 'var(--primary-color)' }}>Confidence: 99.4%</span>
        </div>
        <div className="w-full h-2 rounded-full overflow-hidden flex"
          style={{ background: 'var(--surface-container)' }}>
          <div className="h-full" style={{ width: '80%', background: 'var(--outline)' }} />
          <div className="h-full animate-pulse" style={{ width: '20%', background: '#34d399' }} />
        </div>
        <div className="flex justify-between text-[10px] mt-1.5 font-mono" style={{ color: 'var(--outline)' }}>
          <span>v2.4.0 (80%)</span>
          <span className="text-emerald-400">v2.4.1 Canary (20%)</span>
        </div>
      </div>
    ),
  },
  {
    icon: Activity,
    title: 'Telemetry & Guardrail Watchdogs',
    description:
      'Track token inflation, P95 latency shifts, and schema validation failures in real time. Configure automated circuit breakers that kill a prompt revision if hallucination rates exceed 0.5%.',
    preview: (
      <div className="mt-6 grid grid-cols-3 gap-2 font-mono text-xs text-center">
        {[
          { label: 'P95 LATENCY', value: '374ms', color: '#34d399' },
          { label: 'TOKEN SPEND', value: '-22.5%', color: 'var(--primary-color)' },
          { label: 'DRIFT ALERTS', value: '0 Active', color: '#34d399' },
        ].map(({ label, value, color }) => (
          <div key={label} className="p-2 rounded"
            style={{ background: 'var(--surface-lowest)', border: '1px solid var(--surface-variant)' }}>
            <div className="text-[10px]" style={{ color: 'var(--outline)' }}>{label}</div>
            <div className="text-sm font-semibold" style={{ color }}>{value}</div>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: Globe,
    title: 'Provider-Agnostic Gateway',
    description:
      'Decouple your prompts from model vendor SDKs. Test the identical prompt template simultaneously against Claude 3.5, GPT-4o, Gemini 1.5, DeepSeek-V3, and self-hosted Llama 3 endpoints.',
    preview: (
      <div className="mt-6 flex flex-wrap items-center gap-2 text-xs font-mono">
        {['Claude 3.5', 'GPT-4o', 'DeepSeek-V3', 'Gemini 1.5 Pro', 'Llama-3.3-70B'].map(model => (
          <Badge key={model} variant="outline" className="font-mono text-xs font-normal">
            {model}
          </Badge>
        ))}
      </div>
    ),
  },
]

export default function FeaturesSection() {
  return (
    <section className="w-full max-w-6xl mx-auto px-6 py-16" id="features">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <Badge variant="secondary" className="px-2.5 py-1 text-xs uppercase tracking-wider font-normal">
          Architected for Scale
        </Badge>
        <h2 className="mt-3 text-2xl md:text-[28px] font-bold tracking-tight"
          style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--primary-color)' }}>
          Everything prompt engineers need to ship confidently
        </h2>
        <p className="mt-2 text-sm" style={{ color: 'var(--on-surface-variant)', lineHeight: '20px' }}>
          A full-stack workflow layer sitting between your prompt developers and live LLM model gateways.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {FEATURES.map(({ icon: Icon, title, description, preview }) => (
          <Card key={title} className="p-6 flex flex-col justify-between group transition-all duration-200 hover:border-[var(--outline)]">
            <div>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-colors"
                style={{
                  background: 'var(--surface-high)',
                  border: '1px solid var(--outline-variant)',
                  color: 'var(--primary-color)',
                }}>
                <Icon size={19} />
              </div>
              <h3 className="text-lg font-semibold"
                style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--primary-color)' }}>
                {title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed" style={{ color: 'var(--on-surface-variant)', lineHeight: '18px' }}>
                {description}
              </p>
            </div>
            {preview}
          </Card>
        ))}
      </div>
    </section>
  )
}
