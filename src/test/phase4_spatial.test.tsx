import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

// Mock IsometricMapCanvas for JSDOM
vi.mock('../components/spatial/IsometricMapCanvas', () => ({
  IsometricMapCanvas: () => <div data-testid="mock-isometric-map">3D Isometric Map</div>
}));

import { SpatialMapView } from '../components/spatial/SpatialMapView';

describe('Phase 4: 3D Spatial Map & Testbed Booking', () => {
  it('renders SpatialMapView with testbeds and 3D toggle', () => {
    render(<SpatialMapView />);
    expect(screen.getByText('피지컬 AI 3D 공간 약도 & 공인 실증 테스트베드 예약')).toBeInTheDocument();
    expect(screen.getAllByText(/국가 피지컬 AI 로봇 극한 실증 아레나 \(Zone A\)/i).length).toBeGreaterThan(0);
    expect(screen.getByTestId('mock-isometric-map')).toBeInTheDocument();
  });

  it('filters facilities by category', () => {
    render(<SpatialMapView />);
    const patentOfficeFilter = screen.getByRole('button', { name: 'Patent Office' });
    fireEvent.click(patentOfficeFilter);
    expect(screen.getAllByText(/특허청 첨단 피지컬 AI 특허 기술지원 센터/i).length).toBeGreaterThan(0);
  });

  it('allows user to book a testbed slot and opens verified QR pass', () => {
    render(<SpatialMapView />);
    const slotButton = screen.getByRole('button', { name: '16:30 - 18:30' });
    fireEvent.click(slotButton);

    const bookButton = screen.getByRole('button', { name: /실증 세션 및 법률 에스코트 즉시 예약/i });
    fireEvent.click(bookButton);

    expect(screen.getByText(/예약 완료! \(QR 출입증 발급됨\)/i)).toBeInTheDocument();
    expect(screen.getByText(/VERIFIED RESERVATION PASS/i)).toBeInTheDocument();
  });
});