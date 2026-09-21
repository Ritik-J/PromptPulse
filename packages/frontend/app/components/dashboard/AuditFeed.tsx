"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AuditLogItem } from "@/app/mock/dashboardMock";
import {
  AUDIT_ACTION_LABELS,
  AUDIT_FALLBACK_COLOR,
  AUDIT_STATUS_COLORS,
} from "@/constants/dashboard";
import { dashboardApi, type AuditPayload } from "@/lib/dashboard-api";
import { timeAgo } from "@/lib/dashboard-format";

function toItem(row: AuditPayload): AuditLogItem {
  return {
    id: row.id,
    projectId: row.projectId ?? "",
    projectName: row.projectName || "workspace",
    action: AUDIT_ACTION_LABELS[row.action] ?? row.action,
    commitOrTag: row.ref,
    target: row.target,
    timeAgo: timeAgo(row.createdAt),
    author: row.author ?? "@you",
    statusColor: AUDIT_STATUS_COLORS[row.action] ?? AUDIT_FALLBACK_COLOR,
  };
}

export default function AuditFeed() {
  const [items, setItems] = useState<AuditLogItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    dashboardApi
      .auditLogs(10)
      .then((rows) => setItems(rows.map(toItem)))
      .catch(() => {
        setError("Could not load the audit feed.");
      });
  }, []);

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
        {error ? (
          <p className="font-mono text-xs text-red-400">{error}</p>
        ) : !items ? (
          <div className="space-y-2.5 animate-pulse">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-4 w-3/4 rounded bg-[var(--surface-high)]"
              />
            ))}
          </div>
        ) : items.length === 0 ? (
          <p className="font-mono text-xs text-[var(--outline)]">
            No activity yet. Deployments and rollouts will appear here.
          </p>
        ) : (
          <div className="divide-y divide-[var(--surface-variant)] font-mono text-xs">
            {items.map((item: AuditLogItem) => (
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
        )}
      </CardContent>
    </Card>
  );
}
