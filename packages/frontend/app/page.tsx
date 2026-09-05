import {
  Navbar,
  HeroSection,
  DemoConsole,
  AuthSection,
  FeaturesSection,
  MetricsBanner,
  CtaBanner,
  Footer,
} from '@/app/components/home'

/**
 * Home page — PromptPulse landing page
 *
 * Section order:
 *  1. Navbar           — sticky navigation header
 *  2. HeroSection      — headline, CTAs, social proof
 *  3. DemoConsole      — live interactive split-pane diff
 *  4. AuthSection      — OAuth + email/password onboarding
 *  5. FeaturesSection  — bento feature grid
 *  6. MetricsBanner    — impact metrics strip
 *  7. CtaBanner        — final call-to-action + install snippet
 *  8. Footer           — links, brand, social
 */
export default function HomePage() {
  return (
    <>
      {/* Atmospheric background glows */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" style={{ opacity: 0.4 }}>
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[780px] h-[360px] rounded-full"
          style={{ background: 'rgba(200,189,178,0.08)', filter: 'blur(130px)' }} />
        <div className="absolute top-[45rem] -right-32 w-[500px] h-[350px] rounded-full"
          style={{ background: 'rgba(72,69,80,0.18)', filter: 'blur(140px)' }} />
      </div>

      {/* 1. Navigation */}
      <Navbar />

      {/* Page content */}
      <main className="relative z-10 flex-1 flex flex-col items-center">
        {/* 2. Hero */}
        <HeroSection />

        {/* 3. Live Console Demo */}
        <DemoConsole />

        {/* 4. Auth / Onboarding */}
        <AuthSection />

        {/* 5. Feature Bento Grid */}
        <FeaturesSection />

        {/* 6. Impact Metrics */}
        <MetricsBanner />

        {/* 7. Final CTA */}
        <CtaBanner />
      </main>

      {/* 8. Footer */}
      <Footer />
    </>
  )
}
