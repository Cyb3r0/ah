import React from 'react';
import { 
  Camera, 
  Fingerprint, 
  Sparkles, 
  Flame, 
  DoorClosed, 
  LogOut, 
  Bell, 
  ShieldCheck,
  Building2
} from 'lucide-react';

interface HosnLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showText?: boolean;
  showSubtitle?: boolean;
  showOrbitalIcons?: boolean;
  className?: string;
}

export const HosnLogo: React.FC<HosnLogoProps> = ({
  size = 'md',
  showText = true,
  showSubtitle = false,
  showOrbitalIcons = false,
  className = '',
}) => {
  const isHero = size === 'hero';
  const isLarge = size === 'lg' || isHero;
  const isSmall = size === 'sm';

  const shieldWidth = isSmall ? 'w-8 h-8' : isLarge ? 'w-16 h-16' : 'w-10 h-10';

  return (
    <div className={`flex flex-col items-center justify-center text-center ${className}`}>
      {/* Orbital Animated Container for Splash / Login */}
      {showOrbitalIcons ? (
        <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center mb-6">
          {/* Subtle Circuit Grid Rings Background */}
          <div className="absolute inset-0 rounded-full border border-emerald-500/20 animate-pulse pointer-events-none" />
          <div className="absolute -inset-4 rounded-full border border-amber-500/15 pointer-events-none" />
          
          {/* Glowing Green Central Aura */}
          <div className="absolute w-44 h-44 rounded-full bg-emerald-500/15 blur-2xl pointer-events-none" />
          <div className="absolute w-52 h-52 rounded-full border-2 border-emerald-400/30 ring-1 ring-amber-400/20" />
          <div className="absolute w-64 h-64 rounded-full border border-dashed border-emerald-400/25 animate-spin" style={{ animationDuration: '40s' }} />

          {/* Central 3D Smart Building Card */}
          <div className="relative z-10 w-32 h-32 rounded-2xl bg-gradient-to-b from-[#113a29] to-[#082015] border border-amber-400/40 p-2.5 flex flex-col items-center justify-center shadow-[0_0_35px_rgba(16,185,129,0.3)]">
            <div className="relative">
              {/* Building Facade Graphic */}
              <div className="w-16 h-16 relative flex items-center justify-center">
                <Building2 className="w-14 h-14 text-emerald-300 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                {/* Central HOSN Shield Emblem on building */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-7 h-8 bg-gradient-to-b from-amber-400 to-amber-600 rounded-b-md rounded-t-sm flex items-center justify-center border border-amber-200 shadow-md">
                    <span className="font-bold text-xs text-[#061810]">H</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 8 Orbital Feature Icons */}
          {orbitalItems.map((item, idx) => {
            const angle = (idx * 360) / orbitalItems.length - 90;
            const radius = 120; // px
            const rad = (angle * Math.PI) / 180;
            const x = Math.cos(rad) * radius;
            const y = Math.sin(rad) * radius;

            return (
              <div
                key={item.id}
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                }}
                className="absolute z-20 w-10 h-10 rounded-full bg-[#0b291d] border border-amber-400/40 flex items-center justify-center shadow-[0_0_12px_rgba(196,154,69,0.3)] text-amber-300 hover:scale-110 transition-transform duration-200"
                title={item.label}
              >
                {item.icon}
              </div>
            );
          })}
        </div>
      ) : (
        /* Standard Header Logo */
        <div className="flex items-center gap-2.5">
          {/* Shield Badge */}
          <div className="relative flex items-center justify-center group">
            <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-md group-hover:bg-amber-400/40 transition-all pointer-events-none" />
            <svg
              className={`${shieldWidth} text-amber-400 drop-shadow-[0_4px_12px_rgba(229,176,68,0.45)] relative z-10 transition-transform group-hover:scale-105`}
              viewBox="0 0 100 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Castle Top Shield Contour with Golden Bevel */}
              <path
                d="M10 15 L25 15 L25 5 L40 5 L40 15 L60 15 L60 5 L75 5 L75 15 L90 15 L90 60 C90 90 50 115 50 115 C50 115 10 90 10 60 Z"
                fill="url(#goldGradient)"
                stroke="#fff1b8"
                strokeWidth="3.5"
              />
              {/* Inner Royal Dark Emerald Cutout */}
              <path
                d="M18 24 L82 24 L82 58 C82 84 50 106 50 106 C50 106 18 84 18 58 Z"
                fill="#051f14"
                stroke="url(#emeraldGradient)"
                strokeWidth="1.5"
              />
              {/* H Monogram (Fortress Castle Pillar) */}
              <path
                d="M34 38 L44 38 L44 54 L56 54 L56 38 L66 38 L66 76 L56 76 L56 63 L44 63 L44 76 L34 76 Z"
                fill="url(#goldGradient)"
                filter="drop-shadow(0 2px 4px rgba(0,0,0,0.5))"
              />
              {/* Central Diamond Star */}
              <circle cx="50" cy="58.5" r="2.5" fill="#ffffff" />
              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fff5c0" />
                  <stop offset="25%" stopColor="#f5d378" />
                  <stop offset="60%" stopColor="#e5b044" />
                  <stop offset="100%" stopColor="#966b1a" />
                </linearGradient>
                <linearGradient id="emeraldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#34d399" />
                  <stop offset="100%" stopColor="#064e3b" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {showText && (
            <div className="flex flex-col items-start text-right">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-wider font-['Alexandria',sans-serif] gold-gradient-text drop-shadow-sm">
                  HOSN
                </span>
                <span className="font-black text-base sm:text-lg text-emerald-100 font-['Tajawal',sans-serif]">
                  حُصن
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Primary Brand Typography for Login & Splash */}
      {showText && (isLarge || showOrbitalIcons) && (
        <div className="mt-3">
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-3xl sm:text-4xl font-black text-white font-['Alexandria',sans-serif] tracking-wide">
              حِصْن
            </h1>
          </div>
          {showSubtitle && (
            <p className="mt-2 text-xs sm:text-sm font-medium text-emerald-200/80 max-w-xs leading-relaxed">
              المنصة الذكية الموحدة لإدارة
              <br />
              الأمن والسلامة وتشغيل المباني
            </p>
          )}
        </div>
      )}
    </div>
  );
};

const orbitalItems = [
  { id: 'cam', label: 'المراقبة بالكاميرات', icon: <Camera className="w-4 h-4" /> },
  { id: 'finger', label: 'التحكم بالدخول وبصمة', icon: <Fingerprint className="w-4 h-4" /> },
  { id: 'elev', label: 'تشغيل المصاعد', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'fire', label: 'مكافحة الحريق', icon: <Flame className="w-4 h-4" /> },
  { id: 'exit', label: 'مخارج الطوارئ', icon: <LogOut className="w-4 h-4" /> },
  { id: 'door', label: 'الأبواب الذكية', icon: <DoorClosed className="w-4 h-4" /> },
  { id: 'alarm', label: 'أجهزة الإنذار', icon: <Bell className="w-4 h-4" /> },
  { id: 'shield', label: 'السلامة المعتمدة', icon: <ShieldCheck className="w-4 h-4" /> },
];
