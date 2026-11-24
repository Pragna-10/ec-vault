import {
  Chapter,
  DifficultyLevel,
  StudyResource,
  Subject,
  UniversityMapping,
} from "@/types/database";

function buildDefaultResources(
  subjectSlug: string,
  subjectTitle: string,
  priceInr: number,
  chapters: string[],
  hasFreeFormulaSheet = false
): StudyResource[] {
  const safeChapters = chapters.length > 0 ? chapters : ["Module 1: Core Foundations", "Module 2: Analysis & Design"];
  return [
    {
      id: `${subjectSlug}-formula`,
      subjectSlug,
      title: `${subjectTitle} — One-Page Formula Cheat Sheet`,
      resourceType: "formula_sheet",
      documentStyle: "typeset",
      description:
        "High-density single-page formula reference covering key equations, boundary conditions, and standard transforms. (Sample/Demo Resource)",
      chapterList: safeChapters,
      version: "v1.0-sample",
      pageCount: 2,
      isFree: hasFreeFormulaSheet,
      priceInr: hasFreeFormulaSheet ? 0 : Math.max(19, Math.round(priceInr * 0.5)),
      allowDownload: hasFreeFormulaSheet,
      isSampleDemo: true,
      storagePath: `samples/${subjectSlug}/formula-sheet.pdf`,
      previewPages: [
        {
          pageNumber: 1,
          title: "Core Equations & Constants",
          excerpt: `Sample preview of the ${subjectTitle} formula sheet. Includes standardized notation aligned with NPTEL & IIT-level reference lectures.`,
          highlights: [
            "Key governing equations & units",
            "Standard transform / theorem pairs",
            "Quick sign-convention checklist",
          ],
        },
      ],
    },
    {
      id: `${subjectSlug}-notes-hw`,
      subjectSlug,
      title: `${subjectTitle} — Chapter-wise Concise Notes (Handwritten Style)`,
      resourceType: "concise_notes",
      documentStyle: "handwritten",
      description:
        "Clean, tablet-written style concise lecture notes with highlighted derivations, intuitive margin callouts, and circuit/block sketches. (Sample/Demo Resource)",
      chapterList: safeChapters,
      version: "v1.0-sample",
      pageCount: 28,
      isFree: false,
      priceInr,
      allowDownload: false,
      isSampleDemo: true,
      storagePath: `samples/${subjectSlug}/concise-notes-handwritten.pdf`,
      previewPages: [
        {
          pageNumber: 1,
          title: safeChapters[0],
          excerpt: `Handwritten-style conceptual overview for ${subjectTitle}, focusing on physical intuition before mathematical formalism.`,
          highlights: [
            "Highlighted key definitions",
            "Step-by-step annotated derivations",
            "Margin reminders for common pitfalls",
          ],
        },
      ],
    },
    {
      id: `${subjectSlug}-numericals`,
      subjectSlug,
      title: `${subjectTitle} — Solved Numerical Handbook`,
      resourceType: "numerical_handbook",
      documentStyle: "typeset",
      description:
        "Graded numerical problems from foundational to GATE/IIT-semester difficulty with step-by-step worked solutions and unit checks. (Sample/Demo Resource)",
      chapterList: safeChapters,
      version: "v1.0-sample",
      pageCount: 34,
      isFree: false,
      priceInr,
      allowDownload: false,
      isSampleDemo: true,
      storagePath: `samples/${subjectSlug}/numerical-handbook.pdf`,
      previewPages: [
        {
          pageNumber: 1,
          title: "Worked Numerical Examples",
          excerpt: `Step-by-step numerical problem solving methodology for ${subjectTitle} with dimensional analysis verification.`,
          highlights: [
            "Given data & assumptions clearly stated",
            "Alternative shortcut method where applicable",
            "Common calculation traps flagged",
          ],
        },
      ],
    },
    {
      id: `${subjectSlug}-revision`,
      subjectSlug,
      title: `${subjectTitle} — Exam Revision Pack (Derivations & Q&A)`,
      resourceType: "exam_revision",
      documentStyle: "typeset",
      description:
        "Last-week semester exam pack featuring high-probability derivations, conceptual short-answer questions, and viva prompts. (Sample/Demo Resource)",
      chapterList: safeChapters,
      version: "v1.0-sample",
      pageCount: 18,
      isFree: false,
      priceInr,
      allowDownload: false,
      isSampleDemo: true,
      storagePath: `samples/${subjectSlug}/exam-revision-pack.pdf`,
      previewPages: [
        {
          pageNumber: 1,
          title: "High-Yield Derivations & Exam Q&A",
          excerpt: `Structured derivation checklists and model answer frameworks for ${subjectTitle}.`,
          highlights: [
            "5-mark & 10-mark derivation templates",
            "Conceptual viva questions",
            "Last-minute formula verification table",
          ],
        },
      ],
    },
  ];
}

function buildPendingMappings(
  subjectTitle: string,
  semesterNumber: number,
  topics: string[]
): UniversityMapping[] {
  return [
    {
      id: `${subjectTitle}-map-iit`,
      universityName: "Consolidated IIT-Level Master Reference",
      universityCategory: "Consolidated Master",
      programme: "B.Tech Electronics & Communication Engineering",
      curriculumYear: "2025–2026 Reference",
      semesterNumber,
      courseCode: "Pending Verification",
      courseName: subjectTitle,
      credits: null,
      topics,
      verificationStatus: "pending_verification",
    },
    {
      id: `${subjectTitle}-map-nit`,
      universityName: "NIT / State University Reference Mapping",
      universityCategory: "NIT",
      programme: "B.Tech ECE",
      curriculumYear: "2025–2026 Reference",
      semesterNumber,
      courseCode: "Pending Verification",
      courseName: subjectTitle,
      credits: null,
      topics,
      verificationStatus: "pending_verification",
    },
  ];
}

function buildChapter(
  id: string,
  chapterNumber: number,
  title: string,
  summary: string,
  topics: string[],
  custom?: Partial<Chapter["contentTemplate"]>
): Chapter {
  return {
    id,
    chapterNumber,
    title,
    summary,
    topics,
    contentTemplate: {
      conceptExplanation:
        custom?.conceptExplanation ??
        `${title} introduces the foundational physical principles and mathematical models needed to analyze ${summary.toLowerCase()}.`,
      importantDefinitions: custom?.importantDefinitions ?? [
        {
          term: "Linearity & Superposition",
          definition:
            "A system property where the response to a weighted sum of inputs equals the same weighted sum of individual responses.",
        },
      ],
      mathematicalFormulae: custom?.mathematicalFormulae ?? [
        {
          name: "General Governing Relation",
          formula: "y(t) = T{x(t)}",
          variables: "x(t): excitation/input, y(t): response/output, T{.}: system operator",
        },
      ],
      derivations: custom?.derivations ?? [
        {
          title: `Core Derivation for ${title}`,
          steps: [
            "Step 1: State the physical assumptions and boundary conditions.",
            "Step 2: Apply conservation or constitutive equations.",
            "Step 3: Simplify under steady-state or small-signal regime to obtain the closed-form result.",
          ],
        },
      ],
      diagramNotes: custom?.diagramNotes ?? [
        {
          type: "Block Diagram",
          title: `${title} System Representation`,
          description:
            "Original vector block diagram illustrating signal flow from input stage through processing block to output.",
        },
      ],
      solvedNumericals: custom?.solvedNumericals ?? [
        {
          problem: `Evaluate the primary system parameter for ${title} under nominal operating conditions (Sample Problem).`,
          given: "Standard room-temperature / normalized parameters.",
          solutionSteps: [
            "Identify the governing equation from the formula sheet.",
            "Substitute consistent SI units.",
            "Verify dimensional consistency of the final value.",
          ],
          answer: "Sample numerical solution template ready for verified content.",
        },
      ],
      commonMistakes: custom?.commonMistakes ?? [
        "Mixing angular frequency (rad/s) with cyclic frequency (Hz).",
        "Ignoring initial conditions or sign conventions in phasor/Laplace domain.",
      ],
      examQuestions: custom?.examQuestions ?? [
        {
          question: `Derive the fundamental input-output relationship for ${title} and state its range of validity.`,
          marks: 10,
          hint: "Start from first principles and clearly state assumptions.",
        },
      ],
      furtherReading: custom?.furtherReading ?? [
        {
          title: "NPTEL Electronics & Communication Engineering Courses",
          source: "NPTEL / IIT",
          url: "https://nptel.ac.in",
        },
        {
          title: "MIT OpenCourseWare — Electrical Engineering & Computer Science",
          source: "MIT OCW",
          url: "https://ocw.mit.edu",
        },
      ],
    },
  };
}

