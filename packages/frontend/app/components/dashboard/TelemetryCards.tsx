'use client'

import { useEffect, useState } from 'react'
import { Zap, GitFork, Gauge, CreditCard, TrendingUp, TrendingDown } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { TelemetryMetric } from '@/app/mock/dashboardMock'
import { TELEMETRY_HINTS } from '@/constants/dashboard'
import { dashboardApi } from '@/lib/dashboard-api'
import { formatCompact, formatSigned, formatUsd } from '@/lib/dashboard-format'
import InfoTip from './InfoTip'

const ICON_MAP: Record<string, any> = {
  Zap,
  GitFork,
  Gauge,
  CreditCard,
}

function toCards(data: Awaited<ReturnType<typeof dashboardApi.metrics>>): TelemetryMetric[] {
  return [
    {
      id: 'global-invocations',
      label: 'Global Invocations (30d)',
      value: formatCompact(data.invocations.total),
      change: formatSigned(data.invocations.changePct),
      trend: data.invocations.changePct >= 0 ? 'up' : 'down',
      subtitle: `vs ${formatCompact(data.invocations.previous)} previous period`,
      iconName: 'Zap',
    },
    {
      id: 'active-canaries',
      label: 'Active Canaries & Tests',
      value: `${data.canaries.active} Live Splits`,
      subtitle: `${data.canaries.significant} statistically significant`,
      iconName: 'GitFork',
    },
    {
      id: 'avg-latency',
      label: 'Avg Latency (P95)',
      value: `${Math.round(data.latency.p95Ms)}ms`,
      change: `${data.latency.deltaMs >= 0 ? '+' : '−'}${Math.abs(Math.round(data.latency.deltaMs))}ms`,
      trend: data.latency.deltaMs <= 0 ? 'down' : 'up',
      subtitle: 'across your projects',
      iconName: 'Gauge',
    },
    {
      id: 'token-spend',
      label: 'Monthly Token Spend',
      value: formatUsd(data.spend.usedUsd),
      subtitle: `/ ${formatUsd(data.spend.budgetUsd)} budget (${data.spend.pct.toFixed(1)}%)`,
      iconName: 'CreditCard',
      progressPct: Math.min(100, data.spend.pct),
    },
  ]
}

export default function TelemetryCards() {
  const [items, setItems] = useState<TelemetryMetric[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    dashboardApi.metrics().then((data) => setItems(toCards(data))).catch(() => {
      setError('Could not load metrics. Is the backend running?')
    })
  }, [])

  if (error) {
    return (
      <section className="rounded-xl border border-[var(--surface-variant)] p-4 text-xs font-mono text-red-400">
        {error}
      </section>
    )
  }

  if (!items) {
    return (
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="p-4 rounded-xl border border-[var(--surface-variant)] bg-[var(--surface-low)] animate-pulse">
            <div className="h-3 w-24 rounded bg-[var(--surface-high)]" />
            <div className="mt-3 h-7 w-20 rounded bg-[var(--surface-high)]" />
          </div>
        ))}
      </section>
    )
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item: TelemetryMetric) => {
        const IconComponent = ICON_MAP[item.iconName] || Zap

        return (
          <Card key={item.id} className="p-4 bg-[var(--surface-low)] border-[var(--surface-variant)] transition-all hover:border-[var(--outline)]">
            <CardContent className="p-0">
              <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-[var(--outline)]">
                <span>
                  {item.label}
                  {TELEMETRY_HINTS[item.id] && (
                    <InfoTip text={TELEMETRY_HINTS[item.id]} label={item.label} />
                  )}
                </span>
                <IconComponent size={15} className="text-[var(--outline)]" />
              </div>

              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-2xl font-bold tracking-tight"
                  style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--primary-color)' }}>
                  {item.value}
                </span>

                {item.change && (
                  <span className={`text-xs font-mono font-semibold flex items-center ${
                    item.trend === 'up' || item.trend === 'down' ? 'text-emerald-400' : 'text-[var(--outline)]'
                  }`}>
                    {item.trend === 'up' && <TrendingUp size={13} className="mr-0.5" />}
                    {item.trend === 'down' && <TrendingDown size={13} className="mr-0.5" />}
                    {item.change}
                  </span>
                )}
              </div>

              {item.id === 'token-spend' ? (
                <div className="mt-3 space-y-1.5">
                  <div className="text-[11px] font-mono text-[var(--outline)]">{item.subtitle}</div>
                  <div className="w-full bg-[var(--surface-high)] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[var(--primary-container)] h-full rounded-full" style={{ width: `${item.progressPct ?? 0}%` }} />
                  </div>
                </div>
              ) : (
                <div className="mt-1 text-[11px] font-mono text-[var(--outline)]">
                  {item.subtitle}
                </div>
              )}
            </CardContent>
          </Card>
        )
      })}
    </section>
  )
}
