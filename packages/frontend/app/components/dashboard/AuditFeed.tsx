"use client";

import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MOCK_AUDIT_LOGS, AuditLogItem } from "@/app/mock/dashboardMock";

export default function AuditFeed() {
  return (
    <Card className="lg:col-span-2 p-4 bg-[var(--surface-low)] border-[var(--surface-variant)] space-y-4">
      <CardHeader className="p-0 flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <CardTitle className="text-sm font-bold tracking-tight">
            Recent Deployments &amp; Audits
          </CardTitle>
          <Badge variant="outline" className="text-[10px] font-mono px-2 py-0">
            live feed
          </Badge>
        </div>
        <a
          href="#audit-log"
          className="text-xs text-[var(--outline)] hover:text-[var(--on-surface)] transition-colors flex items-center gap-1 font-mono"
        >
          View Audit Log <ArrowRight size={13} />
        </a>
      </CardHeader>

      <CardContent className="p-0">
        <div className="divide-y divide-[var(--surface-variant)] font-mono text-xs">
          {MOCK_AUDIT_LOGS.map((item: AuditLogItem) => (
            <div
              key={item.id}
              className="py-2.5 flex flex-wrap items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: item.statusColor }}
                />
                <span
                  className="font-semibold"
                  style={{ color: "var(--on-surface)" }}
                >
                  {item.projectName}
                </span>
                <span className="text-[var(--outline)]">{item.action}</span>
                <span className="px-1.5 py-0.5 rounded bg-[var(--surface-high)] text-[var(--on-surface-variant)] border border-[var(--surface-variant)] text-[10px]">
                  {item.commitOrTag}
                </span>
                {item.target && (
                  <span className="text-[var(--outline)]">{item.target}</span>
                )}
              </div>

              <div className="text-[11px] text-[var(--outline)] shrink-0">
                {item.timeAgo} •{" "}
                <span style={{ color: "var(--on-surface-variant)" }}>
                  {item.author}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