interface SubjectSeedInput {
  slug: string;
  title: string;
  yearNumber: 1 | 2 | 3 | 4;
  semesterNumber: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  description: string;
  difficulty: DifficultyLevel;
  estimatedHours: number;
  priceInr: number;
  isElective?: boolean;
  isLab?: boolean;
  isPopular?: boolean;
  hasFreeFormulaSheet?: boolean;
  outcomes: string[];
  chapters: Chapter[];
  related: string[];
}

function makeSubject(input: SubjectSeedInput): Subject {
  const chapterTitles = input.chapters.map((c) => `Ch ${c.chapterNumber}: ${c.title}`);
  const allTopics = input.chapters.flatMap((c) => c.topics);
  return {
    id: `sub-${input.slug}`,
    slug: input.slug,
    title: input.title,
    yearNumber: input.yearNumber,
    semesterNumber: input.semesterNumber,
    description: input.description,
    difficulty: input.difficulty,
    estimatedHours: input.estimatedHours,
    isElective: Boolean(input.isElective),
    isLab: Boolean(input.isLab),
    isPopular: Boolean(input.isPopular),
    isPublished: true,
    collectionPriceInr: input.priceInr,
    learningOutcomes: input.outcomes,
    referenceResources: [
      {
        title: `${input.title} — NPTEL Reference Lectures`,
        provider: "NPTEL (IIT/IISc)",
        url: "https://nptel.ac.in",
      },
      {
        title: "MIT OpenCourseWare EECS Archive",
        provider: "MIT OCW",
        url: "https://ocw.mit.edu",
      },
    ],
    relatedSubjectSlugs: input.related,
    chapters: input.chapters,
    resources: buildDefaultResources(
      input.slug,
      input.title,
      input.priceInr,
      chapterTitles,
      Boolean(input.hasFreeFormulaSheet)
    ),
    universityMappings: buildPendingMappings(
      input.title,
      input.semesterNumber,
      allTopics.slice(0, 6)
    ),
  };
}

