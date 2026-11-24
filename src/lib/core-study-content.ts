export interface FormulaItem {
  name: string;
  equation: string;
  unitsAndNotes: string;
}

export interface DerivationItem {
  title: string;
  statement: string;
  steps: string[];
  result: string;
}

export interface NumericalItem {
  title: string;
  problem: string;
  given: string;
  steps: string[];
  answer: string;
}

export interface DiagramSpec {
  id: string;
  kind: "circuit" | "block";
  title: string;
  caption: string;
  svgKey:
    | "two-port-pi"
    | "pn-junction-band"
    | "common-source-amp"
    | "moore-fsm"
    | "lti-feedback-block";
}

export interface ExamQAItem {
  question: string;
  type: "Conceptual" | "Exam (5–10 Marks)";
  answer: string;
}

export interface CoreSubjectStudyPack {
  subjectSlug: string;
  version: string;
  chapterChecklist: { chapter: string; keyTopics: string[] }[];
  formulaSheet: FormulaItem[];
  revisionNotes: { heading: string; points: string[] }[];
  derivations: DerivationItem[];
  diagrams: DiagramSpec[];
  solvedNumericals: NumericalItem[];
  questionsAndAnswers: ExamQAItem[];
}

export const CORE_SUBJECT_STUDY_PACKS: Record<string, CoreSubjectStudyPack> = {
  "network-theory": {
    subjectSlug: "network-theory",
    version: "v1.0-original",
    chapterChecklist: [
      {
        chapter: "1. Network Topology & Graph Theory",
        keyTopics: ["Directed graphs", "Trees & co-trees", "Reduced incidence matrix (A)", "Fundamental cut-set & tie-set matrices"],
      },
      {
        chapter: "2. Sinusoidal Steady-State & Resonance",
        keyTopics: ["Phasor analysis", "Series & parallel RLC resonance", "Quality factor (Q) & bandwidth", "Magnetically coupled circuits"],
      },
      {
        chapter: "3. Transient Analysis in Laplace Domain",
        keyTopics: ["Initial/final value theorems", "Zero-input & zero-state response", "RL, RC, RLC natural & step responses", "Damping ratio (ζ)"],
      },
      {
        chapter: "4. Two-Port Networks",
        keyTopics: ["Z, Y, h, g, ABCD (T) parameters", "Reciprocity & symmetry conditions", "Cascade, series & parallel interconnections"],
      },
      {
        chapter: "5. Network Functions & Passive Synthesis",
        keyTopics: ["Driving-point & transfer functions", "Poles/zeros & stability", "Positive real functions", "Foster & Cauer LC/RC synthesis"],
      },
    ],
    formulaSheet: [
      {
        name: "Graph Theory Branch-Node Relation",
        equation: "b_t = n - 1,   l = b - (n - 1)",
        unitsAndNotes: "b: total branches, n: nodes, b_t: twigs, l: links (chords)",
      },
      {
        name: "Series RLC Resonance",
        equation: "ω_0 = 1 / √(LC) [rad/s],   Q_0 = (1/R)√(L/C),   BW = ω_0 / Q_0 = R / L [rad/s]",
        unitsAndNotes: "L in H, C in F, R in Ω; half-power frequencies ω_1,2 ≈ ω_0 ± BW/2 for Q_0 ≥ 10",
      },
      {
        name: "Laplace Transform of Energy Elements",
        equation: "Z_L(s) = sL  (with series I.C. source L·i(0⁻)),   Z_C(s) = 1/(sC)  (with series I.C. v(0⁻)/s)",
        unitsAndNotes: "s = σ + jω [s⁻¹], i(0⁻) in A, v(0⁻) in V",
      },
      {
        name: "Two-Port Z & ABCD Relations",
        equation: "[V₁; V₂] = [Z₁₁ Z₁₂; Z₂₁ Z₂₂][I₁; I₂],   [V₁; I₁] = [A B; C D][V₂; -I₂]",
        unitsAndNotes: "Reciprocity: Z₁₂ = Z₂₁ or AD - BC = 1; Symmetry: Z₁₁ = Z₂₂ or A = D",
      },
      {
        name: "Maximum Power Transfer (AC)",
        equation: "Z_L = Z_Th*  ⇒  P_max = |V_Th|² / (8 R_Th) [W]",
        unitsAndNotes: "V_Th is RMS phasor in V; R_Th = Re{Z_Th} in Ω",
      },
    ],
    revisionNotes: [
      {
        heading: "Initial Conditions & Continuity Laws",
        points: [
          "Inductor current cannot change instantaneously without an impulsive voltage: i_L(0⁺) = i_L(0⁻).",
          "Capacitor voltage cannot change instantaneously without an impulsive current: v_C(0⁺) = v_C(0⁻).",
          "At t = 0⁺ (assuming finite sources), an uncharged capacitor acts as a short circuit and an unenergized inductor acts as an open circuit.",
        ],
      },
      {
        heading: "Interconnecting Two-Port Networks",
        points: [
          "Series-Series connection: add Z-matrices (Z = Z_a + Z_b), provided Brune's port-current validity test holds.",
          "Parallel-Parallel connection: add Y-matrices (Y = Y_a + Y_b).",
          "Cascade connection: multiply ABCD (transmission) matrices in order (T = T_a · T_b).",
        ],
      },
    ],
    derivations: [
      {
        title: "Reciprocity & Symmetry Conditions in ABCD Parameters",
        statement: "Express reciprocity (Z₁₂ = Z₂₁) and symmetry (Z₁₁ = Z₂₂) in terms of transmission parameters A, B, C, D.",
        steps: [
          "From ABCD equations: V₁ = A V₂ - B I₂ and I₁ = C V₂ - D I₂.",
          "Solve for V₂ in terms of I₁ and I₂: V₂ = (1/C) I₁ + (D/C) I₂, giving Z₂₁ = 1/C and Z₂₂ = D/C.",
          "Substitute V₂ into V₁: V₁ = (A/C) I₁ + ((AD - BC)/C) I₂, giving Z₁₁ = A/C and Z₁₂ = (AD - BC)/C.",
          "Equating Z₁₂ = Z₂₁ yields (AD - BC)/C = 1/C ⇒ AD - BC = 1 (Reciprocity).",
          "Equating Z₁₁ = Z₂₂ yields A/C = D/C ⇒ A = D (Symmetry).",
        ],
        result: "Reciprocal: AD - BC = 1; Symmetrical: A = D.",
      },
    ],
    diagrams: [
      {
        id: "nt-diag-1",
        kind: "circuit",
        title: "Two-Port Network with Pi-Equivalent Model",
        caption: "Standard two-port terminal convention (V₁, I₁ at input; V₂, I₂ into port 2) with admittance branches Y_a, Y_b, Y_c.",
        svgKey: "two-port-pi",
      },
    ],
    solvedNumericals: [
      {
        title: "Series RLC Resonance & Bandwidth",
        problem: "A series RLC circuit has R = 10 Ω, L = 25 mH, and C = 10 μF. Determine the resonant frequency f₀, quality factor Q₀, and 3-dB bandwidth in Hz.",
        given: "R = 10 Ω, L = 25 × 10⁻³ H, C = 10 × 10⁻⁶ F",
        steps: [
          "ω₀ = 1 / √(LC) = 1 / √(25 × 10⁻³ × 10 × 10⁻⁶) = 1 / √(2.5 × 10⁻⁷) = 2000 rad/s.",
          "f₀ = ω₀ / (2π) = 2000 / (2π) ≈ 318.31 Hz.",
          "Q₀ = (ω₀ L) / R = (2000 × 25 × 10⁻³) / 10 = 50 / 10 = 5.",
          "BW = f₀ / Q₀ = 318.31 / 5 ≈ 63.66 Hz (or R / (2πL) = 10 / (2π × 0.025) = 63.66 Hz).",
        ],
        answer: "f₀ = 318.31 Hz, Q₀ = 5, BW = 63.66 Hz.",
      },
    ],
    questionsAndAnswers: [
      {
        question: "Why can't two-port Z-matrices always be added directly when ports are connected in series?",
        type: "Conceptual",
        answer:
          "Connecting two-ports in series can create circulating currents between the lower terminals of the two networks if they are not isolated, violating the port-current condition (current entering + terminal equals current leaving − terminal). Ideal isolation transformers or Brune's test must be verified first.",
      },
      {
        question: "State the necessary and sufficient conditions for a rational function Z(s) to be Positive Real (PR).",
        type: "Exam (5–10 Marks)",
        answer:
          "1) Z(s) is real for real s. 2) Z(s) has no poles in the open right-half s-plane (Re(s) > 0), and any jω-axis poles are simple with real positive residues. 3) Re{Z(jω)} ≥ 0 for all ω ∈ ℝ (where Z(jω) has no poles).",
      },
    ],
  },

  "electronic-devices": {
    subjectSlug: "electronic-devices",
    version: "v1.0-original",
    chapterChecklist: [
      {
        chapter: "1. Semiconductor Crystal & Energy Bands",
        keyTopics: ["Effective mass", "Density of states", "Fermi-Dirac statistics", "Mass-action law (np = n_i²)"],
      },
      {
        chapter: "2. Carrier Transport & Continuity",
        keyTopics: ["Drift & mobility", "Diffusion & Einstein relation", "Generation-recombination", "Steady-state continuity equation"],
      },
      {
        chapter: "3. PN Junction Electrostatics & I-V",
        keyTopics: ["Built-in potential (V_bi)", "Depletion width & junction capacitance", "Ideal Shockley diode equation", "Zener & avalanche breakdown"],
      },
      {
        chapter: "4. Bipolar Junction Transistor (BJT) Physics",
        keyTopics: ["Base-width modulation (Early effect)", "Transport factor & emitter injection efficiency", "Ebers-Moll model"],
      },
      {
        chapter: "5. MOS Capacitor & MOSFET Physics",
        keyTopics: ["Accumulation, depletion, strong inversion", "Threshold voltage (V_T)", "Square-law I_D–V_DS model", "Channel-length modulation (λ) & body effect"],
      },
    ],
    formulaSheet: [
      {
        name: "Mass-Action Law & Boltzmann Relations",
        equation: "n₀ p₀ = n_i²,   n₀ = n_i exp((E_F - E_Fi)/kT),   p₀ = n_i exp((E_Fi - E_F)/kT)",
        unitsAndNotes: "n_i ≈ 1.5 × 10¹⁰ cm⁻³ in Si at 300 K; kT/q ≈ 0.0259 V (25.9 mV) at 300 K",
      },
      {
        name: "Einstein Relation",
        equation: "D_n / μ_n = D_p / μ_p = kT / q = V_T [V]",
        unitsAndNotes: "D in m²/s (or cm²/s), μ in m²/(V·s), V_T ≈ 25.9 mV at T = 300 K",
      },
      {
        name: "PN Junction Built-in Potential & Depletion Width",
        equation: "V_bi = V_T ln(N_A N_D / n_i²) [V],   W = √( (2ε_s / q) · ((N_A + N_D)/(N_A N_D)) · (V_bi - V_A) ) [m]",
        unitsAndNotes: "ε_s = ε_r ε₀ (for Si, ε_r ≈ 11.7); V_A > 0 forward bias, V_A < 0 reverse bias",
      },
      {
        name: "MOSFET Long-Channel Drain Current (nMOS)",
        equation: "Triode (V_DS < V_GS - V_T): I_D = μ_n C_ox (W/L) [ (V_GS - V_T)V_DS - V_DS²/2 ]\nSaturation (V_DS ≥ V_GS - V_T): I_D = (1/2) μ_n C_ox (W/L) (V_GS - V_T)² (1 + λ V_DS)",
        unitsAndNotes: "C_ox = ε_ox / t_ox [F/m²], μ_n C_ox in A/V², λ in V⁻¹",
      },
    ],
    revisionNotes: [
      {
        heading: "Strong Inversion & Threshold Voltage",
        points: [
          "Strong inversion occurs when surface potential φ_s = 2φ_F, where φ_F = V_T ln(N_A / n_i) for a p-type substrate.",
          "Body effect increases V_T when source-to-body voltage V_SB > 0: V_T = V_T0 + γ(√(2φ_F + V_SB) - √(2φ_F)).",
        ],
      },
      {
        heading: "Depletion vs. Diffusion Capacitance",
        points: [
          "Depletion capacitance C_j = ε_s A / W dominates under reverse bias and varies as (V_bi + V_R)^(-1/2) for a step junction.",
          "Diffusion capacitance C_d = (τ_T I_D) / (η V_T) dominates under forward bias due to minority carrier storage.",
        ],
      },
    ],
    derivations: [
      {
        title: "Step PN Junction Built-in Potential (V_bi)",
        statement: "Derive V_bi in terms of doping concentrations N_A, N_D and intrinsic carrier concentration n_i at thermal equilibrium.",
        steps: [
          "At thermal equilibrium, net electron current density J_n = q μ_n n E + q D_n (dn/dx) = 0.",
          "Rearranging: E(x) = -(D_n / μ_n) (1/n) (dn/dx) = -V_T (1/n) (dn/dx) using Einstein's relation.",
          "Integrate -E(x) = dV/dx across the depletion region from p-side (n_p0 = n_i²/N_A) to n-side (n_n0 = N_D):",
          "V_bi = V_T ∫(dn/n) = V_T ln(n_n0 / n_p0) = V_T ln(N_A N_D / n_i²).",
        ],
        result: "V_bi = (kT/q) ln(N_A N_D / n_i²).",
      },
    ],
    diagrams: [
      {
        id: "ed-diag-1",
        kind: "block",
        title: "PN Junction Equilibrium Energy Band Diagram",
        caption: "Flat Fermi level E_F across p- and n-regions with built-in potential barrier qV_bi separating conduction/valence bands.",
        svgKey: "pn-junction-band",
      },
    ],
    solvedNumericals: [
      {
        title: "Silicon Step PN Junction Built-in Potential",
        problem: "A silicon step PN junction at T = 300 K has N_A = 10¹⁷ cm⁻³ and N_D = 10¹⁶ cm⁻³. Given n_i = 1.5 × 10¹⁰ cm⁻³ and V_T = 25.9 mV, compute V_bi.",
        given: "N_A = 10¹⁷ cm⁻³, N_D = 10¹⁶ cm⁻³, n_i = 1.5 × 10¹⁰ cm⁻³, V_T = 0.0259 V",
        steps: [
          "N_A N_D / n_i² = (10¹⁷ × 10¹⁶) / (2.25 × 10²⁰) = 10³³ / (2.25 × 10²⁰) ≈ 4.444 × 10¹².",
          "ln(4.444 × 10¹²) ≈ 29.123.",
          "V_bi = 0.0259 × 29.123 ≈ 0.754 V.",
        ],
        answer: "V_bi ≈ 0.754 V.",
      },
    ],
    questionsAndAnswers: [
      {
        question: "Why does MOSFET drain current saturate when V_DS ≥ V_GS - V_T?",
        type: "Conceptual",
        answer:
          "At V_DS = V_GS - V_T, the inversion charge density at the drain end drops to zero (pinch-off). Any additional V_DS drops across the short pinch-off depletion region rather than increasing the channel potential drop, keeping I_D nearly constant (aside from channel-length modulation).",
      },
      {
        question: "Explain the Early effect in a BJT and its impact on small-signal output resistance r_o.",
        type: "Exam (5–10 Marks)",
        answer:
          "Increasing collector-base reverse bias V_CB widens the collector-base depletion region into the base, reducing the effective neutral base width W_B. This increases the minority-carrier gradient and collector current I_C, yielding finite output resistance r_o = (V_A + V_CE) / I_C.",
      },
    ],
  },

  "analog-circuits": {
    subjectSlug: "analog-circuits",
    version: "v1.0-original",
    chapterChecklist: [
      {
        chapter: "1. Biasing & Small-Signal Models",
        keyTopics: ["Q-point stability", "Hybrid-π & T-models", "Transconductance g_m, r_π, r_o"],
      },
      {
        chapter: "2. Single-Stage BJT & MOSFET Amplifiers",
        keyTopics: ["CE / CS, CB / CG, CC / CD (Source Follower)", "Source/Emitter degeneration", "Gain, R_in, R_out"],
      },
      {
        chapter: "3. Current Mirrors & Differential Pairs",
        keyTopics: ["Basic & cascode current mirrors", "MOS differential pair", "CMRR & differential/common-mode gain"],
      },
      {
        chapter: "4. Frequency Response",
        keyTopics: ["Miller theorem", "High-frequency poles (C_gs, C_gd)", "Open-circuit time constant method", "Gain-bandwidth product (GBW)"],
      },
      {
        chapter: "5. Feedback & Oscillators",
        keyTopics: ["4 feedback topologies", "Loop gain T(s) & phase margin", "Barkhausen criterion", "Wien-bridge & RC phase-shift oscillators"],
      },
    ],
    formulaSheet: [
      {
        name: "MOSFET & BJT Small-Signal Parameters",
        equation: "MOSFET: g_m = 2I_D / V_ov = √(2 μ_n C_ox (W/L) I_D),  r_o = 1 / (λ I_D)\nBJT: g_m = I_C / V_T,  r_π = β / g_m",
        unitsAndNotes: "V_ov = V_GS - V_T [V]; g_m in A/V (S); r_o, r_π in Ω",
      },
      {
        name: "Common-Source Amplifier with Degeneration R_S",
        equation: "A_v = - (g_m R_D) / (1 + g_m R_S)  (neglecting r_o)",
        unitsAndNotes: "Degeneration trades gain for linearity and bandwidth",
      },
      {
        name: "Miller Capacitance Multiplication",
        equation: "C_in,M = C_gd (1 - A_v),   C_out,M = C_gd (1 - 1/A_v)",
        unitsAndNotes: "For inverting voltage gain A_v < 0, C_in,M = C_gd (1 + |A_v|)",
      },
      {
        name: "Barkhausen Oscillation Criterion",
        equation: "|A(jω₀) β(jω₀)| = 1   and   ∠A(jω₀)β(jω₀) = 0° (or 360°)",
        unitsAndNotes: "Loop gain must have unity magnitude and zero net phase shift at ω₀",
      },
    ],
    revisionNotes: [
      {
        heading: "Choosing Between Amplifier Topologies",
        points: [
          "CS / CE: High voltage gain, moderate-to-high input impedance (infinite at DC for CS), inverting.",
          "CG / CB: Low input impedance (~1/g_m), no Miller multiplication of C_gd, wide bandwidth — ideal for cascode stages.",
          "CD / CC (Follower): Near-unity voltage gain (< 1), low output impedance (~1/g_m), used as output buffer.",
        ],
      },
    ],
    derivations: [
      {
        title: "Miller Input Capacitance for an Inverting Amplifier",
        statement: "Derive the effective input capacitance seen across the input terminal due to a feedback capacitor C_f between input (v₁) and output (v₂ = A_v v₁).",
        steps: [
          "Current flowing from input node into C_f is i_f = s C_f (v₁ - v₂).",
          "Substitute v₂ = A_v v₁: i_f = s C_f (1 - A_v) v₁.",
          "Input admittance Y_in,f = i_f / v₁ = s [C_f (1 - A_v)].",
          "For an inverting stage A_v = -|A_v|, effective input capacitance is C_M = C_f (1 + |A_v|).",
        ],
        result: "C_in,Miller = C_f (1 - A_v) = C_f (1 + |A_v|).",
      },
    ],
    diagrams: [
      {
        id: "ac-diag-1",
        kind: "circuit",
        title: "Common-Source MOSFET Amplifier with Drain Resistor R_D",
        caption: "Basic nMOS CS stage showing V_DD, drain load R_D, gate bias V_in, and small-signal output V_out.",
        svgKey: "common-source-amp",
      },
    ],
    solvedNumericals: [
      {
        title: "nMOS Common-Source Stage Gain & Miller Capacitance",
        problem: "An nMOS CS amplifier operates at I_D = 1 mA with V_ov = 0.2 V, R_D = 5 kΩ, r_o → ∞, and C_gd = 20 fF. Find the voltage gain A_v and the Miller-multiplied input capacitance due to C_gd.",
        given: "I_D = 1 mA, V_ov = 0.2 V, R_D = 5000 Ω, C_gd = 20 × 10⁻¹⁵ F",
        steps: [
          "g_m = 2 I_D / V_ov = (2 × 10⁻³) / 0.2 = 10 mA/V = 0.01 S.",
          "A_v = -g_m R_D = -0.01 × 5000 = -50 V/V.",
          "C_in,M = C_gd (1 + |A_v|) = 20 fF × (1 + 50) = 1020 fF = 1.02 pF.",
        ],
        answer: "A_v = -50 V/V, C_in,M = 1.02 pF.",
      },
    ],
    questionsAndAnswers: [
      {
        question: "How does a cascode stage eliminate the Miller effect?",
        type: "Conceptual",
        answer:
          "A cascode places a Common-Gate (CG) device above the Common-Source (CS) input device. The CG source presents a low impedance (~1/g_m2) at the drain of the CS transistor, clamping the CS voltage gain to ≈ -1 so C_gd1 is multiplied by only ~2 instead of (1 + |A_v|).",
      },
      {
        question: "Define CMRR for a differential amplifier and explain why a high tail-current source impedance improves it.",
        type: "Exam (5–10 Marks)",
        answer:
          "CMRR = |A_dm / A_cm|. For a balanced MOS differential pair with tail impedance R_SS, A_cm ≈ -R_D / (2 R_SS) while A_dm = -g_m R_D. Increasing R_SS suppresses common-mode current variations, driving A_cm → 0 and increasing CMRR.",
      },
    ],
  },

  "digital-electronics": {
    subjectSlug: "digital-electronics",
    version: "v1.0-original",
    chapterChecklist: [
      {
        chapter: "1. Number Systems & Boolean Algebra",
        keyTopics: ["2's complement arithmetic", "De Morgan's laws", "Canonical SOP & POS forms"],
      },
      {
        chapter: "2. Logic Minimization & Combinational Blocks",
        keyTopics: ["K-maps (up to 5 variables)", "Don't-care conditions", "MUX, decoders, carry-lookahead adders", "Static hazards"],
      },
      {
        chapter: "3. Latches, Flip-Flops & Timing",
        keyTopics: ["SR, D, JK, T flip-flops", "Setup time (t_su) & hold time (t_h)", "Clock-to-Q delay (t_cq)", "Clock skew"],
      },
      {
        chapter: "4. Synchronous Sequential Circuits (FSMs)",
        keyTopics: ["Mealy vs. Moore machines", "State transition tables", "State reduction", "Counters & shift registers"],
      },
      {
        chapter: "5. Logic Families & Memory Basics",
        keyTopics: ["CMOS noise margins", "Fan-out & propagation delay", "ROM, PLA, PAL, SRAM/DRAM basics"],
      },
    ],
    formulaSheet: [
      {
        name: "Maximum Synchronous Clock Frequency",
        equation: "T_clk ≥ t_cq + t_comb,max + t_su - t_skew  (for positive skew toward capture FF)",
        unitsAndNotes: "f_max = 1 / T_clk,min [Hz]; times in ns or ps",
      },
      {
        name: "Hold-Time Constraint",
        equation: "t_cq,min + t_comb,min ≥ t_h + t_skew",
        unitsAndNotes: "Independent of clock period T_clk; violations cannot be fixed by slowing the clock",
      },
      {
        name: "CMOS Dynamic Power Dissipation",
        equation: "P_dyn = α C_L V_DD² f_clk [W]",
        unitsAndNotes: "α: switching activity factor (0 ≤ α ≤ 1), C_L in F, V_DD in V, f_clk in Hz",
      },
    ],
    revisionNotes: [
      {
        heading: "Mealy vs. Moore Finite State Machines",
        points: [
          "Moore FSM: Outputs depend ONLY on the current state; glitch-free synchronous outputs, typically requires ≥ 1 extra state compared to Mealy.",
          "Mealy FSM: Outputs depend on current state AND current inputs; responds within the same clock cycle.",
        ],
      },
    ],
    derivations: [
      {
        title: "Minimum Clock Period & Hold Constraint with Skew",
        statement: "Derive the setup and hold timing inequalities between launch flip-flop FF1 and capture flip-flop FF2 with clock skew t_skew = t_clk2 - t_clk1.",
        steps: [
          "Launch FF1 launches data at t = 0; data arrives at FF2 D-input at t_arr = t_cq + t_comb.",
          "Setup requires data to arrive at least t_su before the next capture edge at T_clk + t_skew: t_cq,max + t_comb,max ≤ T_clk + t_skew - t_su.",
          "Hold requires new data NOT to overwrite the previous data before t_h after the capture edge at t_skew: t_cq,min + t_comb,min ≥ t_h + t_skew.",
        ],
        result: "Setup: T_clk ≥ t_cq,max + t_comb,max + t_su - t_skew; Hold: t_cq,min + t_comb,min ≥ t_h + t_skew.",
      },
    ],
    diagrams: [
      {
        id: "de-diag-1",
        kind: "block",
        title: "Moore Finite State Machine (FSM) Architecture",
        caption: "Next-state combinational logic feeding state register (D-FFs), with output logic driven solely by current state.",
        svgKey: "moore-fsm",
      },
    ],
    solvedNumericals: [
      {
        title: "Maximum Clock Frequency & Hold Check",
        problem: "A synchronous path has t_cq = 0.8 ns, t_comb,max = 3.2 ns, t_comb,min = 0.5 ns, t_su = 0.4 ns, t_h = 0.3 ns, and zero clock skew. Find f_max and verify if hold is met.",
        given: "t_cq = 0.8 ns, t_comb,max = 3.2 ns, t_comb,min = 0.5 ns, t_su = 0.4 ns, t_h = 0.3 ns, t_skew = 0",
        steps: [
          "T_clk,min = t_cq + t_comb,max + t_su = 0.8 + 3.2 + 0.4 = 4.4 ns.",
          "f_max = 1 / (4.4 × 10⁻⁹ s) ≈ 227.27 MHz.",
          "Hold check: t_cq + t_comb,min = 0.8 + 0.5 = 1.3 ns ≥ t_h (0.3 ns) ⇒ Hold satisfied with 1.0 ns slack.",
        ],
        answer: "f_max ≈ 227.27 MHz; Hold constraint satisfied (slack = +1.0 ns).",
      },
    ],
    questionsAndAnswers: [
      {
        question: "Why can't a hold-time violation be fixed by reducing the clock frequency?",
        type: "Conceptual",
        answer:
          "A hold-time race occurs on the SAME active clock edge between the launching flip-flop's new output and the capturing flip-flop's hold window. The clock period T_clk does not appear in the hold inequality (t_cq,min + t_comb,min ≥ t_h + t_skew).",
      },
      {
        question: "Explain static-1 hazard in combinational logic and how to eliminate it.",
        type: "Exam (5–10 Marks)",
        answer:
          "A static-1 hazard occurs when a single input variable changes and the output momentarily glitches to 0 instead of remaining 1 due to unequal gate delays between two adjacent prime implicants. Adding a redundant consensus prime implicant covering both adjacent minterms on the K-map eliminates the glitch.",
      },
    ],
  },

  "signals-and-systems": {
    subjectSlug: "signals-and-systems",
    version: "v1.0-original",
    chapterChecklist: [
      {
        chapter: "1. Signals & System Classifications",
        keyTopics: ["Energy vs. power signals", "Linearity, time-invariance, causality, BIBO stability"],
      },
      {
        chapter: "2. LTI Systems & Convolution",
        keyTopics: ["Impulse response h(t), h[n]", "Convolution integral & sum", "Step response"],
      },
      {
        chapter: "3. Fourier Series & Fourier Transform",
        keyTopics: ["CTFS & Dirichlet conditions", "CTFT & DTFT pairs", "Parseval's theorem", "Duality & modulation"],
      },
      {
        chapter: "4. Sampling Theorem",
        keyTopics: ["Nyquist-Shannon sampling", "Aliasing", "Ideal low-pass reconstruction"],
      },
      {
        chapter: "5. Laplace & Z-Transforms",
        keyTopics: ["Region of Convergence (ROC) properties", "Pole-zero plots", "Causality & stability from ROC", "Unilateral transforms with initial conditions"],
      },
    ],
    formulaSheet: [
      {
        name: "Continuous & Discrete Convolution",
        equation: "y(t) = ∫_{-∞}^{∞} x(τ) h(t - τ) dτ,   y[n] = ∑_{k=-∞}^{∞} x[k] h[n - k]",
        unitsAndNotes: "BIBO Stability: ∫|h(t)|dt < ∞ (CT) or ∑|h[n]| < ∞ (DT)",
      },
      {
        name: "Continuous-Time Fourier Transform (CTFT)",
        equation: "X(jω) = ∫_{-∞}^{∞} x(t) e^{-jωt} dt,   x(t) = (1/2π) ∫_{-∞}^{∞} X(jω) e^{jωt} dω",
        unitsAndNotes: "Parseval: ∫|x(t)|² dt = (1/2π) ∫|X(jω)|² dω",
      },
      {
        name: "Nyquist-Shannon Sampling Theorem",
        equation: "f_s > 2 f_max [Hz]   (ω_s > 2 ω_max [rad/s])",
        unitsAndNotes: "f_max: highest frequency component of bandlimited x(t)",
      },
      {
        name: "Laplace & Z-Transform Stability Criteria",
        equation: "CT LTI stable ⇔ jω-axis ∈ ROC(H(s));   DT LTI stable ⇔ unit circle |z|=1 ∈ ROC(H(z))",
        unitsAndNotes: "For causal LTI: all poles strictly in LHP (Re(s)<0) or inside |z|<1",
      },
    ],
    revisionNotes: [
      {
        heading: "ROC Rules for Laplace & Z-Transforms",
        points: [
          "The ROC never contains any poles.",
          "Right-sided signals have an ROC to the right of the rightmost pole (Re(s) > σ_max) or outside the outermost pole (|z| > r_max).",
          "Causal AND stable LTI systems must have all poles strictly inside the left-half s-plane (or inside |z| < 1).",
        ],
      },
    ],
    derivations: [
      {
        title: "Convolution Property of the Continuous-Time Fourier Transform",
        statement: "Prove that y(t) = x(t) * h(t) transforms to Y(jω) = X(jω) H(jω).",
        steps: [
          "Write Y(jω) = ∫_{-∞}^{∞} [∫_{-∞}^{∞} x(τ) h(t - τ) dτ] e^{-jωt} dt.",
          "Interchange order of integration (assuming absolute integrability): ∫ x(τ) [∫ h(t - τ) e^{-jωt} dt] dτ.",
          "Substitute u = t - τ (dt = du, t = u + τ): ∫ x(τ) e^{-jωτ} [∫ h(u) e^{-jωu} du] dτ.",
          "The inner integral is H(jω) and outer integral is X(jω), giving Y(jω) = X(jω) H(jω).",
        ],
        result: "x(t) * h(t)  ↔  X(jω) H(jω).",
      },
    ],
    diagrams: [
      {
        id: "ss-diag-1",
        kind: "block",
        title: "Closed-Loop LTI Feedback System Block Diagram",
        caption: "Forward path H(s) and feedback path G(s) yielding closed-loop transfer function T(s) = H(s) / (1 + H(s)G(s)).",
        svgKey: "lti-feedback-block",
      },
    ],
    solvedNumericals: [
      {
        title: "Nyquist Rate of a Modulated Signal",
        problem: "Find the Nyquist sampling rate f_N for x(t) = sinc(200t) + 2 cos(300πt), where sinc(u) = sin(πu)/(πu).",
        given: "x₁(t) = sinc(200t), x₂(t) = 2 cos(300πt)",
        steps: [
          "sinc(200t) has a rectangular CTFT extending from -100 Hz to +100 Hz, so f_max,1 = 100 Hz.",
          "2 cos(300πt) = 2 cos(2π · 150 t), so f_max,2 = 150 Hz.",
          "Overall maximum frequency f_max = max(100, 150) = 150 Hz.",
          "Nyquist rate f_N = 2 f_max = 2 × 150 = 300 Hz.",
        ],
        answer: "f_N = 300 Hz (300 samples/s).",
      },
    ],
    questionsAndAnswers: [
      {
        question: "Can an LTI system be both causal and unstable? Give an example.",
        type: "Conceptual",
        answer:
          "Yes. An ideal integrator h(t) = u(t) has H(s) = 1/s with ROC Re(s) > 0. It is causal (h(t) = 0 for t < 0) but unstable because the jω-axis is not inside the ROC (a bounded step input u(t) produces an unbounded ramp t·u(t)).",
      },
      {
        question: "State Parseval's relation for CTFT and explain its physical meaning.",
        type: "Exam (5–10 Marks)",
        answer:
          "∫_{-∞}^{∞} |x(t)|² dt = (1/2π) ∫_{-∞}^{∞} |X(jω)|² dω. It states that the total energy of an energy signal computed in the time domain equals the total energy integrated across all frequencies in the spectral domain, where |X(jω)|²/(2π) is the energy spectral density.",
      },
    ],
  },
};

