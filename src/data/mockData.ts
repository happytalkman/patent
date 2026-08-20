import type { 
  PatentTrendPoint, 
  DomainTrend, 
  BookItem, 
  PaperItem, 
  ForumPost, 
  TestbedFacility, 
  WhiteSpaceNode, 
  PatentFamilyNode,
  CompetitorPowerProfile,
  AiDisputeScenario 
} from '../types';

export const mockPatentTrends: PatentTrendPoint[] = [
  { yearQuarter: '2023 Q1', KR: 4200, US: 11200, CN: 15400, EP: 6100, JP: 5200 },
  { yearQuarter: '2023 Q2', KR: 4900, US: 12800, CN: 17200, EP: 6800, JP: 5500 },
  { yearQuarter: '2023 Q3', KR: 5800, US: 14900, CN: 19800, EP: 7400, JP: 5900 },
  { yearQuarter: '2023 Q4', KR: 6900, US: 17600, CN: 22400, EP: 8100, JP: 6300 },
  { yearQuarter: '2024 Q1', KR: 8200, US: 21400, CN: 26800, EP: 9200, JP: 6900 },
  { yearQuarter: '2024 Q2', KR: 10100, US: 26500, CN: 31500, EP: 10600, JP: 7600 },
  { yearQuarter: '2024 Q3', KR: 12400, US: 32800, CN: 37200, EP: 12100, JP: 8400 },
  { yearQuarter: '2024 Q4', KR: 15200, US: 40200, CN: 43900, EP: 13900, JP: 9300 },
];

export const mockDomainTrends: DomainTrend[] = [
  { id: '1', name: '휴머노이드 액추에이터 & 고출력 밀도 모터', growth: 48.6, totalFilings: 38400, hotKeyword: 'Quasi-Direct Drive', riskScore: 74 },
  { id: '2', name: '공간 VLA (Vision-Language-Action) 파운데이션 모델', growth: 82.4, totalFilings: 29500, hotKeyword: 'Embodied Diffusion', riskScore: 88 },
  { id: '3', name: '고해상도 광학식/압전식 촉각 센싱 스킨', growth: 36.2, totalFilings: 18900, hotKeyword: 'GelSight Array', riskScore: 52 },
  { id: '4', name: '4족 보행 & 이족 보행 전신 임피던스 제어', growth: 29.8, totalFilings: 24300, hotKeyword: 'Whole-Body MPC', riskScore: 61 },
  { id: '5', name: 'Sim-to-Real 강화학습 도메인 랜덤화', growth: 64.1, totalFilings: 31750, hotKeyword: 'Physics Digital Twin', riskScore: 79 },
];

export const mockFacilities: TestbedFacility[] = [
  {
    id: 'fac-1',
    name: '국가 피지컬 AI 로봇 극한 실증 아레나 (Zone A)',
    city: 'Pangyo / Seoul',
    address: '경기도 성남시 분당구 판교테크노밸리 로보틱스센터 101',
    category: 'Extreme Arena',
    distanceKm: 1.2,
    hourlyRateUsd: 120,
    equipment: ['Vicon 24채널 고속 MoCap', '다중 단차 험지 주행로', '급경사 동역학 계측기'],
    isoCertified: true,
    ndaVerified: true,
    openSlots: 4,
    coordinates: [-2, 0, 1.5],
    rating: 4.9,
    telemetry: {
      ambientTempC: 22.4,
      emShieldingDb: 110.5,
      mocapFrameRateFps: 240,
      strainGaugeMicroStrain: 142.8,
      activeRobotId: 'NEXUS-HUMANOID-7DOF'
    }
  },
  {
    id: 'fac-2',
    name: '특허청 첨단 피지컬 AI 특허 기술지원 센터',
    city: 'Pangyo / Seoul',
    address: '서울특별시 강남구 테헤란로 특허종합청사 4F',
    category: 'Patent Office',
    distanceKm: 3.4,
    hourlyRateUsd: 0,
    equipment: ['FTO 신속 특허 심사창구', '공지기술 회피 컨설팅 룸', '변리사 1:1 매칭'],
    isoCertified: true,
    ndaVerified: true,
    openSlots: 2,
    coordinates: [1.8, 0, -1.2],
    rating: 4.8,
    telemetry: {
      ambientTempC: 21.0,
      emShieldingDb: 85.0,
      mocapFrameRateFps: 120,
      strainGaugeMicroStrain: 45.2,
      activeRobotId: 'KIPO-EXAM-PROTOTYPE'
    }
  },
  {
    id: 'fac-3',
    name: '클린룸 반도체 & 촉각 센서 프로토타이핑 팹',
    city: 'Pangyo / Seoul',
    address: '경기도 수원시 영통구 나노기술원 B2',
    category: 'Cleanroom Fab',
    distanceKm: 8.5,
    hourlyRateUsd: 250,
    equipment: ['Class 100 클린룸', '압전 센서 3D 프린터', 'MEMS 초음파 검사장비'],
    isoCertified: true,
    ndaVerified: true,
    openSlots: 1,
    coordinates: [-1.5, 0, -2.5],
    rating: 4.7,
    telemetry: {
      ambientTempC: 19.8,
      emShieldingDb: 125.0,
      mocapFrameRateFps: 480,
      strainGaugeMicroStrain: 12.0,
      activeRobotId: 'TACTILE-SKIN-ARRAY-V3'
    }
  }
];

