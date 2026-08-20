import React, { useState } from 'react';
import type { TestbedFacility } from '../../types';
import { mockFacilities } from '../../data/mockData';
import { IsometricMapCanvas } from './IsometricMapCanvas';
import { 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  Star, 
  Check, 
  RotateCw, 
  Activity, 
  Radio, 
  QrCode, 
  Zap, 
  Thermometer, 
  Sliders 
} from 'lucide-react';

export const SpatialMapView: React.FC = () => {
  const [facilities] = useState<TestbedFacility[]>(mockFacilities);
  const [selectedFacilityId, setSelectedFacilityId] = useState<string>('fac-1');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedCity, setSelectedCity] = useState<string>('Pangyo / Seoul');
  const [is3DMode, setIs3DMode] = useState<boolean>(true);

  // Booking Modal / Schedule State
  const [selectedDate, setSelectedDate] = useState<string>('2026-08-25');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('14:00 - 16:00');
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);
  const [showQrPass, setShowQrPass] = useState<boolean>(false);

  const selectedFacility = facilities.find(f => f.id === selectedFacilityId) || facilities[0];

  const filteredFacilities = facilities.filter(f => 
    selectedCategory === 'ALL' || f.category === selectedCategory
  );

  const handleBook = () => {
    setBookingConfirmed(true);
    setShowQrPass(true);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="glass-panel-glow p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-nexus-cyan mb-1">
            <MapPin className="w-4 h-4" />
            <span>3D SPATIAL IP ECOSYSTEM & LIVE IoT TELEMETRY</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold font-sora text-white">
            피지컬 AI 3D 공간 약도 & 공인 실증 테스트베드 예약
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            특허청, 국가 로봇 실증 시험장, 클린룸 팹의 3D 아이소메트릭 약도 탐색, 실시간 환경 계측 센서 스트리밍 및 원클릭 출입증 발급
          </p>
        </div>

        {/* City Selector & 3D/2D Toggle */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="bg-nexus-panel border border-white/10 text-white text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-nexus-cyan font-mono"
          >
            <option value="Pangyo / Seoul">판교 / 서울 (Pangyo Hub)</option>
            <option value="Silicon Valley">실리콘밸리 (Silicon Valley Hub)</option>
            <option value="Tokyo">도쿄 (Tokyo Robotics District)</option>
            <option value="Munich">뮌헨 (Munich Quantum Fab)</option>
          </select>

          <button
            onClick={() => setIs3DMode(!is3DMode)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-nexus-panel border border-nexus-cyan/40 text-nexus-cyan text-xs font-mono hover:bg-nexus-cyan hover:text-black transition-all"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>{is3DMode ? '3D 아이소메트릭' : '2D 평면도'}</span>
          </button>
        </div>
      </div>

      {/* Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        {['ALL', 'Extreme Arena', 'Patent Office', 'Cleanroom Fab'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl font-medium transition-all ${
              selectedCategory === cat
                ? 'bg-nexus-cyan text-black font-semibold shadow-md'
                : 'bg-nexus-surface border border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            {cat === 'ALL' ? '전체 시설' : cat}
          </button>
        ))}
      </div>

      {/* Main Map View & Booking Drawer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left / Center Viewport (7 Cols): 3D Isometric Map */}
        <div className="lg:col-span-7 glass-panel p-5 rounded-2xl border border-white/10 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-nexus-emerald animate-ping" />
              <span>실시간 3D 공간 맵: 건물을 클릭하여 예약 및 센서 정보를 확인하세요</span>
            </div>
            <span className="text-[11px] font-mono text-nexus-cyan">Three.js Rendered</span>
          </div>

          <div className="h-80 w-full bg-nexus-bg rounded-xl relative overflow-hidden border border-white/5">
            <IsometricMapCanvas
              facilities={filteredFacilities}
              selectedFacilityId={selectedFacilityId}
              onSelectFacility={(id) => setSelectedFacilityId(id)}
              is3DMode={is3DMode}
            />

            {/* In-map Status Overlay */}
            <div className="absolute bottom-3 left-3 bg-nexus-panel/90 border border-white/10 p-2.5 rounded-xl text-[11px] font-mono space-y-1 backdrop-blur-md">
              <div className="text-nexus-cyan font-bold">선택됨: {selectedFacility.name}</div>
              <div className="text-slate-300">거리: {selectedFacility.distanceKm} km | 잔여 슬롯: {selectedFacility.openSlots}개</div>
            </div>
          </div>

          {/* Real-time IoT Sensor Telemetry Stream */}
          {selectedFacility.telemetry && (
            <div className="p-3 bg-nexus-surface/90 rounded-xl border border-white/5 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-nexus-cyan">
                <span className="flex items-center gap-1.5 font-bold">
                  <Radio className="w-3.5 h-3.5 text-nexus-emerald animate-pulse" /> 실시간 IoT 센서 텔레메트리 (Live Telemetry)
                </span>
                <span className="text-slate-400">장비 ID: {selectedFacility.telemetry.activeRobotId}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono">
                <div className="p-2 bg-nexus-panel rounded-lg border border-white/5">
                  <span className="text-slate-400 block">챔버 온도</span>
                  <span className="text-white font-bold">{selectedFacility.telemetry.ambientTempC} °C</span>
                </div>
                <div className="p-2 bg-nexus-panel rounded-lg border border-white/5">
                  <span className="text-slate-400 block">EMP 차폐율</span>
                  <span className="text-nexus-cyan font-bold">{selectedFacility.telemetry.emShieldingDb} dB</span>
                </div>
                <div className="p-2 bg-nexus-panel rounded-lg border border-white/5">
                  <span className="text-slate-400 block">MoCap 샘플링</span>
                  <span className="text-nexus-emerald font-bold">{selectedFacility.telemetry.mocapFrameRateFps} FPS</span>
                </div>
                <div className="p-2 bg-nexus-panel rounded-lg border border-white/5">
                  <span className="text-slate-400 block">동역학 스트레인</span>
                  <span className="text-nexus-purple font-bold">{selectedFacility.telemetry.strainGaugeMicroStrain} µε</span>
                </div>
              </div>
            </div>
          )}

          {/* Mini Facilities List Below Map */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
            {filteredFacilities.map((fac) => (
              <button
                key={fac.id}
                onClick={() => setSelectedFacilityId(fac.id)}
                className={`p-2.5 rounded-xl text-left border transition-all ${
                  selectedFacilityId === fac.id
                    ? 'bg-nexus-panel border-nexus-cyan text-white shadow-md'
                    : 'bg-nexus-surface/60 border-white/5 text-slate-400 hover:border-white/20'
                }`}
              >
                <p className="text-xs font-bold truncate">{fac.name}</p>
                <p className="text-[10px] font-mono text-nexus-cyan mt-0.5">{fac.distanceKm} km · {fac.category}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Right Drawer (5 Cols): Facility Detail & Reservation */}
        <div className="lg:col-span-5 glass-panel p-5 rounded-2xl border border-white/10 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-nexus-blue/20 text-nexus-cyan border border-nexus-cyan/30">
                  {selectedFacility.category}
                </span>
                <h2 className="text-base font-bold text-white mt-1.5 leading-snug">
                  {selectedFacility.name}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">{selectedFacility.address}</p>
              </div>
              <div className="flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded-lg text-nexus-amber font-mono text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-nexus-amber" />
                <span>{selectedFacility.rating}</span>
              </div>
            </div>

            {/* Equipment & Verification Specs */}
            <div className="p-3 bg-nexus-surface/80 rounded-xl border border-white/5 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400 font-mono">보유 핵심 장비:</span>
                <span className="font-mono text-nexus-cyan">{selectedFacility.equipment.length}종 완비</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {selectedFacility.equipment.map((eq) => (
                  <span key={eq} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-200 font-mono">
                    ✓ {eq}
                  </span>
                ))}
              </div>
              <div className="pt-2 border-t border-white/5 flex items-center gap-3 text-[11px] font-mono">
                <span className="text-nexus-emerald flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> ISO/IEC 안전인증</span>
                <span className="text-nexus-purple flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> NDA 보안 보증</span>
              </div>
            </div>

            {/* Interactive Booking Calendar Slots */}
            <div className="space-y-2 pt-1">
              <label className="text-xs font-semibold text-white flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-nexus-cyan" />
                실증 시험 및 특허 상담 예약일자
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-nexus-surface border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-nexus-cyan"
              />

              <div className="grid grid-cols-2 gap-2 pt-1">
                {['10:00 - 12:00', '14:00 - 16:00', '16:30 - 18:30', '19:00 - 21:00'].map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedTimeSlot(slot)}
                    className={`py-2 rounded-xl text-xs font-mono transition-all border ${
                      selectedTimeSlot === slot
                        ? 'bg-nexus-cyan text-black font-bold border-nexus-cyan shadow-md'
                        : 'bg-nexus-surface border-white/10 text-slate-300 hover:border-white/30'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing & Booking Action */}
          <div className="pt-3 border-t border-white/10 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">이용 요금:</span>
              <span className="text-white font-bold text-sm">
                {selectedFacility.hourlyRateUsd === 0 ? '무료 (정부 지원)' : `$${selectedFacility.hourlyRateUsd} / 시간`}
              </span>
            </div>

            <button
              onClick={handleBook}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-nexus-cyan to-nexus-blue text-black font-bold text-xs hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg shadow-nexus-cyan/20 cursor-pointer"
            >
              {bookingConfirmed ? (
                <>
                  <Check className="w-4 h-4" /> 예약 완료! (QR 출입증 발급됨)
                </>
              ) : (
                <>
                  <Calendar className="w-4 h-4" /> 실증 세션 및 법률 에스코트 즉시 예약
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* QR Entry Pass Modal */}
      {showQrPass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-sm bg-nexus-panel border border-nexus-cyan/40 rounded-3xl p-6 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-nexus-cyan/20 text-nexus-cyan flex items-center justify-center mx-auto">
              <QrCode className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-nexus-emerald/20 text-nexus-emerald border border-nexus-emerald/30">
                VERIFIED RESERVATION PASS
              </span>
              <h3 className="text-base font-bold text-white mt-1.5">{selectedFacility.name}</h3>
              <p className="text-xs text-slate-400 mt-1">{selectedDate} ({selectedTimeSlot})</p>
            </div>

            <div className="p-4 bg-white rounded-2xl inline-block shadow-inner">
              <div className="w-40 h-40 border-4 border-slate-900 rounded-lg flex items-center justify-center font-mono text-xs text-slate-900 font-bold bg-slate-100">
                [QR: PHY-IP-PASS-2026]
              </div>
            </div>

            <p className="text-[11px] text-slate-400 font-mono">
              현장 방문 시 게이트 리더기에 태그하십시오. (변리사 1:1 에스코트 자동 활성화)
            </p>

            <button
              onClick={() => setShowQrPass(false)}
              className="w-full py-2.5 rounded-xl bg-nexus-cyan text-black font-bold text-xs hover:brightness-110 transition-all"
            >
              확인 및 닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};