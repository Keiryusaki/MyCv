"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/cv/summary");
  }, [router]);

  return (
    <main className="grid min-h-screen place-items-center bg-app px-6 text-center text-ink">
      <div className="space-y-3">
        <p className="text-sm text-ink-muted">Redirecting to the CV preview...</p>
        <Link href="/cv/summary" className="text-sm font-semibold text-primary">
          Open summary
        </Link>
      </div>
    </main>
  );
}
