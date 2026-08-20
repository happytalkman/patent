import React, { useState } from 'react';
import type { ClaimElement, DesignAroundSuggestion, KinematicState } from '../../types';
import { RoboticArmCanvas } from './RoboticArmCanvas';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Cpu, 
  RotateCw, 
  Sparkles, 
  Sliders, 
  Download, 
  Activity,
  CheckCircle,
  AlertTriangle,
  Layers,
  FileText,
  Play
} from 'lucide-react';

export const mockClaimElements: ClaimElement[] = [
  {
    id: 'el-1',
    elementName: 'Element A: 브러시리스 하모닉 드라이브 감속기',
    patentClaimText: '로봇 암의 각 관절 축에 배치된 하모닉 드라이브와 모터가 동축(Coaxial)으로 일체화된 구동 유닛',
    infringementStatus: 'LITERAL',
    notes: '테슬라 옵티머스 특허(US 11,492,048 B2) 청구항 1과 문언 침해(Literal Infringement) 위험 높음'
  },
  {
    id: 'el-2',
    elementName: 'Element B: 2축 짐벌 롤/피치 손목 관절',
    patentClaimText: '엔드이펙터 전단에 배치되어 직교하는 2개의 회전축을 갖는 짐벌 조인트 구조',
    infringementStatus: 'EQUIVALENCE',
    notes: '보스턴다이내믹스 아틀라스 특허와 기능·작용효과 동일성으로 균등론(Doctrine of Equivalents) 저촉 가능성'
  },
  {
    id: 'el-3',
    elementName: 'Element C: 고속 토크 피드백 제어 루프',
    patentClaimText: '관절 부하 토크를 1kHz 이상으로 샘플링하여 전류 지령을 보정하는 임피던스 제어식',
    infringementStatus: 'CLEARED',
    notes: '공지기술(Prior Art) 범위에 해당하여 비침해(Cleared) 확인 완료'
  }
];

export const mockSuggestions: DesignAroundSuggestion[] = [
  {
    id: 'sug-1',
    targetElementId: 'el-1',
    title: '준직접구동(QDD) 플래너터리 기어박스로 설계 변경',
    technicalChange: '하모닉 드라이브 대신 백드라이브 가능한 18:1 감속비의 유성치차 기구 적용 및 토크 센서 외치형 분리 배치',
    impactScore: 45,
    kinematicParams: { speedRadS: 3.2, torqueNm: 28.5 }
  },
  {
    id: 'sug-2',
    targetElementId: 'el-2',
    title: '연속 3축 오프셋 구면 관절(Spherical Wrist) 채택',
    technicalChange: '직교 짐벌 대신 3축 경사 오프셋 구면 링크를 적용하여 경쟁사 2축 청구항 구성요소 완비의 원칙(All-Elements Rule) 회피',
    impactScore: 25,
    kinematicParams: { joint1: 25, joint2: -35, joint3: 45 }
  }
];

