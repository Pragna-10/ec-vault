import os
import subprocess
from pathlib import Path

BASE_DIR = Path(r"C:\Users\PRAGNA\.gemini\antigravity\scratch\ec-vault\content\year-2\semester-3\network-theory")
DIGITAL_DIR = BASE_DIR / "editions" / "digital"
HANDWRITTEN_DIR = BASE_DIR / "editions" / "handwritten"
PREVIEW_DIR = BASE_DIR / "previews"

for d in (DIGITAL_DIR, HANDWRITTEN_DIR, PREVIEW_DIR):
    d.mkdir(parents=True, exist_ok=True)

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

KATEX_HEAD = """
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js"
  onload="renderMathInElement(document.body, {delimiters:[{left:'$$',right:'$$',display:true},{left:'$',right:'$',display:false}]});"></script>
"""

DIGITAL_CSS = """
@page { size: A4; margin: 14mm; }
body { font-family: 'Inter', 'Segoe UI', system-ui, sans-serif; color: #0b1528; margin: 0; padding: 24px; background: #fff; line-height: 1.5; }
.header { border-bottom: 2px solid #0b1528; padding-bottom: 10px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: flex-end; }
.brand { font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #2563eb; }
h1 { font-size: 22px; margin: 4px 0 0; color: #0b1528; }
.meta { font-size: 11px; color: #475569; text-align: right; }
.card { border: 1px solid #cbd5e1; border-radius: 10px; padding: 12px 14px; margin-bottom: 12px; break-inside: avoid; page-break-inside: avoid; }
.card-title { font-size: 13px; font-weight: 700; color: #1d4ed8; margin-bottom: 6px; }
table { width: 100%; border-collapse: collapse; font-size: 11.5px; margin-bottom: 14px; }
th { background: #0b1528; color: #fff; text-align: left; padding: 7px 9px; font-size: 11px; }
td { border: 1px solid #e2e8f0; padding: 7px 9px; vertical-align: top; }
tr:nth-child(even) td { background: #f8fafc; }
.footer { margin-top: 16px; border-top: 1px solid #e2e8f0; padding-top: 8px; font-size: 10px; color: #64748b; display: flex; justify-content: space-between; }
"""

HANDWRITTEN_CSS = """
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Patrick+Hand&display=swap');
@page { size: A4; margin: 14mm; }
body {
  font-family: 'Patrick Hand', 'Comic Sans MS', cursive, sans-serif;
  color: #1e293b;
  margin: 0;
  padding: 24px;
  background-color: #fffef7;
  background-image: linear-gradient(transparent 27px, #e2e8f0 28px);
  background-size: 100% 28px;
  line-height: 1.55;
}
.header { border-bottom: 2.5px dashed #1d4ed8; padding-bottom: 10px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: flex-end; }
.brand { font-family: 'Caveat', cursive; font-size: 18px; font-weight: 700; color: #2563eb; }
h1 { font-family: 'Caveat', cursive; font-size: 30px; margin: 2px 0 0; color: #0b1528; }
.meta { font-size: 12px; color: #475569; text-align: right; }
.card { background: rgba(255,255,255,0.88); border: 1.8px solid #94a3b8; border-radius: 12px; padding: 12px 14px; margin-bottom: 12px; break-inside: avoid; page-break-inside: avoid; }
.card-title { font-family: 'Caveat', cursive; font-size: 20px; font-weight: 700; color: #1d4ed8; background: #fef08a; display: inline-block; padding: 0 8px; border-radius: 4px; margin-bottom: 6px; }
table { width: 100%; border-collapse: collapse; font-size: 12.5px; margin-bottom: 14px; background: rgba(255,255,255,0.92); }
th { background: #1e3a8a; color: #fff; text-align: left; padding: 7px 9px; font-family: 'Caveat', cursive; font-size: 16px; }
td { border: 1px dashed #94a3b8; padding: 7px 9px; vertical-align: top; }
.footer { margin-top: 16px; border-top: 1.5px dashed #94a3b8; padding-top: 8px; font-size: 11px; color: #64748b; display: flex; justify-content: space-between; }
"""

