# Network Theory — Complete Formula Collection (LaTeX & SI Units)

**Edition:** Master Reference | **Version:** v1.0.0 | **Date:** 2026-11-24

---

## Chapter 1: Foundational Elements & Transformations

### 1.1 Energy Stored in Inductor & Capacitor
- **Expression:**
  $$W_L(t) = \frac{1}{2} L \, i_L^2(t), \qquad W_C(t) = \frac{1}{2} C \, v_C^2(t)$$
- **Variables & SI Units:** $W_L, W_C$ in joules ($\text{J}$); $L$ in henries ($\text{H}$); $C$ in farads ($\text{F}$); $i_L$ in amperes ($\text{A}$); $v_C$ in volts ($\text{V}$).
- **Conditions:** Linear, time-invariant, passive $L$ and $C$.
- **Significance:** Finite power requires $W_L(t)$ and $W_C(t)$ to be continuous, preventing instantaneous jumps in $i_L$ or $v_C$ unless an impulse source is present.
- **When to apply:** Finding initial/final stored energy and energy dissipated during switching.
- **Related:** $v_L = L \frac{di_L}{dt}$, $i_C = C \frac{dv_C}{dt}$.
- **Exam Applications:** Capacitor charge-redistribution energy-loss problems.

### 1.2 Star–Delta ($\text{Y--}\Delta$) Transformation
- **Expression:**
  $$Z_1 = \frac{Z_a Z_b}{Z_a + Z_b + Z_c}, \qquad Z_a = \frac{Z_1 Z_2 + Z_2 Z_3 + Z_3 Z_1}{Z_1}$$
- **Variables & SI Units:** $Z_1, Z_2, Z_3$ (Star) and $Z_a, Z_b, Z_c$ (Delta) in ohms ($\Omega$). (Subscripts cyclic: $Z_a$ opposite node 1).
- **Conditions:** Valid at any single frequency $\omega$ or in $s$-domain when $Z_a+Z_b+Z_c \neq 0$.
- **Exam Applications:** Unbalanced Wheatstone bridge reduction.

---

## Chapter 2: Network Theorems

### 2.1 Maximum Power Transfer (AC Steady-State)
- **Expression:**
  $$Z_L = Z_{\text{Th}}^* = R_{\text{Th}} - jX_{\text{Th}}, \qquad P_{\max} = \frac{|V_{\text{Th}}|^2}{8 R_{\text{Th}}}$$