export const FtoSimulatorView: React.FC = () => {
  const [elements, setElements] = useState<ClaimElement[]>(mockClaimElements);
  const [suggestions, setSuggestions] = useState<DesignAroundSuggestion[]>(mockSuggestions);
  const [appliedSuggestions, setAppliedSuggestions] = useState<string[]>([]);
  
  const [kinematicState, setKinematicState] = useState<KinematicState>({
    joint1: 15,
    joint2: -25,
    joint3: 30,
    joint4: 10,
    joint5: -15,
    joint6: 5,
    joint7: 20,
    torqueNm: 42.5,
    speedRadS: 2.1,
    endEffectorPos: { x: 0.65, y: 1.28, z: 0.42 },
    trajectoryMode: 'manual'
  });

  const [showBoundaries, setShowBoundaries] = useState<boolean>(true);
  const [conflictRiskScore, setConflictRiskScore] = useState<number>(78);

  const handleApplySuggestion = (sug: DesignAroundSuggestion) => {
    if (appliedSuggestions.includes(sug.id)) return;

    setAppliedSuggestions([...appliedSuggestions, sug.id]);
    setConflictRiskScore(prev => Math.max(12, prev - sug.impactScore));

    setElements(elements.map(el => {
      if (el.id === sug.targetElementId) {
        return {
          ...el,
          infringementStatus: 'CLEARED',
          notes: `[AI 회피설계 적용 완료] ${sug.technicalChange}`
        };
      }
      return el;
    }));

    setKinematicState(prev => ({
      ...prev,
      ...sug.kinematicParams,
      torqueNm: Number((prev.torqueNm * 0.85).toFixed(1)),
    }));
  };

  const handleTrajectoryChange = (mode: KinematicState['trajectoryMode']) => {
    setKinematicState(prev => {
      if (mode === 'pick_place') {
        return { ...prev, trajectoryMode: mode, joint1: 45, joint2: -50, joint3: 60, speedRadS: 4.5, endEffectorPos: { x: 0.85, y: 0.95, z: 0.20 } };
      } else if (mode === 'high_speed_servo') {
        return { ...prev, trajectoryMode: mode, joint1: -30, joint2: -15, joint3: 20, speedRadS: 8.2, endEffectorPos: { x: 0.50, y: 1.55, z: 0.60 } };
      } else {
        return { ...prev, trajectoryMode: 'manual', joint1: 15, joint2: -25, joint3: 30, speedRadS: 2.1, endEffectorPos: { x: 0.65, y: 1.28, z: 0.42 } };
      }
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="glass-panel-glow p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-nexus-cyan mb-1">
            <Cpu className="w-4 h-4" />
            <span>3D KINEMATICS & FTO DIGITAL TWIN ENGINE</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold font-sora text-white">
            피지컬 AI 3D 기구학 & 특허침해회피(FTO) 시뮬레이터
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            명세서 속 청구항의 물리적 관절 자유도와 기구학적 침해 경계면(Envelope)을 실시간으로 3D 검증합니다.
          </p>
        </div>

        {/* Global Conflict Meter */}
        <div className="flex items-center gap-3 bg-nexus-panel border border-white/10 p-3 rounded-xl">
          <div>
            <p className="text-[11px] font-mono text-slate-400">자사 모델 침해 위험도</p>
            <p className={`text-lg font-bold font-mono ${
              conflictRiskScore > 50 ? 'text-nexus-rose' : 'text-nexus-emerald'
            }`}>
              {conflictRiskScore}% ({conflictRiskScore > 50 ? '고위험 충돌' : '안전 범위'})
            </p>
          </div>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
            conflictRiskScore > 50 ? 'bg-nexus-rose/20 text-nexus-rose' : 'bg-nexus-emerald/20 text-nexus-emerald'
          }`}>
            {conflictRiskScore > 50 ? <ShieldAlert className="w-6 h-6 animate-pulse" /> : <ShieldCheck className="w-6 h-6" />}
          </div>
        </div>
      </div>

      {/* Main Grid: 3D Canvas + Claim Decomposition */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 Cols): 3D Robotic Arm Canvas */}
        <div className="lg:col-span-7 glass-panel p-5 rounded-2xl border border-white/10 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <Activity className="w-4 h-4 text-nexus-cyan" />
              <span>실시간 디지털 트윈 (7-DoF 휴머노이드 매니퓰레이터)</span>
            </div>
            
            {/* Trajectory Selector */}
            <div className="flex items-center gap-1.5 bg-nexus-panel p-1 rounded-lg border border-white/10 text-xs font-mono">
              <button
                onClick={() => handleTrajectoryChange('manual')}
                className={`px-2 py-1 rounded ${kinematicState.trajectoryMode === 'manual' ? 'bg-nexus-cyan text-black font-bold' : 'text-slate-400'}`}
              >
                수동 제어
              </button>
              <button
                onClick={() => handleTrajectoryChange('pick_place')}
                className={`px-2 py-1 rounded ${kinematicState.trajectoryMode === 'pick_place' ? 'bg-nexus-cyan text-black font-bold' : 'text-slate-400'}`}
              >
                Pick&Place 궤적
              </button>
              <button
                onClick={() => handleTrajectoryChange('high_speed_servo')}
                className={`px-2 py-1 rounded ${kinematicState.trajectoryMode === 'high_speed_servo' ? 'bg-nexus-cyan text-black font-bold' : 'text-slate-400'}`}
              >
                고속 서보
              </button>
            </div>
          </div>

          {/* 3D Canvas Viewport */}
          <div className="h-80 w-full bg-nexus-bg rounded-xl relative overflow-hidden border border-white/5">
            <RoboticArmCanvas
              kinematicState={kinematicState}
              showBoundaries={showBoundaries}
              highlightConflict={conflictRiskScore > 50}
            />

            {/* Overlaid HUD Metrics */}
            <div className="absolute top-3 left-3 bg-nexus-panel/90 border border-white/10 p-2.5 rounded-xl text-[11px] font-mono space-y-1 backdrop-blur-md">
              <div className="text-nexus-cyan font-bold">End-Effector Pose:</div>
              <div className="text-slate-300">X: {kinematicState.endEffectorPos.x}m | Y: {kinematicState.endEffectorPos.y}m | Z: {kinematicState.endEffectorPos.z}m</div>
              <div className="text-slate-400">관절 토크: {kinematicState.torqueNm} Nm | 속도: {kinematicState.speedRadS} rad/s</div>
            </div>

            {/* Boundary Toggle */}
            <button
              onClick={() => setShowBoundaries(!showBoundaries)}
              className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-nexus-panel/90 border border-white/10 text-xs font-mono text-nexus-cyan hover:bg-nexus-cyan hover:text-black transition-all backdrop-blur-md flex items-center gap-1.5"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{showBoundaries ? '경쟁사 특허 경계면 표시 중' : '경계면 숨김'}</span>
            </button>
          </div>

          {/* Real-time Joint Sliders */}
          <div className="grid grid-cols-3 gap-3 p-3 bg-nexus-surface/80 rounded-xl border border-white/5">
            <div>
              <label className="text-[11px] font-mono text-slate-400 block mb-1">
                J1 어깨 Yaw: {kinematicState.joint1}°
              </label>
              <input
                type="range"
                min="-90"
                max="90"
                value={kinematicState.joint1}
                onChange={(e) => setKinematicState({ ...kinematicState, joint1: Number(e.target.value) })}
                className="w-full accent-nexus-cyan h-1 bg-nexus-panel rounded"
              />
            </div>
            <div>
              <label className="text-[11px] font-mono text-slate-400 block mb-1">
                J2 팔꿈치 Pitch: {kinematicState.joint2}°
              </label>
              <input
                type="range"
                min="-90"
                max="90"
                value={kinematicState.joint2}
                onChange={(e) => setKinematicState({ ...kinematicState, joint2: Number(e.target.value) })}
                className="w-full accent-nexus-cyan h-1 bg-nexus-panel rounded"
              />
            </div>
            <div>
              <label className="text-[11px] font-mono text-slate-400 block mb-1">
                J3 손목 Roll: {kinematicState.joint3}°
              </label>
              <input
                type="range"
                min="-90"
                max="90"
                value={kinematicState.joint3}
                onChange={(e) => setKinematicState({ ...kinematicState, joint3: Number(e.target.value) })}
                className="w-full accent-nexus-cyan h-1 bg-nexus-panel rounded"
              />
            </div>
          </div>
        </div>

        {/* Right Column (5 Cols): Claim Breakdown & AI Design-Around */}
        <div className="lg:col-span-5 space-y-4">
          {/* Claim Breakdown Card */}
          <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-nexus-cyan" />
                선행특허 청구항 구성요소별 침해 판정
              </h2>
              <span className="text-[11px] font-mono text-slate-400">US 11,492,048 B2</span>
            </div>

            <div className="space-y-2.5">
              {elements.map((el) => (
                <div key={el.id} className="p-3 bg-nexus-surface/90 rounded-xl border border-white/5 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200">{el.elementName}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                      el.infringementStatus === 'LITERAL' ? 'bg-nexus-rose/20 text-nexus-rose border border-nexus-rose/30' :
                      el.infringementStatus === 'EQUIVALENCE' ? 'bg-nexus-amber/20 text-nexus-amber border border-nexus-amber/30' :
                      'bg-nexus-emerald/20 text-nexus-emerald border border-nexus-emerald/30'
                    }`}>
                      {el.infringementStatus === 'LITERAL' ? '문언침해 위험' :
                       el.infringementStatus === 'EQUIVALENCE' ? '균등론 주의' : '회피 완료 (안전)'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-mono leading-relaxed">{el.patentClaimText}</p>
                  <p className="text-[11px] text-nexus-cyan/90 leading-tight">{el.notes}</p>
                </div>
              ))}
            </div>
          </div>

          {/* AI Design-Around Recommendations */}
          <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-nexus-purple" />
              AI 회피설계(Design-Around) 최적화 추천
            </h2>

            <div className="space-y-2.5">
              {suggestions.map((sug) => {
                const isApplied = appliedSuggestions.includes(sug.id);
                return (
                  <div key={sug.id} className="p-3 bg-nexus-surface/90 rounded-xl border border-white/5 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-bold text-slate-200">{sug.title}</p>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-nexus-emerald/20 text-nexus-emerald border border-nexus-emerald/30 whitespace-nowrap">
                        위험도 -{sug.impactScore}%
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{sug.technicalChange}</p>

                    <button
                      onClick={() => handleApplySuggestion(sug)}
                      disabled={isApplied}
                      className={`w-full py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                        isApplied
                          ? 'bg-nexus-emerald/20 text-nexus-emerald border border-nexus-emerald/30 cursor-default'
                          : 'bg-nexus-purple hover:bg-nexus-purple/90 text-white shadow-md shadow-nexus-purple/20'
                      }`}
                    >
                      {isApplied ? (
                        <>
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>3D 기구학 파라미터 적용됨</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>3D 기구학 파라미터 적용</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => alert('회피설계 명세서 및 3D 기구학 FTO 감정서(PDF)가 다운로드되었습니다.')}
              className="w-full py-2.5 rounded-xl bg-nexus-panel border border-white/10 text-xs font-medium text-slate-300 hover:text-nexus-cyan hover:border-nexus-cyan/40 transition-all flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>회피설계 명세서 & FTO 감정서(PDF) 내보내기</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};