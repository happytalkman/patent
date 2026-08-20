import React from 'react';
import type { ActiveTab } from '../../types';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Cpu, 
  MapPin, 
  Compass, 
  BookOpen, 
  ShieldAlert,
  Bot
} from 'lucide-react';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navItems: { id: ActiveTab; label: string; subLabel: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'dashboard', label: '통합 대시보드', subLabel: 'Command Overview', icon: LayoutDashboard },
    { id: 'copilot', label: 'AI 특허 코파일럿', subLabel: 'Claims & Disputes', icon: Bot },
    { id: 'trends', label: '특허 동향 분석', subLabel: 'Global Trend Matrix', icon: TrendingUp },
    { id: 'fto', label: '3D 기구학 & FTO', subLabel: 'Kinematics Sandbox', icon: Cpu },
    { id: 'spatial', label: '3D 공간 약도 & 실증', subLabel: 'Nanobanana Testbeds', icon: MapPin },
    { id: 'whitespace', label: '공백기술 & 패밀리트리', subLabel: 'White Space & Tree', icon: Compass },
    { id: 'community', label: '도서 & 커뮤니티', subLabel: 'Tech Forum & Papers', icon: BookOpen },
  ];

  return (
    <aside className="w-64 h-[calc(100vh-61px)] sticky top-[61px] border-r border-white/10 bg-nexus-surface/60 backdrop-blur-xl p-4 flex flex-col justify-between hidden md:flex">
      <div className="space-y-1.5">
        <div className="px-3 py-2 text-[11px] font-mono text-slate-500 uppercase tracking-wider font-semibold">
          Platform Modules
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left transition-all duration-200 group cursor-pointer ${
                isActive
                  ? 'bg-nexus-panel border border-nexus-cyan/40 text-white shadow-lg shadow-nexus-cyan/10'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-nexus-panel/50 border border-transparent'
              }`}
            >
              <div className={`p-1.5 rounded-lg transition-colors ${
                isActive ? 'bg-nexus-cyan text-black' : 'bg-white/5 text-slate-400 group-hover:text-nexus-cyan'
              }`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-medium truncate ${isActive ? 'text-white font-semibold' : ''}`}>
                  {item.label}
                </p>
                <p className="text-[10px] text-slate-500 font-mono truncate">{item.subLabel}</p>
              </div>
              {isActive && (
                <div className="w-1.5 h-1.5 rounded-full bg-nexus-cyan animate-pulse shadow-sm shadow-nexus-cyan" />
              )}
            </button>
          );
        })}
      </div>

      {/* Quick Security & System Badge */}
      <div className="pt-4 border-t border-white/10 space-y-3">
        <div className="glass-panel p-3 rounded-xl border border-white/5 space-y-2 text-xs">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-400 flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 text-nexus-emerald" /> FTO Engine
            </span>
            <span className="text-nexus-emerald font-semibold">Active</span>
          </div>
          <p className="text-[11px] text-slate-300 leading-snug">
            3D 물리 충돌 및 청구항 침해 감지기가 실시간 대기 중입니다.
          </p>
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 px-1">
          <span>v2.5.0-Production</span>
          <span className="flex items-center gap-1 text-nexus-cyan">
            <span className="w-1.5 h-1.5 rounded-full bg-nexus-cyan" /> Three.js Synced
          </span>
        </div>
      </div>
    </aside>
  );
};