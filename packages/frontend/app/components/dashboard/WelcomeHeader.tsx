'use client'

import { useEffect, useState } from 'react'
import { SlidersHorizontal, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useSession } from '@/lib/auth-client'
import { resolveDisplayUser } from '@/lib/auth-user'
import { dashboardApi } from '@/lib/dashboard-api'

export default function WelcomeHeader() {
  const { data: session } = useSession()
  const user = resolveDisplayUser(session?.user)
  const [projectCount, setProjectCount] = useState<number | null>(null)

  useEffect(() => {
    dashboardApi.projects().then((projects) => setProjectCount(projects.length)).catch(() => {
      setProjectCount(null)
    })
  }, [])

  const subtitle =
    projectCount === null
      ? 'Overview of your projects and global gateway routing'
      : projectCount === 0
        ? 'No projects yet — create your first project to get started'
        : `Overview of your ${projectCount} active ${projectCount === 1 ? 'project' : 'projects'} and global gateway routing`
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
          {subtitle}
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
