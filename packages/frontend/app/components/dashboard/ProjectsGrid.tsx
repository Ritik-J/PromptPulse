'use client'

import { useEffect, useState } from 'react'
import { ArrowUpDown, Grid, List, PlusCircle, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ProjectItem } from '@/app/mock/dashboardMock'
import { dashboardApi } from '@/lib/dashboard-api'
import ProjectCard from './ProjectCard'

export default function ProjectsGrid() {
  const [filterEnv, setFilterEnv] = useState<'all' | 'production' | 'staging'>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')
  const [projects, setProjects] = useState<ProjectItem[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    dashboardApi.projects().then((data) => setProjects(data as ProjectItem[])).catch(() => {
      setError('Could not load projects. Is the backend running?')
    })
  }, [])

  const filteredProjects = (projects ?? []).filter(project => {
    if (filterEnv === 'production') return project.environment === 'production'
    if (filterEnv === 'staging') return project.environment === 'staging'
    return true
  })

  const prodCount = (projects ?? []).filter(p => p.environment === 'production').length
  const stagingCount = (projects ?? []).filter(p => p.environment === 'staging').length

  return (
    <section className="space-y-4">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Filter Tabs */}
        <Tabs value={filterEnv} onValueChange={(val: any) => setFilterEnv(val)} className="self-start">
          <TabsList className="h-9 p-1">
            <TabsTrigger value="all" className="text-xs">
              All Projects ({(projects ?? []).length})
            </TabsTrigger>
            <TabsTrigger value="production" className="text-xs">
              Production ({prodCount})
            </TabsTrigger>
            <TabsTrigger value="staging" className="text-xs">
              Staging ({stagingCount})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Sort and View Mode */}
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--surface-high)] border border-[var(--surface-variant)] rounded-lg text-[var(--on-surface-variant)] text-xs">
            <ArrowUpDown size={14} className="text-[var(--outline)]" />
            <span>Sort:</span>
            <span className="font-semibold text-[var(--on-surface)]">Last Deployed</span>
          </button>

          <div className="flex items-center gap-1 p-0.5 bg-[var(--surface-high)] border border-[var(--surface-variant)] rounded-lg">
            <Button
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('grid')}
              className="h-7 w-7"
              title="Grid View">
              <Grid size={15} />
            </Button>
            <Button
              variant={viewMode === 'table' ? 'secondary' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('table')}
              className="h-7 w-7"
              title="Table View">
              <List size={15} />
            </Button>
          </div>
        </div>
      </div>

      {/* PROJECTS GRID / TABLE */}
      {error ? (
        <div className="rounded-xl border border-[var(--surface-variant)] p-4 text-xs font-mono text-red-400">
          {error}
        </div>
      ) : !projects ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[0, 1].map((i) => (
            <div key={i} className="rounded-xl border border-[var(--surface-variant)] bg-[var(--surface-low)] p-4 space-y-3 animate-pulse">
              <div className="h-4 w-40 rounded bg-[var(--surface-high)]" />
              <div className="h-3 w-24 rounded bg-[var(--surface-high)]" />
            </div>
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[var(--surface-variant)] p-8 text-center text-xs font-mono text-[var(--outline)]">
          No projects yet. Create your first project to get started.
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProjects.map((project: ProjectItem) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-[var(--surface-variant)] bg-[var(--surface-low)] overflow-hidden font-mono text-xs">
          <div className="grid grid-cols-6 p-3 bg-[var(--surface-lowest)] border-b border-[var(--surface-variant)] text-[var(--outline)]">
            <div className="col-span-2">PROJECT</div>
            <div>ENVIRONMENT</div>
            <div>MODEL</div>
            <div>REQS</div>
            <div>STATUS</div>
          </div>
          <div className="divide-y divide-[var(--surface-variant)]">
            {filteredProjects.map((p) => (
              <div key={p.id} className="grid grid-cols-6 p-3 items-center hover:bg-[var(--surface-container)] transition-colors">
                <div className="col-span-2 font-semibold" style={{ color: 'var(--on-surface)' }}>{p.name}</div>
                <div className="uppercase text-[11px] text-[var(--outline)]">{p.environment}</div>
                <div>{p.model}</div>
                <div>{p.monthlyReqs}</div>
                <div className="text-emerald-400 font-semibold">{p.statusLabel}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dashed Create Project Placeholder Banner */}
      <div className="border border-dashed border-[var(--surface-variant)] hover:border-[var(--outline)] rounded-xl p-4 flex items-center justify-between bg-[var(--surface-lowest)]/50 hover:bg-[var(--surface-low)] transition-all cursor-pointer group">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[var(--surface-high)] flex items-center justify-center text-[var(--outline)] group-hover:text-[var(--primary-color)] transition-colors">
            <PlusCircle size={18} />
          </div>
          <div>
            <span className="text-xs font-semibold group-hover:text-[var(--primary-color)] transition-colors"
              style={{ color: 'var(--on-surface)' }}>
              Create another isolated project workspace
            </span>
            <p className="text-[11px]" style={{ color: 'var(--outline)' }}>
              Configure dedicated canary routing, API keys, and rate limits.
            </p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="text-xs gap-1 font-medium">
          <span>Get Started</span>
          <ChevronRight size={15} />
        </Button>
      </div>
    </section>
  )
}