export const mockWhiteSpaces: WhiteSpaceNode[] = [
  {
    id: 'ws-1',
    title: 'Zero-Shot Tactile-VLA Feedback Adaptation (촉각-VLA 제로샷 실시간 피드백)',
    trlLevel: 4,
    filingDensity: 18,
    opportunityScore: 94,
    domain: 'VLA Spatial AI',
    suggestedClaim: '독립항 1: 비정형 객체 파지 시 광학-압전 하이브리드 촉각 텐서와 비전-언어-행동(VLA) 잠재 공간을 10ms 이내 실시간 결합하여 그리퍼 압력을 폐루프 제어하는 피지컬 AI 제어 장치.',
    noveltyRationale: '기존 테슬라 US 11,492,048 B2는 단순 시각 기반 서보에 국한되며, 본 발명은 멀티모달 촉각 잠재 임베딩을 통한 제로샷 전이를 특징으로 하여 진보성 및 신규성 확보 용이.',
    filingStrategy: '1순위: 한국(KR) 가출원 → 우선권 주장 PCT 국제출원 (미국, 유럽, 일본, 중국 동시 진입)'
  },
  {
    id: 'ws-2',
    title: 'Soft Hydrostatic Actuation in Quadruped Knees (4족보행 무릎 소프트 정수압 액추에이션)',
    trlLevel: 5,
    filingDensity: 24,
    opportunityScore: 89,
    domain: 'Actuation & Kinematics',
    suggestedClaim: '독립항 1: 전기 유압 복합 액추에이터를 통해 착지 충격 에너지의 60% 이상을 가역적으로 회수하여 도약 토크로 변환하는 에너지 회생형 무릎 관절 구조.',
    noveltyRationale: '보스턴다이내믹스의 유압식 아틀라스 특허 대비 40% 이상의 경량화 및 전기 모터-유압 챔버 듀얼 피스톤 기구학적 차별점 입증 가능.',
    filingStrategy: '한국 특허청 로봇 우선심사 신청 (2개월 내 등록 목표) 후 미국 특허청 PPH(특허심사하이웨이) 연계'
  },
  {
    id: 'ws-3',
    title: 'Distributed Tactile-Edge Neuromorphic Array (분산형 뉴로모픽 촉각 엣지 스킨)',
    trlLevel: 3,
    filingDensity: 12,
    opportunityScore: 96,
    domain: 'Sensors & Hardware',
    suggestedClaim: '독립항 1: 스파이킹 신경망(SNN) 기반 이벤트 드리븐 방식으로 미끄러짐(Slippage) 전조 증상을 1ms 내 감지하는 비동기식 인공 피부 어레이.',
    noveltyRationale: '전통적 프레임 기반 샘플링의 대역폭 한계를 극복하는 초저전력 이벤트 감지 구조로 표준특허(SEP) 선점 기회 존재.',
    filingStrategy: '원천 알고리즘 특허와 센서 회로 기구 특허의 포트폴리오 동시 분할 출원'
  }
];

