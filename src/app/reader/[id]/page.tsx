"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Bookmark,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Download,
  Lock,
  Shield,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ReaderAccessPayload {
  resourceId: string;
  title: string;
  subjectTitle: string;
  isFree: boolean;
  isSampleDemo: boolean;
  allowDownload: boolean;
  hasFullAccess: boolean;
  signedUrl: string | null;
  expiresInSeconds: number | null;
  previewPages: {
    pageNumber: number;
    title: string;
    excerpt: string;
    highlights: string[];
  }[];
  chapters: {
    id: string;
    chapterNumber: number;
    title: string;
    summary: string;
  }[];
  originalFormulaSheet?: {
    name: string;
    equation: string;
    unitsAndNotes: string;
  }[] | null;
  notice?: string;
}

function ProtectedPdfReaderContent() {
  const params = useParams<{ id: string }>();
  const resourceId = params.id;
  const [data, setData] = useState<ReaderAccessPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState<number>(100);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const res = await fetch(`/api/resources/${resourceId}/access`);
        const json = await res.json();
        if (!res.ok) throw new Error(json.error ?? "Unable to load resource");
        if (active) setData(json);
      } catch (err: unknown) {
        if (active)
          setError(err instanceof Error ? err.message : "Reader load error");
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [resourceId]);

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-16 text-sm text-slate-500">
        Verifying access permissions &amp; loading protected reader...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center space-y-4">
        <p className="text-base font-semibold text-red-600">
          {error ?? "Resource not found"}
        </p>
        <Button variant="outline" asChild>
          <Link href="/curriculum">Back to Curriculum</Link>
        </Button>
      </div>
    );
  }

  const totalPages = Math.max(data.previewPages.length, data.chapters.length, 1);
  const progressPercent = Math.round((currentPage / totalPages) * 100);
  const activeChapter = data.chapters[currentPage - 1] ?? data.chapters[0];
  const activePreview = data.previewPages[0];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Top Toolbar */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/curriculum">
              <ArrowLeft className="h-4 w-4" />
              Library
            </Link>
          </Button>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-base font-bold text-[#0B1528]">
                {data.title}
              </h1>
              {data.isSampleDemo && <Badge variant="amber">Sample/Demo</Badge>}
              {data.isFree ? (
                <Badge variant="emerald">Free Access</Badge>
              ) : data.hasFullAccess ? (
                <Badge variant="blue">Unlocked</Badge>
              ) : (
                <Badge variant="slate">Preview Mode</Badge>
              )}
            </div>
            <p className="text-xs text-slate-500">{data.subjectTitle}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="hidden sm:flex items-center rounded-lg border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-xs">
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(85, z - 15))}
              className="p-1 text-slate-600 hover:text-slate-900 cursor-pointer"
              aria-label="Zoom out"
            >
              <ZoomOut className="h-3.5 w-3.5" />
            </button>
            <span className="px-2 font-mono text-[11px] text-slate-700">
              {zoom}%
            </span>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(115, z + 15))}
              className="p-1 text-slate-600 hover:text-slate-900 cursor-pointer"
              aria-label="Zoom in"
            >
              <ZoomIn className="h-3.5 w-3.5" />
            </button>
          </div>

          <Button
            variant={bookmarked ? "primary" : "outline"}
            size="sm"
            onClick={() => setBookmarked(!bookmarked)}
          >
            <Bookmark className="h-3.5 w-3.5" />
            {bookmarked ? "Bookmarked" : "Bookmark"}
          </Button>

          {data.allowDownload && data.signedUrl ? (
            <Button variant="default" size="sm" asChild>
              <a href={data.signedUrl} target="_blank" rel="noopener noreferrer">
                <Download className="h-3.5 w-3.5" />
                Signed PDF (120s)
              </a>
            </Button>
          ) : (
            <Badge variant="outline" className="text-[11px]">
              <Shield className="h-3 w-3 mr-1 text-blue-600" />
              Protected Viewer
            </Badge>
          )}
        </div>
      </div>

      {data.notice && (
        <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50/70 p-3.5 text-xs text-blue-900">
          {data.notice}
        </div>
      )}

      {/* Main Reader Area */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Chapter & Progress Sidebar */}
        <Card className="lg:col-span-1 h-fit">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Chapters &amp; Progress</CardTitle>
              <span className="font-mono text-xs text-blue-600 font-semibold">
                {progressPercent}%
              </span>
            </div>
            <div className="mt-2 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {data.chapters.map((ch, idx) => (
              <button
                key={ch.id}
                type="button"
                onClick={() => setCurrentPage(idx + 1)}
                className={`w-full text-left rounded-xl px-3 py-2 text-xs transition-colors cursor-pointer ${
                  currentPage === idx + 1
                    ? "bg-[#0B1528] text-white font-semibold shadow-xs"
                    : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                }`}
              >
                Ch {ch.chapterNumber}: {ch.title}
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Document Viewport */}
        <Card className="lg:col-span-3 bg-slate-100/70 border-slate-200">
          <CardContent className="p-4 sm:p-8 space-y-6 select-none">
            <div className="flex items-center justify-between rounded-xl bg-white border border-slate-200 px-4 py-2.5 text-xs text-slate-500">
              <span>
                Page <strong>{currentPage}</strong> of {totalPages}
              </span>
              <span className="font-mono text-[11px]">
                EC Vault Protected Session · Watermarked
              </span>
            </div>

            {data.signedUrl ? (
              <div className="aspect-[3/4] w-full rounded-xl border border-slate-200 bg-white shadow-md overflow-hidden">
                <iframe
                  src={`${data.signedUrl}#toolbar=0`}
                  title={data.title}
                  className="h-full w-full"
                />
              </div>
            ) : (
              <div
                className="relative mx-auto rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-lg transition-transform origin-top"
                style={{
                  transform: `scale(${zoom / 100})`,
                }}
              >
                {/* Subtle Watermark */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.04] select-none overflow-hidden">
                  <span className="rotate-[-24deg] text-4xl sm:text-5xl font-black tracking-widest text-[#0B1528]">
                    EC VAULT PREVIEW
                  </span>
                </div>

                {activePreview && currentPage === 1 && (
                  <div className="relative space-y-3 mb-6">
                    <Badge variant="blue">Free Preview · Page 1</Badge>
                    <h2 className="text-xl font-bold text-[#0B1528]">
                      {activePreview.title}
                    </h2>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {activePreview.excerpt}
                    </p>
                    <ul className="space-y-1.5 pt-2">
                      {activePreview.highlights.map((h) => (
                        <li
                          key={h}
                          className="flex items-center gap-2 text-xs text-slate-700"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5 text-blue-600" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeChapter && (
                  <div className="relative border-t border-slate-100 pt-5 space-y-2">
                    <div className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                      Chapter {activeChapter.chapterNumber} Outline
                    </div>
                    <h3 className="text-lg font-bold text-[#0B1528]">
                      {activeChapter.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {activeChapter.summary}
                    </p>
                  </div>
                )}

                {data.originalFormulaSheet && data.originalFormulaSheet.length > 0 && (
                  <div className="relative mt-6 border-t border-slate-100 pt-5 space-y-3">
                    <div className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                      Original Formula Reference (SI Units)
                    </div>
                    <div className="grid grid-cols-1 gap-2.5">
                      {data.originalFormulaSheet.map((f) => (
                        <div
                          key={f.name}
                          className="rounded-xl border border-slate-200 bg-slate-50 p-3"
                        >
                          <div className="text-xs font-semibold text-[#0B1528]">
                            {f.name}
                          </div>
                          <pre className="mt-1 whitespace-pre-wrap font-mono text-xs text-blue-800">
                            {f.equation}
                          </pre>
                          <div className="mt-1 text-[11px] text-slate-500">
                            {f.unitsAndNotes}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {!data.hasFullAccess && (
                  <div className="relative mt-8 rounded-xl border border-slate-200 bg-slate-50 p-6 text-center space-y-3">
                    <Lock className="h-6 w-6 text-blue-600 mx-auto" />
                    <div className="text-sm font-semibold text-[#0B1528]">
                      Full PDF Locked — Preview Page Only
                    </div>
                    <p className="text-xs text-slate-600 max-w-md mx-auto">
                      Unlock this subject or grab a ₹99 Semester Bundle for
                      authenticated access via short-lived signed URLs.
                    </p>
                    <Button variant="primary" size="sm" asChild>
                      <Link href="/pricing">Unlock Full Access</Link>
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Page Controls */}
            <div className="flex items-center justify-between pt-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <span className="text-xs font-mono text-slate-600">
                {currentPage} / {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage >= totalPages}
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function ProtectedPdfReaderPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-5xl px-4 py-16 text-sm text-slate-500">
          Loading protected PDF reader...
        </div>
      }
    >
      <ProtectedPdfReaderContent />
    </Suspense>
  );
}
