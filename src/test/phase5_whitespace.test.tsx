import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { WhiteSpaceView } from '../components/whitespace/WhiteSpaceView';

describe('Phase 5: White Space Discovery & Patent Family Tree', () => {
  it('renders White Space Matrix with opportunity scores and AI blueprint drawer', () => {
    render(<WhiteSpaceView />);
    expect(screen.getByText('피지컬 AI 특허 공백기술(White Space) 탐색 및 패밀리 트리')).toBeInTheDocument();
    expect(screen.getAllByText(/Zero-Shot Tactile-VLA Feedback Adaptation/i).length).toBeGreaterThan(0);
    expect(screen.getByText('기회 94점')).toBeInTheDocument();
    expect(screen.getByText('AI 권장 독립항 청구범위')).toBeInTheDocument();
  });

  it('switches between White Space Matrix and Global Family Tree tabs', () => {
    render(<WhiteSpaceView />);
    const familyTab = screen.getByRole('button', { name: '글로벌 패밀리 트리' });
    fireEvent.click(familyTab);

    expect(screen.getByText(/글로벌 피지컬 AI 선도사 패밀리 트리 & 소송\/계속출원\(CIP\) 모니터링/i)).toBeInTheDocument();
    expect(screen.getByText('US 11,492,048 B2')).toBeInTheDocument();
    expect(screen.getAllByText(/\(Tesla, Inc\.\)/i).length).toBeGreaterThan(0);
  });

  it('triggers AI patent blueprint generation', () => {
    render(<WhiteSpaceView />);
    const generateBtn = screen.getByRole('button', { name: /AI 특허 명세서 청사진 생성/i });
    fireEvent.click(generateBtn);

    expect(screen.getByText(/AI 특허 청구항 및 신규성 입증 청사진이 생성되었습니다/i)).toBeInTheDocument();
  });
});