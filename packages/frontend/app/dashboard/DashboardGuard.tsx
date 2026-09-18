"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

// Fail-closed route guard: unauthenticated visitors are sent home.
// While the session resolves, a neutral loading state avoids content flash.
export default function DashboardGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.replace("/");
    }
  }, [isPending, session, router]);

  if (isPending || !session?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--surface-lowest)]">
        <p
          className="text-sm font-mono"
          style={{ color: "var(--outline)" }}
        >
          Verifying session…
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
