"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("EC Vault error boundary:", error);
  }, [error]);

  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center space-y-4">
      <AlertTriangle className="h-12 w-12 text-amber-600 mx-auto" />
      <h1 className="text-2xl font-bold text-[#0B1528]">
        Something went wrong
      </h1>
      <p className="text-sm text-slate-600">
        An unexpected error occurred while rendering this page. You can retry
        or return to the curriculum library.
      </p>
      <div className="flex justify-center gap-3 pt-2">
        <Button variant="primary" onClick={reset}>
          Try Again
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
}

