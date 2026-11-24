import { DiagramSpec } from "@/lib/core-study-content";

export function ECEDiagram({ diagram }: { diagram: DiagramSpec }) {
  return (
    <figure className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
          {diagram.kind === "circuit" ? "Original Circuit Diagram" : "Original Block Diagram"}
        </span>
        <span className="text-xs font-medium text-slate-700">{diagram.title}</span>
      </div>

      <div className="flex justify-center rounded-xl bg-slate-50/80 border border-slate-100 p-4 overflow-x-auto">
        {diagram.svgKey === "two-port-pi" && (
          <svg viewBox="0 0 420 170" className="w-full max-w-md h-auto text-[#0B1528]" aria-label={diagram.title}>
            {/* Port 1 */}
            <circle cx="40" cy="45" r="4" fill="currentColor" />
            <circle cx="40" cy="135" r="4" fill="currentColor" />
            <text x="14" y="50" fontSize="11" fontWeight="600">+</text>
            <text x="12" y="94" fontSize="12" fontWeight="600">V₁</text>
            <text x="14" y="138" fontSize="11" fontWeight="600">−</text>
            <line x1="44" y1="45" x2="140" y2="45" stroke="currentColor" strokeWidth="2" />
            <text x="65" y="36" fontSize="11" fill="#2563EB" fontWeight="600">I₁ →</text>
            {/* Shunt Ya */}
            <rect x="126" y="70" width="28" height="40" rx="4" fill="#EFF6FF" stroke="#2563EB" strokeWidth="2" />
            <text x="133" y="94" fontSize="11" fontWeight="600">Yₐ</text>
            <line x1="140" y1="45" x2="140" y2="70" stroke="currentColor" strokeWidth="2" />
            <line x1="140" y1="110" x2="140" y2="135" stroke="currentColor" strokeWidth="2" />
            {/* Series Yb */}
            <line x1="140" y1="45" x2="185" y2="45" stroke="currentColor" strokeWidth="2" />
            <rect x="185" y="31" width="50" height="28" rx="4" fill="#EFF6FF" stroke="#2563EB" strokeWidth="2" />
            <text x="202" y="49" fontSize="11" fontWeight="600">Y_b</text>
            <line x1="235" y1="45" x2="280" y2="45" stroke="currentColor" strokeWidth="2" />
            {/* Shunt Yc */}
            <rect x="266" y="70" width="28" height="40" rx="4" fill="#EFF6FF" stroke="#2563EB" strokeWidth="2" />
            <text x="273" y="94" fontSize="11" fontWeight="600">Y_c</text>
            <line x1="280" y1="45" x2="280" y2="70" stroke="currentColor" strokeWidth="2" />
            <line x1="280" y1="110" x2="280" y2="135" stroke="currentColor" strokeWidth="2" />
            {/* Bottom rail */}
            <line x1="44" y1="135" x2="376" y2="135" stroke="currentColor" strokeWidth="2" />
            {/* Port 2 */}
            <line x1="280" y1="45" x2="376" y2="45" stroke="currentColor" strokeWidth="2" />
            <text x="330" y="36" fontSize="11" fill="#2563EB" fontWeight="600">← I₂</text>
            <circle cx="380" cy="45" r="4" fill="currentColor" />
            <circle cx="380" cy="135" r="4" fill="currentColor" />
            <text x="394" y="50" fontSize="11" fontWeight="600">+</text>
            <text x="392" y="94" fontSize="12" fontWeight="600">V₂</text>
            <text x="394" y="138" fontSize="11" fontWeight="600">−</text>
          </svg>
        )}

        {diagram.svgKey === "pn-junction-band" && (
          <svg viewBox="0 0 420 170" className="w-full max-w-md h-auto text-[#0B1528]" aria-label={diagram.title}>
            {/* Ec */}
            <path d="M 30 35 L 150 35 Q 210 35 270 75 L 390 75" fill="none" stroke="#2563EB" strokeWidth="2.5" />
            <text x="35" y="26" fontSize="11" fontWeight="600" fill="#2563EB">E_c (p-side)</text>
            <text x="315" y="67" fontSize="11" fontWeight="600" fill="#2563EB">E_c (n-side)</text>
            {/* Ef */}
            <line x1="30" y1="92" x2="390" y2="92" stroke="#0B1528" strokeWidth="1.5" strokeDasharray="6 4" />
            <text x="190" y="86" fontSize="11" fontWeight="600">E_F (constant)</text>
            {/* Ev */}
            <path d="M 30 110 L 150 110 Q 210 110 270 150 L 390 150" fill="none" stroke="#475569" strokeWidth="2.5" />
            <text x="35" y="128" fontSize="11" fontWeight="600" fill="#475569">E_v</text>
            {/* Barrier */}
            <line x1="290" y1="35" x2="290" y2="75" stroke="#DC2626" strokeWidth="1.5" />
            <text x="296" y="55" fontSize="11" fontWeight="700" fill="#DC2626">qV_bi</text>
          </svg>
        )}

        {diagram.svgKey === "common-source-amp" && (
          <svg viewBox="0 0 380 180" className="w-full max-w-sm h-auto text-[#0B1528]" aria-label={diagram.title}>
            {/* VDD */}
            <line x1="160" y1="20" x2="240" y2="20" stroke="currentColor" strokeWidth="2.5" />
            <text x="248" y="24" fontSize="11" fontWeight="700">V_DD</text>
            <line x1="200" y1="20" x2="200" y2="40" stroke="currentColor" strokeWidth="2" />
            {/* RD */}
            <rect x="186" y="40" width="28" height="36" rx="4" fill="#EFF6FF" stroke="#2563EB" strokeWidth="2" />
            <text x="220" y="62" fontSize="11" fontWeight="600">R_D</text>
            {/* Drain to Vout */}
            <line x1="200" y1="76" x2="200" y2="100" stroke="currentColor" strokeWidth="2" />
            <circle cx="200" cy="88" r="3" fill="#2563EB" />
            <line x1="200" y1="88" x2="280" y2="88" stroke="#2563EB" strokeWidth="2" />
            <circle cx="284" cy="88" r="4" fill="#2563EB" />
            <text x="294" y="92" fontSize="12" fontWeight="700" fill="#2563EB">V_out</text>
            {/* nMOS symbol */}
            <line x1="178" y1="100" x2="178" y2="132" stroke="currentColor" strokeWidth="2.5" />
            <line x1="185" y1="100" x2="185" y2="132" stroke="currentColor" strokeWidth="2" />
            <line x1="185" y1="104" x2="200" y2="104" stroke="currentColor" strokeWidth="2" />
            <line x1="185" y1="128" x2="200" y2="128" stroke="currentColor" strokeWidth="2" />
            <line x1="120" y1="116" x2="178" y2="116" stroke="currentColor" strokeWidth="2" />
            <circle cx="116" cy="116" r="4" fill="currentColor" />
            <text x="78" y="120" fontSize="12" fontWeight="700">V_in</text>
            {/* Ground */}
            <line x1="200" y1="128" x2="200" y2="152" stroke="currentColor" strokeWidth="2" />
            <line x1="184" y1="152" x2="216" y2="152" stroke="currentColor" strokeWidth="2" />
            <line x1="190" y1="158" x2="210" y2="158" stroke="currentColor" strokeWidth="2" />
          </svg>
        )}

        {diagram.svgKey === "moore-fsm" && (
          <svg viewBox="0 0 440 150" className="w-full max-w-md h-auto text-[#0B1528]" aria-label={diagram.title}>
            <text x="10" y="54" fontSize="11" fontWeight="600">X(t)</text>
            <line x1="36" y1="50" x2="66" y2="50" stroke="currentColor" strokeWidth="2" />
            <rect x="66" y="30" width="90" height="44" rx="8" fill="#EFF6FF" stroke="#2563EB" strokeWidth="2" />
            <text x="76" y="50" fontSize="10" fontWeight="700">Next-State</text>
            <text x="88" y="63" fontSize="10" fontWeight="600">Logic</text>
            <line x1="156" y1="52" x2="188" y2="52" stroke="currentColor" strokeWidth="2" />
            <rect x="188" y="30" width="84" height="44" rx="8" fill="#0B1528" />
            <text x="204" y="50" fontSize="10" fontWeight="700" fill="#FFFFFF">State Reg</text>
            <text x="210" y="63" fontSize="9" fill="#93C5FD">(D-FFs)</text>
            <line x1="272" y1="52" x2="306" y2="52" stroke="currentColor" strokeWidth="2" />
            <rect x="306" y="30" width="84" height="44" rx="8" fill="#EFF6FF" stroke="#2563EB" strokeWidth="2" />
            <text x="324" y="50" fontSize="10" fontWeight="700">Output</text>
            <text x="328" y="63" fontSize="10" fontWeight="600">Logic</text>
            <line x1="390" y1="52" x2="416" y2="52" stroke="currentColor" strokeWidth="2" />
            <text x="418" y="56" fontSize="11" fontWeight="600">Y(t)</text>
            {/* Feedback */}
            <path d="M 288 52 L 288 112 L 111 112 L 111 74" fill="none" stroke="#2563EB" strokeWidth="1.8" />
            <text x="165" y="128" fontSize="10" fill="#2563EB" fontWeight="600">Current State Q(t)</text>
          </svg>
        )}

        {diagram.svgKey === "lti-feedback-block" && (
          <svg viewBox="0 0 420 150" className="w-full max-w-md h-auto text-[#0B1528]" aria-label={diagram.title}>
            <text x="12" y="49" fontSize="11" fontWeight="600">X(s)</text>
            <line x1="40" y1="45" x2="80" y2="45" stroke="currentColor" strokeWidth="2" />
            <circle cx="94" cy="45" r="14" fill="#FFFFFF" stroke="currentColor" strokeWidth="2" />
            <text x="89" y="49" fontSize="14" fontWeight="700">Σ</text>
            <text x="72" y="37" fontSize="10" fontWeight="700">+</text>
            <text x="98" y="72" fontSize="11" fontWeight="700">−</text>
            <line x1="108" y1="45" x2="170" y2="45" stroke="currentColor" strokeWidth="2" />
            <rect x="170" y="25" width="90" height="40" rx="8" fill="#EFF6FF" stroke="#2563EB" strokeWidth="2" />
            <text x="200" y="49" fontSize="12" fontWeight="700">H(s)</text>
            <line x1="260" y1="45" x2="365" y2="45" stroke="currentColor" strokeWidth="2" />
            <text x="372" y="49" fontSize="11" fontWeight="600">Y(s)</text>
            {/* Feedback G(s) */}
            <line x1="315" y1="45" x2="315" y2="110" stroke="#2563EB" strokeWidth="2" />
            <line x1="315" y1="110" x2="260" y2="110" stroke="#2563EB" strokeWidth="2" />
            <rect x="170" y="90" width="90" height="40" rx="8" fill="#FFFFFF" stroke="#0B1528" strokeWidth="2" />
            <text x="200" y="114" fontSize="12" fontWeight="700">G(s)</text>
            <path d="M 170 110 L 94 110 L 94 59" fill="none" stroke="#2563EB" strokeWidth="2" />
          </svg>
        )}
      </div>

      <figcaption className="mt-2.5 text-xs text-slate-600">{diagram.caption}</figcaption>
    </figure>
  );
}

