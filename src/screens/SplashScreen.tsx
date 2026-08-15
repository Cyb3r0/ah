import React from 'react';
import { HosnLogo } from '../components/common/HosnLogo';
import { ArrowLeft, Shield, ShieldCheck, Zap, Lock } from 'lucide-react';
import { ScreenId } from '../types';

interface SplashScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onNavigate }) => {
  return (
    <div className="relative min-h-[640px] flex flex-col justify-between items-center px-6 py-8 text-center bg-gradient-to-b from-[#072418] via-[#061a11] to-[#030f0a] overflow-hidden">
      {/* Background Circuit Grid Graphics */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:18px_18px]" />

      {/* Decorative Top Glow */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Center Brand Identity with 3D Smart Building & Orbital Rings */}
      <div className="flex-1 flex flex-col items-center justify-center my-auto z-10 w-full">
        <HosnLogo 
          size="hero" 
          showText={true} 
          showSubtitle={true} 
          showOrbitalIcons={true} 
        />
      </div>

      {/* Action Buttons & Quick Role Access */}
      <div className="w-full max-w-sm space-y-3 z-10">
        <button
          id="splash-login-btn"
          onClick={() => onNavigate('login')}
          className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-[#061810] font-black text-base shadow-[0_4px_20px_rgba(196,154,69,0.35)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>الدخول إلى النظام الموحد</span>
          <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <button
            onClick={() => onNavigate('manager-dashboard')}
            className="py-2.5 px-3 rounded-lg bg-[#0c2a1e]/90 border border-emerald-500/30 hover:border-amber-400/60 text-emerald-100 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span>لوحة المديرين</span>
          </button>
          
          <button
            onClick={() => onNavigate('smart-map')}
            className="py-2.5 px-3 rounded-lg bg-[#0c2a1e]/90 border border-emerald-500/30 hover:border-amber-400/60 text-emerald-100 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span>الخريطة الذكية</span>
          </button>
        </div>

        <p className="text-[11px] text-emerald-400/60 pt-2 font-medium">
          جميع الحقوق محفوظة © 2024 وزارة البلديات والإسكان
        </p>
      </div>
    </div>
  );
};
