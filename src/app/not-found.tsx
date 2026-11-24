import Link from "next/link";
import { Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center space-y-4">
      <Cpu className="h-12 w-12 text-blue-600 mx-auto" />
      <h1 className="text-3xl font-bold text-[#0B1528]">Page Not Found</h1>
      <p className="text-sm text-slate-600">
        The requested ECE subject, resource, or page could not be located.
      </p>
      <div className="flex justify-center gap-3 pt-2">
        <Button variant="primary" asChild>
          <Link href="/curriculum">Browse Curriculum</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/search">Search Subjects</Link>
        </Button>
      </div>
    </div>
  );
}

