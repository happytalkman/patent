import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

// Mock 3D Canvases
vi.mock('../components/fto/RoboticArmCanvas', () => ({
  RoboticArmCanvas: () => <div data-testid="mock-robotic-arm-canvas">3D Arm Canvas</div>
}));

vi.mock('../components/spatial/IsometricMapCanvas', () => ({
  IsometricMapCanvas: () => <div data-testid="mock-isometric-map">3D Isometric Map</div>
}));

import App from '../App';

describe('Phase 6: Full Application Integration & Responsive Viewport', () => {
  it('renders initial dashboard correctly', () => {
    render(<App />);
    expect(screen.getByText(/피지컬 AI 전문 특허 통합 인텔리전스/i)).toBeInTheDocument();
    expect(screen.getByText('글로벌 피지컬 AI 특허')).toBeInTheDocument();
  });

  it('navigates to FTO and Spatial views via sidebar and action buttons', () => {
    render(<App />);

    // Click FTO from sidebar
    const ftoBtn = screen.getByRole('button', { name: /3D 기구학 & FTO/i });
    fireEvent.click(ftoBtn);
    expect(screen.getByText('피지컬 AI 3D 기구학 & 특허침해회피(FTO) 시뮬레이터')).toBeInTheDocument();

    // Click Spatial Map from sidebar
    const spatialBtn = screen.getByRole('button', { name: /3D 공간 약도 & 실증/i });
    fireEvent.click(spatialBtn);
    expect(screen.getByText('피지컬 AI 3D 공간 약도 & 공인 실증 테스트베드 예약')).toBeInTheDocument();
  });

  it('navigates to WhiteSpace and Community views', () => {
    render(<App />);

    const wsBtn = screen.getByRole('button', { name: /공백기술 & 패밀리트리/i });
    fireEvent.click(wsBtn);
    expect(screen.getByText('피지컬 AI 특허 공백기술(White Space) 탐색 및 패밀리 트리')).toBeInTheDocument();

    const commBtn = screen.getByRole('button', { name: /도서 & 커뮤니티/i });
    fireEvent.click(commBtn);
    expect(screen.getByText('피지컬 AI 특허 도서 검색 & 전문가 커뮤니티')).toBeInTheDocument();
  });

  it('switches between Desktop and Mobile simulated view modes', () => {
    render(<App />);
    const mobileToggle = screen.getByRole('button', { name: /Mobile/i });
    fireEvent.click(mobileToggle);
    expect(mobileToggle).toHaveClass('bg-nexus-cyan');

    const desktopToggle = screen.getByRole('button', { name: /Desktop/i });
    fireEvent.click(desktopToggle);
    expect(desktopToggle).toHaveClass('bg-nexus-cyan');
  });

  it('updates global search input and logo click resets to dashboard', () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText(/특허번호, 기구학 DoF/i);
    fireEvent.change(searchInput, { target: { value: 'US 11,492,048' } });
    expect(searchInput).toHaveValue('US 11,492,048');

    // Click logo to return to dashboard
    const brand = screen.getByText('PHY-IP');
    fireEvent.click(brand);
    expect(screen.getByText(/피지컬 AI 전문 특허 통합 인텔리전스/i)).toBeInTheDocument();
  });
});