export function formatCompact(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return `${Math.round(n)}`;
}

export function formatUsd(n: number): string {
  return `$${n.toFixed(2)}`;
}

export function formatSigned(n: number, digits = 1, suffix = "%"): string {
  const sign = n >= 0 ? "+" : "−";
  return `${sign}${Math.abs(n).toFixed(digits)}${suffix}`;
}

export function timeAgo(iso: string): string {
  const mins = Math.max(
    1,
    Math.round((Date.now() - Date.parse(iso)) / 60000),
  );
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}
