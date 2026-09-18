'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Terminal,
  Plus,
  FolderOpen,
  SlidersHorizontal,
  BarChart2,
  Bot,
  BookOpen,
  Key,
  LogOut,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MOCK_USER } from '@/app/mock/dashboardMock'
import { signOut, useSession } from '@/lib/auth-client'
import { resolveDisplayUser } from '@/lib/auth-user'

const NAV_ITEMS = [
  { label: 'Projects',        href: '/dashboard',           icon: FolderOpen, active: true },
  { label: 'Prompt Registry', href: '/dashboard/registry',   icon: Terminal },
  { label: 'A/B Analytics',   href: '/dashboard/analytics',  icon: BarChart2 },
  { label: 'Playground',      href: '/dashboard/playground', icon: Bot },
  { label: 'Settings',        href: '/dashboard/settings',   icon: SlidersHorizontal },
]

export default function DashboardSidebar() {
  const { data: session } = useSession()
  const router = useRouter()
  const user = resolveDisplayUser(session?.user)

  async function handleSignOut() {
    await signOut()
    router.push("/")
  }

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 border-r flex flex-col justify-between p-4 z-40"
      style={{
        background: 'var(--surface-lowest)',
        borderColor: 'var(--surface-variant)',
      }}>
      
      {/* Top Brand & Header */}
      <div className="flex flex-col gap-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 px-2 py-1 group">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
            style={{ background: 'var(--surface-high)', border: '1px solid rgba(152,143,135,0.3)' }}>
            <Terminal size={18} style={{ color: 'var(--primary-color)' }} />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold tracking-tight text-sm"
              style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--primary-color)' }}>
              PromptPulse
            </span>
            <span className="text-[10px] font-mono flex items-center gap-1.5" style={{ color: 'var(--outline)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              {MOCK_USER.cluster}
            </span>
          </div>
        </Link>

        {/* Main CTA */}
        <Button variant="brand" className="w-full flex items-center justify-center gap-2">
          <Plus size={16} />
          <span>Create Prompt</span>
        </Button>

        {/* Navigation items */}
        <nav className="flex flex-col gap-1 mt-2">
          {NAV_ITEMS.map(({ label, href, icon: Icon, active }) => (
            <Link
              key={label}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-lg transition-all ${
                active
                  ? 'bg-[var(--surface-container)] text-[var(--primary-color)] border-l-2 border-[var(--primary-container)] font-semibold'
                  : 'text-[var(--on-surface-variant)] hover:text-[var(--on-surface)] hover:bg-[var(--surface-high)]'
              }`}>
              <Icon size={16} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Footer Links & User Identity */}
      <div className="flex flex-col gap-1 pt-4 border-t" style={{ borderColor: 'var(--surface-variant)' }}>
        <a href="#docs" className="flex items-center gap-3 px-3 py-2 text-xs text-[var(--outline)] hover:text-[var(--on-surface)] hover:bg-[var(--surface-high)] rounded-lg transition-colors">
          <BookOpen size={16} />
          <span>Documentation</span>
        </a>
        <a href="#api-keys" className="flex items-center gap-3 px-3 py-2 text-xs text-[var(--outline)] hover:text-[var(--on-surface)] hover:bg-[var(--surface-high)] rounded-lg transition-colors">
          <Key size={16} />
          <span>API Keys</span>
        </a>

        {/* Account Badge */}
        <div className="mt-2 pt-3 flex items-center justify-between px-2 border-t" style={{ borderColor: 'var(--surface-variant)' }}>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[var(--surface-bright)] border border-[var(--outline-variant)] flex items-center justify-center text-[10px] font-mono font-bold" style={{ color: 'var(--primary-color)' }}>
              {user.initials}
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium" style={{ color: 'var(--on-surface)' }}>{user.name}</span>
              <span className="text-[10px] font-mono" style={{ color: 'var(--outline)' }}>{user.email}</span>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            title="Sign out"
            className="text-[var(--outline)] hover:text-[var(--on-surface)]"
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </aside>
  )
}