SVG_PI_TWO_PORT = """
<div style="text-align:center; margin:10px 0;">
<svg viewBox="0 0 420 150" width="340" height="122" xmlns="http://www.w3.org/2000/svg">
  <circle cx="40" cy="40" r="4" fill="#0b1528"/><circle cx="40" cy="120" r="4" fill="#0b1528"/>
  <text x="14" y="84" font-size="12" font-weight="700">V1</text>
  <line x1="44" y1="40" x2="140" y2="40" stroke="#0b1528" stroke-width="2"/>
  <rect x="126" y="60" width="28" height="40" rx="4" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
  <text x="132" y="84" font-size="11" font-weight="700">Ya</text>
  <line x1="140" y1="40" x2="140" y2="60" stroke="#0b1528" stroke-width="2"/>
  <line x1="140" y1="100" x2="140" y2="120" stroke="#0b1528" stroke-width="2"/>
  <line x1="140" y1="40" x2="185" y2="40" stroke="#0b1528" stroke-width="2"/>
  <rect x="185" y="26" width="50" height="28" rx="4" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
  <text x="202" y="44" font-size="11" font-weight="700">Yb</text>
  <line x1="235" y1="40" x2="280" y2="40" stroke="#0b1528" stroke-width="2"/>
  <rect x="266" y="60" width="28" height="40" rx="4" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
  <text x="272" y="84" font-size="11" font-weight="700">Yc</text>
  <line x1="280" y1="40" x2="280" y2="60" stroke="#0b1528" stroke-width="2"/>
  <line x1="280" y1="100" x2="280" y2="120" stroke="#0b1528" stroke-width="2"/>
  <line x1="44" y1="120" x2="376" y2="120" stroke="#0b1528" stroke-width="2"/>
  <line x1="280" y1="40" x2="376" y2="40" stroke="#0b1528" stroke-width="2"/>
  <circle cx="380" cy="40" r="4" fill="#0b1528"/><circle cx="380" cy="120" r="4" fill="#0b1528"/>
  <text x="392" y="84" font-size="12" font-weight="700">V2</text>
</svg>
</div>
"""

CHEAT_SHEET_BODY = """
<table>
  <thead>
    <tr><th>Topic</th><th>Key Equations (SI Units)</th><th>Conditions &amp; Notes</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Energy &amp; Continuity</strong></td><td>$W_L = \\frac{1}{2}Li^2\\;[\\text{J}]$, &nbsp; $W_C = \\frac{1}{2}Cv^2\\;[\\text{J}]$</td><td>$i_L(0^+)=i_L(0^-)$, $v_C(0^+)=v_C(0^-)$ (no impulses)</td></tr>
    <tr><td><strong>Graph Theory</strong></td><td>$\\text{Twigs}=n-1$, &nbsp; $\\text{Links}=b-n+1$, &nbsp; $B_f Q_f^T = 0$</td><td>Connected graph; $n$ nodes, $b$ branches</td></tr>
    <tr><td><strong>1st-Order Step</strong></td><td>$x(t) = x(\\infty) + [x(0^+)-x(\\infty)]e^{-t/\\tau}$</td><td>$\\tau = R_{\\text{Th}}C$ or $L/R_{\\text{Th}}$ [$\\text{s}$]</td></tr>
    <tr><td><strong>2nd-Order RLC</strong></td><td>$\\alpha=\\frac{R}{2L}$ (series), $\\omega_0=\\frac{1}{\\sqrt{LC}}$, $\\zeta=\\frac{\\alpha}{\\omega_0}$</td><td>$\\zeta&gt;1$ over, $\\zeta=1$ critical, $\\zeta&lt;1$ underdamped</td></tr>
    <tr><td><strong>Laplace Elements</strong></td><td>$Z_L=sL$ ($+L i(0^-)$), &nbsp; $Z_C=\\frac{1}{sC}$ ($+\\frac{v(0^-)}{s}$)</td><td>IVT: no impulse at $0$; FVT: poles in open LHP</td></tr>
    <tr><td><strong>Max Power (AC)</strong></td><td>$Z_L = Z_{\\text{Th}}^*$, &nbsp; $P_{\\max} = \\frac{|V_{\\text{Th,rms}}|^2}{4 R_{\\text{Th}}}$ [$\\text{W}$]</td><td>Variable $R_L$ and $X_L$</td></tr>
    <tr><td><strong>Series Resonance</strong></td><td>$f_0=\\frac{1}{2\\pi\\sqrt{LC}}$, &nbsp; $Q_0=\\frac{1}{R}\\sqrt{\\frac{L}{C}}$, &nbsp; $BW=\\frac{f_0}{Q_0}$</td><td>$\\omega_1\\omega_2=\\omega_0^2$; $V_L=V_C=Q_0 V_s$</td></tr>
    <tr><td><strong>Coupled Coils</strong></td><td>$k=\\frac{M}{\\sqrt{L_1 L_2}}\\le 1$, &nbsp; $L_{\\text{eq}}=L_1+L_2\\pm 2M$ [$\\text{H}$]</td><td>$+$ aiding, $-$ opposing</td></tr>
    <tr><td><strong>Two-Port Reciprocity</strong></td><td>$Z_{12}=Z_{21}$, &nbsp; $Y_{12}=Y_{21}$, &nbsp; $h_{12}=-h_{21}$, &nbsp; $AD-BC=1$</td><td>Linear passive network; Symmetry: $Z_{11}=Z_{22}, A=D$</td></tr>
    <tr><td><strong>Foster-I (LC)</strong></td><td>$Z(s)=sL_\\infty+\\frac{1}{sC_0}+\\sum\\frac{2k_i s}{s^2+\\omega_i^2}$</td><td>Odd rational function, simple $j\\omega$-axis poles</td></tr>
  </tbody>
</table>
""" + SVG_PI_TWO_PORT

