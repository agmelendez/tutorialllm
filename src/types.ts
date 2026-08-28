export type NavTab = 
  | 'overview'
  | 'tokenization'
  | 'cloze'
  | 'attention'
  | 'transformer-arch'
  | 'training'
  | 'reasoning'
  | 'small-models'
  | 'open-weights'
  | 'curriculum'
  | 'glossary';

export interface PedagogicalModule {
  id: string;
  title: string;
  subtitle: string;
  cs229Chapter: string;
  aiConcept: string;
  eltConcept: string;
  shortDescription: string;
  pedagogicalAnalogy: string;
  technicalDepth: string;
  classroomApplication: string;
  iconName: string;
}

export interface CS229ChapterMapping {
  part: string;
  chapterNumber: number;
  chapterTitle: string;
  cs229Summary: string;
  eltPedagogyParallel: string;
  teachingApplication: string;
  keyFormulasAndConcepts: string[];
}

export interface TokenSample {
  text: string;
  tokens: {
    token: string;
    id: number;
    type: 'word' | 'subword-root' | 'subword-affix' | 'punct' | 'special';
    linguisticNote: string;
  }[];
  explanation: string;
}

export interface ClozeStep {
  context: string;
  blankMeaning: string;
  targetExpected: string;
  candidates: {
    token: string;
    logit: number;
    meaning: string;
    grammaticalRole: string;
  }[];
}

export interface AttentionSentence {
  id: string;
  text: string;
  tokens: string[];
  explanation: string;
  attentionWeights: Record<number, number[]>;
  pedagogicalInsight: string;
}

export interface ReasoningStep {
  stepNumber: number;
  type: 'think' | 'reflect' | 'verify' | 'output';
  content: string;
  subAnalysis: string;
  isSelfCorrection?: boolean;
}

export interface ReasoningExample {
  id: string;
  title: string;
  prompt: string;
  targetCategory: string;
  verifierCriteria: string;
  traces: ReasoningStep[];
  finalVerdict: 'verified' | 'failed';
  rewardScore: number;
  eltLessonConnection: string;
}

// Data models for Transformer Architecture & Neural Weights Simulator
export interface TransformerLayerInfo {
  id: string;
  stepNumber: number;
  name: string;
  mathFormula: string;
  technicalRole: string;
  eltPedagogyParallel: string;
  eltPedagogicalParallel?: string;
  inputShape: string;
  outputShape: string;
  keyParameters: string;
  interactiveNote: string;
}

export interface WeightSimulationFeature {
  id: string;
  label: string;
  description: string;
  inputValue: number; // 0 to 1
  weight: number; // -3 to 3
}

// Data models for Open Weights vs Closed LLMs
export type ModelCategoryType = 'closed' | 'open-weights' | 'fully-open';

export interface ModelCategoryComparison {
  category: ModelCategoryType;
  title: string;
  badge: string;
  examples: string[];
  weightsAccess: string;
  codeAccess: string;
  dataAccess: string;
  offlineCapable: boolean;
  privacyLevel: string;
  mepSuitability: string;
  costStructure: string;
  keyAdvantages: string[];
  keyLimitations: string[];
}

// Data models for Small Models (SLMs) & On-Device Mobile AI
export interface DeviceComparisonScenario {
  id: string;
  taskTitle: string;
  userPrompt: string;
  cefrLevel: string;
  mobileModel: {
    name: string;
    architecture: string;
    parameters: string;
    ramUsageMB: number;
    quantization: string;
    latencyMs: number;
    privacy: string;
    energyWatts: string;
    simulatedResponse: string;
    pedagogicalAssessment: string;
  };
  cloudLabModel: {
    name: string;
    architecture: string;
    parameters: string;
    ramUsageMB: number;
    quantization: string;
    latencyMs: number;
    privacy: string;
    energyWatts: string;
    simulatedResponse: string;
    pedagogicalAssessment: string;
  };
}

export interface LiquidModelArchitecturePoint {
  title: string;
  traditionalTransformer: string;
  liquidFoundationModel: string;
  whyItMattersForMobile: string;
}
