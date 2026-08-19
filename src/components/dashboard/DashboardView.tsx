import React from 'react';
import type { ActiveTab } from '../../types';
import { 
  TrendingUp, 
  Cpu, 
  MapPin, 
  Compass, 
  ChevronRight 
} from 'lucide-react';
import { mockDomainTrends, mockWhiteSpaces, mockFacilities } from '../../data/mockData';

interface DashboardViewProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ setActiveTab }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Hero Welcome & Live KPI Grid */}
      <div className="glass-panel-glow p-6 rounded-2xl relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-nexus-cyan">
            <span className="w-2 h-2 rounded-full bg-nexus-cyan animate-ping" />
            <span>NEXUS REAL-TIME EMBODIED AI IP COMMAND CENTER</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold font-sora text-white">
                피지컬 AI 전문 특허 통합 인텔리전스
              </h1>
              <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-2xl">
                하드웨어 구동계·공간지능 VLA·촉각센서의 3D 물리 시뮬레이션 검증부터 선행특허 FTO 회피설계 및 공인 실증 테스트베드 연결까지
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTab('fto')}
                className="px-4 py-2.5 rounded-xl bg-nexus-cyan text-black font-bold text-xs hover:bg-cyan-300 transition-all flex items-center gap-2 shadow-lg shadow-nexus-cyan/20 whitespace-nowrap"
              >
                <Cpu className="w-4 h-4" />
                <span>3D FTO 시뮬레이터 실행</span>
              </button>
              <button
                onClick={() => setActiveTab('spatial')}
                className="px-4 py-2.5 rounded-xl bg-nexus-panel border border-nexus-cyan/40 text-nexus-cyan font-bold text-xs hover:bg-nexus-cyan hover:text-black transition-all flex items-center gap-2 whitespace-nowrap"
              >
                <MapPin className="w-4 h-4" />
                <span>3D 공간 약도 탐색</span>
              </button>
            </div>
          </div>

          {/* 4 Major KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
            <div className="p-3.5 bg-nexus-surface/80 rounded-xl border border-white/5 space-y-1">
              <p className="text-[11px] font-mono text-slate-400">글로벌 피지컬 AI 특허</p>
              <p className="text-lg font-bold font-mono text-white">142,850 <span className="text-xs text-nexus-emerald font-normal">+34.2%</span></p>
            </div>
            <div className="p-3.5 bg-nexus-surface/80 rounded-xl border border-white/5 space-y-1">
              <p className="text-[11px] font-mono text-slate-400">자사 모델 FTO 안전도</p>
              <p className="text-lg font-bold font-mono text-nexus-emerald">82% <span className="text-xs text-slate-400 font-normal">(저위험)</span></p>
            </div>
            <div className="p-3.5 bg-nexus-surface/80 rounded-xl border border-white/5 space-y-1">
              <p className="text-[11px] font-mono text-slate-400">공인 실증 테스트베드</p>
              <p className="text-lg font-bold font-mono text-nexus-cyan">7개소 <span className="text-xs text-nexus-cyan font-normal">(예약가능)</span></p>
            </div>
            <div className="p-3.5 bg-nexus-surface/80 rounded-xl border border-white/5 space-y-1">
              <p className="text-[11px] font-mono text-slate-400">발굴된 공백기술(White Space)</p>
              <p className="text-lg font-bold font-mono text-nexus-purple">18개 영역 <span className="text-xs text-nexus-purple font-normal">(94점)</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Modular Interactive Gateway Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gateway 1: Patent Trends */}
        <div className="glass-panel p-5 rounded-2xl border border-white/10 flex flex-col justify-between space-y-4 hover:border-nexus-cyan/40 transition-all group">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-nexus-cyan flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4" /> TREND MATRIX
              </span>
              <span className="text-[11px] font-mono text-nexus-emerald">연평균 +41.8%</span>
            </div>
            <h2 className="text-base font-bold text-white group-hover:text-nexus-cyan transition-colors">
              국내외 5개국 특허 출원 동향 및 핵심 도메인
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              미국, 한국, 중국, 유럽의 휴머노이드 액추에이터 및 VLA 파운데이션 모델 출원 급증 추이를 다각도로 분석합니다.
            </p>

            <div className="p-3 bg-nexus-surface/80 rounded-xl border border-white/5 space-y-2">
              <p className="text-[11px] font-mono text-slate-400">급상승 1위 도메인:</p>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-200">
                <span>{mockDomainTrends[0].name}</span>
                <span className="font-mono text-nexus-cyan">+{mockDomainTrends[0].growth}%</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('trends')}
            className="w-full py-2.5 rounded-xl bg-nexus-panel border border-white/10 text-xs font-semibold text-slate-200 hover:text-nexus-cyan hover:border-nexus-cyan/40 transition-all flex items-center justify-center gap-1.5"
          >
            <span>특허 동향 매트릭스 열기</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Gateway 2: 3D Kinematics & FTO Sandbox */}
        <div className="glass-panel p-5 rounded-2xl border border-white/10 flex flex-col justify-between space-y-4 hover:border-nexus-cyan/40 transition-all group">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-nexus-cyan flex items-center gap-1.5">
                <Cpu className="w-4 h-4" /> 3D KINEMATICS SANDBOX
              </span>
              <span className="text-[11px] font-mono text-nexus-cyan">Three.js Engine</span>
            </div>
            <h2 className="text-base font-bold text-white group-hover:text-nexus-cyan transition-colors">
              휴머노이드 3D 디지털 트윈 & 청구항 회피설계
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              명세서 청구항 속 관절 자유도(DoF)와 토크 제어식을 3D 로봇 팔로 렌더링하고 경쟁사 침해 범위를 시각적으로 회피합니다.
            </p>

            <div className="p-3 bg-nexus-surface/80 rounded-xl border border-white/5 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">실시간 관절 토크:</span>
              <span className="text-nexus-cyan font-bold">42.5 Nm (7-DoF)</span>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('fto')}
            className="w-full py-2.5 rounded-xl bg-nexus-panel border border-white/10 text-xs font-semibold text-slate-200 hover:text-nexus-cyan hover:border-nexus-cyan/40 transition-all flex items-center justify-center gap-1.5"
          >
            <span>FTO 3D 시뮬레이터 실행</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Gateway 3: 3D Spatial Testbed Map */}
        <div className="glass-panel p-5 rounded-2xl border border-white/10 flex flex-col justify-between space-y-4 hover:border-nexus-cyan/40 transition-all group">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-nexus-cyan flex items-center gap-1.5">
                <MapPin className="w-4 h-4" /> NANOBANANA-2 SPATIAL MAP
              </span>
              <span className="text-[11px] font-mono text-nexus-emerald">ISO/IEC Verified</span>
            </div>
            <h2 className="text-base font-bold text-white group-hover:text-nexus-cyan transition-colors">
              3D 공간 약도 & 공인 로봇 실증 테스트베드
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              아이소메트릭 3D 약도에서 국가 로봇 실증 시험장, 특허청, 클린룸 팹의 실시간 잔여 슬롯을 확인하고 예약합니다.
            </p>

            <div className="p-3 bg-nexus-surface/80 rounded-xl border border-white/5 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">가장 가까운 실증장:</span>
              <span className="text-nexus-cyan font-bold">{mockFacilities[0].name.slice(0, 18)}... (1.2km)</span>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('spatial')}
            className="w-full py-2.5 rounded-xl bg-nexus-panel border border-white/10 text-xs font-semibold text-slate-200 hover:text-nexus-cyan hover:border-nexus-cyan/40 transition-all flex items-center justify-center gap-1.5"
          >
            <span>3D 공간 약도 및 예약</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Gateway 4: White Space Discovery & Family Tree */}
        <div className="glass-panel p-5 rounded-2xl border border-white/10 flex flex-col justify-between space-y-4 hover:border-nexus-purple/40 transition-all group">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-nexus-purple flex items-center gap-1.5">
                <Compass className="w-4 h-4" /> WHITE SPACE MATRIX
              </span>
              <span className="text-[11px] font-mono text-nexus-purple">AI Blueprint</span>
            </div>
            <h2 className="text-base font-bold text-white group-hover:text-nexus-purple transition-colors">
              특허 공백기술(White Space) 탐색 & 패밀리 트리
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              기술성숙도 vs 출원밀도 산점도에서 블루오션 특허 영역을 발굴하고 AI 독립항 초안 및 패밀리 트리를 분석합니다.
            </p>

            <div className="p-3 bg-nexus-surface/80 rounded-xl border border-white/5 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">최고 기회 공백기술:</span>
              <span className="text-nexus-purple font-bold">기회지수 {mockWhiteSpaces[0].opportunityScore}점</span>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('whitespace')}
            className="w-full py-2.5 rounded-xl bg-nexus-panel border border-white/10 text-xs font-semibold text-slate-200 hover:text-nexus-purple hover:border-nexus-purple/40 transition-all flex items-center justify-center gap-1.5"
          >
            <span>공백기술 및 패밀리트리 분석</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};