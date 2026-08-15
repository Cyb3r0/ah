import React, { useState } from 'react';
import { ScreenId } from './types';
import { DeviceFrame } from './components/common/DeviceFrame';
import { QuickScreenSelector } from './components/QuickScreenSelector';

// Screens
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
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('manager-dashboard');
  const [isFramed, setIsFramed] = useState<boolean>(true);

  const handleNavigate = (screen: ScreenId) => {
    setCurrentScreen(screen);
  };

  const renderActiveScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onNavigate={handleNavigate} />;
      case 'login':
        return (
          <LoginScreen 
            onLoginSuccess={(screen) => handleNavigate(screen || 'manager-dashboard')} 
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
        return <ManagerDashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#040e0a] text-emerald-50 flex flex-col justify-between py-2 sm:py-4 px-2 sm:px-4 font-['Tajawal',sans-serif]">
      {/* Top Quick Screen Switcher & Controls */}
      <QuickScreenSelector
        currentScreen={currentScreen}
        onSelectScreen={handleNavigate}
        isFramed={isFramed}
        onToggleFrame={() => setIsFramed(!isFramed)}
      />

      {/* Main App Canvas / Device Mockup */}
      <main className="flex-1 flex items-center justify-center w-full">
        <DeviceFrame
          currentScreen={currentScreen}
          onNavigate={handleNavigate}
          isFramed={isFramed}
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
