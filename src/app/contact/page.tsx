"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Mail, Send } from "lucide-react";
import { z } from "zod";
import { feedbackSchema } from "@/lib/validation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type FeedbackFormValues = z.infer<typeof feedbackSchema>;

function ContactFormContent() {
  const searchParams = useSearchParams();
  const initialKind = (searchParams.get("kind") ?? "contact") as FeedbackFormValues["kind"];
  const initialSubject = searchParams.get("subject") ?? "";

  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      kind: ["contact", "feedback", "error_report", "subject_request"].includes(initialKind)
        ? initialKind
        : "contact",
      subjectSlug: initialSubject,
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (values: FeedbackFormValues) => {
    setServerError(null);
    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const json = await res.json();
    if (!res.ok) {
      setServerError(json.error ?? "Submission failed");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Badge variant="blue" className="mb-2">
          Support, Feedback &amp; Subject Requests
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-[#0B1528]">
          Contact EC Vault
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Report a formula error, request a new ECE subject or university
          mapping, or send general feedback.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Mail className="h-5 w-5 text-blue-600" />
            Send a Message
          </CardTitle>
        </CardHeader>
        <CardContent>
          {submitted ? (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center space-y-2">
              <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto" />
              <div className="font-semibold text-[#0B1528]">
                Submission Received
              </div>
              <p className="text-sm text-slate-600">
                Thank you! Our academic &amp; engineering team will review your
                message shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">
                    Inquiry Type
                  </label>
                  <select
                    {...register("kind")}
                    className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm"
                  >
                    <option value="contact">General Contact</option>
                    <option value="feedback">Platform Feedback</option>
                    <option value="error_report">Report an Error</option>
                    <option value="subject_request">Request a Subject</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">
                    Related Subject (Optional)
                  </label>
                  <Input
                    {...register("subjectSlug")}
                    placeholder="e.g., signals-and-systems"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">
                    Your Name
                  </label>
                  <Input {...register("name")} placeholder="Full name" />
                  {errors.name && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    {...register("email")}
                    placeholder="you@college.ac.in"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Message / Details
                </label>
                <textarea
                  rows={5}
                  {...register("message")}
                  placeholder="Describe your question, error details, or requested ECE subject..."
                  className="w-full rounded-lg border border-slate-200 p-3 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                />
                {errors.message && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {serverError && (
                <p className="text-xs text-red-600">{serverError}</p>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting}
              >
                <Send className="h-4 w-4" />
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-3xl px-4 py-12 text-sm text-slate-500">
          Loading contact form...
        </div>
      }
    >
      <ContactFormContent />
    </Suspense>
  );
}

