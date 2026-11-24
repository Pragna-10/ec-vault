import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "EC Vault — Four Years of ECE. One Place.",
    template: "%s | EC Vault",
  },
  description:
    "Affordable B.Tech Electronics & Communication Engineering (ECE) study material marketplace: formula cheat sheets, concise notes, solved numericals, and exam revision packs.",
  keywords: [
    "B.Tech ECE notes",
    "ECE formula cheat sheet",
    "Electronics and Communication Engineering",
    "IIT level ECE curriculum",
    "Signals and Systems notes",
    "VLSI notes",
    "EC Vault",
  ],
  openGraph: {
    title: "EC Vault — Four Years of ECE. One Place.",
    description:
      "Understand concepts. Master formulas. Prepare smarter. Complete 4-year B.Tech ECE academic resource marketplace.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#0B1528]">
        <Suspense fallback={<div className="h-16 border-b border-slate-200 bg-white" />}>
          <Navbar />
        </Suspense>
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
