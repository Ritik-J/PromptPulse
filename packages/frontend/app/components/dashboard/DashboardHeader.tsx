'use client'

import { Search, Key, Plus, Bell, HelpCircle, User, ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { MOCK_USER } from '@/app/mock/dashboardMock'

export default function DashboardHeader() {
  return (
    <header className="h-14 border-b sticky top-0 z-30 px-6 flex items-center justify-between"
      style={{
        background: 'var(--surface-lowest)',
        borderColor: 'var(--surface-variant)',
      }}>
      {/* Switcher & Search */}
      <div className="flex items-center gap-6">
        {/* Org Switcher */}
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors"
          style={{
            background: 'var(--surface-high)',
            borderColor: 'var(--surface-variant)',
            color: 'var(--on-surface)',
          }}>
          <span className="w-2 h-2 rounded-full bg-[var(--primary-container)]" />
          <span>{MOCK_USER.org}</span>
          <span className="text-[var(--outline)]">•</span>
          <span style={{ color: 'var(--on-surface-variant)' }}>Production</span>
          <ChevronsUpDown size={14} className="ml-1 text-[var(--outline)]" />
        </button>

        {/* Command Palette Search */}
        <div className="relative w-80">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--outline)]" />
          <Input
            placeholder="Search projects, prompts, or API keys... ⌘K"
            className="pl-9 pr-3 h-8 text-xs bg-[var(--surface-low)]"
          />
        </div>
      </div>

      {/* Navigation Badges & Actions */}
      <div className="flex items-center gap-3">
        {/* Live Cluster Indicator */}
        <Badge variant="outline" className="hidden lg:flex items-center gap-2 px-2.5 py-1 text-xs font-mono font-normal">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-[var(--outline)]">production</span>
          <span className="text-[var(--outline-variant)]">/</span>
          <span style={{ color: 'var(--primary-color)' }}>v1.4.2-rc</span>
        </Badge>

        <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5 font-normal">
          <Key size={14} />
          <span>API Keys</span>
        </Button>

        <Button variant="brand" size="sm" className="h-8 text-xs gap-1.5 font-semibold">
          <Plus size={14} />
          <span>Deploy</span>
        </Button>

        <div className="h-4 w-px bg-[var(--surface-variant)] mx-1" />

        {/* Utility Icons */}
        <Button variant="ghost" size="icon" className="h-8 w-8 text-[var(--outline)] hover:text-[var(--on-surface)]" title="Notifications">
          <Bell size={16} />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-[var(--outline)] hover:text-[var(--on-surface)]" title="Help">
          <HelpCircle size={16} />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-[var(--outline)] hover:text-[var(--on-surface)]" title="Profile">
          <User size={18} />
        </Button>
      </div>
    </header>
  )
}