export const CURRICULUM_SUBJECTS: Subject[] = [
  // ==================== YEAR 1 ====================
  makeSubject({
    slug: "engineering-mathematics-1",
    title: "Engineering Mathematics I (Calculus & Linear Algebra)",
    yearNumber: 1,
    semesterNumber: 1,
    description:
      "Single and multivariable calculus, sequences and series, vector spaces, eigenvalues, and matrix diagonalization essential for ECE.",
    difficulty: "Foundational",
    estimatedHours: 45,
    priceInr: 24,
    isPopular: true,
    hasFreeFormulaSheet: true,
    outcomes: [
      "Analyze convergence of infinite series and Taylor expansions",
      "Solve linear systems using rank, nullity, and eigendecomposition",
      "Evaluate multiple integrals and vector calculus theorems (Green, Stokes, Gauss)",
    ],
    chapters: [
      buildChapter("em1-c1", 1, "Differential & Multivariable Calculus", "Partial derivatives, Jacobians, and extrema", [
        "Taylor Series",
        "Partial Derivatives",
        "Lagrange Multipliers",
      ]),
      buildChapter("em1-c2", 2, "Linear Algebra & Eigenvalues", "Vector spaces, rank, eigenvalues, and Cayley-Hamilton theorem", [
        "Matrix Rank",
        "Eigenvalues & Eigenvectors",
        "Diagonalization",
      ]),
      buildChapter("em1-c3", 3, "Vector Calculus", "Gradient, divergence, curl, and integral theorems", [
        "Divergence & Curl",
        "Stokes Theorem",
        "Gauss Divergence Theorem",
      ]),
    ],
    related: ["engineering-mathematics-2", "signals-and-systems", "electromagnetic-theory"],
  }),
  makeSubject({
    slug: "engineering-physics",
    title: "Engineering Physics (Quantum & Semiconductor Foundations)",
    yearNumber: 1,
    semesterNumber: 1,
    description:
      "Wave optics, quantum mechanics, Schrödinger equation, crystal structures, and band theory of solids forming the bedrock of semiconductor devices.",
    difficulty: "Foundational",
    estimatedHours: 40,
    priceInr: 19,
    hasFreeFormulaSheet: true,
    outcomes: [
      "Apply wave-particle duality and Schrödinger wave equations to potential wells",
      "Relate crystal lattices and energy bands to conductors, insulators, and semiconductors",
    ],
    chapters: [
      buildChapter("ep-c1", 1, "Quantum Mechanics Basics", "Wavefunctions, operators, and 1D potential box", [
        "De Broglie Wavelength",
        "Schrodinger Equation",
        "Quantum Tunneling",
      ]),
      buildChapter("ep-c2", 2, "Solid State & Band Theory", "Kronig-Penney model, Fermi-Dirac statistics, and effective mass", [
        "Energy Bands",
        "Fermi Level",
        "Carrier Concentration",
      ]),
    ],
    related: ["electronic-devices", "semiconductor-technology"],
  }),
  makeSubject({
    slug: "engineering-chemistry",
    title: "Engineering Chemistry & Materials",
    yearNumber: 1,
    semesterNumber: 1,
    description:
      "Electrochemistry, polymers, dielectric materials, corrosion, and spectroscopic techniques relevant to electronic packaging and PCB fabrication.",
    difficulty: "Foundational",
    estimatedHours: 30,
    priceInr: 19,
    outcomes: [
      "Understand battery electrochemistry and fuel cells",
      "Characterize electronic polymers, dielectrics, and nanomaterials",
    ],
    chapters: [
      buildChapter("ec-c1", 1, "Electrochemistry & Energy Storage", "Nernst equation, Li-ion cells, and fuel cells", [
        "Electrode Potentials",
        "Lithium-Ion Batteries",
      ]),
      buildChapter("ec-c2", 2, "Electronic Materials & Spectroscopy", "Conducting polymers, UV-Vis, and IR spectroscopy", [
        "Dielectric Materials",
        "Spectroscopy",
      ]),
    ],
    related: ["semiconductor-technology", "mems"],
  }),
  makeSubject({
    slug: "programming-for-problem-solving",
    title: "Programming & Data Structures in C",
    yearNumber: 1,
    semesterNumber: 1,
    description:
      "Structured programming in C, pointers, memory management, recursion, linked lists, stacks, queues, and algorithmic complexity.",
    difficulty: "Foundational",
    estimatedHours: 42,
    priceInr: 24,
    outcomes: [
      "Write memory-safe C programs using pointers and dynamic allocation",
      "Implement core data structures and analyze time/space complexity",
    ],
    chapters: [
      buildChapter("prog-c1", 1, "C Fundamentals, Pointers & Memory", "Control flow, arrays, pointer arithmetic, and malloc/free", [
        "Pointers",
        "Dynamic Memory",
        "Recursion",
      ]),
      buildChapter("prog-c2", 2, "Linear & Non-Linear Data Structures", "Linked lists, stacks, queues, trees, and sorting", [
        "Linked Lists",
        "Binary Trees",
        "Time Complexity",
      ]),
    ],
    related: ["microprocessors-computer-org", "embedded-systems"],
  }),
  makeSubject({
    slug: "basic-electrical-engineering",
    title: "Basic Electrical Engineering",
    yearNumber: 1,
    semesterNumber: 1,
    description:
      "DC/AC circuit analysis, phasors, three-phase systems, magnetic circuits, transformers, and electrical machines.",
    difficulty: "Foundational",
    estimatedHours: 38,
    priceInr: 24,
    isPopular: true,
    outcomes: [
      "Solve DC circuits using KVL, KCL, Thevenin, and Norton theorems",
      "Analyze single-phase and three-phase AC circuits using phasors",
    ],
    chapters: [
      buildChapter("bee-c1", 1, "DC Circuits & Network Theorems", "Mesh, nodal analysis, superposition, and maximum power transfer", [
        "KVL & KCL",
        "Thevenin Theorem",
        "Norton Theorem",
      ]),
      buildChapter("bee-c2", 2, "AC Phasors & Transformers", "RLC resonance, power factor, and ideal transformer equations", [
        "Phasor Algebra",
        "Resonance",
        "Single-Phase Transformer",
      ]),
    ],
    related: ["network-theory", "basic-electronics"],
  }),
  makeSubject({
    slug: "engineering-mathematics-2",
    title: "Engineering Mathematics II (ODEs, PDEs & Complex Analysis)",
    yearNumber: 1,
    semesterNumber: 2,
    description:
      "Ordinary and partial differential equations, Laplace transforms, Fourier series, and complex variable calculus for circuit and signal analysis.",
    difficulty: "Foundational",
    estimatedHours: 45,
    priceInr: 24,
    outcomes: [
      "Solve higher-order ODEs and boundary-value PDEs",
      "Apply Cauchy-Riemann equations, residue theorem, and Laplace transforms",
    ],
    chapters: [
      buildChapter("em2-c1", 1, "ODEs & Laplace Transforms", "First/second order ODEs, step/impulse responses", [
        "Homogeneous ODEs",
        "Laplace Transform",
      ]),
      buildChapter("em2-c2", 2, "Complex Analysis & Residue Theorem", "Analytic functions, Laurent series, and contour integration", [
        "Cauchy-Riemann",
        "Residue Theorem",
      ]),
    ],
    related: ["engineering-mathematics-1", "signals-and-systems"],
  }),
  makeSubject({
    slug: "basic-electronics",
    title: "Basic Electronics Engineering",
    yearNumber: 1,
    semesterNumber: 2,
    description:
      "PN junction diodes, rectifiers, Zener regulators, BJT/MOSFET fundamentals, operational amplifiers, and introductory digital logic.",
    difficulty: "Foundational",
    estimatedHours: 38,
    priceInr: 24,
    hasFreeFormulaSheet: true,
    outcomes: [
      "Design diode rectifier, clipper, and Zener regulator circuits",
      "Analyze basic BJT biasing and ideal op-amp inverting/non-inverting stages",
    ],
    chapters: [
      buildChapter("be-c1", 1, "Semiconductor Diodes & Applications", "V-I characteristics, half/full-wave rectifiers, clippers, clampers", [
        "PN Junction",
        "Rectifiers",
        "Zener Regulator",
      ]),
      buildChapter("be-c2", 2, "BJT, Op-Amp & Logic Gates", "Transistor regions, op-amp virtual ground, Boolean gates", [
        "BJT Biasing",
        "Ideal Op-Amp",
        "Logic Gates",
      ]),
    ],
    related: ["electronic-devices", "analog-circuits", "digital-electronics"],
  }),
  makeSubject({
    slug: "engineering-mechanics",
    title: "Engineering Mechanics",
    yearNumber: 1,
    semesterNumber: 2,
    description:
      "Statics, equilibrium of rigid bodies, friction, centroids, moments of inertia, and kinematics/kinetics of particles.",
    difficulty: "Foundational",
    estimatedHours: 34,
    priceInr: 19,
    outcomes: [
      "Draw free-body diagrams and solve 2D/3D static equilibrium problems",
      "Compute area moments of inertia and analyze rigid-body dynamics",
    ],
    chapters: [
      buildChapter("emech-c1", 1, "Statics & Equilibrium", "Force systems, trusses, friction, and virtual work", [
        "Free Body Diagrams",
        "Friction",
      ]),
      buildChapter("emech-c2", 2, "Kinematics & Kinetics", "Rectilinear motion, Newton's laws, work-energy principle", [
        "Moment of Inertia",
        "Work-Energy",
      ]),
    ],
    related: ["robotics"],
  }),
  makeSubject({
    slug: "engineering-graphics",
    title: "Engineering Graphics & CAD",
    yearNumber: 1,
    semesterNumber: 2,
    description:
      "Orthographic projections, isometric views, sectioning of solids, and introductory 2D/3D CAD drafting for hardware enclosures.",
    difficulty: "Foundational",
    estimatedHours: 28,
    priceInr: 19,
    outcomes: [
      "Interpret first-angle and third-angle orthographic projections",
      "Create isometric views and basic CAD part drawings",
    ],
    chapters: [
      buildChapter("eg-c1", 1, "Orthographic & Isometric Projections", "Projections of points, lines, planes, and solids", [
        "Orthographic Views",
        "Isometric Projection",
      ]),
    ],
    related: ["mems"],
  }),
  makeSubject({
    slug: "electrical-electronics-workshop-lab",
    title: "Electrical & Electronics Workshop Lab",
    yearNumber: 1,
    semesterNumber: 2,
    description:
      "Hands-on breadboarding, multimeter/oscilloscope operation, soldering safety, and characterization of passive/active components.",
    difficulty: "Foundational",
    estimatedHours: 24,
    priceInr: 19,
    isLab: true,
    outcomes: [
      "Operate DSO, function generator, and digital multimeter safely",
      "Assemble and debug basic rectifier and op-amp breadboard circuits",
    ],
    chapters: [
      buildChapter("lab1-c1", 1, "Lab Instrumentation & Soldering", "CRO/DSO triggering, probes, and component color codes", [
        "Oscilloscope",
        "Breadboarding",
      ]),
    ],
    related: ["basic-electronics", "analog-digital-lab"],
  }),

  // ==================== YEAR 2 ====================
  makeSubject({
    slug: "network-theory",
    title: "Network Theory & Circuit Analysis",
    yearNumber: 2,
    semesterNumber: 3,
    description:
      "Graph theory, transient analysis via Laplace transforms, two-port parameters (Z, Y, h, ABCD), and passive network synthesis.",
    difficulty: "Intermediate",
    estimatedHours: 45,
    priceInr: 29,
    isPopular: true,
    hasFreeFormulaSheet: true,
    outcomes: [
      "Analyze first- and second-order RLC transients using s-domain circuits",
      "Derive and interconnect Z, Y, h, and ABCD two-port network parameters",
    ],
    chapters: [
      buildChapter("nt-c1", 1, "Graph Theory & Network Topology", "Trees, co-trees, cut-set, and tie-set matrices", [
        "Incidence Matrix",
        "Cut-Set & Tie-Set",
      ]),
      buildChapter("nt-c2", 2, "Transient & s-Domain Analysis", "Initial/final value theorems, zero-input and zero-state response", [
        "RLC Transients",
        "Laplace Impedance",
      ]),
      buildChapter("nt-c3", 3, "Two-Port Networks & Foster/Cauer Synthesis", "Z, Y, ABCD parameters, reciprocity, and LC driving-point functions", [
        "Two-Port Parameters",
        "Network Synthesis",
      ]),
    ],
    related: ["basic-electrical-engineering", "signals-and-systems", "analog-circuits"],
  }),
  makeSubject({
    slug: "electronic-devices",
    title: "Electronic Devices & Semiconductor Physics",
    yearNumber: 2,
    semesterNumber: 3,
    description:
      "Carrier transport, drift-diffusion, PN junction electrostatics, BJT physics, MOS capacitor, and MOSFET I-V characteristics.",
    difficulty: "Intermediate",
    estimatedHours: 44,
    priceInr: 29,
    isPopular: true,
    outcomes: [
      "Compute carrier concentrations, Fermi levels, and drift/diffusion currents",
      "Derive MOSFET threshold voltage and square-law drain current equations",
    ],
    chapters: [
      buildChapter("ed-c1", 1, "Carrier Transport & Continuity", "Drift, diffusion, Einstein relation, and Hall effect", [
        "Drift & Diffusion",
        "Continuity Equation",
      ]),
      buildChapter("ed-c2", 2, "PN Junction & BJT Physics", "Depletion width, built-in potential, Ebers-Moll model", [
        "Depletion Capacitance",
        "BJT Modes",
      ]),
      buildChapter("ed-c3", 3, "MOS Capacitor & MOSFET", "Accumulation, depletion, inversion, and channel-length modulation", [
        "MOS Threshold Voltage",
        "MOSFET Saturation",
      ]),
    ],
    related: ["analog-circuits", "vlsi-design", "semiconductor-technology"],
  }),
  makeSubject({
    slug: "digital-electronics",
    title: "Digital Electronics & Logic Design",
    yearNumber: 2,
    semesterNumber: 3,
    description:
      "Boolean algebra, K-maps, combinational blocks, flip-flops, synchronous FSMs, counters, and CMOS/TTL logic families.",
    difficulty: "Intermediate",
    estimatedHours: 42,
    priceInr: 29,
    isPopular: true,
    hasFreeFormulaSheet: true,
    outcomes: [
      "Minimize multi-variable Boolean functions using K-maps and Quine-McCluskey",
      "Design synchronous Mealy and Moore finite state machines",
    ],
    chapters: [
      buildChapter("de-c1", 1, "Combinational Logic & Minimization", "K-maps, multiplexers, decoders, and adders", [
        "Karnaugh Maps",
        "MUX & Decoders",
        "Carry-Lookahead Adder",
      ]),
      buildChapter("de-c2", 2, "Sequential Circuits & FSMs", "SR/JK/D/T flip-flops, setup/hold timing, Mealy & Moore FSMs", [
        "Flip-Flops",
        "Counters & Shift Registers",
        "State Minimization",
      ]),
    ],
    related: ["microprocessors-computer-org", "vlsi-design", "fpga-hardware-design"],
  }),
  makeSubject({
    slug: "signals-and-systems",
    title: "Signals and Systems",
    yearNumber: 2,
    semesterNumber: 3,
    description:
      "Continuous and discrete-time LTI systems, convolution, Fourier series/transform, Laplace transform, Z-transform, and sampling theorem.",
    difficulty: "Intermediate",
    estimatedHours: 48,
    priceInr: 34,
    isPopular: true,
    hasFreeFormulaSheet: true,
    outcomes: [
      "Determine LTI system stability and causality from impulse response and ROC",
      "Transform signals between time and frequency domains using CTFT, DTFT, Laplace, and Z-transforms",
    ],
    chapters: [
      buildChapter("ss-c1", 1, "LTI Systems & Convolution", "System properties, impulse response, and BIBO stability", [
        "Linearity & Time-Invariance",
        "Convolution Integral",
      ], {
        conceptExplanation:
          "A Linear Time-Invariant (LTI) system is completely characterized by its impulse response h(t) in continuous time or h[n] in discrete time. Any arbitrary input can be decomposed into weighted shifted impulses, making convolution the universal input-output law.",
        mathematicalFormulae: [
          {
            name: "Continuous-Time Convolution",
            formula: "y(t) = ∫ x(τ) h(t - τ) dτ  (from -∞ to +∞)",
            variables: "x(t): input signal, h(t): impulse response, y(t): system output",
          },
          {
            name: "BIBO Stability Condition",
            formula: "∫ |h(t)| dt < ∞",
            variables: "Absolute integrability of impulse response",
          },
        ],
      }),
      buildChapter("ss-c2", 2, "Fourier Analysis & Sampling", "CTFS, CTFT, DTFT, and Nyquist-Shannon sampling theorem", [
        "Fourier Transform Pairs",
        "Parseval's Theorem",
        "Nyquist Rate",
      ]),
      buildChapter("ss-c3", 3, "Laplace & Z-Transforms", "Region of Convergence (ROC), pole-zero plots, and difference equations", [
        "ROC Properties",
        "Unilateral Z-Transform",
      ]),
    ],
    related: ["dsp", "analog-communication", "control-systems"],
  }),
  makeSubject({
    slug: "analog-circuits",
    title: "Analog Electronic Circuits",
    yearNumber: 2,
    semesterNumber: 4,
    description:
      "Small-signal BJT/MOSFET amplifiers, frequency response, differential pairs, current mirrors, feedback topologies, oscillators, and op-amp circuits.",
    difficulty: "Intermediate",
    estimatedHours: 48,
    priceInr: 34,
    isPopular: true,
    outcomes: [
      "Compute mid-band gain, input/output impedance, and 3-dB bandwidth of multi-stage amplifiers",
      "Analyze negative feedback topologies and Barkhausen oscillation criteria",
    ],
    chapters: [
      buildChapter("ac-c1", 1, "Single-Stage & Differential Amplifiers", "CE/CS, CB/CG, CC/CD stages, and differential pair CMRR", [
        "Small-Signal Hybrid-Pi",
        "Differential Pair",
        "Current Mirrors",
      ]),
      buildChapter("ac-c2", 2, "Frequency Response & Feedback", "Miller theorem, high-frequency poles, 4 feedback topologies", [
        "Miller Effect",
        "Feedback Topologies",
        "Oscillators",
      ]),
    ],
    related: ["electronic-devices", "analog-ic-design"],
  }),
  makeSubject({
    slug: "electromagnetic-theory",
    title: "Electromagnetic Theory",
    yearNumber: 2,
    semesterNumber: 4,
    description:
      "Electrostatics, magnetostatics, Maxwell's equations, uniform plane waves, Poynting vector, transmission lines, Smith chart, and waveguides.",
    difficulty: "Advanced",
    estimatedHours: 48,
    priceInr: 34,
    outcomes: [
      "Apply Maxwell's equations to wave propagation in lossless and lossy media",
      "Design impedance matching networks using transmission line equations and Smith charts",
    ],
    chapters: [
      buildChapter("emt-c1", 1, "Maxwell's Equations & Plane Waves", "Displacement current, Helmholtz wave equation, skin depth, Poynting theorem", [
        "Maxwell Equations",
        "Skin Depth",
        "Poynting Vector",
      ]),
      buildChapter("emt-c2", 2, "Transmission Lines & Waveguides", "Telegrapher's equations, VSWR, Smith chart, TE/TM modes", [
        "VSWR & Reflection",
        "Smith Chart",
        "Rectangular Waveguides",
      ]),
    ],
    related: ["antenna-theory", "microwave-engineering", "rf-engineering"],
  }),
  makeSubject({
    slug: "probability-random-processes",
    title: "Probability Theory & Random Processes",
    yearNumber: 2,
    semesterNumber: 4,
    description:
      "Axiomatic probability, random variables, PDF/CDF, joint distributions, Central Limit Theorem, WSS random processes, autocorrelation, and PSD.",
    difficulty: "Intermediate",
    estimatedHours: 40,
    priceInr: 29,
    outcomes: [
      "Compute expectations, moments, and transformations of random variables",
      "Analyze Wide-Sense Stationary (WSS) processes through LTI systems using PSD",
    ],
    chapters: [
      buildChapter("prp-c1", 1, "Random Variables & Distributions", "Gaussian, Rayleigh, Exponential, Poisson, and characteristic functions", [
        "Gaussian Distribution",
        "Central Limit Theorem",
      ]),
      buildChapter("prp-c2", 2, "Random Processes & Noise", "Stationarity, ergodicity, autocorrelation, Wiener-Khinchin theorem", [
        "WSS Processes",
        "Power Spectral Density",
        "AWGN",
      ]),
    ],
    related: ["digital-communication", "information-theory-coding"],
  }),
  makeSubject({
    slug: "control-systems",
    title: "Control Systems Engineering",
    yearNumber: 2,
    semesterNumber: 4,
    description:
      "Transfer functions, block diagram reduction, time-domain response, Routh-Hurwitz stability, root locus, Bode/Nyquist plots, and state-space analysis.",
    difficulty: "Intermediate",
    estimatedHours: 42,
    priceInr: 29,
    outcomes: [
      "Assess closed-loop stability using Routh-Hurwitz, Root Locus, and Nyquist criteria",
      "Design lead/lag compensators and analyze controllability/observability in state space",
    ],
    chapters: [
      buildChapter("cs-c1", 1, "Time Response & Stability", "Mason's gain formula, steady-state error, Routh array", [
        "Signal Flow Graphs",
        "Routh-Hurwitz",
      ]),
      buildChapter("cs-c2", 2, "Frequency Domain & State Space", "Root locus, Bode gain/phase margins, state transition matrix", [
        "Bode & Nyquist Plots",
        "State-Space Model",
      ]),
    ],
    related: ["signals-and-systems", "robotics"],
  }),
  makeSubject({
    slug: "microprocessors-computer-org",
    title: "Microprocessors & Computer Organization",
    yearNumber: 2,
    semesterNumber: 4,
    description:
      "CPU datapath, instruction set architecture, pipelining, memory hierarchy/cache, 8085/8086/RISC-V architecture, interrupts, and I/O interfacing.",
    difficulty: "Intermediate",
    estimatedHours: 42,
    priceInr: 29,
    outcomes: [
      "Write assembly routines and analyze pipeline hazards and cache hit rates",
      "Interface memory and peripheral I/O devices using interrupts and DMA",
    ],
    chapters: [
      buildChapter("mp-c1", 1, "CPU Architecture & Pipelining", "ISA design, ALU datapath, data/control hazards, cache mapping", [
        "RISC vs CISC",
        "Pipelining Hazards",
        "Cache Memory",
      ]),
      buildChapter("mp-c2", 2, "Microprocessor Interfacing", "Addressing modes, interrupts, 8255 PPI, and DMA", [
        "Interrupts",
        "Memory Interfacing",
      ]),
    ],
    related: ["embedded-systems", "arm-architecture"],
  }),
  makeSubject({
    slug: "analog-digital-lab",
    title: "Analog & Digital Circuits Laboratory",
    yearNumber: 2,
    semesterNumber: 4,
    description:
      "Experimental verification of BJT/MOSFET amplifiers, op-amp filters, oscillators, and Verilog/TTL sequential digital circuits.",
    difficulty: "Intermediate",
    estimatedHours: 24,
    priceInr: 19,
    isLab: true,
    outcomes: [
      "Measure amplifier gain-bandwidth product and harmonic distortion",
      "Synthesize and test counters and FSMs on trainer kits / FPGAs",
    ],
    chapters: [
      buildChapter("adlab-c1", 1, "Analog & Digital Lab Experiments", "CE amplifier, Wien bridge oscillator, synchronous counter", [
        "Op-Amp Filters",
        "Sequential Testing",
      ]),
    ],
    related: ["analog-circuits", "digital-electronics"],
  }),

  // ==================== YEAR 3 ====================
  makeSubject({
    slug: "analog-communication",
    title: "Analog Communication Systems",
    yearNumber: 3,
    semesterNumber: 5,
    description:
      "AM, DSB-SC, SSB, VSB modulation, FM/PM angle modulation, superheterodyne receivers, PLLs, and SNR performance in AWGN.",
    difficulty: "Intermediate",
    estimatedHours: 40,
    priceInr: 29,
    outcomes: [
      "Compare bandwidth and power efficiency of AM, SSB, and FM schemes",
      "Compute pre-emphasis/de-emphasis and figure-of-merit SNR gains",
    ],
    chapters: [
      buildChapter("acom-c1", 1, "Amplitude Modulation Schemes", "DSB-FC, DSB-SC, SSB, Hilbert transform, envelope detector", [
        "Modulation Index",
        "SSB Generation",
      ]),
      buildChapter("acom-c2", 2, "Angle Modulation & Noise", "Narrowband/Wideband FM, Carson's rule, superheterodyne, FM threshold", [
        "Carson's Rule",
        "PLL Demodulator",
        "SNR Figure of Merit",
      ]),
    ],
    related: ["digital-communication", "signals-and-systems"],
  }),
  makeSubject({
    slug: "digital-communication",
    title: "Digital Communication Systems",
    yearNumber: 3,
    semesterNumber: 5,
    description:
      "PCM, DPCM, line coding, ISI & Nyquist pulse shaping, Gram-Schmidt orthogonalization, matched filter, BPSK/QPSK/QAM, and BER analysis.",
    difficulty: "Advanced",
    estimatedHours: 48,
    priceInr: 34,
    isPopular: true,
    outcomes: [
      "Design matched-filter and MAP/ML receivers in signal-space representation",
      "Derive bit-error-rate (BER) expressions for BPSK, QPSK, FSK, and M-QAM",
    ],
    chapters: [
      buildChapter("dcom-c1", 1, "Baseband Transmission & ISI", "PCM quantization SNR, raised-cosine pulse shaping, eye diagrams", [
        "PCM Quantization",
        "Nyquist Criterion for Zero ISI",
      ]),
      buildChapter("dcom-c2", 2, "Passband Modulation & Optimal Detection", "Signal space, matched filter, QPSK, M-QAM, Q-function BER", [
        "Matched Filter",
        "Constellation Diagrams",
        "BER Analysis",
      ]),
    ],
    related: ["information-theory-coding", "wireless-communication"],
  }),
  makeSubject({
    slug: "dsp",
    title: "Digital Signal Processing (DSP)",
    yearNumber: 3,
    semesterNumber: 5,
    description:
      "DFT, radix-2 FFT algorithms, circular convolution, IIR filter design (Butterworth/Chebyshev bilinear), FIR window/Parks-McClellan, and multirate DSP.",
    difficulty: "Advanced",
    estimatedHours: 48,
    priceInr: 34,
    isPopular: true,
    hasFreeFormulaSheet: true,
    outcomes: [
      "Compute N-point DFTs efficiently using DIT/DIF radix-2 FFT butterflies",
      "Design stable IIR and linear-phase FIR digital filters to meet spectral specifications",
    ],
    chapters: [
      buildChapter("dsp-c1", 1, "DFT & Fast Fourier Transform", "Circular convolution, DIT-FFT, DIF-FFT, overlap-add/save", [
        "DFT Properties",
        "Radix-2 FFT",
      ]),
      buildChapter("dsp-c2", 2, "IIR & FIR Filter Design", "Bilinear transformation, frequency warping, linear-phase FIR windows", [
        "Bilinear Transform",
        "FIR Windows",
        "Direct/Cascade Realizations",
      ]),
    ],
    related: ["signals-and-systems", "image-processing", "adaptive-signal-processing"],
  }),
  makeSubject({
    slug: "information-theory-coding",
    title: "Information Theory and Coding",
    yearNumber: 3,
    semesterNumber: 5,
    description:
      "Entropy, mutual information, Huffman/Lempel-Ziv source coding, Shannon channel capacity, linear block codes, cyclic/BCH codes, and convolutional Viterbi decoding.",
    difficulty: "Advanced",
    estimatedHours: 42,
    priceInr: 34,
    outcomes: [
      "Compute entropy, mutual information, and AWGN Shannon-Hartley capacity",
      "Construct generator/parity-check matrices and decode convolutional codes via Viterbi",
    ],
    chapters: [
      buildChapter("itc-c1", 1, "Source Coding & Channel Capacity", "Kraft inequality, Huffman coding, differential entropy, Shannon limit", [
        "Entropy & Mutual Information",
        "Shannon-Hartley Theorem",
      ]),
      buildChapter("itc-c2", 2, "Error Control Coding", "Hamming distance, syndrome decoding, CRC, Viterbi trellis", [
        "Linear Block Codes",
        "Cyclic Codes",
        "Convolutional Codes",
      ]),
    ],
    related: ["digital-communication", "wireless-communication"],
  }),
  makeSubject({
    slug: "computer-networks",
    title: "Computer Networks & Protocols",
    yearNumber: 3,
    semesterNumber: 5,
    description:
      "OSI/TCP-IP stack, MAC protocols (CSMA/CD, CSMA/CA), IPv4/IPv6 subnetting, OSPF/BGP routing, TCP congestion control, and DNS/HTTP.",
    difficulty: "Intermediate",
    estimatedHours: 40,
    priceInr: 29,
    outcomes: [
      "Design CIDR subnetting plans and trace packet forwarding across routers",
      "Analyze TCP flow/congestion control (AIMD, slow start) and MAC efficiency",
    ],
    chapters: [
      buildChapter("cn-c1", 1, "Data Link & MAC Layer", "Framing, sliding window ARQ, Ethernet, Wi-Fi CSMA/CA", [
        "ARQ Protocols",
        "CSMA/CD & CA",
      ]),
      buildChapter("cn-c2", 2, "Network & Transport Layers", "CIDR, Dijkstra/Bellman-Ford, TCP Reno/Cubic, congestion window", [
        "IP Subnetting",
        "Routing Algorithms",
        "TCP Congestion Control",
      ]),
    ],
    related: ["iot", "5g-6g-networks"],
  }),
  makeSubject({
    slug: "vlsi-design",
    title: "VLSI Design (CMOS Digital Circuits)",
    yearNumber: 3,
    semesterNumber: 6,
    description:
      "CMOS inverter VTC, static/dynamic power, Elmore delay, logical effort, combinational/sequential CMOS topologies, and physical layout rules.",
    difficulty: "Advanced",
    estimatedHours: 48,
    priceInr: 39,
    isPopular: true,
    outcomes: [
      "Calculate propagation delay using RC Elmore delay and logical effort",
      "Design static CMOS, pass-transistor, dynamic domino, and 6T SRAM cells",
    ],
    chapters: [
      buildChapter("vlsi-c1", 1, "CMOS Inverter & Delay Modeling", "Noise margins, switching threshold, Elmore delay, logical effort", [
        "VTC & Noise Margins",
        "Logical Effort",
      ]),
      buildChapter("vlsi-c2", 2, "CMOS Logic, Power & Memory", "Dynamic power, leakage, domino logic, 6T SRAM cell stability", [
        "Dynamic CMOS",
        "6T SRAM",
        "Stick Diagrams",
      ]),
    ],
    related: ["advanced-vlsi", "digital-ic-design", "electronic-devices"],
  }),
  makeSubject({
    slug: "antenna-theory",
    title: "Antenna Theory & Wave Propagation",
    yearNumber: 3,
    semesterNumber: 6,
    description:
      "Radiation integrals, Hertzian dipole, half-wave dipole, antenna arrays, Yagi-Uda, microstrip patch antennas, and ground/sky-wave propagation.",
    difficulty: "Advanced",
    estimatedHours: 40,
    priceInr: 29,
    outcomes: [
      "Compute radiation resistance, directivity, gain, and Friis transmission loss",
      "Synthesize broadside and end-fire linear antenna arrays",
    ],
    chapters: [
      buildChapter("ant-c1", 1, "Radiation Fundamentals & Wire Antennas", "Retarded potentials, dipole patterns, Friis equation", [
        "Directivity & Gain",
        "Half-Wave Dipole",
      ]),
      buildChapter("ant-c2", 2, "Antenna Arrays & Microstrip Patch", "Array factor, binomial/Dolph-Chebyshev arrays, patch antennas", [
        "Array Factor",
        "Microstrip Patch",
      ]),
    ],
    related: ["electromagnetic-theory", "rf-engineering", "microwave-engineering"],
  }),
  makeSubject({
    slug: "rf-engineering",
    title: "RF Engineering & Circuit Design",
    yearNumber: 3,
    semesterNumber: 6,
    description:
      "S-parameters, RF impedance matching, low-noise amplifiers (LNAs), mixers, VCOs, phase noise, and link-budget linearity (IIP3, P1dB).",
    difficulty: "Advanced",
    estimatedHours: 40,
    priceInr: 34,
    isElective: true,
    outcomes: [
      "Design L-, Pi-, and T-section RF matching networks using Smith charts",
      "Evaluate cascaded noise figure and third-order intercept point (IIP3)",
    ],
    chapters: [
      buildChapter("rf-c1", 1, "S-Parameters & Matching Networks", "Two-port scattering matrix, stability circles, Smith chart matching", [
        "S-Parameters",
        "Impedance Matching",
      ]),
      buildChapter("rf-c2", 2, "RF Transceiver Blocks", "LNA noise figure, Gilbert mixer, VCO phase noise, IIP3", [
        "Noise Figure",
        "Linearity & IIP3",
      ]),
    ],
    related: ["microwave-engineering", "antenna-theory"],
  }),
  makeSubject({
    slug: "microwave-engineering",
    title: "Microwave Engineering",
    yearNumber: 3,
    semesterNumber: 6,
    description:
      "Microwave passive components (directional couplers, magic-T, circulators), microstrip lines, Gunn/IMPATT diodes, Klystron, and TWT.",
    difficulty: "Advanced",
    estimatedHours: 38,
    priceInr: 29,
    outcomes: [
      "Derive S-matrices for directional couplers, hybrids, and isolators",
      "Explain velocity modulation and operation of microwave vacuum/solid-state sources",
    ],
    chapters: [
      buildChapter("mw-c1", 1, "Microwave Passive Components", "E/H-plane tees, magic-T, directional couplers, ferrite circulators", [
        "Magic-T S-Matrix",
        "Directional Coupler",
      ]),
      buildChapter("mw-c2", 2, "Microwave Active Sources", "Reflex klystron, magnetron, TWT, and Gunn diode", [
        "Klystron",
        "Gunn Diode",
      ]),
    ],
    related: ["electromagnetic-theory", "rf-engineering", "radar-systems"],
  }),
  makeSubject({
    slug: "embedded-systems",
    title: "Embedded Systems & Real-Time OS",
    yearNumber: 3,
    semesterNumber: 6,
    description:
      "Microcontroller peripherals (ADC, PWM, timers), serial buses (UART, SPI, I2C, CAN), interrupt latency, and FreeRTOS task scheduling.",
    difficulty: "Intermediate",
    estimatedHours: 42,
    priceInr: 29,
    isPopular: true,
    outcomes: [
      "Write bare-metal C drivers for UART, SPI, I2C, and PWM peripherals",
      "Design deterministic RTOS multi-tasking applications avoiding priority inversion",
    ],
    chapters: [
      buildChapter("emb-c1", 1, "Peripherals & Communication Buses", "GPIO, timers, ADC, UART, SPI, I2C, CAN protocols", [
        "SPI vs I2C",
        "Timers & PWM",
      ]),
      buildChapter("emb-c2", 2, "RTOS Scheduling & Synchronization", "Rate-monotonic scheduling, semaphores, mutexes, priority inheritance", [
        "FreeRTOS Tasks",
        "Priority Inversion",
      ]),
    ],
    related: ["arm-architecture", "iot", "microprocessors-computer-org"],
  }),
  makeSubject({
    slug: "arm-architecture",
    title: "ARM Architecture & Cortex-M Systems",
    yearNumber: 3,
    semesterNumber: 6,
    description:
      "ARM Cortex-M programmer's model, Thumb-2 instruction set, NVIC nested interrupts, CMSIS, memory protection unit, and low-power sleep modes.",
    difficulty: "Intermediate",
    estimatedHours: 36,
    priceInr: 29,
    isElective: true,
    outcomes: [
      "Navigate ARM Thumb-2 registers, exception stack frames, and NVIC priorities",
      "Optimize firmware power consumption using Cortex-M sleep/deep-sleep modes",
    ],
    chapters: [
      buildChapter("arm-c1", 1, "Cortex-M Core & Thumb-2 ISA", "Registers, pipeline, barrel shifter, exception handling", [
        "Thumb-2 ISA",
        "NVIC Interrupts",
      ]),
    ],
    related: ["embedded-systems", "microprocessors-computer-org"],
  }),
  makeSubject({
    slug: "optical-communication",
    title: "Optical Fiber Communication",
    yearNumber: 3,
    semesterNumber: 6,
    description:
      "Step/graded-index fibers, modal/chromatic dispersion, attenuation, LED/Laser sources, PIN/APD photodetectors, EDFA, and WDM link budgets.",
    difficulty: "Intermediate",
    estimatedHours: 36,
    priceInr: 29,
    outcomes: [
      "Calculate numerical aperture, V-number, and dispersion-limited bit rates",
      "Perform optical power and rise-time link budget calculations",
    ],
    chapters: [
      buildChapter("opt-c1", 1, "Optical Fibers & Dispersion", "Total internal reflection, single-mode V-number, chromatic dispersion", [
        "Numerical Aperture",
        "Pulse Broadening",
      ]),
      buildChapter("opt-c2", 2, "Sources, Detectors & WDM", "Laser diodes, PIN/APD responsivity, optical link budget", [
        "PIN & APD",
        "WDM Systems",
      ]),
    ],
    related: ["electromagnetic-theory", "digital-communication"],
  }),
  makeSubject({
    slug: "wireless-communication",
    title: "Wireless Communication & Fading Channels",
    yearNumber: 3,
    semesterNumber: 6,
    description:
      "Cellular reuse, path loss models, Rayleigh/Rician fading, Doppler spread, diversity combining, OFDM, and MIMO capacity.",
    difficulty: "Advanced",
    estimatedHours: 44,
    priceInr: 34,
    outcomes: [
      "Compute co-channel interference and Erlang-B trunking capacity in cellular networks",
      "Analyze flat/frequency-selective fading and OFDM cyclic prefix design",
    ],
    chapters: [
      buildChapter("wc-c1", 1, "Cellular Concepts & Fading Channels", "Frequency reuse, coherence bandwidth/time, Rayleigh fading", [
        "Frequency Reuse",
        "Delay & Doppler Spread",
      ]),
      buildChapter("wc-c2", 2, "Diversity, OFDM & MIMO", "MRC diversity, OFDM subcarriers, Alamouti STBC, spatial multiplexing", [
        "OFDM",
        "MIMO Capacity",
      ]),
    ],
    related: ["5g-6g-networks", "digital-communication"],
  }),
  makeSubject({
    slug: "communication-dsp-lab",
    title: "Communication & DSP Laboratory",
    yearNumber: 3,
    semesterNumber: 6,
    description:
      "MATLAB/Python and SDR/DSP-kit experiments covering FFT spectral analysis, FIR/IIR filtering, AM/FM, and BPSK/QPSK constellation BER.",
    difficulty: "Intermediate",
    estimatedHours: 24,
    priceInr: 19,
    isLab: true,
    outcomes: [
      "Simulate and measure BER curves for digital modulation schemes in AWGN",
      "Implement real-time digital filters on DSP/SDR hardware",
    ],
    chapters: [
      buildChapter("cdlab-c1", 1, "DSP & Modulation Experiments", "FFT spectrum, Butterworth filter, QPSK constellation", [
        "FFT & Filtering",
        "BER Simulation",
      ]),
    ],
    related: ["dsp", "digital-communication"],
  }),

  // ==================== YEAR 4 ====================
  makeSubject({
    slug: "advanced-vlsi",
    title: "Advanced VLSI & Static Timing Analysis",
    yearNumber: 4,
    semesterNumber: 7,
    description:
      "Deep-submicron interconnect modeling, setup/hold STA, clock tree synthesis, low-power UPF techniques, and Design-for-Testability (DFT/scan).",
    difficulty: "Advanced",
    estimatedHours: 44,
    priceInr: 39,
    isElective: true,
    outcomes: [
      "Perform Static Timing Analysis (STA) across multi-corner multi-mode paths",
      "Apply clock gating, multi-Vt, and scan-chain DFT methodologies",
    ],
    chapters: [
      buildChapter("avlsi-c1", 1, "STA & Clock Distribution", "Setup/hold slack equations, skew/jitter, OCV derating", [
        "Static Timing Analysis",
        "Clock Skew",
      ]),
      buildChapter("avlsi-c2", 2, "Low Power & DFT", "DVFS, power gating, ATPG, BIST", [
        "Low Power VLSI",
        "Scan & BIST",
      ]),
    ],
    related: ["vlsi-design", "digital-ic-design"],
  }),
  makeSubject({
    slug: "analog-ic-design",
    title: "Analog Integrated Circuit Design",
    yearNumber: 4,
    semesterNumber: 7,
    description:
      "CMOS analog building blocks, cascode current mirrors, two-stage Miller op-amp compensation, bandgap references, and switched-capacitor circuits.",
    difficulty: "Advanced",
    estimatedHours: 46,
    priceInr: 39,
    isElective: true,
    outcomes: [
      "Design a two-stage CMOS op-amp meeting gain, phase margin, and slew-rate specs",
      "Analyze thermal/flicker noise and temperature-independent bandgap references",
    ],
    chapters: [
      buildChapter("aic-c1", 1, "CMOS Op-Amp & Frequency Compensation", "Telescopic/folded cascode, Miller compensation, RHP zero", [
        "Folded Cascode",
        "Miller Compensation",
      ]),
      buildChapter("aic-c2", 2, "Bandgap References & Noise", "PTAT/CTAT currents, input-referred noise", [
        "Bandgap Reference",
        "CMOS Noise",
      ]),
    ],
    related: ["analog-circuits", "vlsi-design"],
  }),
  makeSubject({
    slug: "digital-ic-design",
    title: "Digital Integrated Circuit Design",
    yearNumber: 4,
    semesterNumber: 7,
    description:
      "High-speed arithmetic datapaths, Kogge-Stone adders, Booth multipliers, SRAM/DRAM sense amplifiers, and PLL/DLL clock generators.",
    difficulty: "Advanced",
    estimatedHours: 42,
    priceInr: 34,
    isElective: true,
    outcomes: [
      "Compare parallel-prefix adders and high-radix multipliers in area-delay space",
      "Design sense amplifiers and charge-pump PLLs for synchronous ICs",
    ],
    chapters: [
      buildChapter("dic-c1", 1, "High-Speed Arithmetic & Memories", "Kogge-Stone, Wallace tree, 1T1C DRAM, 6T SRAM", [
        "Parallel Prefix Adders",
        "SRAM Sense Amps",
      ]),
    ],
    related: ["vlsi-design", "advanced-vlsi"],
  }),
  makeSubject({
    slug: "semiconductor-technology",
    title: "Semiconductor Fabrication & Technology",
    yearNumber: 4,
    semesterNumber: 7,
    description:
      "Czochralski crystal growth, thermal oxidation, photolithography, ion implantation, CVD/ALD, plasma etching, and FinFET/GAAFET process flows.",
    difficulty: "Intermediate",
    estimatedHours: 36,
    priceInr: 29,
    isElective: true,
    outcomes: [
      "Model Deal-Grove thermal oxidation and Gaussian/erfc dopant diffusion profiles",
      "Trace end-to-end CMOS/FinFET wafer fabrication sequences",
    ],
    chapters: [
      buildChapter("semi-c1", 1, "Wafer Prep, Oxidation & Lithography", "Deal-Grove model, EUV/DUV resolution, Rayleigh criterion", [
        "Deal-Grove Oxidation",
        "Photolithography",
      ]),
    ],
    related: ["electronic-devices", "mems"],
  }),
  makeSubject({
    slug: "mems",
    title: "MEMS & Microsystems Engineering",
    yearNumber: 4,
    semesterNumber: 7,
    description:
      "Scaling laws, micro-machining (bulk/surface), electrostatic/piezoelectric actuation, micro-accelerometers, and RF MEMS switches.",
    difficulty: "Intermediate",
    estimatedHours: 34,
    priceInr: 29,
    isElective: true,
    outcomes: [
      "Apply mechanical-electrical scaling laws to micro-sensors and actuators",
      "Analyze pull-in voltage in parallel-plate electrostatic MEMS actuators",
    ],
    chapters: [
      buildChapter("mems-c1", 1, "MEMS Transduction & Fabrication", "Pull-in instability, LIGA, DRIE etching", [
        "Electrostatic Pull-In",
        "Bulk Micromachining",
      ]),
    ],
    related: ["semiconductor-technology", "engineering-mechanics"],
  }),
  makeSubject({
    slug: "image-processing",
    title: "Digital Image Processing & Computer Vision",
    yearNumber: 4,
    semesterNumber: 7,
    description:
      "2D sampling, histogram equalization, spatial/frequency filtering, morphological operations, Canny edge detection, JPEG compression, and segmentation.",
    difficulty: "Intermediate",
    estimatedHours: 38,
    priceInr: 29,
    isElective: true,
    outcomes: [
      "Implement spatial/2D-DFT enhancement and restoration filters",
      "Explain 2D-DCT quantization and entropy coding in JPEG",
    ],
    chapters: [
      buildChapter("ip-c1", 1, "Spatial & Frequency Filtering", "Histogram equalization, Sobel/Canny edges, 2D DFT", [
        "Histogram Equalization",
        "2D Filtering",
      ]),
    ],
    related: ["dsp", "ml-for-ece"],
  }),
  makeSubject({
    slug: "speech-processing",
    title: "Speech & Audio Signal Processing",
    yearNumber: 4,
    semesterNumber: 7,
    description:
      "Speech production model, STFT spectrograms, MFCCs, Linear Predictive Coding (LPC), pitch detection, and speech enhancement.",
    difficulty: "Intermediate",
    estimatedHours: 34,
    priceInr: 29,
    isElective: true,
    outcomes: [
      "Extract STFT spectrograms and MFCC features from speech waveforms",
      "Derive Levinson-Durbin recursion for LPC vocal-tract modeling",
    ],
    chapters: [
      buildChapter("sp-c1", 1, "Short-Time Analysis & LPC", "Windowing, cepstrum, MFCC, Levinson-Durbin LPC", [
        "MFCC Features",
        "Linear Predictive Coding",
      ]),
    ],
    related: ["dsp", "adaptive-signal-processing"],
  }),
  makeSubject({
    slug: "adaptive-signal-processing",
    title: "Adaptive Signal Processing",
    yearNumber: 4,
    semesterNumber: 7,
    description:
      "Wiener-Hopf equations, steepest descent, LMS, NLMS, RLS adaptive filters, Kalman filtering, and echo/noise cancellation.",
    difficulty: "Advanced",
    estimatedHours: 38,
    priceInr: 34,
    isElective: true,
    outcomes: [
      "Derive LMS step-size stability bounds and misadjustment",
      "Implement RLS and discrete Kalman filters for tracking",
    ],
    chapters: [
      buildChapter("asp-c1", 1, "Wiener, LMS & Kalman Filters", "Eigenvalue spread, LMS convergence, RLS matrix inversion lemma", [
        "Wiener Filter",
        "LMS & RLS",
        "Kalman Filter",
      ]),
    ],
    related: ["dsp", "probability-random-processes"],
  }),
  makeSubject({
    slug: "satellite-communication",
    title: "Satellite Communication Systems",
    yearNumber: 4,
    semesterNumber: 8,
    description:
      "Keplerian orbital mechanics, GEO/LEO constellations, satellite link budgets (C/N0, G/T), TDMA/FDMA/CDMA access, and GNSS/GPS principles.",
    difficulty: "Intermediate",
    estimatedHours: 36,
    priceInr: 29,
    isElective: true,
    outcomes: [
      "Compute look angles (azimuth/elevation) and uplink/downlink C/N0 ratios",
      "Compare GEO, MEO, and LEO constellation trade-offs",
    ],
    chapters: [
      buildChapter("sat-c1", 1, "Orbits & Satellite Link Budget", "Kepler laws, slant range, EIRP, G/T figure of merit", [
        "Orbital Mechanics",
        "Link Budget C/N0",
      ]),
    ],
    related: ["antenna-theory", "wireless-communication"],
  }),
  makeSubject({
    slug: "radar-systems",
    title: "Radar & Navigation Systems",
    yearNumber: 4,
    semesterNumber: 8,
    description:
      "Radar range equation, RCS, pulsed Doppler, MTI delay-line cancellers, FMCW automotive radar, matched filtering, and phased-array beamforming.",
    difficulty: "Advanced",
    estimatedHours: 38,
    priceInr: 34,
    isElective: true,
    outcomes: [
      "Compute maximum unambiguous range and Doppler blind speeds",
      "Analyze FMCW range-Doppler 2D FFT processing",
    ],
    chapters: [
      buildChapter("rad-c1", 1, "Radar Equation & Doppler Processing", "SNR, false alarm probability, MTI, FMCW chirp", [
        "Radar Range Equation",
        "FMCW Radar",
      ]),
    ],
    related: ["microwave-engineering", "antenna-theory"],
  }),
  makeSubject({
    slug: "5g-6g-networks",
    title: "5G/6G Wireless Networks & Massive MIMO",
    yearNumber: 4,
    semesterNumber: 8,
    description:
      "5G NR numerology, millimeter-wave propagation, hybrid beamforming, massive MIMO, NOMA, and 6G terahertz/RIS concepts.",
    difficulty: "Advanced",
    estimatedHours: 40,
    priceInr: 34,
    isElective: true,
    outcomes: [
      "Explain 5G NR flexible subcarrier spacing and resource grid structure",
      "Analyze massive MIMO precoding and mmWave hybrid beamforming",
    ],
    chapters: [
      buildChapter("5g-c1", 1, "5G NR Physical Layer & Beyond", "Subcarrier numerology, LDPC/Polar codes, massive MIMO, RIS", [
        "5G NR Frame",
        "Massive MIMO",
      ]),
    ],
    related: ["wireless-communication", "information-theory-coding"],
  }),
  makeSubject({
    slug: "iot",
    title: "Internet of Things (IoT) & Edge Systems",
    yearNumber: 4,
    semesterNumber: 8,
    description:
      "IoT sensor nodes, LPWAN (LoRaWAN, NB-IoT, BLE), MQTT/CoAP protocols, edge power budgeting, and hardware-assisted security.",
    difficulty: "Intermediate",
    estimatedHours: 36,
    priceInr: 29,
    isElective: true,
    outcomes: [
      "Select wireless protocols (BLE, Zigbee, LoRaWAN) by range, data rate, and battery life",
      "Build end-to-end MQTT/CoAP telemetry pipelines",
    ],
    chapters: [
      buildChapter("iot-c1", 1, "LPWAN & IoT Protocols", "LoRa chirp spread spectrum, MQTT pub/sub, CoAP", [
        "LoRaWAN",
        "MQTT & CoAP",
      ]),
    ],
    related: ["embedded-systems", "computer-networks"],
  }),
  makeSubject({
    slug: "robotics",
    title: "Robotics & Autonomous Systems",
    yearNumber: 4,
    semesterNumber: 8,
    description:
      "Forward/inverse kinematics (DH parameters), Jacobians, PID/LQR control, sensor fusion (IMU + LiDAR), and SLAM basics.",
    difficulty: "Advanced",
    estimatedHours: 40,
    priceInr: 34,
    isElective: true,
    outcomes: [
      "Derive Denavit-Hartenberg transformations for robotic manipulators",
      "Implement PID and Kalman-based localization pipelines",
    ],
    chapters: [
      buildChapter("rob-c1", 1, "Kinematics & Control", "Homogeneous transforms, DH table, Jacobian singularities", [
        "DH Parameters",
        "PID & SLAM",
      ]),
    ],
    related: ["control-systems", "embedded-systems"],
  }),
  makeSubject({
    slug: "ml-for-ece",
    title: "Machine Learning & Edge AI for ECE",
    yearNumber: 4,
    semesterNumber: 8,
    description:
      "Supervised/unsupervised learning, CNNs for signal/image data, quantization, pruning, and TinyML deployment on microcontrollers & FPGAs.",
    difficulty: "Intermediate",
    estimatedHours: 40,
    priceInr: 34,
    isPopular: true,
    isElective: true,
    outcomes: [
      "Train and evaluate ML models on time-series sensor and RF datasets",
      "Quantize neural networks (INT8) for low-memory edge MCUs",
    ],
    chapters: [
      buildChapter("ml-c1", 1, "ML Foundations & TinyML", "Gradient descent, CNNs, INT8 quantization, hardware accelerators", [
        "Regression & Classification",
        "Model Quantization",
      ]),
    ],
    related: ["dsp", "image-processing", "fpga-hardware-design"],
  }),
  makeSubject({
    slug: "fpga-hardware-design",
    title: "FPGA & RTL Hardware Design (Verilog / SystemVerilog)",
    yearNumber: 4,
    semesterNumber: 8,
    description:
      "Synthesizable Verilog/SystemVerilog, FPGA LUT/BRAM/DSP48 architecture, AXI4-Stream interfaces, CDC synchronizers, and timing closure.",
    difficulty: "Advanced",
    estimatedHours: 44,
    priceInr: 39,
    isElective: true,
    outcomes: [
      "Write glitch-free synthesizable RTL and self-checking testbenches",
      "Resolve clock-domain crossing (CDC) metastability with dual-FF and async FIFOs",
    ],
    chapters: [
      buildChapter("fpga-c1", 1, "Synthesizable RTL & CDC", "Blocking vs non-blocking, FSM coding, async FIFO, AXI4", [
        "Synthesizable Verilog",
        "Clock Domain Crossing",
      ]),
    ],
    related: ["digital-electronics", "vlsi-design"],
  }),
  makeSubject({
    slug: "vlsi-embedded-capstone-lab",
    title: "VLSI & Embedded Systems Capstone Lab",
    yearNumber: 4,
    semesterNumber: 8,
    description:
      "Integrated hardware-software project lab combining RTL/FPGA synthesis, SPICE simulation, and embedded firmware verification.",
    difficulty: "Advanced",
    estimatedHours: 30,
    priceInr: 19,
    isLab: true,
    outcomes: [
      "Verify pre-layout and post-layout digital/analog blocks",
      "Document system architecture, timing reports, and power budgets",
    ],
    chapters: [
      buildChapter("caplab-c1", 1, "Capstone Verification Flow", "RTL simulation, SPICE corners, hardware bring-up checklist", [
        "Timing Closure",
        "Hardware Bring-Up",
      ]),
    ],
    related: ["fpga-hardware-design", "vlsi-design"],
  }),
];

