# Network Theory — Solved Numerical Handbook

**EC Vault · Year 2 · Sem 3 · v1.0.0 (2026-11-24)**

---

### Problem 1: Thevenin Equivalent with a Dependent Source
A linear network has a $12\;\text{V}$ independent source in series with a $4\;\Omega$ resistor feeding node $A$. From node $A$ to ground is a $6\;\Omega$ resistor in parallel with a dependent current source $0.5\,I_x$ (flowing into node $A$), where $I_x$ is the current flowing out of the $12\;\text{V}$ source through the $4\;\Omega$ resistor toward node $A$. Find $V_{\text{Th}}$ and $R_{\text{Th}}$ at node $A$–ground.

**Solution:**
1. **Open-circuit voltage ($V_{\text{Th}} = V_A$):**
   $I_x = \frac{12 - V_A}{4}$. KCL at node $A$:
   $$\frac{V_A - 12}{4} + \frac{V_A}{6} - 0.5\left(\frac{12 - V_A}{4}\right) = 0$$
   Note $\frac{V_A - 12}{4} + 0.5\frac{V_A - 12}{4} = \frac{3}{2}\frac{V_A - 12}{4} = \frac{3(V_A - 12)}{8}$.
   Multiply by $24$: $9(V_A - 12) + 4 V_A = 0 \implies 13 V_A = 108 \implies V_{\text{Th}} = \frac{108}{13} \approx 8.31\;\text{V}$.
2. **Thevenin resistance ($R_{\text{Th}}$):**
   Short the $12\;\text{V}$ source and apply $V_{\text{test}} = 1\;\text{V}$ at node $A$. Now $I_x = -\frac{1}{4}\;\text{A}$.
   $$I_{\text{test}} = \frac{1}{4} + \frac{1}{6} - 0.5\left(-\frac{1}{4}\right) = \frac{1}{4} + \frac{1}{6} + \frac{1}{8} = \frac{6 + 4 + 3}{24} = \frac{13}{24}\;\text{A}$$
   $$R_{\text{Th}} = \frac{V_{\text{test}}}{I_{\text{test}}} = \frac{24}{13} \approx 1.85\;\Omega$$

---

### Problem 2: Series RLC Resonance & Half-Power Frequencies
A series $RLC$ circuit has $R = 10\;\Omega$, $L = 25\;\text{mH}$, and $C = 10\;\mu\text{F}$ driven by $v_s(t) = 20\cos(\omega t)\;\text{V}$. Find $f_0$, $Q_0$, $BW$, and peak current at resonance.

**Solution:**
1. $\omega_0 = \frac{1}{\sqrt{LC}} = \frac{1}{\sqrt{25\times 10^{-3} \times 10\times 10^{-6}}} = 2000\;\text{rad/s} \implies f_0 = \frac{2000}{2\pi} \approx 318.31\;\text{Hz}$.
2. $Q_0 = \frac{\omega_0 L}{R} = \frac{2000 \times 0.025}{10} = 5$.
3. $BW = \frac{f_0}{Q_0} = \frac{318.31}{5} \approx 63.66\;\text{Hz}$.
4. At resonance, $Z = R = 10\;\Omega$, so $I_{\text{peak}} = \frac{20}{10} = 2\;\text{A}$.

---

### Problem 3: Two-Port T-Network $Z$ and $ABCD$ Parameters
A T-network has series arms $Z_1 = 4\;\Omega$, $Z_2 = 6\;\Omega$, and shunt arm $Z_3 = 2\;\Omega$. Find $[Z]$ and $[ABCD]$.

**Solution:**
1. $Z_{11} = Z_1 + Z_3 = 6\;\Omega$, $Z_{22} = Z_2 + Z_3 = 8\;\Omega$, $Z_{12} = Z_{21} = Z_3 = 2\;\Omega$.
2. Convert to $ABCD$:
   $$A = \frac{Z_{11}}{Z_{21}} = \frac{6}{2} = 3, \quad B = \frac{\Delta Z}{Z_{21}} = \frac{48 - 4}{2} = 22\;\Omega, \quad C = \frac{1}{Z_{21}} = 0.5\;\text{S}, \quad D = \frac{Z_{22}}{Z_{21}} = \frac{8}{2} = 4$$
   Check reciprocity: $AD - BC = 3(4) - 22(0.5) = 12 - 11 = 1$. Verified!

---

### Problem 4: First-Order $RC$ Transient
A $10\;\mu\text{F}$ capacitor initially charged to $V_0 = 5\;\text{V}$ is connected at $t=0$ across a $2\;\text{k}\Omega$ resistor in series with a $15\;\text{V}$ DC source. Find $v_C(t)$ for $t \ge 0$.

**Solution:**
- $v_C(0^+) = 5\;\text{V}$, $v_C(\infty) = 15\;\text{V}$, $\tau = RC = 2000 \times 10\times 10^{-6} = 0.02\;\text{s} = 20\;\text{ms}$.
- $v_C(t) = 15 + (5 - 15)e^{-t/0.02} = 15 - 10 e^{-50t}\;\text{V}$ for $t \ge 0$.

