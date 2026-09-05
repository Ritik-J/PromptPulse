'use client'

import { useState } from 'react'
import { KeyRound } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

type AuthMode = 'signup' | 'signin'

function GithubIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 
           0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466
           -.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832
           .092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688
           -.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844
           c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027
           .546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 
           0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 
           0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

function GoogleIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24">
      <path d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z" fill="#EA4335" />
      <path d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" fill="#4285F4" />
      <path d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12 0 12s.7 2.3 1.9 4.7l3.7-2.9z" fill="#FBBC05" />
      <path d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z" fill="#34A853" />
    </svg>
  )
}

export default function AuthSection() {
  const [mode, setMode] = useState<AuthMode>('signup')

  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault()
    alert('Auth placeholder — connect your backend!')
  }

  return (
    <section className="w-full max-w-4xl mx-auto px-6 py-16" id="auth-section">
      <Card className="relative p-8 md:p-12 overflow-hidden grid-subtle">

        {/* Ambient glow */}
        <div className="absolute -top-24 -left-24 w-60 h-60 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'rgba(200,189,178,0.07)' }} />

        <CardContent className="relative max-w-md mx-auto text-center p-0">
          {/* Icon */}
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
            style={{ background: 'var(--surface-high)', border: '1px solid rgba(152,143,135,0.3)', color: 'var(--primary-color)' }}>
            <KeyRound size={22} />
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-bold tracking-tight"
            style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--primary-color)' }}>
            Join top LLM engineering teams
          </h2>
          <p className="mt-2 text-xs" style={{ color: 'var(--on-surface-variant)' }}>
            Deploy production-ready prompt version control in under 3 minutes.
          </p>

          {/* OAuth Buttons */}
          <div className="mt-6 flex flex-col gap-2.5">
            {[
              { icon: <GithubIcon />, label: 'Continue with GitHub' },
              { icon: <GoogleIcon />, label: 'Continue with Google' },
            ].map(({ icon, label }) => (
              <Button
                key={label}
                variant="outline"
                className="w-full py-2.5 flex items-center justify-center gap-3 text-sm font-normal">
                {icon}
                {label}
              </Button>
            ))}
          </div>

          {/* Divider */}
          <div className="relative my-5 flex items-center justify-center">
            <Separator className="absolute" />
            <span className="relative z-10 px-2 font-mono text-[11px] uppercase"
              style={{ background: 'var(--surface-container)', color: 'var(--outline)' }}>
              or with work email
            </span>
          </div>

          {/* Email / Password */}
          <form onSubmit={handleSubmit} className="space-y-3 text-left">
            <div>
              <Label className="block mb-1">Work Email</Label>
              <Input
                type="email"
                required
                placeholder="alex@engineering.ai"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <Label>Password</Label>
                <a href="#" className="text-[11px] transition-colors hover:text-[color:var(--primary-color)]"
                  style={{ color: 'var(--outline)' }}>Forgot?</a>
              </div>
              <Input
                type="password"
                required
                placeholder="••••••••••••"
              />
            </div>
            <Button
              type="submit"
              variant="brand"
              size="lg"
              className="w-full mt-2">
              {mode === 'signup' ? 'Create PromptPulse Account' : 'Sign In'}
            </Button>
          </form>

          <p className="mt-4 text-xs" style={{ color: 'var(--outline)' }}>
            {mode === 'signup' ? 'Already have an account? ' : "Don't have an account? "}
            <Button
              variant="link"
              onClick={() => setMode(m => m === 'signup' ? 'signin' : 'signup')}
              className="font-medium">
              {mode === 'signup' ? 'Sign in' : 'Sign up'}
            </Button>
          </p>
        </CardContent>
      </Card>
    </section>
  )
}
