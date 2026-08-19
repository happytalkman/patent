import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

// Mock 3D Canvases
vi.mock('../components/fto/RoboticArmCanvas', () => ({
  RoboticArmCanvas: () => <div data-testid="mock-robotic-arm-canvas">3D Arm Canvas</div>
}));

vi.mock('../components/spatial/IsometricMapCanvas', () => ({
  IsometricMapCanvas: () => <div data-testid="mock-isometric-map">3D Isometric Map</div>
}));

import App from '../App';

describe('Supabase Auth & Social OAuth Integration', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders login button initially when unauthenticated', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: /로그인 \/ 가입/i })).toBeInTheDocument();
  });

  it('opens AuthModal with Google, Kakao, Naver OAuth options on click', () => {
    render(<App />);
    const loginBtn = screen.getByRole('button', { name: /로그인 \/ 가입/i });
    fireEvent.click(loginBtn);

    expect(screen.getByText('PHY-IP 통합 인증')).toBeInTheDocument();
    expect(screen.getByText('Google 계정으로 계속하기')).toBeInTheDocument();
    expect(screen.getByText('카카오 로그인')).toBeInTheDocument();
    expect(screen.getByText('네이버 아이디로 로그인')).toBeInTheDocument();
  });

  it('allows tab switching between signin and signup with role selector', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /로그인 \/ 가입/i }));

    const signupTab = screen.getByRole('button', { name: '전문가 회원가입' });
    fireEvent.click(signupTab);

    expect(screen.getByText('전문가 직군 / 역할')).toBeInTheDocument();
    expect(screen.getByText('성명 / 닉네임')).toBeInTheDocument();
  });

  it('logs in successfully and shows user profile in header, then logs out', async () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /로그인 \/ 가입/i }));

    // Click demo lawyer mode
    const lawyerBtn = screen.getByRole('button', { name: /대표 변리사 모드/i });
    fireEvent.click(lawyerBtn);

    // Header should now display user profile
    await waitFor(() => {
      expect(screen.queryByRole('button', { name: /로그인 \/ 가입/i })).not.toBeInTheDocument();
      expect(screen.getByText(/이길환/i)).toBeInTheDocument();
    });

    // Click profile to open dropdown and logout
    const profileBtn = screen.getByText(/이길환/i);
    fireEvent.click(profileBtn);

    const logoutBtn = screen.getByRole('button', { name: /로그아웃/i });
    fireEvent.click(logoutBtn);

    // Should return to unauthenticated state
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /로그인 \/ 가입/i })).toBeInTheDocument();
    });
  });
});