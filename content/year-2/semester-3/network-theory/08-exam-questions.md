# Network Theory — Exam-Oriented Questions & Answers

**EC Vault · Year 2 · Sem 3 · v1.0.0 (2026-11-24)**

### Conceptual Questions
1. **Why must independent sources be turned off while dependent sources remain active when finding $R_{\text{Th}}$?**  
   Dependent sources are controlled by circuit variables (voltages/currents) that respond to the external test excitation at the port; turning them off would alter the network's terminal $v\text{--}i$ slope.
2. **State Tellegen's Theorem and why it holds even for nonlinear, time-varying elements.**  
   $\sum_{k=1}^b v_k i_k = 0$ (under passive sign convention). It depends solely on KCL ($A i = 0$) and KVL ($v = A^T e$), which are topological laws independent of element constitutive relations.
3. **Why is $\omega_0$ the geometric mean of $\omega_1$ and $\omega_2$ in a series RLC circuit?**  
   Because $\omega_1 \omega_2 = \omega_0^2$, the resonance curve is symmetric on a logarithmic frequency axis, not a linear one (though for $Q_0 \ge 10$, $\omega_{1,2} \approx \omega_0 \mp BW/2$).

### Long-Answer Exam Questions (5–10 Marks)
1. **State the necessary and sufficient conditions for a rational function $Z(s)$ to be Positive Real (PR).**  
   (a) $Z(s)$ is real for real $s$. (b) $Z(s)$ is analytic in $\text{Re}(s) > 0$ (no RHP poles). (c) Any poles on the $j\omega$-axis are simple with real, positive residues. (d) $\text{Re}\{Z(j\omega)\} \ge 0$ for all $\omega \in \mathbb{R}$ where $Z(j\omega)$ is finite.
2. **Explain why two-port $Z$-matrices cannot always be added in series without checking Brune's test.**  
   Series connection at both input and output ports can create a short-circuit loop through the common ground/return conductors of the two networks, violating the port-current condition ($I_{\text{in}} = I_{\text{out}}$ at each port).

