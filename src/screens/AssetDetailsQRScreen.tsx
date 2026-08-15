import React, { useState } from 'react';
import { 
  ChevronRight, 
  CheckCircle2, 
  MapPin, 
  Building, 
  Calendar, 
  QrCode, 
  FileWarning, 
  History, 
  Wrench,
  AlertCircle
} from 'lucide-react';
import { ScreenId } from '../types';

interface AssetDetailsQRScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const AssetDetailsQRScreen: React.FC<AssetDetailsQRScreenProps> = ({ onNavigate }) => {
  const [showHistory, setShowHistory] = useState(false);

  return (
    <div className="flex-1 flex flex-col justify-between px-4 py-3 bg-[#061810] text-emerald-50 overflow-y-auto relative">
      {/* Top Header Bar (Matching Image 10) */}
      <div className="flex items-center justify-between pb-2 border-b border-[#143628]">
        {/* HOSN Title & Subtitle */}
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-amber-400 font-['Tajawal'] text-base">حُصن</span>
          <h1 className="text-xs sm:text-sm font-bold text-white">
            تفاصيل الأصل (QR)
          </h1>
        </div>

        <button
          onClick={() => onNavigate('smart-map')}
          className="p-1 text-emerald-300 hover:text-white transition-colors cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Main Asset Photo with Embedded QR Code (Matching Image 10) */}
      <div className="my-3 relative rounded-2xl bg-[#092218] border border-[#1d4634] p-3 flex flex-col items-center justify-center overflow-hidden shadow-md">
        {/* Fire Extinguisher Product Visual with QR overlay */}
        <div className="relative w-full max-w-[260px] h-52 bg-white/95 rounded-xl overflow-hidden flex items-center justify-center p-2 shadow-inner">
          {/* Fire Extinguisher Image */}
          <img
            src="https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?w=400&auto=format&fit=crop&q=80"
            alt="مطفأة حريق"
            className="h-full object-contain mix-blend-multiply"
          />

          {/* Central Overlay QR Code (Matching Image 10) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="p-2.5 bg-white rounded-xl shadow-2xl border border-gray-300 flex flex-col items-center justify-center">
              {/* Detailed SVG QR Pattern */}
              <svg className="w-24 h-24" viewBox="0 0 100 100" fill="#061810">
                {/* 3 Corner Finder Targets */}
                <rect x="5" y="5" width="28" height="28" rx="2" fill="none" stroke="#061810" strokeWidth="4" />
                <rect x="11" y="11" width="16" height="16" fill="#061810" />

                <rect x="67" y="5" width="28" height="28" rx="2" fill="none" stroke="#061810" strokeWidth="4" />
                <rect x="73" y="11" width="16" height="16" fill="#061810" />

                <rect x="5" y="67" width="28" height="28" rx="2" fill="none" stroke="#061810" strokeWidth="4" />
                <rect x="11" y="73" width="16" height="16" fill="#061810" />

                {/* QR Matrix Bits */}
                <rect x="40" y="8" width="6" height="6" />
                <rect x="50" y="18" width="8" height="6" />
                <rect x="42" y="30" width="6" height="8" />
                <rect x="54" y="32" width="6" height="6" />
                <rect x="10" y="42" width="6" height="6" />
                <rect x="22" y="48" width="8" height="6" />
                <rect x="38" y="45" width="6" height="12" />
                <rect x="50" y="50" width="8" height="8" />
                <rect x="64" y="42" width="8" height="6" />
                <rect x="80" y="46" width="6" height="8" />
                <rect x="42" y="68" width="8" height="6" />
                <rect x="55" y="72" width="6" height="10" />
                <rect x="68" y="68" width="10" height="6" />
                <rect x="82" y="74" width="8" height="8" />
                <rect x="45" y="86" width="8" height="6" />
                <rect x="65" y="84" width="6" height="8" />
                <rect x="78" y="88" width="10" height="6" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Asset Identification and Status Badge (Matching Image 10) */}
      <div className="flex items-center justify-between my-2">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>يعمل</span>
        </div>

        <h2 className="text-base sm:text-lg font-black text-amber-300 font-mono">
          مطفأة حريق FE-00892
        </h2>
      </div>

      {/* Metadata Specification Rows (Matching Image 10) */}
      <div className="space-y-2.5 my-2 text-xs">
        {/* Row 1: Location */}
        <div className="p-3 rounded-xl bg-[#092218] border border-[#1d4634] flex items-center justify-between">
          <span className="text-emerald-100 font-medium">مبنى أ، الطابق 2، ممر 201</span>
          <div className="flex items-center gap-1.5 text-amber-400 font-bold">
            <span>الموقع:</span>
            <MapPin className="w-4 h-4" />
          </div>
        </div>

        {/* Row 2: Manufacturer */}
        <div className="p-3 rounded-xl bg-[#092218] border border-[#1d4634] flex items-center justify-between">
          <span className="text-emerald-100 font-medium">Kidde Fire Systems</span>
          <div className="flex items-center gap-1.5 text-amber-400 font-bold">
            <span>الشركة المصنعة:</span>
            <Building className="w-4 h-4" />
          </div>
        </div>

        {/* Row 3: Last Maintenance */}
        <div className="p-3 rounded-xl bg-[#092218] border border-[#1d4634] flex items-center justify-between">
          <span className="text-emerald-100 font-medium">15 مايو 2023</span>
          <div className="flex items-center gap-1.5 text-amber-400 font-bold">
            <span>آخر صيانة:</span>
            <Calendar className="w-4 h-4" />
          </div>
        </div>

        {/* Row 4: Next Maintenance */}
        <div className="p-3 rounded-xl bg-[#092218] border border-[#1d4634] flex items-center justify-between">
          <span className="text-emerald-100 font-medium">15 نوفمبر 2023</span>
          <div className="flex items-center gap-1.5 text-amber-400 font-bold">
            <span>تاريخ الصيانة القادمة:</span>
            <Calendar className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Primary Action: إضافة بلاغ (Matching Image 10) */}
      <button
        id="btn-add-asset-report"
        onClick={() => onNavigate('create-report')}
        className="w-full mt-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#c49a45] to-[#b88c32] hover:from-[#e5c06e] hover:to-[#c49a45] text-[#061810] font-black text-sm shadow-[0_4px_16px_rgba(196,154,69,0.3)] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
      >
        <FileWarning className="w-4 h-4" />
        <span>إضافة بلاغ</span>
      </button>
    </div>
  );
};
