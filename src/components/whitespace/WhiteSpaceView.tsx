import React, { useState } from 'react';
import { WhiteSpaceNode, PatentFamilyNode } from '../../types';
import { mockWhiteSpaces, mockFamilyTrees } from '../../data/mockData';
import { 
  Compass, 
  Sparkles, 
  GitBranch, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Layers, 
  ChevronRight, 
  Download, 
  Zap, 
  Search, 
  Flame 
} from 'lucide-react';

export const WhiteSpaceView: React.FC = () => {
  const [whiteSpaces] = useState<WhiteSpaceNode[]>(mockWhiteSpaces);
  const [selectedNode, setSelectedNode] = useState<WhiteSpaceNode>(mockWhiteSpaces[0]);
  const [activeTabMode, setActiveTabMode] = useState<'matrix' | 'family'>('matrix');
  const [blueprintGenerated, setBlueprintGenerated] = useState<boolean>(false);

  const handleGenerateBlueprint = () => {
    setBlueprintGenerated(true);
    setTimeout(() => setBlueprintGenerated(false), 4000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="glass-panel-glow p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-nexus-purple mb-1">
            <Compass className="w-4 h-4" />
            <span>WHITE SPACE DISCOVERY & GLOBAL FAMILY TREE</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold font-sora text-white">
            피지컬 AI 특허 공백기술(White Space) 탐색 및 패밀리 트리
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            기술성숙도(TRL) vs 출원밀도 기반 고가치 특허 공백 도출 및 글로벌 5개국 패밀리 트리 분쟁 분석
          </p>
        </div>

        {/* View Switcher & AI Drafting Action */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex bg-nexus-panel p-1 rounded-xl border border-white/10 text-xs">
            <button
              onClick={() => setActiveTabMode('matrix')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTabMode === 'matrix' ? 'bg-nexus-purple text-white font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              화이트스페이스 산점도
            </button>
            <button
              onClick={() => setActiveTabMode('family')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTabMode === 'family' ? 'bg-nexus-purple text-white font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              글로벌 패밀리 트리
            </button>
          </div>

          <button
            onClick={handleGenerateBlueprint}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-nexus-purple to-nexus-cyan text-black font-bold text-xs hover:brightness-110 transition-all flex items-center gap-1.5 shadow-lg shadow-nexus-purple/20"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI 특허 명세서 청사진 생성</span>
          </button>
        </div>
      </div>

      {blueprintGenerated && (
        <div className="p-3 bg-nexus-purple/20 border border-nexus-purple/40 text-white text-xs font-mono rounded-xl flex items-center gap-2 animate-fadeIn">
          <Zap className="w-4 h-4 text-nexus-cyan" />
          <span>선택된 공백기술 [{selectedNode.title}]의 AI 특허 청구항 및 신규성 입증 청사진이 생성되었습니다.</span>
        </div>
      )}

      {/* Main Content Layout */}
      {activeTabMode === 'matrix' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Col (7): 2D/3D Scatter Matrix */}
          <div className="lg:col-span-7 glass-panel p-5 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                <Compass className="w-4 h-4 text-nexus-purple" />
                기술성숙도(TRL) vs 특허 출원밀도 기회 산점도
              </h2>
              <span className="text-[11px] font-mono text-nexus-purple font-bold">● 공백 기회 영역</span>
            </div>

            {/* Visual Scatter Grid */}
            <div className="h-80 bg-nexus-surface/80 rounded-xl border border-white/5 p-4 relative flex flex-col justify-between">
              <div className="flex justify-between text-[11px] font-mono text-slate-500">
                <span>↑ 출원 밀도 높음 (과밀 경쟁)</span>
                <span>TRL 9 (상용화) →</span>
              </div>

              {/* Plotted Glowing Nodes */}
              <div className="relative w-full h-56">
                {whiteSpaces.map((node) => {
                  const leftPos = (node.trlLevel / 9) * 80 + 10;
                  const bottomPos = (100 - node.filingDensity) * 0.7;
                  const isSelected = selectedNode.id === node.id;

                  return (
                    <div
                      key={node.id}
                      onClick={() => setSelectedNode(node)}
                      style={{ left: `${leftPos}%`, bottom: `${bottomPos}%` }}
                      className={`absolute -translate-x-1/2 cursor-pointer group transition-transform ${
                        isSelected ? 'scale-125 z-20' : 'hover:scale-110 z-10'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-[10px] font-bold shadow-lg transition-all ${
                        isSelected 
                          ? 'bg-nexus-purple text-white ring-4 ring-nexus-purple/40 shadow-nexus-purple'
                          : 'bg-nexus-panel border border-nexus-purple text-nexus-purple hover:bg-nexus-purple hover:text-white'
                      }`}>
                        {node.opportunityScore}
                      </div>

                      {/* Tooltip Tag */}
                      <div className="absolute top-9 -left-12 whitespace-nowrap bg-nexus-panel/90 border border-white/10 px-2 py-1 rounded text-[10px] font-mono text-slate-200 pointer-events-none shadow-md">
                        {node.domain}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between text-[11px] font-mono text-slate-500 border-t border-white/5 pt-1">
                <span>← TRL 1 (기초 연구)</span>
                <span className="text-nexus-cyan">↓ 출원 밀도 낮음 (블루오션)</span>
              </div>
            </div>

            {/* Quick Node Selector Pills */}
            <div className="space-y-2 pt-1">
              <span className="text-xs font-mono text-slate-400">발견된 Top 3 특허 공백 기술:</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {whiteSpaces.map((node) => (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    className={`p-3 rounded-xl text-left border transition-all ${
                      selectedNode.id === node.id
                        ? 'bg-nexus-panel border-nexus-purple text-white shadow-md'
                        : 'bg-nexus-surface/60 border-white/5 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-nexus-purple font-bold">기회 {node.opportunityScore}점</span>
                      <span className="text-slate-500">TRL {node.trlLevel}</span>
                    </div>
                    <p className="text-xs font-bold text-slate-200 line-clamp-1 mt-1">{node.title}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Col (5): Innovation Blueprint Drawer */}
          <div className="lg:col-span-5 glass-panel p-5 rounded-2xl border border-white/10 space-y-4 flex flex-col justify-between">
            <div className="space-y-3.5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-nexus-purple/20 text-nexus-purple border border-nexus-purple/30">
                    {selectedNode.domain}
                  </span>
                  <h2 className="text-base font-bold text-white mt-1.5 leading-snug">
                    {selectedNode.title}
                  </h2>
                </div>
                <div className="bg-nexus-purple/10 border border-nexus-purple/30 px-2.5 py-1 rounded-lg text-nexus-purple font-mono text-xs font-bold whitespace-nowrap">
                  기회지수 {selectedNode.opportunityScore}/100
                </div>
              </div>

              {/* AI Generated Independent Claim Draft */}
              <div className="p-3.5 bg-nexus-surface/90 rounded-xl border border-white/5 space-y-2">
                <span className="text-xs font-semibold text-nexus-cyan flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" /> AI 권장 독립항 청구범위
                </span>
                <p className="text-xs text-slate-200 font-mono leading-relaxed bg-nexus-panel p-2.5 rounded-lg border border-white/5">
                  {selectedNode.suggestedClaim}
                </p>
              </div>

              {/* Novelty Rationale & Strategy */}
              <div className="p-3.5 bg-nexus-surface/90 rounded-xl border border-white/5 space-y-2">
                <span className="text-xs font-semibold text-nexus-emerald flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" /> 선행기술 대비 신규성/진보성 논리
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedNode.noveltyRationale}
                </p>
              </div>

              <div className="p-3 bg-nexus-surface/90 rounded-xl border border-white/5 space-y-1.5">
                <span className="text-xs font-semibold text-nexus-purple font-mono">권장 출원 로드맵</span>
                <p className="text-xs text-slate-400 font-mono">{selectedNode.filingStrategy}</p>
              </div>
            </div>

            <button
              onClick={handleGenerateBlueprint}
              className="w-full py-3 rounded-xl bg-nexus-purple hover:bg-nexus-purple/90 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-nexus-purple/20"
            >
              <Download className="w-4 h-4" />
              <span>특허청 출원용 기술설명서(SDF) 패키지 다운로드</span>
            </button>
          </div>
        </div>
      ) : (
        /* Family Tree View */
        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-nexus-cyan" />
              글로벌 피지컬 AI 선도사 패밀리 트리 & 소송/계속출원(CIP) 모니터링
            </h2>
            <span className="text-xs font-mono text-slate-400">US / KR / EP / CN / JP</span>
          </div>

          <div className="space-y-4">
            {mockFamilyTrees.map((root) => (
              <div key={root.id} className="p-4 bg-nexus-surface/80 rounded-xl border border-white/5 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-nexus-cyan/20 text-nexus-cyan font-mono text-xs font-bold">
                      {root.country}
                    </span>
                    <span className="text-sm font-bold text-white">{root.patentNumber}</span>
                    <span className="text-xs text-slate-400 font-mono">({root.assignee})</span>
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                    root.status === 'GRANTED' ? 'bg-nexus-emerald/20 text-nexus-emerald border border-nexus-emerald/30' :
                    root.status === 'LITIGATED' ? 'bg-nexus-rose/20 text-nexus-rose border border-nexus-rose/30' :
                    'bg-nexus-amber/20 text-nexus-amber border border-nexus-amber/30'
                  }`}>
                    {root.status === 'GRANTED' ? '등록 완료' : root.status === 'LITIGATED' ? '분쟁/소송 중' : '심사 계류'}
                  </span>
                </div>

                <p className="text-xs text-slate-300 font-medium">{root.title}</p>

                {/* Sub-family children nodes */}
                {root.childrenIds && (
                  <div className="pl-4 border-l-2 border-nexus-cyan/30 space-y-2 mt-2">
                    <p className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                      <ChevronRight className="w-3 h-3 text-nexus-cyan" /> 해외 패밀리 출원 (PCT National Phase):
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {mockFamilyTrees.filter(c => root.childrenIds?.includes(c.id)).map(child => (
                        <div key={child.id} className="p-2.5 bg-nexus-panel/70 rounded-lg border border-white/5 text-xs flex items-center justify-between">
                          <div>
                            <span className="font-mono text-nexus-cyan font-bold mr-1.5">[{child.country}]</span>
                            <span className="text-slate-200">{child.patentNumber}</span>
                          </div>
                          <span className="text-[10px] font-mono text-slate-400">{child.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};