import { Terminal } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

const FOOTER_LINKS = {
  Product: ['Prompt Registry', 'A/B Testing Engine', 'Canary Deployments', 'Evaluation Suite', 'Enterprise Gateway'],
  Resources: ['Documentation', 'API Reference', 'Vercel AI SDK Guide', 'LangChain Connector', 'GitHub Repository'],
  Company: ['About Us', 'Security & SOC2', 'Privacy Policy', 'Terms of Service', 'Contact Engineering'],
}

const SOCIAL_LINKS = ['status', 'github', 'discord', 'twitter / x']

export default function Footer() {
  return (
    <footer className="w-full border-t" style={{ borderColor: 'rgba(76,70,63,0.3)', background: 'var(--surface-lowest)', color: 'var(--on-surface-variant)' }}>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">

          {/* Brand col */}
          <div className="col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: 'var(--surface-high)', border: '1px solid rgba(152,143,135,0.3)', color: 'var(--primary-color)' }}>
                <Terminal size={14} />
              </div>
              <span className="font-bold text-sm"
                style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--primary-color)' }}>
                PromptPulse
              </span>
            </div>
            <p className="mt-3 text-xs leading-relaxed max-w-xs"
              style={{ color: 'var(--outline)', lineHeight: '18px' }}>
              The standard prompt version control, canary rollout, and A/B statistical evaluation suite
              for LLM production applications.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <Badge variant="success" className="font-mono text-[10px] py-0">All systems operational</Badge>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-xs font-semibold mb-3"
                style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--primary-color)' }}>
                {heading}
              </h4>
              <ul className="space-y-2">
                {links.map(link => (
                  <li key={link}>
                    <a href="#"
                      className="text-xs transition-colors hover:text-[color:var(--primary-color)]"
                      style={{ color: 'var(--outline)' }}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator />

        {/* Sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"
          style={{ color: 'var(--outline)' }}>
          <div>© 2025 PromptPulse Technologies, Inc. Built for AI engineers.</div>
          <div className="flex items-center gap-6 font-mono">
            {SOCIAL_LINKS.map(link => (
              <a key={link} href="#"
                className="transition-colors hover:text-[color:var(--primary-color)]">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
