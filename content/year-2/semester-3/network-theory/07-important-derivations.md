# Network Theory — Important Derivations

**EC Vault · Year 2 · Sem 3 · v1.0.0 (2026-11-24)**

## 1. Maximum Power Transfer Theorem (AC Complex Load)
**Goal:** Given a Thevenin equivalent $V_{\text{Th,rms}}$ in series with $Z_{\text{Th}} = R_{\text{Th}} + jX_{\text{Th}}$, find $Z_L = R_L + jX_L$ that maximizes real power $P_L$.
1. Load current magnitude: $|I| = \frac{|V_{\text{Th,rms}}|}{\sqrt{(R_{\text{Th}}+R_L)^2 + (X_{\text{Th}}+X_L)^2}}$.
2. Real power: $P_L = |I|^2 R_L = \frac{|V_{\text{Th,rms}}|^2 R_L}{(R_{\text{Th}}+R_L)^2 + (X_{\text{Th}}+X_L)^2}$.
3. For any $R_L > 0$, $P_L$ is maximized over $X_L$ by setting $X_{\text{Th}} + X_L = 0 \implies X_L = -X_{\text{Th}}$.
4. Now $P_L(R_L) = \frac{|V_{\text{Th,rms}}|^2 R_L}{(R_{\text{Th}}+R_L)^2}$. Setting $\frac{dP_L}{dR_L} = 0$:
   $$(R_{\text{Th}}+R_L)^2 - 2R_L(R_{\text{Th}}+R_L) = 0 \implies R_{\text{Th}} - R_L = 0 \implies R_L = R_{\text{Th}}$$
5. Thus $Z_L = Z_{\text{Th}}^*$ and $P_{\max} = \frac{|V_{\text{Th,rms}}|^2}{4 R_{\text{Th}}}$.

## 2. Reciprocity & Symmetry in $ABCD$ Parameters
1. From $V_1 = A V_2 - B I_2$ and $I_1 = C V_2 - D I_2$:
   $$V_2 = \frac{1}{C} I_1 + \frac{D}{C} I_2 \implies Z_{21} = \frac{1}{C}, \quad Z_{22} = \frac{D}{C}$$
2. Substituting $V_2$ into $V_1$:
   $$V_1 = \frac{A}{C} I_1 + \frac{AD - BC}{C} I_2 \implies Z_{11} = \frac{A}{C}, \quad Z_{12} = \frac{AD - BC}{C}$$
3. Reciprocity ($Z_{12} = Z_{21}$) gives $AD - BC = 1$. Symmetry ($Z_{11} = Z_{22}$) gives $A = D$.

## 3. Exact Half-Power Frequencies of Series RLC
At half-power, $|Z(j\omega)| = \sqrt{2} R$, so $R^2 + \left(\omega L - \frac{1}{\omega C}\right)^2 = 2R^2 \implies \omega L - \frac{1}{\omega C} = \pm R$.
Solving the quadratic $\omega^2 \mp \frac{R}{L}\omega - \frac{1}{LC} = 0$ for positive roots:
$$\omega_1 = -\frac{R}{2L} + \sqrt{\left(\frac{R}{2L}\right)^2 + \frac{1}{LC}}, \qquad \omega_2 = +\frac{R}{2L} + \sqrt{\left(\frac{R}{2L}\right)^2 + \frac{1}{LC}}$$
Subtracting gives $BW = \omega_2 - \omega_1 = \frac{R}{L}$; multiplying gives $\omega_1 \omega_2 = \frac{1}{LC} = \omega_0^2$.

