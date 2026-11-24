export type ResourceType =
  | "formula_sheet"
  | "concise_notes"
  | "numerical_handbook"
  | "exam_revision";

export type DocumentStyle = "handwritten" | "typeset";

export type DifficultyLevel = "Foundational" | "Intermediate" | "Advanced";

export type VerificationStatus =
  | "pending_verification"
  | "reference_draft"
  | "verified";

export interface ChapterContentTemplate {
  conceptExplanation: string;
  importantDefinitions: { term: string; definition: string }[];
  mathematicalFormulae: { name: string; formula: string; variables: string }[];
  derivations: { title: string; steps: string[] }[];
  diagramNotes: { type: "Circuit Diagram" | "Block Diagram"; title: string; description: string }[];
  solvedNumericals: { problem: string; given: string; solutionSteps: string[]; answer: string }[];
  commonMistakes: string[];
  examQuestions: { question: string; marks: number; hint: string }[];
  furtherReading: { title: string; source: string; url?: string }[];
}

export interface Chapter {
  id: string;
  chapterNumber: number;
  title: string;
  summary: string;
  topics: string[];
  contentTemplate: ChapterContentTemplate;
}

export interface StudyResource {
  id: string;
  subjectSlug: string;
  title: string;
  resourceType: ResourceType;
  documentStyle: DocumentStyle;
  description: string;
  chapterList: string[];
  version: string;
  pageCount: number;
  isFree: boolean;
  priceInr: number;
  allowDownload: boolean;
  isSampleDemo: boolean;
  previewPages: {
    pageNumber: number;
    title: string;
    excerpt: string;
    highlights: string[];
  }[];
  storagePath: string;
}

export interface UniversityMapping {
  id: string;
  universityName: string;
  universityCategory: "IIT" | "NIT" | "IIIT" | "State University" | "Consolidated Master";
  programme: string;
  curriculumYear: string;
  semesterNumber: number;
  courseCode: string;
  courseName: string;
  credits: number | null;
  topics: string[];
  verificationStatus: VerificationStatus;
}

export interface Subject {
  id: string;
  slug: string;
  title: string;
  yearNumber: 1 | 2 | 3 | 4;
  semesterNumber: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  description: string;
  difficulty: DifficultyLevel;
  estimatedHours: number;
  isElective: boolean;
  isLab: boolean;
  isPopular: boolean;
  isPublished: boolean;
  collectionPriceInr: number;
  learningOutcomes: string[];
  referenceResources: { title: string; provider: string; url: string }[];
  relatedSubjectSlugs: string[];
  chapters: Chapter[];
  resources: StudyResource[];
  universityMappings: UniversityMapping[];
}

export interface ProductBundle {
  id: string;
  sku: string;
  productType: "resource" | "subject" | "semester" | "year" | "four_year";
  title: string;
  slug: string;
  description: string;
  priceInr: number;
  mrpInr: number;
  yearNumber?: number;
  semesterNumber?: number;
  subjectSlug?: string;
  badge?: string;
  contentsSummary: string[];
}

export interface Coupon {
  id: string;
  code: string;
  description: string;
  discountType: "percent" | "flat";
  discountValue: number;
  minOrderInr: number;
  isActive: boolean;
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: "student" | "admin" | "editor";
  universityName?: string;
  currentYear?: number;
  currentSemester?: number;
}

