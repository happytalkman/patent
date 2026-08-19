import React, { useState } from 'react';
import { mockPatentTrends, mockDomainTrends } from '../../data/mockData';
import { TrendingUp, Globe, Flame, ShieldAlert, Filter, Download, ArrowUpRight } from 'lucide-react';

export const PatentTrendsView: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<'ALL' | 'KR' | 'US' | 'CN' | 'EP' | 'JP'>('ALL');
  const [selectedDomain, setSelectedDomain] = useState<string>('ALL');

  const maxVal = 50000;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel-glow p-5 rounded-2xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-nexus-cyan mb-1">
            <TrendingUp className="w-4 h-4" />
            <span>GLOBAL INTELLIGENCE MATRIX</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold font-sora text-white">
            국내외 피지컬 AI 특허 동향 분석
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            한국, 미국, 중국, 유럽, 일본 5개국의 휴머노이드·공간지능·액추에이터 출원 추이 및 핵심 기술 모니터링
          </p>
        </div>

        {/* Country Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-nexus-panel/90 p-1.5 rounded-xl border border-white/10 text-xs">
          {(['ALL', 'KR', 'US', 'CN', 'EP', 'JP'] as const).map((country) => (
            <button
              key={country}
              onClick={() => setSelectedCountry(country)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                selectedCountry === country
                  ? 'bg-nexus-cyan text-black font-semibold shadow-md shadow-nexus-cyan/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {country === 'ALL' ? '전체 국가' : country}
            </button>
          ))}
          <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-slate-400 hover:text-nexus-cyan border-l border-white/10 ml-1">
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">CSV</span>
          </button>
        </div>
      </div>

      {/* Main Trends Chart & Key KPIs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visual Trend Chart */}
        <div className="lg:col-span-2 glass-panel p-5 rounded-2xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-nexus-blue" />
              분기별 주요국 특허 출원 급증 추이 (2023 - 2024)
            </h2>
            <span className="text-xs font-mono text-nexus-emerald flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> 연평균 성장률 +41.8%
            </span>
          </div>

          {/* Custom SVG / Bar Chart Representation */}
          <div className="h-64 flex items-end gap-2 sm:gap-4 pt-6 pb-2 px-2 border-b border-white/10">
            {mockPatentTrends.map((pt) => {
              const displayVal = selectedCountry === 'ALL' 
                ? pt.KR + pt.US + pt.CN + pt.EP + pt.JP
                : pt[selectedCountry];
              const heightPercent = Math.min(100, Math.max(12, (displayVal / (selectedCountry === 'ALL' ? 120000 : maxVal)) * 100));

              return (
                <div key={pt.yearQuarter} className="flex-1 flex flex-col items-center gap-2 group relative">
                  {/* Tooltip */}
                  <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-nexus-panel border border-nexus-cyan/40 px-2 py-1 rounded text-[10px] font-mono text-nexus-cyan pointer-events-none z-20 whitespace-nowrap shadow-lg">
                    {pt.yearQuarter}: {displayVal.toLocaleString()}건
                  </div>

                  {/* Multi-stack or Single Bar */}
                  <div className="w-full bg-nexus-surface rounded-t-md h-48 flex items-end overflow-hidden">
                    <div 
                      style={{ height: `${heightPercent}%` }}
                      className="w-full bg-gradient-to-t from-nexus-blue to-nexus-cyan rounded-t-md transition-all duration-500 group-hover:brightness-125 relative"
                    >
                      <div className="w-full h-1 bg-white/40 absolute top-0" />
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 text-center tracking-tight truncate w-full">
                    {pt.yearQuarter}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 pt-2 font-mono">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-nexus-cyan" /> US (+58.2%)</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-nexus-blue" /> CN (+44.1%)</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-nexus-purple" /> KR (+34.2%)</span>
            </div>
            <span className="text-slate-500">* WIPO / KIPO / USPTO 통합 데이터 기준</span>
          </div>
        </div>

        {/* Top 5 High-Surge Technology Sub-Domains */}
        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2">
              <Flame className="w-4 h-4 text-nexus-amber" />
              급상승 핵심 기술 분야
            </h2>
            <span className="text-[11px] font-mono text-slate-400">Risk Score</span>
          </div>

          <div className="space-y-3">
            {mockDomainTrends.map((dom) => (
              <div 
                key={dom.id}
                onClick={() => setSelectedDomain(dom.id === selectedDomain ? 'ALL' : dom.id)}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  selectedDomain === dom.id 
                    ? 'bg-nexus-panel border-nexus-cyan/50 shadow-md shadow-nexus-cyan/10'
                    : 'bg-nexus-surface/60 border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-200 line-clamp-1">{dom.name}</span>
                  <span className="font-mono text-nexus-cyan font-bold">+{dom.growth}%</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mt-2">
                  <span className="px-1.5 py-0.5 rounded bg-white/5 text-slate-300">
                    #{dom.hotKeyword}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-500">분쟁위험</span>
                    <span className={`font-semibold ${
                      dom.riskScore > 75 ? 'text-nexus-rose' : dom.riskScore > 55 ? 'text-nexus-amber' : 'text-nexus-emerald'
                    }`}>
                      {dom.riskScore}점
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};