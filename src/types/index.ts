export type ActiveTab = 'dashboard' | 'trends' | 'fto' | 'spatial' | 'whitespace' | 'community';
export type ViewMode = 'desktop' | 'mobile';

// Patent Trends
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

// FTO & Kinematics Simulation
export type InfringementStatus = 'LITERAL' | 'EQUIVALENTS' | 'SAFE_HARBOR';

export interface ClaimElement {
  id: string;
  elementName: string;
  description: string;
  status: InfringementStatus;
  targetPatent: string;
  competitor: string;
  confidence: number;
}

export interface DesignAroundSuggestion {
  id: string;
  targetPatent: string;
  originalParam: string;
  suggestedParam: string;
  rationale: string;
  impactScore: number; // 0-100 safety score improvement
  applied: boolean;
}

export interface KinematicState {
  joint1Angle: number;
  joint2Angle: number;
  joint3Angle: number;
  torque: number; // Nm
  velocity: number; // rad/s
  conflictRiskPercent: number;
}

// 3D Spatial Map & Testbed Hub
export interface TestbedFacility {
  id: string;
  name: string;
  city: string;
  address: string;
  category: 'Extreme Arena' | 'Cleanroom Fab' | 'Patent Office' | 'Maker Lab';
  distanceKm: number;
  hourlyRateUsd: number;
  equipment: string[];
  isoCertified: boolean;
  ndaVerified: boolean;
  openSlots: number;
  coordinates: [number, number, number]; // 3D coordinates for Three.js scene
  rating: number;
}

export interface BookingSlot {
  id: string;
  date: string;
  time: string;
  available: boolean;
}

// White Space Discovery & Family Tree
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
  status: 'GRANTED' | 'PENDING' | 'LITIGATED';
  childrenIds?: string[];
}

// Literature & Community
export interface BookItem {
  id: string;
  title: string;
  author: string;
  year: number;
  coverImage?: string;
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
  authorRole: 'Robotics Engineer' | 'Patent Attorney' | 'IP Strategist';
  title: string;
  content: string;
  likes: number;
  repliesCount: number;
  createdAt: string;
  tags: string[];
}