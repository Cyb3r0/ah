import React, { useState } from 'react';
import { HosnLogo } from '../components/common/HosnLogo';
import { 
  ChevronRight, 
  Camera, 
  ChevronDown, 
  Laptop, 
  Check, 
  Clock, 
  FileText,
  UserCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ScreenId } from '../types';
import { initialDeviceLogs } from '../data/mockData';

interface DeviceEntryScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const DeviceEntryScreen: React.FC<DeviceEntryScreenProps> = ({ onNavigate }) => {
  const [deviceType, setDeviceType] = useState('كمبيوتر محمول (Laptop)');
  const [serialNumber, setSerialNumber] = useState('SN-98442-XF');
  const [ownerName, setOwnerName] = useState('م. خالد السبيعي');
  const [entryTime, setEntryTime] = useState('09:45 ص');
  const [photoPreview, setPhotoPreview] = useState<string | null>(
    'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=300&auto=format&fit=crop&q=80'
  );
  const [isSuccess, setIsSuccess] = useState(false);

  const deviceTypes = [
    'كمبيوتر محمول (Laptop)',
    'كاميرا تصوير وتفتيش',
    'أجهزة فحص واختبار هندسية',
    'أجهزة اتصال لاسلكي (Walkie-Talkie)',
    'حقيبة صيانة وأدوات دقيقة',
  ];

  const handleCapturePhoto = () => {
    // Simulate photo capture
    const sample = 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&auto=format&fit=crop&q=80';
    setPhotoPreview(sample);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#c49a45', '#10b981']
    });
    setTimeout(() => {
      setIsSuccess(false);
      onNavigate('manager-dashboard');
    }, 1800);
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-4 py-3 bg-[#061810] text-emerald-50 overflow-y-auto relative">
      {/* Top Header Bar (Matching Image 3) */}
      <div className="flex items-center justify-between pb-2 border-b border-[#143628]">
        <div className="flex items-center gap-2">
          <span className="font-black text-sm text-amber-400 font-['Alexandria']">HOSN</span>
        </div>

        <h1 className="text-sm sm:text-base font-bold text-white text-center">
          تسجيل دخول الأجهزة
        </h1>

        <button
          onClick={() => onNavigate('manager-dashboard')}
          className="p-1 text-emerald-300 hover:text-white transition-colors cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Main Form Container */}
      <form onSubmit={handleRegister} className="space-y-4 my-2">
        {/* Device Photo Capture Section (Matching Image 3) */}
        <div className="flex flex-col items-center justify-center my-3">
          <button
            type="button"
            onClick={handleCapturePhoto}
            className="group flex flex-col items-center gap-2 cursor-pointer focus:outline-none"
          >
            <div className="w-20 h-20 rounded-full bg-[#0c2a1e] border-2 border-dashed border-amber-400/60 group-hover:border-amber-400 flex items-center justify-center text-amber-400 shadow-[0_0_20px_rgba(196,154,69,0.2)] transition-all overflow-hidden relative">
              {photoPreview ? (
                <img src={photoPreview} alt="Device" className="w-full h-full object-cover" />
              ) : (
                <Camera className="w-8 h-8" />
              )}
            </div>
            <span className="text-xs font-bold text-emerald-200 group-hover:text-amber-300 transition-colors">
              التقاط صورة الجهاز
            </span>
          </button>
        </div>

        {/* Device Type Select (Matching Image 3) */}
        <div className="space-y-1">
          <div className="relative">
            <select
              value={deviceType}
              onChange={(e) => setDeviceType(e.target.value)}
              className="w-full appearance-none py-3 px-3.5 pr-4 pl-9 rounded-xl bg-[#092218] border border-amber-400/40 text-emerald-100 font-medium text-xs focus:outline-none focus:border-amber-400 cursor-pointer text-right"
            >
              {deviceTypes.map((d) => (
                <option key={d} value={d} className="bg-[#092218] text-white">
                  {d}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-amber-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-emerald-400/80 pointer-events-none hidden">
              نوع الجهاز
            </span>
          </div>
        </div>

        {/* Serial Number Input (Matching Image 3) */}
        <div className="space-y-1">
          <input
            type="text"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
            placeholder="الرقم التسلسلي"
            className="w-full py-3 px-3.5 rounded-xl bg-[#092218] border border-amber-400/40 text-emerald-100 placeholder:text-emerald-400/60 font-mono text-xs focus:outline-none focus:border-amber-400 text-right"
            required
          />
        </div>

        {/* Owner Name Input (Matching Image 3) */}
        <div className="space-y-1">
          <input
            type="text"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            placeholder="اسم المالك"
            className="w-full py-3 px-3.5 rounded-xl bg-[#092218] border border-amber-400/40 text-emerald-100 placeholder:text-emerald-400/60 font-medium text-xs focus:outline-none focus:border-amber-400 text-right"
            required
          />
        </div>

        {/* Entry Time Row (Matching Image 3) */}
        <div className="p-3 rounded-xl bg-[#092218] border border-amber-400/40 flex items-center justify-between text-xs">
          <span className="text-amber-300 font-bold font-mono">{entryTime}</span>
          <span className="text-emerald-300/80 font-medium">وقت الدخول</span>
        </div>

        {/* Submit Register Entry Button (Gold) */}
        <button
          id="btn-register-device"
          type="submit"
          className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#c49a45] to-[#b88c32] hover:from-[#e5c06e] hover:to-[#c49a45] text-[#061810] font-black text-sm shadow-[0_4px_16px_rgba(196,154,69,0.3)] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          {isSuccess ? (
            <span className="flex items-center gap-1.5 text-emerald-950 font-black">
              <Check className="w-5 h-5 stroke-[3]" />
              تم تسجيل الجهاز وتصريح الدخول بنجاح
            </span>
          ) : (
            <span>تسجيل الدخول</span>
          )}
        </button>
      </form>
    </div>
  );
};
