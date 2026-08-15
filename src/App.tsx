import React, { useState, useEffect } from 'react';
import { ScreenId } from './types';
import { DeviceFrame } from './components/common/DeviceFrame';
import { QuickScreenSelector, ViewMode } from './components/QuickScreenSelector';
import { WebPortalLayout } from './components/web/WebPortalLayout';

// Screens
import { DigitalTwinScreen } from './screens/DigitalTwinScreen';
import { SimulationCenterScreen } from './screens/SimulationCenterScreen';
import { HOSNIntelligenceScreen } from './screens/HOSNIntelligenceScreen';
import { SplashScreen } from './screens/SplashScreen';
import { LoginScreen } from './screens/LoginScreen';
import { ManagerDashboard } from './screens/ManagerDashboard';
import { SmartMapScreen } from './screens/SmartMapScreen';
import { DisabilitySupportScreen } from './screens/DisabilitySupportScreen';
import { InspectionTourScreen } from './screens/InspectionTourScreen';
import { TechnicianTasksScreen } from './screens/TechnicianTasksScreen';
import { CreateReportScreen } from './screens/CreateReportScreen';
import { DeviceEntryScreen } from './screens/DeviceEntryScreen';
import { AssetDetailsQRScreen } from './screens/AssetDetailsQRScreen';
import { UserProfileScreen } from './screens/UserProfileScreen';

export default function App() {
  // Default to the Digital Twin as the main star of the show
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('digital-twin');
  
  // Intelligent auto-detection of device / screen width
  const [isMobileScreen, setIsMobileScreen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 1024;
    }
    return false;
  });

  // Default viewMode based on viewport: mobile-fullscreen for phones, web for desktop
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      return 'mobile-fullscreen';
    }
    return 'web';
  });

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 1024;
      setIsMobileScreen(isMobile);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavigate = (screen: ScreenId) => {
    setCurrentScreen(screen);
  };

  const renderActiveScreen = () => {
    switch (currentScreen) {
      case 'digital-twin':
        return <DigitalTwinScreen onNavigate={handleNavigate} />;
      case 'simulation-center':
        return <SimulationCenterScreen onNavigate={handleNavigate} />;
      case 'ai-intelligence':
        return <HOSNIntelligenceScreen onNavigate={handleNavigate} />;
      case 'splash':
        return <SplashScreen onNavigate={handleNavigate} />;
      case 'login':
        return (
          <LoginScreen 
            onLoginSuccess={(screen) => handleNavigate(screen || 'digital-twin')} 
            onNavigate={handleNavigate} 
          />
        );
      case 'manager-dashboard':
        return <ManagerDashboard onNavigate={handleNavigate} />;
      case 'smart-map':
        return <SmartMapScreen onNavigate={handleNavigate} />;
      case 'disability-support':
        return <DisabilitySupportScreen onNavigate={handleNavigate} />;
      case 'inspection-tour':
        return <InspectionTourScreen onNavigate={handleNavigate} />;
      case 'technician-tasks':
        return <TechnicianTasksScreen onNavigate={handleNavigate} />;
      case 'create-report':
        return <CreateReportScreen onNavigate={handleNavigate} />;
      case 'device-entry':
        return <DeviceEntryScreen onNavigate={handleNavigate} />;
      case 'asset-details-qr':
        return <AssetDetailsQRScreen onNavigate={handleNavigate} />;
      case 'user-profile':
        return (
          <UserProfileScreen 
            onNavigate={handleNavigate} 
            onLogout={() => handleNavigate('login')} 
          />
        );
      default:
        return <DigitalTwinScreen onNavigate={handleNavigate} />;
    }
  };

  // 1. Enterprise Web Portal Mode (When on Desktop and user prefers Web Portal)
  if (viewMode === 'web' && !isMobileScreen && currentScreen !== 'splash' && currentScreen !== 'login') {
    return (
      <div className="min-h-screen bg-[#030d08] font-['Tajawal',sans-serif]">
        {/* Top Control Switcher Bar */}
        <QuickScreenSelector
          currentScreen={currentScreen}
          onSelectScreen={handleNavigate}
          viewMode={viewMode}
          onSelectViewMode={setViewMode}
        />

        {/* Web Portal Full Desktop Frame */}
        <WebPortalLayout
          currentScreen={currentScreen}
          onNavigate={handleNavigate}
          onSwitchToMobile={() => setViewMode('mobile-framed')}
        >
          {renderActiveScreen()}
        </WebPortalLayout>
      </div>
    );
  }

  // 2. Mobile Fullscreen Mode (Default on Mobile devices or when fullscreen is selected)
  if (viewMode === 'mobile-fullscreen' || isMobileScreen) {
    return (
      <div className="min-h-screen w-full bg-[#02120a] text-emerald-50 flex flex-col font-['Tajawal',sans-serif]">
        {/* Sleek Mobile Top Floating Bar with Screen Switcher & Live Demo Controller */}
        <QuickScreenSelector
          currentScreen={currentScreen}
          onSelectScreen={handleNavigate}
          viewMode={viewMode}
          onSelectViewMode={setViewMode}
          isMobileView={true}
        />

        {/* Native Full-Width Mobile Screen Content */}
        <main className="flex-1 w-full flex flex-col">
          <DeviceFrame
            currentScreen={currentScreen}
            onNavigate={handleNavigate}
            isFramed={false}
          >
            {renderActiveScreen()}
          </DeviceFrame>
        </main>
      </div>
    );
  }

  // 3. Desktop Framed Mobile Simulator Mode (For live presentations on desktop)
  return (
    <div className="min-h-screen bg-[#040e0a] text-emerald-50 flex flex-col justify-between py-2 sm:py-4 px-2 sm:px-4 font-['Tajawal',sans-serif]">
      {/* Top Quick Screen Switcher & Controls */}
      <QuickScreenSelector
        currentScreen={currentScreen}
        onSelectScreen={handleNavigate}
        viewMode={viewMode}
        onSelectViewMode={setViewMode}
      />

      {/* Main App Canvas with simulated metallic iPhone frame */}
      <main className="flex-1 flex items-center justify-center w-full my-auto">
        <DeviceFrame
          currentScreen={currentScreen}
          onNavigate={handleNavigate}
          isFramed={true}
        >
          {renderActiveScreen()}
        </DeviceFrame>
      </main>

      {/* Minimal Footer */}
      <footer className="text-center py-2 text-[11px] text-emerald-500/50">
        حُصن (HOSN) — المنصة الذكية الموحدة لإدارة الأمن والسلامة وتشغيل المباني
      </footer>
    </div>
  );
}
