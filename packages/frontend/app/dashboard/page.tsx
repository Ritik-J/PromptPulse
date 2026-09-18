import type { Metadata } from "next";
import {
  DashboardSidebar,
  DashboardHeader,
  WelcomeHeader,
  TelemetryCards,
  ProjectsGrid,
  QuickActionsPanel,
  AuditFeed,
} from "@/app/components/dashboard";

export const metadata: Metadata = {
  title: "Projects Dashboard - PromptPulse",
  description:
    "Manage production prompt versioning, active canary deployments, and global telemetry.",
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex bg-[var(--surface-lowest)] text-[var(--on-surface)] antialiased">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-w-0 pl-64">
        <DashboardHeader />
        <main className="flex-1 px-6 py-6 max-w-7xl w-full mx-auto space-y-6">
          <WelcomeHeader />
          <TelemetryCards />
          <ProjectsGrid />
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-2">
            <QuickActionsPanel />
            <AuditFeed />
          </section>
        </main>

        {/* Canvas Footer Note */}
        <footer className="mt-auto px-6 py-4 border-t border-[var(--surface-variant)] text-xs font-mono text-[var(--outline)] flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span>PromptPulse Gateway v1.4.2-rc</span>
            <span>•</span>
            <span className="text-emerald-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Cluster Latency 14ms (Direct Edge)
            </span>
          </div>
          <div>© 2025 PromptPulse Technologies, Inc.</div>
        </footer>
      </div>
    </div>
  );
}