export const mockFamilyTrees: PatentFamilyNode[] = [
  {
    id: 'fam-1',
    patentNumber: 'US 11,492,048 B2',
    title: 'Vision-Based Closed Loop Actuation System for Humanoid Robotics',
    assignee: 'Tesla, Inc.',
    country: 'US',
    filingDate: '2022-04-15',
    status: 'GRANTED',
    childrenIds: ['fam-1-kr', 'fam-1-ep', 'fam-1-cn']
  },
  {
    id: 'fam-1-kr',
    patentNumber: 'KR 10-2023-0189201 A',
    title: '휴머노이드 로봇의 비전 기반 폐루프 액추에이터 구동 시스템',
    assignee: 'Tesla, Inc.',
    country: 'KR',
    filingDate: '2023-04-10',
    status: 'PENDING'
  },
  {
    id: 'fam-1-ep',
    patentNumber: 'EP 4,198,203 A1',
    title: 'Actuation and Spatial Vision System for Humanoid Robots',
    assignee: 'Tesla, Inc.',
    country: 'EP',
    filingDate: '2023-04-12',
    status: 'PENDING'
  },
  {
    id: 'fam-2',
    patentNumber: 'US 10,882,192 B1',
    title: 'Dynamic Balancing and Whole-Body Impedance Control in Bipedal Robots',
    assignee: 'Boston Dynamics, Inc.',
    country: 'US',
    filingDate: '2021-08-20',
    status: 'LITIGATED'
  }
];

export const mockBooks: BookItem[] = [
  {
    id: 'b1',
    title: 'Physical AI & Embodied Intelligence Engineering',
    author: 'Dr. Katherine Vance & Stanford Robotics Lab',
    year: 2025,
    summary: '피지컬 AI의 하드웨어-소프트웨어 공학, 시뮬레이션 환경 구축 및 글로벌 핵심 특허 분석 총망라.',
    relatedPatentsCount: 142,
    tags: ['Embodied AI', 'Kinematics', 'Standard Patents']
  },
  {
    id: 'b2',
    title: 'Modern Robotics: Mechanics, Planning, and Control',
    author: 'Kevin M. Lynch & Frank C. Park',
    year: 2024,
    summary: '로봇 기구학 및 동역학 제어의 바이블. 특허 청구항 분석에 필수적인 DoF 및 나사 이론(Screw Theory) 수록.',
    relatedPatentsCount: 318,
    tags: ['Kinematics', 'DoF Control', 'Patent Analysis']
  },
  {
    id: 'b3',
    title: '휴머노이드 로봇 특허 분쟁과 FTO 회피설계 전략',
    author: '한국피지컬AI특허연구회',
    year: 2025,
    summary: '테슬라 옵티머스, 보스턴다이내믹스 아틀라스의 특허 패밀리 분석과 국내 기업을 위한 회피 설계 실무 가이드.',
    relatedPatentsCount: 89,
    tags: ['FTO Strategy', 'Humanoid', 'Litigation']
  }
];

export const mockPapers: PaperItem[] = [
  {
    id: 'p1',
    title: 'Zero-Shot Vision-Language-Action Adaptation for Dexterous Manipulation',
    conferenceOrArxiv: 'CoRL 2025 / arXiv:2501.08942',
    authors: ['J. Chen', 'M. Song', 'R. Brooks'],
    pdfUrl: 'https://arxiv.org/abs/2501.08942',
    citations: 184,
    associatedPatentClaim: 'US 11,492,048 B2 (Claim 1-4: Closed-loop Visual Servo)'
  },
  {
    id: 'p2',
    title: 'High-Bandwidth Hydrostatic Actuation for Bipedal Dynamic Locomotion',
    conferenceOrArxiv: 'IEEE ICRA 2025',
    authors: ['H. Park', 'D. Kim', 'T. Hashimoto'],
    pdfUrl: 'https://ieee.org/icra2025/hydrostatic',
    citations: 92,
    associatedPatentClaim: 'KR 10-2024-0091823 A (공압/유압 하이브리드 액추에이터)'
  }
];

