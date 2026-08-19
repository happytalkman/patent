import React, { useState } from 'react';
import type { ActiveTab, ViewMode } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { 
  Search, 
  Layers, 
  Bell, 
  Monitor, 
  Smartphone, 
  ShieldCheck, 
  Activity, 
  Sparkles, 
  LogIn, 
  LogOut, 
  User, 
  ChevronDown 
} from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  setActiveTab,
  viewMode,
  setViewMode,
  searchQuery,
  setSearchQuery,
}) => {
  const { user, openAuthModal, signOut } = useAuth();
  const [profileDropdown, setProfileDropdown] = useState<boolean>(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-nexus-bg/85 backdrop-blur-xl px-4 lg:px-6 py-3 flex items-center justify-between gap-4">
      {/* Brand & Ticker */}
      <div className="flex items-center gap-6">
        <div 
          onClick={() => setActiveTab('dashboard')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-nexus-cyan to-nexus-blue flex items-center justify-center shadow-lg shadow-nexus-cyan/20 group-hover:scale-105 transition-transform">
            <Layers className="w-5 h-5 text-black font-bold" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-sora font-extrabold text-lg tracking-wider text-white">PHY-IP</span>
              <span className="font-mono text-xs px-1.5 py-0.5 rounded bg-nexus-cyan/15 text-nexus-cyan font-semibold border border-nexus-cyan/30">NEXUS</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono hidden sm:block">Physical AI Patent OS</span>
          </div>
        </div>

        {/* Global Live KPI Ticker */}
        <div className="hidden xl:flex items-center gap-4 bg-nexus-surface/80 border border-white/5 px-3 py-1.5 rounded-full text-xs font-mono">
          <div className="flex items-center gap-1.5 text-nexus-cyan">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>Global Filings: 142,850</span>
          </div>
          <span className="text-slate-600">|</span>
          <div className="flex items-center gap-1.5 text-nexus-emerald">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>KR/US/CN Index: +34.2%</span>
          </div>
          <span className="text-slate-600">|</span>
          <div className="flex items-center gap-1.5 text-nexus-purple">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Top Domain: VLA Embodiment</span>
          </div>
        </div>
      </div>

      {/* Global Search Bar */}
      <div className="flex-1 max-w-xl mx-2">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="특허번호, 기구학 DoF, 촉각센서, 저자, 논문 검색 (e.g. US11492048, Humanoid Hand)..."
            className="w-full bg-nexus-surface/90 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-nexus-cyan focus:ring-1 focus:ring-nexus-cyan transition-all"
          />
        </div>
      </div>

      {/* Actions, Responsive View Mode & Auth Profile */}
      <div className="flex items-center gap-3">
        {/* Desktop / Mobile Simulation Toggle */}
        <div className="flex items-center bg-nexus-panel border border-white/10 rounded-lg p-0.5">
          <button
            onClick={() => setViewMode('desktop')}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
              viewMode === 'desktop'
                ? 'bg-nexus-cyan text-black font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
            title="데스크톱 커맨드 센터 뷰"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Desktop</span>
          </button>
          <button
            onClick={() => setViewMode('mobile')}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
              viewMode === 'mobile'
                ? 'bg-nexus-cyan text-black font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
            title="모바일 반응형 뷰"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Mobile</span>
          </button>
        </div>

        {/* Notification */}
        <button className="relative p-2 rounded-lg bg-nexus-panel border border-white/10 text-slate-300 hover:text-nexus-cyan transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-nexus-cyan animate-ping" />
        </button>

        {/* Authentication Section */}
        {user ? (
          <div className="relative">
            <button
              onClick={() => setProfileDropdown(!profileDropdown)}
              className="flex items-center gap-2 pl-2 border-l border-white/10 group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-nexus-cyan to-nexus-blue flex items-center justify-center text-black font-bold text-xs ring-2 ring-nexus-cyan/40">
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt={user.fullName} className="w-full h-full rounded-full object-cover" />
                ) : (
                  user.fullName.slice(0, 1)
                )}
              </div>
              <div className="hidden lg:block text-left text-xs leading-tight">
                <p className="font-semibold text-white group-hover:text-nexus-cyan transition-colors">{user.fullName}</p>
                <p className="text-[10px] text-nexus-cyan font-mono truncate max-w-[110px]">{user.role}</p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
            </button>

            {/* Profile Dropdown */}
            {profileDropdown && (
              <div className="absolute right-0 top-11 w-56 bg-nexus-panel border border-white/10 rounded-2xl p-3 shadow-2xl backdrop-blur-xl z-50 space-y-2 animate-fadeIn">
                <div className="p-2 bg-nexus-surface rounded-xl border border-white/5 space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-slate-400">인증 연동:</span>
                    <span className="text-nexus-cyan uppercase font-bold">{user.provider}</span>
                  </div>
                  <p className="text-xs font-bold text-white truncate">{user.fullName}</p>
                  <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                  <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded bg-nexus-cyan/20 text-nexus-cyan font-mono">
                    {user.role}
                  </span>
                </div>

                <button
                  onClick={() => { signOut(); setProfileDropdown(false); }}
                  className="w-full py-2 px-3 rounded-xl bg-nexus-rose/15 hover:bg-nexus-rose/25 text-nexus-rose text-xs font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>로그아웃</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={openAuthModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-nexus-cyan to-nexus-blue text-black font-bold text-xs hover:brightness-110 transition-all shadow-md shadow-nexus-cyan/20 cursor-pointer"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>로그인 / 가입</span>
          </button>
        )}
      </div>
    </header>
  );
};