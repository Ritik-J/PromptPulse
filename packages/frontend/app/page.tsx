import {
  Navbar,
  HeroSection,
  DemoConsole,
  AuthSection,
  HomeAuthRedirect,
  FeaturesSection,
  MetricsBanner,
  CtaBanner,
  Footer,
} from "@/app/components/home";

export default function HomePage() {
  return (
    <>
      <HomeAuthRedirect />
      <div
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        style={{ opacity: 0.4 }}
      >
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[780px] h-[360px] rounded-full"
          style={{
            background: "rgba(200,189,178,0.08)",
            filter: "blur(130px)",
          }}
        />
        <div
          className="absolute top-[45rem] -right-32 w-[500px] h-[350px] rounded-full"
          style={{ background: "rgba(72,69,80,0.18)", filter: "blur(140px)" }}
        />
      </div>
      <Navbar />
      <main className="relative z-10 flex-1 flex flex-col items-center">
        <HeroSection />
        <DemoConsole />
        <AuthSection />
        <FeaturesSection />
        <MetricsBanner />
        <CtaBanner />
      </main>

      <Footer />
    </>
  );
}