- **Variables & SI Units:** $Z_L, Z_{\text{Th}}$ in $\Omega$; $V_{\text{Th}}$ is **RMS** Thevenin voltage in $\text{V}$ (if peak $V_m$ is used, denominator is $8 R_{\text{Th}}$ with $V_{\text{Th}}=V_m/\sqrt{2}$, i.e., $V_m^2/(16 R_{\text{Th}})$? Wait: check carefully! For RMS $V_{\text{Th}}$, $I = V_{\text{Th}}/(2R_{\text{Th}})$, $P = I^2 R_{\text{Th}} = V_{\text{Th}}^2/(4 R_{\text{Th}})$! Let's verify!).
  **CRITICAL CHECK:**
  If $V_{\text{Th}}$ is **RMS**, $I_{\text{rms}} = \frac{|V_{\text{Th}}|}{2 R_{\text{Th}}}$, so:
  $$P_{\max} = I_{\text{rms}}^2 R_{\text{Th}} = \frac{|V_{\text{Th,rms}}|^2}{4 R_{\text{Th}}}$$
  If $V_{\text{Th}}$ is **peak amplitude** $V_m$, then $P_{\max} = \frac{V_m^2}{8 R_{\text{Th}}}$.
  *(Audit note: Always state explicitly whether $V_{\text{Th}}$ is RMS or peak!)*

---

## Chapter 3: Graph Theory

### 3.1 Twigs, Links & Orthogonality
- **Expression:**
  $$b_t = n - 1, \qquad l = b - n + 1, \qquad B_f Q_f^T = 0$$
- **Variables & SI Units:** $n$: nodes, $b$: branches, $b_t$: twigs (tree branches), $l$: links (chords). Dimensionless counts/matrices.
- **Conditions:** Connected graph.
- **Exam Applications:** Determining minimum number of KVL/KCL equations; verifying cut-set/tie-set matrices.

---

## Chapter 4: Time-Domain Transients

### 4.1 First-Order Natural + Step Response
- **Expression:**
  $$x(t) = x(\infty) + \left[x(0^+) - x(\infty)\right] e^{-t/\tau}, \quad t \ge 0$$
- **Variables & SI Units:** $x(t)$ is $v_C(t)$ ($\text{V}$) or $i_L(t)$ ($\text{A}$); $\tau = R_{\text{Th}} C$ or $L / R_{\text{Th}}$ in seconds ($\text{s}$).
- **Conditions:** LTI first-order circuit with constant DC excitation for $t > 0$.

### 4.2 Second-Order Series RLC Characteristic Parameters
- **Expression:**
  $$\alpha = \frac{R}{2L}\;[\text{Np/s}], \qquad \omega_0 = \frac{1}{\sqrt{LC}}\;[\text{rad/s}], \qquad \zeta = \frac{\alpha}{\omega_0} = \frac{R}{2}\sqrt{\frac{C}{L}}$$
- **Conditions:** Overdamped ($\zeta > 1$), Critically damped ($\zeta = 1$), Underdamped ($\zeta < 1$, $\omega_d = \omega_0\sqrt{1-\zeta^2}$).

---

## Chapter 5: Laplace Domain

### 5.1 Initial & Final Value Theorems
- **Expression:**
  $$f(0^+) = \lim_{s \to \infty} s F(s), \qquad f(\infty) = \lim_{s \to 0} s F(s)$$
- **Conditions:** IVT requires $f(t)$ to have no impulses at $t=0$ ($F(s)$ strictly proper). FVT requires all poles of $s F(s)$ to lie strictly in the open left-half $s$-plane ($\text{Re}(s) < 0$).

---

## Chapter 6: Resonance & Coupled Circuits

### 6.1 Series RLC Resonance, $Q_0$ & Bandwidth
- **Expression:**
  $$\omega_0 = \frac{1}{\sqrt{LC}}\;[\text{rad/s}], \quad Q_0 = \frac{\omega_0 L}{R} = \frac{1}{\omega_0 R C} = \frac{1}{R}\sqrt{\frac{L}{C}}, \quad BW = \omega_2 - \omega_1 = \frac{R}{L} = \frac{\omega_0}{Q_0}\;[\text{rad/s}]$$
- **Exact Half-Power Frequencies:**
  $$\omega_{1,2} = \mp \frac{R}{2L} + \sqrt{\left(\frac{R}{2L}\right)^2 + \frac{1}{LC}}, \qquad \omega_1 \omega_2 = \omega_0^2$$

### 6.2 Mutual Inductance & Coupling Coefficient
- **Expression:**
  $$k = \frac{M}{\sqrt{L_1 L_2}} \in [0, 1], \qquad L_{\text{eq,series}} = L_1 + L_2 \pm 2M\;[\text{H}]$$

---

## Chapter 7: Two-Port Networks

### 7.1 Parameter Definitions
- **$Z$-parameters:** $\begin{bmatrix} V_1 \\ V_2 \end{bmatrix} = \begin{bmatrix} Z_{11} & Z_{12} \\ Z_{21} & Z_{22} \end{bmatrix} \begin{bmatrix} I_1 \\ I_2 \end{bmatrix}$ (Units: $\Omega$)
- **$Y$-parameters:** $\begin{bmatrix} I_1 \\ I_2 \end{bmatrix} = \begin{bmatrix} Y_{11} & Y_{12} \\ Y_{21} & Y_{22} \end{bmatrix} \begin{bmatrix} V_1 \\ V_2 \end{bmatrix}$ (Units: $\text{S}$)
- **$h$-parameters:** $\begin{bmatrix} V_1 \\ I_2 \end{bmatrix} = \begin{bmatrix} h_{11} & h_{12} \\ h_{21} & h_{22} \end{bmatrix} \begin{bmatrix} I_1 \\ V_2 \end{bmatrix}$ ($h_{11}$ in $\Omega$, $h_{22}$ in $\text{S}$, $h_{12}, h_{21}$ dimensionless)
- **$ABCD$ parameters:** $\begin{bmatrix} V_1 \\ I_1 \end{bmatrix} = \begin{bmatrix} A & B \\ C & D \end{bmatrix} \begin{bmatrix} V_2 \\ -I_2 \end{bmatrix}$ ($A,D$ dimensionless, $B$ in $\Omega$, $C$ in $\text{S}$)
- **Reciprocity:** $Z_{12} = Z_{21}$, $Y_{12} = Y_{21}$, $h_{12} = -h_{21}$, $AD - BC = 1$.
- **Symmetry:** $Z_{11} = Z_{22}$, $Y_{11} = Y_{22}$, $\Delta h = h_{11}h_{22} - h_{12}h_{21} = 1$, $A = D$.

