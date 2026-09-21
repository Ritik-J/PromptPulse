const baseURL =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:4000";

export interface MetricsPayload {
  invocations: { total: number; previous: number; changePct: number };
  canaries: { active: number; significant: number };
  latency: { p95Ms: number; deltaMs: number };
  spend: { usedUsd: number; budgetUsd: number; pct: number };
}

export interface ProjectPayload {
  id: string;
  name: string;
  title: string;
  environment: string;
  status: string;
  statusLabel: string;
  model: string;
  promptsCount: number;
  canaryInfo: string;
  canaryType: string;
  monthlyReqs: string;
  p95Latency: string;
  latencyStatus: string;
  errorRate: string;
  lastUpdatedAgo: string;
  lastUpdatedBy: string;
}

export interface AuditPayload {
  id: string;
  projectId: string | null;
  projectName: string;
  action: string;
  ref: string;
  target: string;
  author: string | null;
  createdAt: string;
}

async function api<T>(path: string): Promise<T> {
  const res = await fetch(`${baseURL}${path}`, { credentials: "include" });
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }
  const body = (await res.json()) as { success: boolean; data: T; error?: string };
  if (!body.success) {
    throw new Error(body.error ?? "Request failed");
  }
  return body.data;
}

export const dashboardApi = {
  metrics: () => api<MetricsPayload>("/api/v1/dashboard/metrics"),
  projects: () => api<ProjectPayload[]>("/api/v1/projects"),
  auditLogs: (limit = 20) =>
    api<AuditPayload[]>(`/api/v1/audit-logs?limit=${limit}`),
};
