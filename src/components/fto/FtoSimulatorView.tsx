import React, { useState } from 'react';
import { ClaimElement, DesignAroundSuggestion, KinematicState } from '../../types';
import { RoboticArmCanvas } from './RoboticArmCanvas';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Cpu, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Sliders, 
  Play, 
  Pause, 
  FileDown, 
  Zap, 
  Layers 
} from 'lucide-react';

export const FtoSimulatorView: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [showBoundaries, setShowBoundaries] = useState(true);

  // Claim Checklist State
  const [claims, setClaims] = useState<ClaimElement[]>([
    {
      id: 'c1',
      elementName: 'Element A: 브러시리스 하모닉 드라이브 감속기',
      description: '로봇 팔꿈치 조인트에 내장된 100:1 감속비의 하모닉 드라이브 모듈',
      status: 'LITERAL',
      targetPatent: 'US 11,492,048 B2',
      competitor: 'Tesla Optimus',
      confidence: 91
    },
    {
      id: 'c2',
      elementName: 'Element B: 말단부 다채널 광학식 촉각 센싱 어레이',
      description: '핑거 팁 돔 구조 내 4x4 마이크로 광학 반사 마커 어레이',
      status: 'EQUIVALENTS',
      targetPatent: 'US 10,882,192 B1',
      competitor: 'Boston Dynamics',
      confidence: 68
    },
    {
      id: 'c3',
      elementName: 'Element C: 임피던스 기반 폐루프 전신 토크 제어기',
      description: '충돌 감지 시 5ms 이내 즉시 토크 보상을 수행하는 실시간 피드백 루프',
      status: 'SAFE_HARBOR',
      targetPatent: '공지기술 (Prior Art)',
      competitor: 'Public Domain',
      confidence: 99
    }
  ]);

  // AI Design-Around Suggestions
  const [suggestions, setSuggestions] = useState<DesignAroundSuggestion[]>([
    {
      id: 's1',
      targetPatent: 'US 11,492,048 B2',
      originalParam: '하모닉 드라이브 감속비 100:1',
      suggestedParam: '사이클로이드 감속비 85:1 + 유성기어 하이브리드',
      rationale: '테슬라 독립항의 하모닉 기어 물리 치합 요건을 완전히 배제하여 문언 및 균등 침해 회피',
      impactScore: 45,
      applied: false
    },
    {
      id: 's2',
      targetPatent: 'US 10,882,192 B1',
      originalParam: '돔형 4x4 광학 마커',
      suggestedParam: '평면 압전 폴리머(PVDF) 매트릭스 전환',
      rationale: '보스턴다이내믹스의 광학 굴절 검출 메커니즘을 압전 전하 방식으로 우회',
      impactScore: 25,
      applied: false
    }
  ]);

  // Kinematic parameters
  const [kinematics, setKinematics] = useState<KinematicState>({
    joint1Angle: 25,
    joint2Angle: -40,
    joint3Angle: 15,
    torque: 42.5,
    velocity: 1.8,
    conflictRiskPercent: 78
  });

  const [notification, setNotification] = useState<string | null>(null);

  // Apply Design-Around Optimization
  const handleApplySuggestion = (suggestionId: string) => {
    setSuggestions(prev => prev.map(s => {
      if (s.id === suggestionId) {
        const nextApplied = !s.applied;
        // update kinematics conflict score
        setKinematics(k => ({
          ...k,
          conflictRiskPercent: Math.max(12, k.conflictRiskPercent + (nextApplied ? -s.impactScore : s.impactScore)),
          torque: nextApplied ? 34.2 : 42.5
        }));

        // update corresponding claim status
        if (suggestionId === 's1') {
          setClaims(cList => cList.map(c => c.id === 'c1' ? { ...c, status: nextApplied ? 'SAFE_HARBOR' : 'LITERAL' } : c));
        } else if (suggestionId === 's2') {
          setClaims(cList => cList.map(c => c.id === 'c2' ? { ...c, status: nextApplied ? 'SAFE_HARBOR' : 'EQUIVALENTS' } : c));
        }

        return { ...s, applied: nextApplied };
      }
      return s;
    }));

    setNotification('AI 회피설계 파라미터가 3D 기구학 시뮬레이터에 실시간 반영되었습니다.');
    setTimeout(() => setNotification(null), 3500);
  };

  const isSafe = kinematics.conflictRiskPercent <= 30;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="glass-panel-glow p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-nexus-cyan mb-1">
            <Cpu className="w-4 h-4" />
            <span>3D KINEMATICS & FTO SANDBOX STUDIO</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold font-sora text-white">
            피지컬 AI 3D 기구학 & 특허침해회피(FTO) 시뮬레이터
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            휴머노이드 액추에이터 3D 디지털 트윈 기반 실시간 DoF 관절 부하 검증 및 선행특허 1:1 회피 설계
          </p>
        </div>

        {/* Global Conflict Risk Badge */}
        <div className="flex items-center gap-3">
          <div className={`px-4 py-2.5 rounded-xl border flex items-center gap-3 ${
            isSafe ? 'bg-nexus-emerald/10 border-nexus-emerald/40 text-nexus-emerald' : 'bg-nexus-rose/10 border-nexus-rose/40 text-nexus-rose'
          }`}>
            {isSafe ? <ShieldCheck className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5 animate-bounce" />}
            <div>
              <p className="text-[10px] font-mono uppercase">특허 분쟁 위험도</p>
              <p className="text-sm font-bold font-mono">{kinematics.conflictRiskPercent}% {isSafe ? '(안전 범위)' : '(고위험 충돌)'}</p>
            </div>
          </div>

          <button 
            onClick={() => {
              setNotification('FTO 회피설계 엔지니어링 기술명세서 PDF가 성공적으로 생성되었습니다.');
              setTimeout(() => setNotification(null), 3000);
            }}
            className="px-4 py-2.5 rounded-xl bg-nexus-cyan text-black font-bold text-xs hover:bg-cyan-300 transition-all flex items-center gap-1.5 shadow-lg shadow-nexus-cyan/20"
          >
            <FileDown className="w-4 h-4" />
            <span className="hidden sm:inline">회피설계 명세서 내보내기</span>
          </button>
        </div>
      </div>

      {notification && (
        <div className="p-3 bg-nexus-cyan/20 border border-nexus-cyan/40 text-nexus-cyan text-xs font-mono rounded-xl flex items-center gap-2 animate-fadeIn">
          <Zap className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* Main 3-Column Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col (4): Claim Decomposition */}
        <div className="lg:col-span-4 glass-panel p-5 rounded-2xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-nexus-cyan" />
              청구항 1:1 구성요소 분해 (Claim Checklist)
            </h2>
            <span className="text-[11px] font-mono text-slate-400">3개 요소</span>
          </div>

          <div className="space-y-3">
            {claims.map((claim) => (
              <div key={claim.id} className="p-3.5 rounded-xl bg-nexus-surface/80 border border-white/5 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-xs font-bold text-slate-200">{claim.elementName}</h3>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                    claim.status === 'LITERAL' 
                      ? 'bg-nexus-rose/20 text-nexus-rose border border-nexus-rose/30' 
                      : claim.status === 'EQUIVALENTS'
                      ? 'bg-nexus-amber/20 text-nexus-amber border border-nexus-amber/30'
                      : 'bg-nexus-emerald/20 text-nexus-emerald border border-nexus-emerald/30'
                  }`}>
                    {claim.status === 'LITERAL' ? '문언침해' : claim.status === 'EQUIVALENTS' ? '균등론 주의' : '공지기술(안전)'}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{claim.description}</p>
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-1 border-t border-white/5">
                  <span>타깃: {claim.targetPatent}</span>
                  <span className="text-slate-400">({claim.competitor})</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center Col (5): Three.js 3D Viewport */}
        <div className="lg:col-span-5 glass-panel p-5 rounded-2xl border border-white/10 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-nexus-cyan animate-ping" />
              <h2 className="text-sm font-semibold text-white">3D 기구학 디지털 트윈 뷰포트</h2>
            </div>
            <button
              onClick={() => setShowBoundaries(!showBoundaries)}
              className={`text-xs px-2.5 py-1 rounded-lg font-mono border transition-all ${
                showBoundaries ? 'bg-nexus-blue/20 text-nexus-cyan border-nexus-cyan/40' : 'bg-white/5 text-slate-400 border-white/10'
              }`}
            >
              경쟁사 특허 경계선 {showBoundaries ? 'ON' : 'OFF'}
            </button>
          </div>

          {/* 3D Canvas Canvas */}
          <div className="h-72 w-full bg-nexus-bg rounded-xl relative overflow-hidden border border-white/5">
            <RoboticArmCanvas 
              kinematicState={kinematics}
              showBoundaries={showBoundaries}
              highlightConflict={!isSafe}
            />

            {/* In-canvas Realtime HUD */}
            <div className="absolute top-3 left-3 bg-nexus-panel/90 border border-white/10 p-2.5 rounded-xl text-[11px] font-mono space-y-1 backdrop-blur-md pointer-events-none">
              <div className="text-nexus-cyan">관절 토크: {kinematics.torque} Nm</div>
              <div className="text-slate-300">각속도: {kinematics.velocity} rad/s</div>
              <div className="text-nexus-purple">자유도(DoF): 7-DoF Arm</div>
            </div>
          </div>

          {/* DoF Joint Sliders */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-xs font-mono text-slate-300">
              <span className="flex items-center gap-1.5"><Sliders className="w-3.5 h-3.5 text-nexus-cyan" /> 어깨 관절 (Joint 1)</span>
              <span>{kinematics.joint1Angle}°</span>
            </div>
            <input
              type="range"
              min="-90"
              max="90"
              value={kinematics.joint1Angle}
              onChange={(e) => setKinematics({ ...kinematics, joint1Angle: Number(e.target.value) })}
              className="w-full accent-nexus-cyan bg-nexus-surface h-1.5 rounded-lg appearance-none cursor-pointer"
            />

            <div className="flex items-center justify-between text-xs font-mono text-slate-300">
              <span className="flex items-center gap-1.5"><Sliders className="w-3.5 h-3.5 text-nexus-cyan" /> 팔꿈치 관절 (Joint 2)</span>
              <span>{kinematics.joint2Angle}°</span>
            </div>
            <input
              type="range"
              min="-90"
              max="90"
              value={kinematics.joint2Angle}
              onChange={(e) => setKinematics({ ...kinematics, joint2Angle: Number(e.target.value) })}
              className="w-full accent-nexus-cyan bg-nexus-surface h-1.5 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* Right Col (3): AI Design-Around Recommender */}
        <div className="lg:col-span-3 glass-panel p-5 rounded-2xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-nexus-cyan" />
              AI 회피설계 솔루션
            </h2>
            <span className="text-[11px] font-mono text-nexus-emerald">최적화</span>
          </div>

          <div className="space-y-3">
            {suggestions.map((sug) => (
              <div key={sug.id} className="p-3.5 rounded-xl bg-nexus-surface/80 border border-white/5 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-nexus-cyan">{sug.targetPatent} 회피</span>
                  <span className="text-[10px] font-mono text-nexus-emerald">안전도 +{sug.impactScore}%</span>
                </div>
                <div className="text-[11px] space-y-1 font-mono">
                  <div className="text-slate-400 line-through">기존: {sug.originalParam}</div>
                  <div className="text-nexus-emerald font-bold">권장: {sug.suggestedParam}</div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{sug.rationale}</p>
                <button
                  onClick={() => handleApplySuggestion(sug.id)}
                  className={`w-full py-2 rounded-lg font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${
                    sug.applied
                      ? 'bg-nexus-emerald text-black shadow-md'
                      : 'bg-nexus-panel border border-nexus-cyan/40 text-nexus-cyan hover:bg-nexus-cyan hover:text-black'
                  }`}
                >
                  {sug.applied ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" /> 회피 파라미터 적용됨
                    </>
                  ) : (
                    <>
                      <Zap className="w-3.5 h-3.5" /> 3D 기구학 파라미터 적용
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};