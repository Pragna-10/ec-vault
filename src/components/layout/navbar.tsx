"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Search, ShieldCheck, User, ChevronRight } from "lucide-react";
import { BrandLogo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/curriculum", label: "Curriculum" },
  { href: "/iit-mapping", label: "IIT Mapping" },
  { href: "/search", label: "Search" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <BrandLogo />
          <nav
            className="hidden lg:flex items-center gap-1"
            aria-label="Primary navigation"
          >
            {NAV_LINKS.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-100/80 hover:text-[#0B1528]"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="hidden lg:flex items-center gap-2.5">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/search">
              <Search className="h-4 w-4" />
              <span>Find Subject</span>
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin">
              <ShieldCheck className="h-4 w-4 text-blue-600" />
              <span>Admin</span>
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard">
              <User className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </Button>
          <Button variant="primary" size="sm" asChild>
            <Link href="/auth/login">Sign In</Link>
          </Button>
        </div>

        <div className="flex lg:hidden items-center gap-2">
          <Button variant="ghost" size="icon" asChild aria-label="Search subjects">
            <Link href="/search">
              <Search className="h-4 w-4 text-slate-700" />
            </Link>
          </Button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg border border-slate-200 p-2 text-slate-700 hover:bg-slate-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-5 shadow-lg animate-fade-in-up">
          <nav className="flex flex-col space-y-1.5">
            {NAV_LINKS.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-700 hover:bg-slate-50"
                  )}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="h-4 w-4 opacity-40" />
                </Link>
              );
            })}
          </nav>
          <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2.5">
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
                Dashboard
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin" onClick={() => setMobileOpen(false)}>
                Admin Panel
              </Link>
            </Button>
            <Button variant="primary" size="sm" className="col-span-2" asChild>
              <Link href="/auth/login" onClick={() => setMobileOpen(false)}>
                Sign In / Create Account
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
