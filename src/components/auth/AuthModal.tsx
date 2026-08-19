import React, { useState } from 'react';
import { useAuth, UserProfile } from '../../context/AuthContext';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  Briefcase, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle, 
  AlertCircle,
  Zap
} from 'lucide-react';
import { isSupabaseConfigured } from '../../lib/supabaseClient';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    closeAuthModal, 
    signInWithGoogle, 
    signInWithKakao, 
    signInWithNaver, 
    signInWithEmail, 
    signUpWithEmail,
    demoLogin 
  } = useAuth();

  const [tab, setTab] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<UserProfile['role']>('특허법인 대표 변리사');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  if (!isAuthModalOpen) return null;

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      if (tab === 'signin') {
        const res = await signInWithEmail(email, password);
        if (res.error) setErrorMsg(res.error);
      } else {
        const res = await signUpWithEmail(email, password, fullName, role);
        if (res.error) setErrorMsg(res.error);
      }
    } catch (err: any) {
      setErrorMsg(err.message || '인증 처리 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-md bg-nexus-panel border border-nexus-cyan/30 rounded-3xl p-6 shadow-2xl shadow-nexus-cyan/10 relative overflow-hidden flex flex-col space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Neon Glow Accent */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-nexus-cyan/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-nexus-purple/15 rounded-full blur-2xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-nexus-cyan to-nexus-blue flex items-center justify-center text-black font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-sora text-white">PHY-IP 통합 인증</h2>
              <p className="text-[11px] font-mono text-slate-400">수파베이스 & 소셜 OAuth 연동</p>
            </div>
          </div>

          <button 
            onClick={closeAuthModal}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Status Indicator */}
        {!isSupabaseConfigured && (
          <div className="p-2.5 bg-nexus-cyan/10 border border-nexus-cyan/30 rounded-xl text-[11px] font-mono text-slate-300 flex items-center gap-2">
            <Zap className="w-4 h-4 text-nexus-cyan shrink-0" />
            <span>데모 모드 활성화: 클릭 한 번으로 즉시 실시간 계정 체험 가능</span>
          </div>
        )}

        {/* Social OAuth Buttons */}
        <div className="space-y-2.5">
          {/* Google OAuth */}
          <button
            onClick={() => signInWithGoogle()}
            className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-semibold text-xs transition-all flex items-center justify-center gap-2.5 shadow-md"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Google 계정으로 계속하기</span>
          </button>

          {/* Kakao OAuth */}
          <button
            onClick={() => signInWithKakao()}
            className="w-full py-2.5 px-4 rounded-xl bg-[#FEE500] hover:bg-[#FDD835] text-[#191919] font-bold text-xs transition-all flex items-center justify-center gap-2.5 shadow-md"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 3C6.477 3 2 6.477 2 10.8c0 2.76 1.83 5.19 4.63 6.57-.2.74-.75 2.78-.86 3.23-.14.56.2.55.43.4.17-.12 2.68-1.8 3.76-2.53.67.1 1.35.15 2.04.15 5.523 0 10-3.477 10-7.8S17.523 3 12 3z"/>
            </svg>
            <span>카카오 로그인</span>
          </button>

          {/* Naver OAuth */}
          <button
            onClick={() => signInWithNaver()}
            className="w-full py-2.5 px-4 rounded-xl bg-[#03C75A] hover:bg-[#02b350] text-white font-bold text-xs transition-all flex items-center justify-center gap-2.5 shadow-md"
          >
            <span className="font-extrabold font-mono text-sm leading-none">N</span>
            <span>네이버 아이디로 로그인</span>
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-[1px] bg-white/10" />
          <span className="text-[10px] font-mono text-slate-500 uppercase">OR EMAIL</span>
          <div className="flex-1 h-[1px] bg-white/10" />
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-nexus-surface p-1 rounded-xl border border-white/5 text-xs">
          <button
            onClick={() => { setTab('signin'); setErrorMsg(null); }}
            className={`flex-1 py-1.5 rounded-lg font-medium transition-all ${
              tab === 'signin' ? 'bg-nexus-cyan text-black font-semibold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            이메일 로그인
          </button>
          <button
            onClick={() => { setTab('signup'); setErrorMsg(null); }}
            className={`flex-1 py-1.5 rounded-lg font-medium transition-all ${
              tab === 'signup' ? 'bg-nexus-cyan text-black font-semibold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            전문가 회원가입
          </button>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-2.5 bg-nexus-rose/15 border border-nexus-rose/30 text-nexus-rose text-xs rounded-xl flex items-center gap-2 font-mono">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Email / Password Form */}
        <form onSubmit={handleEmailSubmit} className="space-y-3">
          {tab === 'signup' && (
            <>
              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">성명 / 닉네임</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="홍길동"
                    className="w-full bg-nexus-surface border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-nexus-cyan"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">전문가 직군 / 역할</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as UserProfile['role'])}
                    className="w-full bg-nexus-surface border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-nexus-cyan"
                  >
                    <option value="특허법인 대표 변리사">특허법인 대표 변리사 (Patent Attorney)</option>
                    <option value="로봇/피지컬 AI 엔지니어">로봇/피지컬 AI 엔지니어 (Robotics Engineer)</option>
                    <option value="기업 IP 전략팀">기업 IP/특허전략팀 (Enterprise IP Lead)</option>
                    <option value="학술 연구원">대학/학술 연구원 (Academic Researcher)</option>
                  </select>
                </div>
              </div>
            </>
          )}

          <div>
            <label className="text-[11px] font-mono text-slate-400 block mb-1">이메일 주소</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="expert@phy-ip.nexus"
                className="w-full bg-nexus-surface border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-nexus-cyan font-mono"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-mono text-slate-400 block mb-1">비밀번호</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-nexus-surface border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-nexus-cyan"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-nexus-cyan to-nexus-blue text-black font-bold text-xs hover:brightness-110 transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-nexus-cyan/20 disabled:opacity-50"
          >
            {loading ? '인증 처리 중...' : tab === 'signin' ? '로그인' : '회원가입 완료'}
          </button>
        </form>

        {/* Quick Instant Role Demo Access */}
        <div className="pt-2 border-t border-white/5">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
            <span>원클릭 데모 계정 체험:</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => { demoLogin('google', '특허법인 대표 변리사'); closeAuthModal(); }}
              className="py-1.5 px-2 bg-nexus-surface hover:bg-nexus-surface/80 border border-white/5 hover:border-nexus-cyan/40 rounded-lg text-[10px] text-slate-300 font-mono transition-all text-left truncate"
            >
              ⚖️ 대표 변리사 모드
            </button>
            <button
              type="button"
              onClick={() => { demoLogin('kakao', '로봇/피지컬 AI 엔지니어'); closeAuthModal(); }}
              className="py-1.5 px-2 bg-nexus-surface hover:bg-nexus-surface/80 border border-white/5 hover:border-nexus-cyan/40 rounded-lg text-[10px] text-slate-300 font-mono transition-all text-left truncate"
            >
              🤖 로봇 엔지니어 모드
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};