HANDBOOK_BODY = CHEAT_SHEET_BODY + """
<div class="card">
  <div class="card-title">1. Worked Numerical: Series RLC Resonance</div>
  <p><strong>Problem:</strong> $R=10\\;\\Omega$, $L=25\\;\\text{mH}$, $C=10\\;\\mu\\text{F}$. Find $f_0$, $Q_0$, and $BW$.</p>
  <p><strong>Solution:</strong> $\\omega_0 = 1/\\sqrt{25\\times 10^{-3}\\times 10\\times 10^{-6}} = 2000\\;\\text{rad/s} \\Rightarrow f_0 = 318.31\\;\\text{Hz}$.<br>
  $Q_0 = \\omega_0 L / R = (2000\\times 0.025)/10 = 5$. &nbsp; $BW = f_0 / Q_0 = 63.66\\;\\text{Hz}$.</p>
</div>
<div class="card">
  <div class="card-title">2. Key Derivation: ABCD Reciprocity</div>
  <p>From $V_1 = A V_2 - B I_2$ and $I_1 = C V_2 - D I_2$: $Z_{21} = 1/C$ and $Z_{12} = (AD-BC)/C$. Equating $Z_{12}=Z_{21}$ gives $AD - BC = 1$.</p>
</div>
<div class="card">
  <div class="card-title">3. Bibliography &amp; Verification</div>
  <p style="font-size:11px;">Cross-checked against NPTEL (nptel.ac.in), MIT OCW 6.002 &amp; 6.003 (ocw.mit.edu), IIT Guwahati, IIT Kharagpur, All About Circuits, and Electronics Tutorials (Accessed 2026-11-24). Original EC Vault commercial edition.</p>
</div>
"""

def build_html(title: str, subtitle: str, css: str, body: str) -> str:
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>{title}</title>
{KATEX_HEAD}
<style>{css}</style>
</head>
<body>
  <div class="header">
    <div>
      <div class="brand">EC Vault · B.Tech ECE</div>
      <h1>{title}</h1>
    </div>
    <div class="meta">
      <div>{subtitle}</div>
      <div>v1.0.0 · 2026-11-24</div>
    </div>
  </div>
  {body}
  <div class="footer">
    <span>EC Vault Original Academic Publication · SI Units</span>
    <span>Year 2 · Semester 3 · Network Theory</span>
  </div>
</body>
</html>"""

FILES = [
    (DIGITAL_DIR / "network-theory-digital-cheat-sheet.html",
     DIGITAL_DIR / "network-theory-digital-cheat-sheet.pdf",
     PREVIEW_DIR / "digital-page-1.png",
     "Network Theory — One-Page Formula Sheet",
     "Professional Digital Edition",
     DIGITAL_CSS,
     CHEAT_SHEET_BODY),
    (DIGITAL_DIR / "network-theory-digital-handbook.html",
     DIGITAL_DIR / "network-theory-digital-handbook.pdf",
     None,
     "Network Theory — Complete Revision Handbook",
     "Professional Digital Edition",
     DIGITAL_CSS,
     HANDBOOK_BODY),
    (HANDWRITTEN_DIR / "network-theory-handwritten-cheat-sheet.html",
     HANDWRITTEN_DIR / "network-theory-handwritten-cheat-sheet.pdf",
     PREVIEW_DIR / "handwritten-page-1.png",
     "Network Theory — One-Page Formula Sheet",
     "Handwritten-Style Edition",
     HANDWRITTEN_CSS,
     CHEAT_SHEET_BODY),
    (HANDWRITTEN_DIR / "network-theory-handwritten-handbook.html",
     HANDWRITTEN_DIR / "network-theory-handwritten-handbook.pdf",
     None,
     "Network Theory — Complete Revision Handbook",
     "Handwritten-Style Edition",
     HANDWRITTEN_CSS,
     HANDBOOK_BODY),
]

for html_path, pdf_path, png_path, title, subtitle, css, body in FILES:
    html_path.write_text(build_html(title, subtitle, css, body), encoding="utf-8")
    url = html_path.as_uri()
    subprocess.run([
        CHROME_PATH, "--headless=new", "--disable-gpu", "--no-sandbox",
        "--virtual-time-budget=5000",
        f"--print-to-pdf={pdf_path}", "--print-to-pdf-no-header", url
    ], check=True)
    if png_path is not None:
        subprocess.run([
            CHROME_PATH, "--headless=new", "--disable-gpu", "--no-sandbox",
            "--virtual-time-budget=5000",
            "--window-size=900,1270",
            f"--screenshot={png_path}", url
        ], check=True)
    print(f"Generated {pdf_path.name}")

