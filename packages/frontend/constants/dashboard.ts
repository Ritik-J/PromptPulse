export const TELEMETRY_HINTS: Record<string, string> = {
  "global-invocations":
    "Total prompt executions across all projects in the last 30 days. The % shows change vs the previous 30 days.",
  "active-canaries":
    "Live A/B splits and canary rollouts sending a fraction of production traffic to experimental prompt versions.",
  "avg-latency":
    "95% of requests finish within this time. P95 exposes tail-latency spikes that averages hide.",
  "token-spend":
    "LLM cost used this billing cycle vs your budget. Watch for bloat from oversized context windows.",
};

// Backend audit `action` → feed display text.
export const AUDIT_ACTION_LABELS: Record<string, string> = {
  rolled_out: "rolled out",
  started_split: "started A/B split",
  adjusted_model: "adjusted fallback model to",
  snapshot_created: "created staging snapshot",
  project_created: "created project",
};

// Backend audit `action` → feed dot color.
export const AUDIT_STATUS_COLORS: Record<string, string> = {
  rolled_out: "#34d399",
  started_split: "var(--primary-container)",
  adjusted_model: "#fbbf24",
  snapshot_created: "#988f87",
  project_created: "#34d399",
};

export const AUDIT_FALLBACK_COLOR = "#988f87";
