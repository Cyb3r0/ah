import React, { useState, useEffect } from 'react';
import { Wifi, Battery } from 'lucide-react';

interface StatusBarProps {
  timeOverride?: string;
  className?: string;
}

export const StatusBar: React.FC<StatusBarProps> = ({ timeOverride, className = '' }) => {
  const [currentTime, setCurrentTime] = useState(timeOverride || '10:24');

  useEffect(() => {
    if (timeOverride) {
      setCurrentTime(timeOverride);
      return;
    }
    const update = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    update();
    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  }, [timeOverride]);

  return (
    <div className={`w-full px-6 pt-3 pb-2 flex items-center justify-between text-xs font-semibold text-emerald-100/90 select-none z-30 ${className}`}>
      {/* Left side (in RTL this renders on left or right properly) */}
      <div className="font-sans font-bold tracking-tight text-[13px]">
        {currentTime}
      </div>

      {/* Dynamic Notch / Speaker Cutout spacer */}
      <div className="w-24 h-4 bg-black/40 rounded-full mx-auto hidden sm:block" />

      {/* Right side: Icons */}
      <div className="flex items-center gap-1.5 text-emerald-100/90">
        {/* Cellular 4 bars */}
        <div className="flex items-end gap-[1.5px] h-3">
          <div className="w-[3px] h-[4px] bg-current rounded-xs" />
          <div className="w-[3px] h-[6px] bg-current rounded-xs" />
          <div className="w-[3px] h-[8px] bg-current rounded-xs" />
          <div className="w-[3px] h-[10px] bg-current rounded-xs" />
        </div>

        {/* WiFi */}
        <Wifi className="w-3.5 h-3.5 stroke-[2.2]" />

        {/* Battery with charge */}
        <div className="flex items-center gap-0.5">
          <div className="w-5 h-2.5 border border-current rounded-xs p-[1px] flex items-center">
            <div className="h-full w-full bg-amber-400 rounded-2xs" />
          </div>
          <div className="w-[1.5px] h-1 bg-current rounded-r-xs" />
        </div>
      </div>
    </div>
  );
};
