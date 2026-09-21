import type { NextConfig } from "next";

// Deliberately no full Content-Security-Policy here: Next.js relies on
// inline scripts/hydration payloads that a hand-rolled CSP breaks without
// nonce plumbing. These headers are the safe subset — they blunt clickjacking,
// MIME-sniffing, and referrer leakage (the realistic exfiltration helpers
// alongside any token visible in same-origin API responses).
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
