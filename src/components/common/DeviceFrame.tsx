import React from 'react';
import { StatusBar } from './StatusBar';
import { BottomNav } from './BottomNav';
import { ScreenId } from '../../types';

interface DeviceFrameProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  isFramed?: boolean;
  children: React.ReactNode;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  currentScreen,
  onNavigate,
  isFramed = true,
  children,
}) => {
  // Screen-specific status bar times matching user screenshots exactly
  const getScreenTime = () => {
    switch (currentScreen) {
      case 'manager-dashboard':
        return '10:24';
      case 'create-report':
        return '9:46';
      case 'device-entry':
        return '9:45 AM';
      case 'disability-support':
      case 'smart-map':
      case 'login':
        return '9:41';
      case 'inspection-tour':
        return '9:41 PM';
      case 'user-profile':
        return '3:31 PM';
      case 'asset-details-qr':
        return '8:09 AM';
      case 'splash':
      default:
        return '10:24';
    }
  };

  // Determine which bottom nav variant to show
  const getBottomNavVariant = () => {
    if (currentScreen === 'technician-tasks') return 'technician';
    if (currentScreen === 'disability-support') return 'emergency';
    if (currentScreen === 'smart-map') return 'map';
    if (currentScreen === 'inspection-tour') return 'inspection';
    if (currentScreen === 'splash' || currentScreen === 'login') return null;
    return 'manager';
  };

  const navVariant = getBottomNavVariant();

  // Full Native Mobile Mode (Used on real phones and in fullscreen mode)
  if (!isFramed) {
    return (
      <div className="w-full min-h-screen max-w-2xl mx-auto bg-[#02120a] text-emerald-50 flex flex-col justify-between overflow-x-hidden shadow-2xl relative">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-y-auto pb-2">
          {children}
        </div>

        {/* Floating / Sticky Mobile Bottom Nav */}
        {navVariant && (
          <div className="sticky bottom-0 left-0 right-0 z-40 bg-[#061e14]/95 backdrop-blur-lg border-t border-emerald-500/20 pb-[max(env(safe-area-inset-bottom),0.5rem)]">
            <BottomNav 
              currentScreen={currentScreen} 
              onNavigate={onNavigate} 
              variant={navVariant} 
            />
          </div>
        )}
      </div>
    );
  }

  // Framed Simulator Mode (Used on desktop presentation mode)
  return (
    <div className="relative mx-auto my-3 w-[380px] sm:w-[410px] h-[844px] max-h-[90vh] rounded-[52px] bg-[#0c1813] p-[10px] shadow-[0_0_60px_rgba(0,0,0,0.8),0_0_25px_rgba(196,154,69,0.25)] border-4 border-[#3e321b] ring-1 ring-amber-400/30 flex flex-col select-none transition-all duration-300">
      {/* Outer Metallic Bezel Accent */}
      <div className="absolute inset-0 rounded-[50px] border border-amber-500/20 pointer-events-none" />

      {/* Antenna lines simulation */}
      <div className="absolute -top-1 left-24 w-1.5 h-1 bg-[#1a150b]" />
      <div className="absolute -bottom-1 right-24 w-1.5 h-1 bg-[#1a150b]" />

      {/* Screen Container */}
      <div className="relative w-full h-full rounded-[42px] bg-[#02120a] overflow-hidden flex flex-col justify-between border border-[#163c2c] shadow-inner">
        {/* Dynamic Island / Notch */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-40 flex items-center justify-between px-3 border border-white/5 shadow-md">
          <div className="w-2.5 h-2.5 rounded-full bg-[#081f16] border border-white/10" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#040e0b] border border-white/10 flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-blue-900/60" />
          </div>
        </div>

        {/* Top iOS Status Bar */}
        <StatusBar timeOverride={getScreenTime()} />

        {/* Screen Dynamic Content Body */}
        <div className="flex-1 flex flex-col overflow-y-auto relative">
          {children}
        </div>

        {/* Dynamic Bottom Navigation for screens that have it */}
        {navVariant && (
          <BottomNav 
            currentScreen={currentScreen} 
            onNavigate={onNavigate} 
            variant={navVariant} 
          />
        )}

        {/* Bottom iOS Home Indicator Bar */}
        <div className="w-full bg-[#04160d] py-1.5 flex items-center justify-center z-40">
          <div className="w-32 h-1 bg-white/40 rounded-full hover:bg-white/70 transition-colors cursor-pointer" onClick={() => onNavigate('manager-dashboard')} title="العودة للرئيسية" />
        </div>
      </div>
    </div>
  );
};
