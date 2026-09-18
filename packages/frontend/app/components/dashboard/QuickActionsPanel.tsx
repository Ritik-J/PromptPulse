'use client'

import { Key, Copy, CheckSquare, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MOCK_QUICK_ACTIONS, QuickActionItem } from '@/app/mock/dashboardMock'

const ICON_MAP: Record<string, any> = {
  Key,
  Copy,
  CheckSquare,
}

export default function QuickActionsPanel() {
  return (
    <Card className="p-4 bg-[var(--surface-low)] border-[var(--surface-variant)] space-y-4">
      <CardHeader className="p-0 flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-bold tracking-tight">Quick Actions</CardTitle>
        <Zap size={16} className="text-[var(--outline)]" />
      </CardHeader>
      <CardContent className="p-0 space-y-2">
        {MOCK_QUICK_ACTIONS.map((action: QuickActionItem) => {
          const IconComponent = ICON_MAP[action.iconName] || Key
          return (
            <button
              key={action.id}
              className="w-full text-left p-2.5 rounded-lg bg-[var(--surface-lowest)] hover:bg-[var(--surface-container)] border border-[var(--surface-variant)] hover:border-[var(--outline)] transition-all flex items-start gap-3 group">
              <IconComponent size={16} className="text-[var(--outline)] group-hover:text-[var(--primary-color)] mt-0.5" />
              <div>
                <div className="text-xs font-semibold group-hover:text-[var(--primary-color)] transition-colors"
                  style={{ color: 'var(--on-surface)' }}>
                  {action.title}
                </div>
                <div className="text-[11px]" style={{ color: 'var(--outline)' }}>
                  {action.subtitle}
                </div>
              </div>
            </button>
          )
        })}
      </CardContent>
    </Card>
  )
}
