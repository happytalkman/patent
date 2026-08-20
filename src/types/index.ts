export type ActiveTab = 'dashboard' | 'trends' | 'fto' | 'spatial' | 'whitespace' | 'community' | 'copilot';
export type ViewMode = 'desktop' | 'mobile';

export interface PatentTrendPoint {
  yearQuarter: string;
  KR: number;
  US: number;
  CN: number;
  EP: number;
  JP: number;
}

export interface DomainTrend {
  id: string;
  name: string;
  growth: number;
  totalFilings: number;
  hotKeyword: string;
  riskScore: number;
}

export interface BookItem {
  id: string;
  title: string;
  author: string;
  year: number;
  summary: string;
  relatedPatentsCount: number;
  tags: string[];
}

export interface PaperItem {
  id: string;
  title: string;
  conferenceOrArxiv: string;
  authors: string[];
  pdfUrl: string;
  citations: number;
  associatedPatentClaim: string;
}

export interface ForumPost {
  id: string;
  authorName: string;
  authorRole: string;
  title: string;
  content: string;
  likes: number;
  repliesCount: number;
  createdAt: string;
  tags: string[];
}

export interface KinematicState {
  joint1: number; // Base Yaw
  joint2: number; // Shoulder Pitch
  joint3: number; // Elbow Pitch
  joint4: number; // Wrist Roll
  joint5: number; // Wrist Pitch
  joint6: number; // Tool Yaw
  joint7: number; // Gripper
  torqueNm: number;
  speedRadS: number;
  endEffectorPos: { x: number; y: number; z: number };
  trajectoryMode: 'manual' | 'pick_place' | 'high_speed_servo' | 'stair_climbing';
}

export interface ClaimElement {
  id: string;
  elementName: string;
  patentClaimText: string;
  infringementStatus: 'LITERAL' | 'EQUIVALENCE' | 'CLEARED';
  notes: string;
}

export interface DesignAroundSuggestion {
  id: string;
  targetElementId: string;
  title: string;
  technicalChange: string;
  impactScore: number; // 0-100 risk reduction
  kinematicParams: Partial<KinematicState>;
}

export interface TestbedTelemetry {
  ambientTempC: number;
  emShieldingDb: number;
  mocapFrameRateFps: number;
  strainGaugeMicroStrain: number;
  activeRobotId: string;
}

export interface TestbedFacility {
  id: string;
  name: string;
  city: string;
  address: string;
  category: 'Extreme Arena' | 'Patent Office' | 'Cleanroom Fab' | 'Maker Lab';
  distanceKm: number;
  hourlyRateUsd: number;
  equipment: string[];
  isoCertified: boolean;
  ndaVerified: boolean;
  openSlots: number;
  coordinates: [number, number, number];
  rating: number;
  telemetry?: TestbedTelemetry;
}

export interface WhiteSpaceNode {
  id: string;
  title: string;
  trlLevel: number; // 1-9
  filingDensity: number; // 0-100
  opportunityScore: number; // 0-100
  domain: string;
  suggestedClaim: string;
  noveltyRationale: string;
  filingStrategy: string;
}

export interface PatentFamilyNode {
  id: string;
  patentNumber: string;
  title: string;
  assignee: string;
  country: 'US' | 'KR' | 'EP' | 'CN' | 'JP';
  filingDate: string;
  status: 'PENDING' | 'GRANTED' | 'LITIGATED';
  childrenIds?: string[];
}

export interface CompetitorPowerProfile {
  company: string;
  score: number;
  actuatorPatents: number;
  vlaSpatialPatents: number;
  sensorPatents: number;
  litigationRisk: 'HIGH' | 'MEDIUM' | 'LOW';
  keyPatent: string;
}

export interface AiDisputeScenario {
  id: string;
  targetPatent: string;
  plaintiffArgument: string;
  defenseStrategy: string;
  successProbability: number;
  recommendedModifications: string[];
}