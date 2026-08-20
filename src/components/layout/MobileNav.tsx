import React from 'react';
import type { ActiveTab } from '../../types';
import { LayoutDashboard, TrendingUp, Cpu, MapPin, Compass, BookOpen, Bot } from 'lucide-react';

interface MobileNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ activeTab, setActiveTab }) => {
  const tabs: { id: ActiveTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'dashboard', label: '홈', icon: LayoutDashboard },
    { id: 'copilot', label: 'AI코파일럿', icon: Bot },
    { id: 'fto', label: 'FTO 3D', icon: Cpu },
    { id: 'spatial', label: '3D 약도', icon: MapPin },
    { id: 'whitespace', label: '공백기술', icon: Compass },
    { id: 'trends', label: '동향', icon: TrendingUp },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-nexus-surface/95 backdrop-blur-2xl border-t border-white/10 px-1 py-1.5 flex items-center justify-around">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center min-w-[48px] py-1 rounded-xl transition-all cursor-pointer ${
              isActive ? 'text-nexus-cyan font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className={`p-1 rounded-lg transition-transform ${isActive ? 'bg-nexus-cyan/20 scale-110' : ''}`}>
              <Icon className="w-4 h-4" />
            </div>
            <span className="text-[9px] mt-0.5 tracking-tight font-medium">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};