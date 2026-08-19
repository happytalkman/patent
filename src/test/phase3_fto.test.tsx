import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

// Mock RoboticArmCanvas to avoid headless WebGLRenderer requirement in JSDOM
vi.mock('../components/fto/RoboticArmCanvas', () => ({
  RoboticArmCanvas: () => <div data-testid="mock-robotic-arm-canvas">3D Arm Canvas</div>
}));

import { FtoSimulatorView } from '../components/fto/FtoSimulatorView';

describe('Phase 3: FTO & Kinematics Simulator', () => {
  it('renders FTO Simulation Studio and initial high risk score', () => {
    render(<FtoSimulatorView />);
    expect(screen.getByText('피지컬 AI 3D 기구학 & 특허침해회피(FTO) 시뮬레이터')).toBeInTheDocument();
    expect(screen.getByText(/78% \(고위험 충돌\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Element A: 브러시리스 하모닉 드라이브 감속기/i)).toBeInTheDocument();
    expect(screen.getByTestId('mock-robotic-arm-canvas')).toBeInTheDocument();
  });

  it('applies AI design-around suggestion and recalculates conflict risk to safe level', () => {
    render(<FtoSimulatorView />);
    
    // Find and click the first design-around apply button
    const applyButtons = screen.getAllByRole('button', { name: /3D 기구학 파라미터 적용/i });
    expect(applyButtons.length).toBeGreaterThan(0);
    
    fireEvent.click(applyButtons[0]);
    
    // Risk should reduce from 78% by 45% -> 33%
    expect(screen.getByText(/33% \(고위험 충돌\)/i)).toBeInTheDocument();

    // Click second suggestion (impactScore: 25%) -> 33% - 25% = 8% -> min 12% (안전 범위)
    const remainingApply = screen.getAllByRole('button', { name: /3D 기구학 파라미터 적용/i });
    if (remainingApply.length > 0) {
      fireEvent.click(remainingApply[0]);
      expect(screen.getByText(/12% \(안전 범위\)/i)).toBeInTheDocument();
    }
  });
});