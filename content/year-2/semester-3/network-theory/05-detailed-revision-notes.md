# Network Theory — Detailed Revision Notes

**EC Vault · Year 2 · Sem 3 · v1.0.0 (2026-11-24)**

## 1. Lumped-Element & Graph Theory Foundations
- **Lumped Assumption:** Circuit dimensions $\ell$ are much smaller than the electromagnetic wavelength $\lambda = c/f$, so KCL (conservation of charge) and KVL (conservative electric field in lumped loops) hold at every instant.
- **Dependent Sources:** Never turn off dependent sources when computing $R_{\text{Th}}$ or $Z_{\text{Th}}$. Instead, deactivate independent sources (short voltage sources, open current sources) and apply a $1\;\text{V}$ or $1\;\text{A}$ test source at the port: $Z_{\text{Th}} = V_{\text{test}} / I_{\text{test}}$.
- **Graph Matrices:** For a connected graph with $n$ nodes and $b$ branches, a tree has $n-1$ twigs and $l = b-n+1$ links. Each link defines one fundamental loop (tie-set); each twig defines one fundamental cut-set.

## 2. Transient & Laplace Analysis
- **Three-Step Transient Method:**
  1. Find $i_L(0^-)$ and $v_C(0^-)$ from the $t < 0$ steady-state circuit.
  2. Enforce continuity: $i_L(0^+) = i_L(0^-)$ and $v_C(0^+) = v_C(0^-)$ (provided no impulsive sources).
  3. Solve for $t > 0$ via differential equations or $s$-domain equivalents ($L \to sL$ in series with $L i_L(0^-)$ opposing current; $C \to \frac{1}{sC}$ in series with $\frac{v_C(0^-)}{s}$).
- **Common Mistake:** Using Final Value Theorem on $F(s) = \frac{\omega}{s^2 + \omega^2}$ ($\sin \omega t$). Its poles lie on the $j\omega$-axis, violating FVT!

## 3. Resonance & Coupled Circuits
- **Series Resonance:** Impedance is minimum ($Z = R$), current is maximum ($I = V/R$), power factor is unity, and reactive voltages $V_L = V_C = Q_0 V_s$ can exceed the source voltage by factor $Q_0$.
- **Parallel Resonance (Ideal Tank):** Admittance is minimum ($Y = G = 1/R$), impedance is maximum ($Z = R$), and $Q_0 = R\sqrt{C/L}$.
- **Dot Convention:** If both currents $I_1$ and $I_2$ enter (or both leave) the dotted terminals, mutual flux aids self-flux ($+j\omega M$); otherwise it opposes ($-j\omega M$).

## 4. Two-Port Networks & Passive Synthesis
- **Brune's Validity Test:** Before adding $Z$-matrices of two-ports in series (or $Y$-matrices in parallel), verify that interconnecting the ports does not short-circuit an internal branch.
- **Foster vs. Cauer Synthesis:** Foster forms use partial-fraction expansion ($Z(s)$ for Foster-I series, $Y(s)$ for Foster-II parallel); Cauer forms use continued-fraction expansion (ladder network) removing poles at $s=\infty$ (Cauer-I) or $s=0$ (Cauer-II).

