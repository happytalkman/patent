import { useState } from 'react';
import type { ActiveTab, ViewMode } from './types';
import { AuthProvider } from './context/AuthContext';
import { AuthModal } from './components/auth/AuthModal';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav';
import { DashboardView } from './components/dashboard/DashboardView';
import { PatentCopilotView } from './components/copilot/PatentCopilotView';
import { PatentTrendsView } from './components/dashboard/PatentTrendsView';
import { FtoSimulatorView } from './components/fto/FtoSimulatorView';
import { SpatialMapView } from './components/spatial/SpatialMapView';
import { WhiteSpaceView } from './components/whitespace/WhiteSpaceView';
import { CommunityView } from './components/community/CommunityView';

export function AppContent() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [viewMode, setViewMode] = useState<ViewMode>('desktop');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView setActiveTab={setActiveTab} />;
      case 'copilot':
        return <PatentCopilotView />;
      case 'trends':
        return <PatentTrendsView />;
      case 'fto':
        return <FtoSimulatorView />;
      case 'spatial':
        return <SpatialMapView />;
      case 'whitespace':
        return <WhiteSpaceView />;
      case 'community':
        return <CommunityView />;
      default:
        return <DashboardView setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className={`min-h-screen bg-nexus-bg text-slate-100 flex flex-col ${viewMode === 'mobile' ? 'max-w-md mx-auto border-x border-white/10 shadow-2xl my-4 rounded-3xl overflow-hidden' : ''}`}>
      {/* Auth Modal Popup */}
      <AuthModal />

      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        viewMode={viewMode}
        setViewMode={setViewMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Body with Sidebar on Desktop */}
      <div className="flex-1 flex pb-16 md:pb-6">
        {viewMode === 'desktop' && (
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        )}

        <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full overflow-y-auto">
          {renderActiveView()}
        </main>
      </div>

      {/* Mobile Fixed Bottom Navigation */}
      {(viewMode === 'mobile' || typeof window !== 'undefined') && (
        <div className={viewMode === 'desktop' ? 'md:hidden' : ''}>
          <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      )}
    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;