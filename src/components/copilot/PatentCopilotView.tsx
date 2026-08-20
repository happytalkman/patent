import React, { useState } from 'react';
import { 
  Sparkles, 
  Bot, 
  Scale, 
  FileText, 
  ShieldAlert, 
  ShieldCheck, 
  Cpu, 
  Zap, 
  Download, 
  Copy, 
  Check, 
  ArrowRight,
  Flame,
  Layers
} from 'lucide-react';
import { mockDisputes } from '../../data/mockData';
import type { AiDisputeScenario } from '../../types';

export const PatentCopilotView: React.FC = () => {
  // Mode: Claim Generator or Dispute Simulator
  const [mode, setMode] = useState<'claim_generator' | 'dispute_simulator'>('claim_generator');

  // Claim Generator State
  const [robotType, setRobotType] = useState('7-DoF 휴머노이드 매니퓰레이터');
  const [actuatorType, setActuatorType] = useState('준직접구동(QDD) 복합 감속기 (18:1 감속비)');
  const [sensorType, setSensorType] = useState('광학-압전 하이브리드 고해상도 촉각 센싱 스킨');
  const [controlAlgorithm, setControlAlgorithm] = useState('VLA 제로샷 잠재 임베딩 폐루프 임피던스 제어');
  const [targetJurisdiction, setTargetJurisdiction] = useState<'KR' | 'US' | 'PCT'>('US');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDraft, setGeneratedDraft] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Dispute Simulator State
  const [selectedDispute, setSelectedDispute] = useState<AiDisputeScenario>(mockDisputes[0]);
  const [simulatingLitigation, setSimulatingLitigation] = useState(false);

  const handleGenerateClaim = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const draft = targetJurisdiction === 'US' 
        ? `[USPTO 35 U.S.C. 112 Formatted Patent Claim Draft]\n\n` +
          `What is claimed is:\n\n` +
          `1. (Independent Claim) An embodied physical artificial intelligence robotic system comprising:\n` +
          `   a robotic manipulator having at least seven degrees of freedom (7-DoF) actuated via ${actuatorType};\n` +
          `   a sensory tactile skin array disposed on an end-effector of the robotic manipulator, configured to generate multi-axis pressure tensors via ${sensorType};\n` +
          `   a vision-language-action (VLA) neural processing unit communicatively coupled to the sensory tactile skin array; and\n` +
          `   a real-time closed-loop controller configured to execute ${controlAlgorithm} to dynamically modulate motor joint torques within a latency of less than 8.5 milliseconds, thereby preventing object slippage and avoiding physical interference boundaries.\n\n` +
          `2. (Dependent Claim) The robotic system of claim 1, wherein the ${actuatorType} provides backdrivability with an energy regeneration efficiency of at least 58% during deceleration.\n\n` +
          `3. (Dependent Claim) The robotic system of claim 1, wherein the real-time closed-loop controller bypasses zero-moment point (ZMP) numerical solvers by directly inferring whole-body torque vectors in latent space.`
        : `[특허청(KIPO) 특허법 제42조 준수 특허청구범위 초안]\n\n` +
          `【청구항 1】 (독립항)\n` +
          `${actuatorType}에 의해 구동되는 7-자유도(7-DoF) 이상의 다관절 로봇 아암부;\n` +
          `상기 다관절 로봇 아암부의 엔드이펙터에 배치되며, ${sensorType}에 기반하여 다차원 접촉 응력 텐서를 측정하는 촉각 센싱부;\n` +
          `상기 촉각 센싱부와 연동되어 비정형 객체의 공간 물리 상태를 추론하는 임베디드 AI 프로세서; 및\n` +
          `상기 임베디드 AI 프로세서의 출력에 따라 ${controlAlgorithm}을 10ms 이하의 제어 주기로 수행하여 관절 토크를 가역적으로 조절하는 실시간 구동 제어부;\n` +
          `를 포함하는 것을 특징으로 하는 피지컬 AI 기반 자율 조작 시스템.\n\n` +
          `【청구항 2】 (종속항)\n` +
          `제1항에 있어서, 상기 구동 제어부는 외력 인가 시 충격 에너지를 가역적으로 회생하여 감속기 백래시를 상쇄하는 것을 특징으로 하는 자율 조작 시스템.`;

      setGeneratedDraft(draft);
      setIsGenerating(false);
    }, 900);
  };

  const handleCopy = () => {
    if (generatedDraft) {
      navigator.clipboard.writeText(generatedDraft);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="glass-panel-glow p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-nexus-cyan mb-1">
            <Bot className="w-4 h-4" />
            <span>AI MULTI-LLM EMBODIED PATENT COPILOT</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold font-sora text-white">
            피지컬 AI 특허 청구항 생성기 & 가상 특허 분쟁 시뮬레이터
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            하드웨어 기구학 스펙 기반 KIPO/USPTO 독립항·종속항 자동 작성 및 글로벌 선도사(Tesla, Boston Dynamics) 가상 침해 소송 공방 분석
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-nexus-panel p-1 rounded-xl border border-white/10 text-xs">
          <button
            onClick={() => setMode('claim_generator')}
            className={`px-3.5 py-2 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              mode === 'claim_generator'
                ? 'bg-nexus-cyan text-black font-bold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI 특허 명세서 초안기</span>
          </button>
          <button
            onClick={() => setMode('dispute_simulator')}
            className={`px-3.5 py-2 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              mode === 'dispute_simulator'
                ? 'bg-nexus-cyan text-black font-bold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>가상 침해 소송 시뮬레이터</span>
          </button>
        </div>
      </div>

      {mode === 'claim_generator' ? (
        /* Claim Generator Grid */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Configuration Panel (5 Cols) */}
          <div className="lg:col-span-5 glass-panel p-5 rounded-2xl border border-white/10 space-y-4">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-nexus-cyan" />
              로봇 기구학 및 AI 파라미터 입력
            </h2>

            <div className="space-y-3.5 text-xs">
              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">출원 대상국 (Jurisdiction)</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['US', 'KR', 'PCT'] as const).map((jur) => (
                    <button
                      key={jur}
                      onClick={() => setTargetJurisdiction(jur)}
                      className={`py-2 rounded-xl font-mono text-xs transition-all border ${
                        targetJurisdiction === jur
                          ? 'bg-nexus-cyan text-black font-bold border-nexus-cyan shadow'
                          : 'bg-nexus-surface border-white/10 text-slate-300 hover:border-white/30'
                      }`}
                    >
                      {jur === 'US' ? '🇺🇸 USPTO (미국)' : jur === 'KR' ? '🇰🇷 KIPO (한국)' : '🌐 PCT 국제출원'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">로봇 폼팩터 / 자유도(DoF)</label>
                <input
                  type="text"
                  value={robotType}
                  onChange={(e) => setRobotType(e.target.value)}
                  className="w-full bg-nexus-surface border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-nexus-cyan"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">액추에이터 및 감속기 메커니즘</label>
                <input
                  type="text"
                  value={actuatorType}
                  onChange={(e) => setActuatorType(e.target.value)}
                  className="w-full bg-nexus-surface border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-nexus-cyan"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">센서 모달리티 (촉각/비전/IMU)</label>
                <input
                  type="text"
                  value={sensorType}
                  onChange={(e) => setSensorType(e.target.value)}
                  className="w-full bg-nexus-surface border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-nexus-cyan"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">제어 알고리즘 및 소프트웨어 특징</label>
                <input
                  type="text"
                  value={controlAlgorithm}
                  onChange={(e) => setControlAlgorithm(e.target.value)}
                  className="w-full bg-nexus-surface border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-nexus-cyan"
                />
              </div>
            </div>

            <button
              onClick={handleGenerateClaim}
              disabled={isGenerating}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-nexus-cyan to-nexus-blue text-black font-bold text-xs hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg shadow-nexus-cyan/20 cursor-pointer disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Zap className="w-4 h-4 animate-spin text-black" />
                  <span>특허 명세서 독립항/종속항 추론 중...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>KIPO/USPTO 청구항 초안 생성</span>
                </>
              )}
            </button>
          </div>

          {/* Right Generated Output Panel (7 Cols) */}
          <div className="lg:col-span-7 glass-panel p-5 rounded-2xl border border-white/10 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-nexus-cyan" />
                  <h3 className="text-sm font-bold text-white">생성된 특허 청구범위(Claims)</h3>
                </div>
                {generatedDraft && (
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-nexus-surface border border-white/10 text-xs text-slate-300 hover:text-nexus-cyan hover:border-nexus-cyan/30 transition-all"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-nexus-emerald" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? '복사 완료' : '초안 복사'}</span>
                  </button>
                )}
              </div>

              <div className="bg-nexus-bg/90 border border-white/10 rounded-xl p-4 font-mono text-xs text-slate-200 whitespace-pre-wrap leading-relaxed h-[360px] overflow-y-auto">
                {generatedDraft ? (
                  generatedDraft
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-2">
                    <Sparkles className="w-8 h-8 text-slate-600" />
                    <p className="text-center text-xs">
                      좌측 파라미터를 확인하고 [KIPO/USPTO 청구항 초안 생성]을 클릭하세요.<br />
                      특허 명세서 102조/103조 진보성 요건을 충족하는 청구항이 생성됩니다.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Export Actions */}
            <div className="flex items-center gap-2 pt-2 border-t border-white/5">
              <button
                onClick={() => alert('특허청 온라인 출원용 SDF/XML 패키지가 다운로드되었습니다.')}
                className="flex-1 py-2.5 rounded-xl bg-nexus-surface border border-white/10 text-slate-200 text-xs font-semibold hover:border-nexus-cyan/40 hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-3.5 h-3.5 text-nexus-cyan" />
                <span>특허청(SDF/XML) 전자출원 패키지 저장</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Dispute Simulator Grid */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Dispute Selection (4 Cols) */}
          <div className="lg:col-span-4 glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
            <h2 className="text-sm font-bold text-white flex items-center gap-2 mb-2">
              <Scale className="w-4 h-4 text-nexus-rose" />
              가상 특허 분쟁 시나리오
            </h2>

            <div className="space-y-2">
              {mockDisputes.map((disp) => (
                <button
                  key={disp.id}
                  onClick={() => setSelectedDispute(disp)}
                  className={`w-full p-3.5 rounded-xl text-left border transition-all ${
                    selectedDispute.id === disp.id
                      ? 'bg-nexus-panel border-nexus-rose text-white shadow-lg'
                      : 'bg-nexus-surface/60 border-white/5 text-slate-400 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span className="text-nexus-rose font-bold">승소 확률 {disp.successProbability}%</span>
                    <span className="text-slate-500 font-mono text-[10px]">FTO 시뮬레이션</span>
                  </div>
                  <p className="text-xs font-bold text-slate-200 leading-snug line-clamp-2">{disp.targetPatent}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Trial / Defense Analysis (8 Cols) */}
          <div className="lg:col-span-8 glass-panel p-5 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-nexus-rose/20 text-nexus-rose border border-nexus-rose/30">
                  LITIGATION MOCK TRIAL
                </span>
                <h3 className="text-base font-bold text-white mt-1.5">{selectedDispute.targetPatent}</h3>
              </div>
              <div className="bg-nexus-emerald/10 border border-nexus-emerald/30 px-3 py-1.5 rounded-xl text-right">
                <span className="text-[10px] font-mono text-slate-400 block">회피 방어 성공률</span>
                <span className="text-sm font-bold font-mono text-nexus-emerald">{selectedDispute.successProbability}% (우세)</span>
              </div>
            </div>

            {/* Plaintiff Argument Box */}
            <div className="p-4 bg-nexus-rose/10 border border-nexus-rose/30 rounded-xl space-y-1.5">
              <span className="text-xs font-bold text-nexus-rose flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4" /> 원고 (특허권자) 침해 주장 논리
              </span>
              <p className="text-xs text-slate-200 leading-relaxed font-sans">{selectedDispute.plaintiffArgument}</p>
            </div>

            {/* Defense Counter-Argument Box */}
            <div className="p-4 bg-nexus-cyan/10 border border-nexus-cyan/30 rounded-xl space-y-1.5">
              <span className="text-xs font-bold text-nexus-cyan flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> 피고 (자사) 기구학적 회피 및 무효화 반론
              </span>
              <p className="text-xs text-slate-200 leading-relaxed font-sans">{selectedDispute.defenseStrategy}</p>
            </div>

            {/* Recommended Design-Around Modifications */}
            <div className="p-4 bg-nexus-surface rounded-xl border border-white/5 space-y-2">
              <span className="text-xs font-bold text-nexus-purple flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> AI 권장 설계변경(Design-Around) 필수 요구사항
              </span>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {selectedDispute.recommendedModifications.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded bg-nexus-purple/20 text-nexus-purple font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};