import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PatentTrendsView } from '../components/dashboard/PatentTrendsView';
import { CommunityView } from '../components/community/CommunityView';

describe('Phase 2: Patent Trends & Knowledge Community', () => {
  it('renders PatentTrendsView with country filters and domain rankings', () => {
    render(<PatentTrendsView />);
    expect(screen.getByText('국내외 피지컬 AI 특허 동향 분석')).toBeInTheDocument();
    expect(screen.getByText('전체 국가')).toBeInTheDocument();
    expect(screen.getByText('휴머노이드 액추에이터 & 고출력 밀도 모터')).toBeInTheDocument();

    const usFilter = screen.getByText('US');
    fireEvent.click(usFilter);
    expect(usFilter).toHaveClass('bg-nexus-cyan');
  });

  it('renders CommunityView with Books, Papers, and Forum tabs', () => {
    render(<CommunityView />);
    expect(screen.getByText('피지컬 AI 특허 도서 검색 & 전문가 커뮤니티')).toBeInTheDocument();
    expect(screen.getByText('Physical AI & Embodied Intelligence Engineering')).toBeInTheDocument();

    // Switch to Papers tab
    const papersTab = screen.getByText('논문-특허 매핑');
    fireEvent.click(papersTab);
    expect(screen.getByText(/Zero-Shot Vision-Language-Action/i)).toBeInTheDocument();

    // Switch to Forum tab
    const forumTab = screen.getByText('Q&A 포럼');
    fireEvent.click(forumTab);
    expect(screen.getByText(/휴머노이드 핑거 팁 촉각 센서 배치/i)).toBeInTheDocument();
  });
});