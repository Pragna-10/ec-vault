import Link from "next/link";
import { BrandLogo } from "@/components/brand/logo";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-[#0B1528] text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="space-y-4">
            <BrandLogo dark />
            <p className="text-sm text-slate-400 leading-relaxed">
              Four years of ECE. One place. Understand concepts. Master formulas.
              Prepare smarter.
            </p>
            <p className="text-xs text-slate-500">
              Consolidated IIT-level master curriculum reference for B.Tech ECE
              students across India.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Curriculum
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/iit-mapping" className="hover:text-white transition-colors">
                  8-IIT Curriculum Mapping
                </Link>
              </li>
              <li>
                <Link href="/curriculum?year=1" className="hover:text-white transition-colors">
                  Year 1 · Foundations
                </Link>
              </li>
              <li>
                <Link href="/curriculum?year=2" className="hover:text-white transition-colors">
                  Year 2 · Core Circuits &amp; Signals
                </Link>
              </li>
              <li>
                <Link href="/curriculum?year=3" className="hover:text-white transition-colors">
                  Year 3 · Comm, DSP &amp; VLSI
                </Link>
              </li>
              <li>
                <Link href="/curriculum?year=4" className="hover:text-white transition-colors">
                  Year 4 · IC Design, 5G &amp; Edge AI
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/pricing" className="hover:text-white transition-colors">
                  Pricing &amp; Bundles
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-white transition-colors">
                  Subject Search
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  Student Dashboard
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us &amp; Academic Standards
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact &amp; Request a Subject
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Policies &amp; Support
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/policies/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/policies/terms" className="hover:text-white transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/policies/refund" className="hover:text-white transition-colors">
                  Refund &amp; Cancellation Policy
                </Link>
              </li>
              <li className="pt-2 text-xs text-slate-400">
                Support: support@ecvault.in
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 EC Vault. All rights reserved.</p>
          <p>
            Original academic study materials. Not affiliated with any IIT, NIT,
            or university; curriculum mappings marked pending verification.
          </p>
        </div>
      </div>
    </footer>
  );
}

