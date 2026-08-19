import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import type { Session, User } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: '로봇/피지컬 AI 엔지니어' | '특허법인 대표 변리사' | '기업 IP 전략팀' | '학술 연구원';
  provider: 'google' | 'kakao' | 'naver' | 'email';
  avatarUrl?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  supabaseUser: User | null;
  session: Session | null;
  loading: boolean;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  signInWithGoogle: () => Promise<void>;
  signInWithKakao: () => Promise<void>;
  signInWithNaver: () => Promise<void>;
  signInWithEmail: (email: string, pass: string) => Promise<{ error?: string }>;
  signUpWithEmail: (email: string, pass: string, fullName: string, role: UserProfile['role']) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  demoLogin: (provider: UserProfile['provider'], role?: UserProfile['role']) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [supabaseUser, setSupabaseUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  // Sync Supabase Auth Session
  useEffect(() => {
    if (!isSupabaseConfigured) {
      // Check for local stored demo session if any
      const savedUser = localStorage.getItem('phy_ip_demo_user');
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch {
          // Ignore
        }
      }
      setLoading(false);
      return;
    }

    // Live Supabase session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setSupabaseUser(session?.user ?? null);
      if (session?.user) {
        mapSupabaseUserToProfile(session.user);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setSupabaseUser(session?.user ?? null);
      if (session?.user) {
        mapSupabaseUserToProfile(session.user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const mapSupabaseUserToProfile = (sbUser: User) => {
    const rawMeta = sbUser.user_metadata || {};
    const provider = (sbUser.app_metadata.provider || 'email') as UserProfile['provider'];
    
    const profile: UserProfile = {
      id: sbUser.id,
      email: sbUser.email || '',
      fullName: rawMeta.full_name || rawMeta.name || sbUser.email?.split('@')[0] || '사용자',
      role: (rawMeta.role as UserProfile['role']) || '로봇/피지컬 AI 엔지니어',
      provider: provider === 'google' || provider === 'kakao' ? provider : 'email',
      avatarUrl: rawMeta.avatar_url || rawMeta.picture,
    };
    setUser(profile);
  };

  const signInWithGoogle = async () => {
    if (!isSupabaseConfigured) {
      demoLogin('google');
      closeAuthModal();
      return;
    }
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });
  };

  const signInWithKakao = async () => {
    if (!isSupabaseConfigured) {
      demoLogin('kakao');
      closeAuthModal();
      return;
    }
    await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: window.location.origin,
      },
    });
  };

  const signInWithNaver = async () => {
    // Naver login (Simulated/OAuth integration)
    demoLogin('naver');
    closeAuthModal();
  };

  const signInWithEmail = async (email: string, pass: string): Promise<{ error?: string }> => {
    if (!isSupabaseConfigured) {
      demoLogin('email');
      closeAuthModal();
      return {};
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
    if (error) return { error: error.message };
    closeAuthModal();
    return {};
  };

  const signUpWithEmail = async (
    email: string, 
    pass: string, 
    fullName: string, 
    role: UserProfile['role']
  ): Promise<{ error?: string }> => {
    if (!isSupabaseConfigured) {
      const demoProf: UserProfile = {
        id: 'demo-' + Date.now(),
        email,
        fullName,
        role,
        provider: 'email',
      };
      setUser(demoProf);
      localStorage.setItem('phy_ip_demo_user', JSON.stringify(demoProf));
      closeAuthModal();
      return {};
    }

    const { error } = await supabase.auth.signUp({
      email,
      password: pass,
      options: {
        data: {
          full_name: fullName,
          role: role,
        },
      },
    });

    if (error) return { error: error.message };
    closeAuthModal();
    return {};
  };

  const signOut = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setSupabaseUser(null);
    setSession(null);
    localStorage.removeItem('phy_ip_demo_user');
  };

  const demoLogin = (provider: UserProfile['provider'], role: UserProfile['role'] = '특허법인 대표 변리사') => {
    const mockNames = {
      google: '이길환 (Google 계정)',
      kakao: '이길환 (카카오 계정)',
      naver: '이길환 (네이버 계정)',
      email: '이길환 수석변리사'
    };

    const mockProfile: UserProfile = {
      id: `usr-${provider}-${Date.now()}`,
      email: `${provider}-user@phy-ip.nexus`,
      fullName: mockNames[provider] || '피지컬 AI 전문가',
      role: role,
      provider: provider,
      avatarUrl: undefined
    };

    setUser(mockProfile);
    localStorage.setItem('phy_ip_demo_user', JSON.stringify(mockProfile));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        supabaseUser,
        session,
        loading,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        signInWithGoogle,
        signInWithKakao,
        signInWithNaver,
        signInWithEmail,
        signUpWithEmail,
        signOut,
        demoLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};