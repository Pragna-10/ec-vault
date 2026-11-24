# Network Theory — One-Page Last-Minute Formula Sheet

**EC Vault · Year 2 · Sem 3 · v1.0.0 (2026-11-24)**

| Topic | Key Equations (SI Units) | Critical Conditions |
| :--- | :--- | :--- |
| **Energy & Continuity** | $W_L = \frac{1}{2}Li^2\;\text{[J]}$, $W_C = \frac{1}{2}Cv^2\;\text{[J]}$ | $i_L(0^+)=i_L(0^-)$, $v_C(0^+)=v_C(0^-)$ |
| **Graph Theory** | $\text{Twigs}=n-1$, $\text{Links}=b-n+1$, $B_f Q_f^T = 0$ | Connected graph |
| **1st-Order Step** | $x(t) = x(\infty) + [x(0^+)-x(\infty)]e^{-t/\tau}$ | $\tau = R_{\text{Th}}C$ or $L/R_{\text{Th}}$ [s] |
| **2nd-Order RLC** | $\alpha=\frac{R}{2L}$ (series), $\alpha=\frac{1}{2RC}$ (parallel), $\omega_0=\frac{1}{\sqrt{LC}}$ | $\zeta = \alpha/\omega_0$; $\omega_d = \omega_0\sqrt{1-\zeta^2}$ |
| **Laplace Elements** | $Z_L = sL$ (with $L i(0^-)$), $Z_C = \frac{1}{sC}$ (with $\frac{v(0^-)}{s}$) | IVT: no impulse at $0$; FVT: poles in LHP |
| **Max Power (AC)** | $Z_L = Z_{\text{Th}}^*$, $P_{\max} = \frac{\|V_{\text{Th,rms}}\|^2}{4 R_{\text{Th}}} = \frac{V_{\text{Th,peak}}^2}{8 R_{\text{Th}}}$ [W] | Variable $R_L$ and $X_L$ |
| **Series Resonance** | $f_0 = \frac{1}{2\pi\sqrt{LC}}$ [Hz], $Q_0 = \frac{1}{R}\sqrt{\frac{L}{C}}$, $BW = \frac{f_0}{Q_0}$ | $\omega_1 \omega_2 = \omega_0^2$; $V_L = V_C = Q_0 V_s$ |
| **Coupled Coils** | $k = \frac{M}{\sqrt{L_1 L_2}} \le 1$, $L_{\text{eq}} = L_1 + L_2 \pm 2M$ [H] | $+$ aiding, $-$ opposing |
| **Two-Port Reciprocity** | $Z_{12}=Z_{21}$, $Y_{12}=Y_{21}$, $h_{12}=-h_{21}$, $AD-BC=1$ | Linear passive network, no dep. sources |
| **Two-Port Symmetry** | $Z_{11}=Z_{22}$, $Y_{11}=Y_{22}$, $\Delta h = 1$, $A=D$ | Identical input/output ports |
| **Foster-I (LC)** | $Z(s) = sL_\infty + \frac{1}{sC_0} + \sum \frac{2k_i s}{s^2 + \omega_i^2}$ | Odd rational function, simple $j\omega$ poles |

