import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from '../components/layout/Header';
import { Sidebar } from '../components/layout/Sidebar';
import { MobileNav } from '../components/layout/MobileNav';
import { AuthProvider } from '../context/AuthContext';

describe('Phase 1: Layout & Design System Components', () => {
  const mockSetActiveTab = vi.fn();
  const mockSetViewMode = vi.fn();
  const mockSetSearchQuery = vi.fn();

  it('renders Header with brand, search bar, and KPI indicators', () => {
    render(
      <AuthProvider>
        <Header
          activeTab="dashboard"
          setActiveTab={mockSetActiveTab}
          viewMode="desktop"
          setViewMode={mockSetViewMode}
          searchQuery=""
          setSearchQuery={mockSetSearchQuery}
        />
      </AuthProvider>
    );

    expect(screen.getByText('PHY-IP')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/특허번호, 기구학 DoF/i)).toBeInTheDocument();
    expect(screen.getByText(/Global Filings: 142,850/i)).toBeInTheDocument();
  });

  it('renders Sidebar navigation items with proper icons', () => {
    render(
      <Sidebar activeTab="dashboard" setActiveTab={mockSetActiveTab} />
    );

    expect(screen.getByText('통합 대시보드')).toBeInTheDocument();
    expect(screen.getByText('특허 동향 분석')).toBeInTheDocument();
    expect(screen.getByText('3D 기구학 & FTO')).toBeInTheDocument();
    expect(screen.getByText('3D 공간 약도 & 실증')).toBeInTheDocument();
    expect(screen.getByText('공백기술 & 패밀리트리')).toBeInTheDocument();
  });

  it('renders MobileNav with compact touchable items', () => {
    render(
      <MobileNav activeTab="dashboard" setActiveTab={mockSetActiveTab} />
    );

    expect(screen.getByText('홈')).toBeInTheDocument();
    expect(screen.getByText('동향')).toBeInTheDocument();
    expect(screen.getByText('FTO 3D')).toBeInTheDocument();
  });
});