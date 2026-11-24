export const metadata = {
  title: "Terms & Conditions",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8 space-y-6">
      <h1 className="text-3xl font-bold text-[#0B1528]">
        Terms &amp; Conditions
      </h1>
      <p className="text-sm text-slate-600 leading-relaxed">
        By accessing EC Vault, you agree to use purchased and free study
        materials strictly for personal, non-commercial academic preparation.
      </p>
      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-[#0B1528]">
          1. License &amp; Redistribution
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Purchased bundles grant a single-student personal license. Bulk
          redistribution, public re-uploading, or commercial resale of EC Vault
          PDFs is prohibited.
        </p>
      </section>
      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-[#0B1528]">
          2. Curriculum Disclaimer
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          EC Vault provides a consolidated IIT-level master curriculum reference
          and is not officially affiliated with any IIT, NIT, or university.
        </p>
      </section>
    </div>
  );
}

