import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PatentCopilotView } from '../components/copilot/PatentCopilotView';

describe('Advanced AI Patent Copilot & Virtual Litigation Simulator', () => {
  it('renders Claim Generator mode and generates USPTO/KIPO claims', async () => {
    render(<PatentCopilotView />);
    expect(screen.getByText(/피지컬 AI 특허 청구항 생성기 & 가상 특허 분쟁 시뮬레이터/i)).toBeInTheDocument();
    expect(screen.getByText('로봇 기구학 및 AI 파라미터 입력')).toBeInTheDocument();

    const generateBtn = screen.getByRole('button', { name: /KIPO\/USPTO 청구항 초안 생성/i });
    fireEvent.click(generateBtn);

    await waitFor(() => {
      expect(screen.getByText(/What is claimed is:/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('switches to Virtual Dispute Simulator and shows defense rationale', () => {
    render(<PatentCopilotView />);
    const disputeTab = screen.getByRole('button', { name: /가상 침해 소송 시뮬레이터/i });
    fireEvent.click(disputeTab);

    expect(screen.getByText('가상 특허 분쟁 시나리오')).toBeInTheDocument();
    expect(screen.getByText(/원고 \(특허권자\) 침해 주장 논리/i)).toBeInTheDocument();
    expect(screen.getByText(/피고 \(자사\) 기구학적 회피 및 무효화 반론/i)).toBeInTheDocument();
  });
});