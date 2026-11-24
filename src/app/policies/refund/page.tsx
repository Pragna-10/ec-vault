export const metadata = {
  title: "Refund & Cancellation Policy",
};

export default function RefundPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8 space-y-6">
      <h1 className="text-3xl font-bold text-[#0B1528]">
        Refund &amp; Cancellation Policy
      </h1>
      <p className="text-sm text-slate-600 leading-relaxed">
        Because EC Vault provides instant digital access to downloadable and
        viewable academic PDFs, refunds are handled fairly under the following
        guidelines:
      </p>
      <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600">
        <li>
          Duplicate payments or failed transactions where money was debited are
          refunded in full within 5–7 business days via Razorpay.
        </li>
        <li>
          If a purchased resource has a major technical defect or missing
          content that we cannot resolve within 48 hours, you may request a
          refund via support@ecvault.in.
        </li>
        <li>
          Free previews are available on every subject so you can inspect the
          format before purchasing.
        </li>
      </ul>
    </div>
  );
}