export const mockForumPosts: ForumPost[] = [
  {
    id: 'f1',
    authorName: '박준형 수석연구원',
    authorRole: 'Robotics Engineer',
    title: '휴머노이드 핑거 팁 촉각 센서 배치 시 Tesla US 특허 침해 회피 방안 토론',
    content: '옵티머스 Gen 3의 촉각 센서 청구항을 보면 돔형 젤 표면에 반사형 마이크로 마커를 배치하는 구조가 독립항에 포함되어 있습니다. 당사에서 평면 압전 어레이로 전환할 경우 균등론 적용 가능성에 대해 변리사님들의 고견을 구합니다.',
    likes: 42,
    repliesCount: 18,
    createdAt: '2시간 전',
    tags: ['Optimus', 'Tactile Sensor', 'FTO Q&A']
  },
  {
    id: 'f2',
    authorName: '김서연 대표변리사',
    authorRole: 'Patent Attorney',
    title: '[가이드] 피지컬 AI 강화학습 보상함수의 특허 적격성(Patent Eligibility) 동향',
    content: '미국 USPTO 101조 판례에 따르면 물리 환경 시뮬레이터와 직접 연동되는 보상 알고리즘은 단순 수학적 알고리즘을 넘어 물리적 기술효과를 인정받는 추세입니다. 최신 심사지침 요약본을 공유합니다.',
    likes: 89,
    repliesCount: 24,
    createdAt: '1일 전',
    tags: ['Patent Eligibility', 'USPTO', 'RL Reward']
  }
];

export const mockCompetitors: CompetitorPowerProfile[] = [
  { company: 'Tesla (Optimus)', score: 92, actuatorPatents: 148, vlaSpatialPatents: 215, sensorPatents: 84, litigationRisk: 'HIGH', keyPatent: 'US 11,492,048 B2' },
  { company: 'Boston Dynamics (Atlas)', score: 95, actuatorPatents: 320, vlaSpatialPatents: 140, sensorPatents: 112, litigationRisk: 'HIGH', keyPatent: 'US 10,882,192 B1' },
  { company: 'Figure AI (Figure 02)', score: 84, actuatorPatents: 96, vlaSpatialPatents: 178, sensorPatents: 65, litigationRisk: 'MEDIUM', keyPatent: 'US 11,894,002 A1' },
  { company: 'Sanctuary AI (Phoenix)', score: 79, actuatorPatents: 110, vlaSpatialPatents: 125, sensorPatents: 92, litigationRisk: 'MEDIUM', keyPatent: 'CA 3,198,201 A1' },
  { company: '현대차 로보틱스랩 (DAL-e)', score: 88, actuatorPatents: 180, vlaSpatialPatents: 110, sensorPatents: 95, litigationRisk: 'LOW', keyPatent: 'KR 10-2024-0019281 A' },
];

export const mockDisputes: AiDisputeScenario[] = [
  {
    id: 'disp-1',
    targetPatent: 'Tesla US 11,492,048 B2 (손목 하모닉 드라이브 감속기 구동계)',
    plaintiffArgument: '원고(Tesla)는 자사 특허 청구항 1의 "동축 하모닉 감속기 및 2축 짐벌 배치"가 피고의 7-DoF 로봇 팔 손목과 동일한 기구학적 구성을 가진다고 주장함.',
    defenseStrategy: '피고는 준직접구동(QDD) 플래너터리 기어박스를 채택하여 감속비를 85:1에서 18:1로 완전히 변경하고 백드라이브 가능성을 물리적으로 구현하여 구성요소완비의 원칙(All-Elements Rule) 불충족 입증.',
    successProbability: 92,
    recommendedModifications: [
      '손목 액추에이터를 하모닉 드라이브에서 사이클로이드/QDD 복합형으로 변경',
      '토크 센싱 피드백 제어 주기를 1kHz에서 4kHz 분산형 임피던스 제어로 분리',
      '명세서에 "탄성 변형 링 기구 불포함"을 명시적으로 한정하여 출원'
    ]
  },
  {
    id: 'disp-2',
    targetPatent: 'Boston Dynamics US 10,882,192 B1 (전신 동역학 밸런싱 제어)',
    plaintiffArgument: '원고는 피고의 보행 로봇 전신 임피던스 제어기가 무게중심(CoM)과 영모멘트점(ZMP)을 실시간 연동하는 기본 특허를 침해한다고 경고장 발송.',
    defenseStrategy: '신경망 기반 잠재 공간(Latent Space) 직접 액션 매핑 방식을 적용하여 전통적 ZMP 수치 해석 파이프라인을 바이패스(Bypass)함을 입증.',
    successProbability: 86,
    recommendedModifications: [
      '물리 수치 모델 기반 제어식을 End-to-End 강화학습 정책 네트워크로 전면 교체',
      '발목 접촉 감지 센서를 압력 그리드에서 6축 F/T 센서리스 추정기로 대체'
    ]
  }
];