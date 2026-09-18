'use client'

import { MoreVertical, Cpu, Terminal, GitFork, History, Lock } from 'lucide-react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ProjectItem } from '@/app/mock/dashboardMock'

interface ProjectCardProps {
  project: ProjectItem
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="p-5 bg-[var(--surface-low)] border-[var(--surface-variant)] hover:border-[var(--outline)] transition-all flex flex-col justify-between group">
      <CardContent className="p-0">
        {/* Card Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-semibold group-hover:text-[var(--primary-color)] transition-colors"
                style={{ color: 'var(--on-surface)' }}>
                {project.name}
              </span>

              {project.status === 'healthy' && (
                <Badge variant="success" className="px-2 py-0.5 text-[10px] uppercase font-mono font-normal">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1" />
                  {project.statusLabel}
                </Badge>
              )}

              {project.status === 'degraded' && (
                <Badge className="px-2 py-0.5 text-[10px] uppercase font-mono font-normal bg-amber-950/60 text-amber-300 border-amber-800/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-1" />
                  {project.statusLabel}
                </Badge>
              )}

              {project.status === 'staging' && (
                <Badge variant="outline" className="px-2 py-0.5 text-[10px] uppercase font-mono font-normal">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mr-1" />
                  {project.statusLabel}
                </Badge>
              )}
            </div>
            <h3 className="text-xs font-normal" style={{ color: 'var(--on-surface-variant)' }}>
              {project.title}
            </h3>
          </div>

          <Button variant="ghost" size="icon" className="h-7 w-7 text-[var(--outline)] hover:text-[var(--on-surface)]">
            <MoreVertical size={16} />
          </Button>
        </div>

        {/* Badges / Metadata Row */}
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-mono">
          <Badge variant="outline" className="gap-1.5 font-normal py-1">
            <Cpu size={13} className="text-[var(--primary-color)]" />
            <span>{project.model}</span>
          </Badge>

          <Badge variant="outline" className="gap-1.5 font-normal py-1">
            <Terminal size={13} className="text-[var(--outline)]" />
            <span>{project.promptsCount} Prompts</span>
          </Badge>

          {project.canaryType === 'warning' ? (
            <Badge className="gap-1.5 font-normal py-1 bg-[#241c12] border-[#594429] text-amber-300">
              <GitFork size={13} />
              <span>{project.canaryInfo}</span>
            </Badge>
          ) : (
            <Badge variant="outline" className="gap-1.5 font-normal py-1 text-[var(--outline)]">
              <Lock size={13} />
              <span>{project.canaryInfo}</span>
            </Badge>
          )}
        </div>

        {/* Metrics Strip */}
        <div className="mt-5 grid grid-cols-3 gap-2 py-3 px-3.5 bg-[var(--surface-lowest)] rounded-lg border border-[var(--surface-variant)] text-xs">
          <div>
            <div className="text-[10px] font-mono text-[var(--outline)]">MONTHLY REQS</div>
            <div className="font-semibold mt-0.5" style={{ color: 'var(--on-surface)' }}>{project.monthlyReqs}</div>
          </div>
          <div>
            <div className="text-[10px] font-mono text-[var(--outline)]">LATENCY (P95)</div>
            <div className={`font-semibold font-mono mt-0.5 ${
              project.latencyStatus === 'degraded' ? 'text-amber-300' : 'text-[var(--on-surface)]'
            }`}>
              {project.p95Latency}
            </div>
          </div>
          <div>
            <div className="text-[10px] font-mono text-[var(--outline)]">ERROR RATE</div>
            <div className="font-semibold font-mono text-emerald-400 mt-0.5">{project.errorRate}</div>
          </div>
        </div>
      </CardContent>

      {/* Card Footer */}
      <CardFooter className="mt-5 pt-4 p-0 border-t border-[var(--surface-variant)] flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-[var(--outline)] font-mono text-[11px]">
          <History size={13} />
          <span>{project.lastUpdatedAgo} by <span style={{ color: 'var(--on-surface-variant)' }}>{project.lastUpdatedBy}</span></span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="h-7 text-xs font-normal">
            A/B Results
          </Button>
          <Button variant="secondary" size="sm" className="h-7 text-xs">
            Open Registry
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
