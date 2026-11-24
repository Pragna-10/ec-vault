export const metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8 space-y-6">
      <h1 className="text-3xl font-bold text-[#0B1528]">Privacy Policy</h1>
      <p className="text-sm text-slate-600 leading-relaxed">
        EC Vault collects only the information necessary to provide your
        student account, process verified payments via Razorpay, and deliver
        protected access to purchased study materials.
      </p>
      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-[#0B1528]">
          1. Information We Collect
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Account email, name, optional university/semester preferences, order
          records, and reading bookmarks/progress stored securely in Supabase
          PostgreSQL with Row Level Security.
        </p>
      </section>
      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-[#0B1528]">
          2. Payment Security
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Card and UPI credentials are processed directly by Razorpay and are
          never stored on EC Vault servers. We store only order IDs, payment
          references, and verification status.
        </p>
      </section>
    </div>
  );
}

