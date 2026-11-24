import Link from "next/link";
import { Cpu } from "lucide-react";

export function BrandLogo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5 group">
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-xl transition-transform group-hover:scale-105 ${
          dark
            ? "bg-blue-600 text-white"
            : "bg-[#0B1528] text-white shadow-sm"
        }`}
      >
        <Cpu className="h-5 w-5" />
      </span>
      <div className="flex flex-col">
        <span
          className={`text-base font-bold tracking-tight leading-none ${
            dark ? "text-white" : "text-[#0B1528]"
          }`}
        >
          EC Vault
        </span>
        <span
          className={`text-[10px] font-medium tracking-wider uppercase mt-0.5 ${
            dark ? "text-slate-400" : "text-slate-500"
          }`}
        >
          B.Tech ECE
        </span>
      </div>
    </Link>
  );
}