export const SEMESTERS_META = [
  { year: 1, semester: 1, title: "Semester 1", subtitle: "Math I, Physics, Chemistry, C, Basic Electrical" },
  { year: 1, semester: 2, title: "Semester 2", subtitle: "Math II, Basic Electronics, Mechanics, Graphics, Lab" },
  { year: 2, semester: 3, title: "Semester 3", subtitle: "Network Theory, Devices, Digital, Signals & Systems" },
  { year: 2, semester: 4, title: "Semester 4", subtitle: "Analog Circuits, EMT, Probability, Control, Microprocessors" },
  { year: 3, semester: 5, title: "Semester 5", subtitle: "Analog & Digital Comm, DSP, Info Theory, Networks" },
  { year: 3, semester: 6, title: "Semester 6", subtitle: "VLSI, Antenna, RF, Microwave, Embedded, ARM, Optical, Wireless" },
  { year: 4, semester: 7, title: "Semester 7", subtitle: "Advanced VLSI, Analog/Digital IC, MEMS, Image/Speech/Adaptive SP" },
  { year: 4, semester: 8, title: "Semester 8", subtitle: "Satellite, Radar, 5G/6G, IoT, Robotics, ML for ECE, FPGA" },
] as const;

export function getSubjectBySlug(slug: string): Subject | undefined {
  return CURRICULUM_SUBJECTS.find((s) => s.slug === slug);
}

export function getSubjectsByYear(year: number): Subject[] {
  return CURRICULUM_SUBJECTS.filter((s) => s.yearNumber === year);
}

export function getSubjectsBySemester(semester: number): Subject[] {
  return CURRICULUM_SUBJECTS.filter((s) => s.semesterNumber === semester);
}

export function getPopularSubjects(): Subject[] {
  return CURRICULUM_SUBJECTS.filter((s) => s.isPopular);
}

export function getFreeResources(): { subject: Subject; resource: StudyResource }[] {
  const results: { subject: Subject; resource: StudyResource }[] = [];
  for (const subject of CURRICULUM_SUBJECTS) {
    for (const resource of subject.resources) {
      if (resource.isFree) {
        results.push({ subject, resource });
      }
    }
  }
  return results;
}

