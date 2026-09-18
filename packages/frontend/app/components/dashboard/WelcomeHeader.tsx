'use client'

import { SlidersHorizontal, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useSession } from '@/lib/auth-client'
import { resolveDisplayUser } from '@/lib/auth-user'

export default function WelcomeHeader() {
  const { data: session } = useSession()
  const user = resolveDisplayUser(session?.user)
  return (
    <section className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b"
      style={{ borderColor: 'var(--surface-variant)' }}>
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight"
            style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--primary-color)' }}>
            Welcome back, {user.firstName}
          </h1>
          <Badge variant="success" className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-normal">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            All 4 clusters operational
          </Badge>
        </div>
        <p className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>
          Overview of your 4 active projects and global gateway routing
        </p>
      </div>

      <div className="flex items-center gap-2 self-start md:self-auto">
        <Button variant="outline" size="sm" className="h-9 gap-1.5 text-xs font-normal">
          <SlidersHorizontal size={14} />
          <span>Manage API Keys</span>
        </Button>
        <Button variant="brand" size="sm" className="h-9 gap-1.5 text-xs font-semibold shadow-sm">
          <Plus size={15} />
          <span>+ Create New Project</span>
        </Button>
      </div>
    </section>
  )
}
