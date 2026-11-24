# Network Theory — Complete Chapter Checklist

Cross-checked against NPTEL (*Network Theory* / *Network Analysis*), MIT OCW (6.002 & 6.003), IIT Guwahati, and IIT Kharagpur curricula.

- [ ] **Chapter 1: Foundational Circuit Laws & Element Models**
  - Lumped-parameter assumption ($\ell \ll \lambda$)
  - KCL (charge conservation) & KVL (energy conservation)
  - Ideal & practical independent/dependent sources
  - Resistor, inductor, and capacitor $v\text{--}i$ constitutive relations & energy storage
  - Source transformation & Star–Delta ($\text{Y--}\Delta$) equivalence

- [ ] **Chapter 2: Network Theorems & Equivalent Circuits**
  - Superposition theorem (independent vs. dependent sources)
  - Thevenin & Norton equivalents (with dependent sources via test-source method)
  - Maximum Power Transfer theorem (DC and AC complex load cases)
  - Reciprocity theorem & Tellegen's theorem ($\sum v_k i_k = 0$)

- [ ] **Chapter 3: Graph Theory & Matrix Network Analysis**
  - Directed graph, tree, twigs ($n - 1$), co-tree, links ($b - n + 1$)
  - Complete incidence matrix ($A_a$) & reduced incidence matrix ($A$)
  - Fundamental cut-set matrix ($Q_f$) & fundamental tie-set/loop matrix ($B_f$)
  - Orthogonality ($B_f Q_f^T = 0$) & matrix KVL/KCL formulation

- [ ] **Chapter 4: Time-Domain Transient Analysis**
  - Continuity conditions: $i_L(0^+) = i_L(0^-)$, $v_C(0^+) = v_C(0^-)$
  - Source-free & step-driven $RC$ and $RL$ circuits ($\tau = RC$, $\tau = L/R$)
  - Second-order $RLC$ natural response: overdamped ($\zeta > 1$), critically damped ($\zeta = 1$), underdamped ($\zeta < 1$)
  - Zero-input response (ZIR) and zero-state response (ZSR)

- [ ] **Chapter 5: Laplace Transform & $s$-Domain Analysis**
  - Unilateral Laplace transform pairs & properties (differentiation, integration, shifting)
  - Initial Value Theorem (IVT) & Final Value Theorem (FVT) with validity conditions
  - $s$-domain equivalent models of $L$ and $C$ with initial conditions
  - Impulse response & convolution in circuit analysis

- [ ] **Chapter 6: Sinusoidal Steady-State, Resonance & Coupled Circuits**
  - Phasor representation, impedance $Z(j\omega)$, admittance $Y(j\omega)$, complex power $S = P + jQ$
  - Series & parallel $RLC$ resonance ($\omega_0$, $Q_0$, half-power frequencies $\omega_1, \omega_2$, bandwidth)
  - Mutual inductance ($M = k\sqrt{L_1 L_2}$), dot convention, reflected impedance, ideal transformer

- [ ] **Chapter 7: Two-Port Networks**
  - $Z$ (open-circuit impedance) & $Y$ (short-circuit admittance) parameters
  - $h$ (hybrid) & $g$ (inverse hybrid) parameters
  - $ABCD$ (transmission) & $A'B'C'D'$ parameters
  - Reciprocity & symmetry conditions across all parameter sets
  - Series, parallel, and cascade interconnections (Brune's validity test)

- [ ] **Chapter 8: Network Functions, Poles/Zeros & Passive Synthesis**
  - Driving-point impedance $Z(s)$ and transfer functions $H(s)$
  - Pole-zero plots, BIBO stability, and time-domain behavior
  - Hurwitz polynomials & Positive Real (PR) functions
  - Foster-I, Foster-II, Cauer-I, and Cauer-II synthesis for $LC$ and $RC$ networks

