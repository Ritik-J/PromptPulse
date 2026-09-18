'use client'

import { Zap, GitFork, Gauge, CreditCard, TrendingUp, TrendingDown } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { MOCK_TELEMETRY, TelemetryMetric } from '@/app/mock/dashboardMock'

const ICON_MAP: Record<string, any> = {
  Zap,
  GitFork,
  Gauge,
  CreditCard,
}

export default function TelemetryCards() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {MOCK_TELEMETRY.map((item: TelemetryMetric) => {
        const IconComponent = ICON_MAP[item.iconName] || Zap

        return (
          <Card key={item.id} className="p-4 bg-[var(--surface-low)] border-[var(--surface-variant)] transition-all hover:border-[var(--outline)]">
            <CardContent className="p-0">
              <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-[var(--outline)]">
                <span>{item.label}</span>
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
                    <div className="bg-[var(--primary-container)] h-full rounded-full" style={{ width: '38.4%' }} />
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
