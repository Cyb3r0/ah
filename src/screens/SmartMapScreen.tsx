import React, { useState } from 'react';
import { 
  ChevronRight, 
  Home, 
  ChevronDown, 
  Video, 
  Flame, 
  ShieldAlert, 
  DoorOpen, 
  Layers, 
  ZoomIn, 
  ZoomOut, 
  Maximize2,
  X,
  Play,
  Radio,
  Sparkles
} from 'lucide-react';
import { ScreenId, MapMarker } from '../types';
import { floorMapMarkers } from '../data/mockData';

interface SmartMapScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenLiveCamera?: (camera: MapMarker) => void;
}

export const SmartMapScreen: React.FC<SmartMapScreenProps> = ({ 
  onNavigate,
  onOpenLiveCamera
}) => {
  const [selectedBuilding, setSelectedBuilding] = useState('البرج الشمالي');
  const [selectedFloor, setSelectedFloor] = useState('الطابق الثالث');
  const [selectedZone, setSelectedZone] = useState('الجناح الشرقي');
  
  // Active marker popover
  const [activeMarker, setActiveMarker] = useState<MapMarker | null>(floorMapMarkers[0]); // default C103 open
  const [activeSmokeMarker, setActiveSmokeMarker] = useState<MapMarker | null>(floorMapMarkers[4]); // S-201 open
  const [activeModalFeed, setActiveModalFeed] = useState<MapMarker | null>(null);

  const buildings = ['البرج الشمالي', 'برج أ (الرئيسي)', 'برج ب', 'مبنى الخدمات'];
  const floors = ['الطابق الثالث', 'الطابق الثاني', 'الطابق الأول', 'الطابق الأرضي (G)', 'مرآب B1'];
  const zones = ['الجناح الشرقي', 'الجناح الغربي', 'الردهة المركزية', 'منطقة الخوادم'];

  return (
    <div className="flex-1 flex flex-col justify-between px-3 py-3 bg-[#061810] text-emerald-50 overflow-hidden relative">
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-2 border-b border-[#143628]">
        <button
          onClick={() => onNavigate('manager-dashboard')}
          className="p-1.5 rounded-lg bg-[#0b271c] text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <h1 className="text-sm sm:text-base font-bold text-white text-center">
          الخريطة الذكية - النمط الداكن الموحد
        </h1>

        <button
          onClick={() => onNavigate('manager-dashboard')}
          className="p-1.5 rounded-lg bg-[#0b271c] text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
        >
          <Home className="w-5 h-5" />
        </button>
      </div>

      {/* Filter Selectors Bar */}
      <div className="grid grid-cols-3 gap-1.5 my-2.5 text-xs">
        {/* Building Filter */}
        <div className="relative">
          <select
            value={selectedBuilding}
            onChange={(e) => setSelectedBuilding(e.target.value)}
            className="w-full appearance-none py-2 px-2.5 pr-2 pl-6 rounded-lg bg-[#0a251a] border border-[#1d4634] text-emerald-100 text-[11px] font-medium focus:outline-none focus:border-amber-400 cursor-pointer"
          >
            {buildings.map((b) => (
              <option key={b} value={b} className="bg-[#0a251a] text-emerald-100">
                المبنى: {b}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-emerald-400 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Floor Filter */}
        <div className="relative">
          <select
            value={selectedFloor}
            onChange={(e) => setSelectedFloor(e.target.value)}
            className="w-full appearance-none py-2 px-2.5 pr-2 pl-6 rounded-lg bg-[#0a251a] border border-[#1d4634] text-emerald-100 text-[11px] font-medium focus:outline-none focus:border-amber-400 cursor-pointer"
          >
            {floors.map((f) => (
              <option key={f} value={f} className="bg-[#0a251a] text-emerald-100">
                الطابق: {f}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-emerald-400 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Zone Filter */}
        <div className="relative">
          <select
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
            className="w-full appearance-none py-2 px-2.5 pr-2 pl-6 rounded-lg bg-[#0a251a] border border-[#1d4634] text-emerald-100 text-[11px] font-medium focus:outline-none focus:border-amber-400 cursor-pointer"
          >
            {zones.map((z) => (
              <option key={z} value={z} className="bg-[#0a251a] text-emerald-100">
                المنطقة: {z}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-emerald-400 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Interactive Floor Plan Architectural Blueprint Container */}
      <div className="relative flex-1 rounded-2xl bg-[#030e09] border border-[#1d4634] overflow-hidden flex items-center justify-center p-2 min-h-[380px]">
        {/* Architectural SVG Plan Layout */}
        <div className="relative w-full h-full max-w-[340px] max-h-[380px] bg-[#0c1f17] rounded-xl border border-[#193f2f] shadow-inner overflow-hidden">
          {/* Blueprint Grid Lines */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:12px_12px]" />

          {/* SVG Floor Architectural Layout */}
          <svg className="w-full h-full" viewBox="0 0 400 460" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Outer Perimeter */}
            <rect x="20" y="20" width="360" height="420" rx="10" fill="#dce6e2" stroke="#254d3c" strokeWidth="4" />

            {/* Central Corridor & Elevator Core */}
            <rect x="140" y="20" width="120" height="420" fill="#c7d9d2" stroke="#486a5b" strokeWidth="2" />

            {/* Elevators in Central Core */}
            <rect x="155" y="150" width="40" height="50" fill="#a4c2b7" stroke="#335848" strokeWidth="2" />
            <line x1="155" y1="150" x2="195" y2="200" stroke="#335848" strokeWidth="1" />
            <line x1="155" y1="200" x2="195" y2="150" stroke="#335848" strokeWidth="1" />

            <rect x="205" y="150" width="40" height="50" fill="#a4c2b7" stroke="#335848" strokeWidth="2" />
            <line x1="205" y1="150" x2="245" y2="200" stroke="#335848" strokeWidth="1" />
            <line x1="205" y1="200" x2="245" y2="150" stroke="#335848" strokeWidth="1" />

            {/* Stairs Core */}
            <rect x="155" y="270" width="90" height="60" fill="#9dbfb1" stroke="#335848" strokeWidth="2" />
            <line x1="155" y1="280" x2="245" y2="280" stroke="#335848" strokeWidth="1" />
            <line x1="155" y1="290" x2="245" y2="290" stroke="#335848" strokeWidth="1" />
            <line x1="155" y1="300" x2="245" y2="300" stroke="#335848" strokeWidth="1" />
            <line x1="155" y1="310" x2="245" y2="310" stroke="#335848" strokeWidth="1" />
            <line x1="155" y1="320" x2="245" y2="320" stroke="#335848" strokeWidth="1" />

            {/* Meeting Rooms & Offices Top Left */}
            <rect x="20" y="20" width="120" height="90" fill="#e8f0ec" stroke="#254d3c" strokeWidth="2" />
            {/* Desks */}
            <rect x="40" y="45" width="25" height="35" rx="3" fill="#cbd8d2" stroke="#688b7d" />
            <rect x="80" y="45" width="25" height="35" rx="3" fill="#cbd8d2" stroke="#688b7d" />

            {/* Top Right Meeting Room */}
            <rect x="260" y="20" width="120" height="90" fill="#e8f0ec" stroke="#254d3c" strokeWidth="2" />
            {/* Conference Table */}
            <rect x="285" y="45" width="70" height="40" rx="6" fill="#cbd8d2" stroke="#688b7d" />

            {/* Mid Left Office Pods */}
            <rect x="20" y="110" width="120" height="110" fill="#e8f0ec" stroke="#254d3c" strokeWidth="2" />
            <rect x="35" y="130" width="30" height="30" fill="#cbd8d2" />
            <rect x="80" y="130" width="30" height="30" fill="#cbd8d2" />
            <rect x="35" y="170" width="30" height="30" fill="#cbd8d2" />
            <rect x="80" y="170" width="30" height="30" fill="#cbd8d2" />

            {/* Mid Right Offices */}
            <rect x="260" y="110" width="120" height="110" fill="#e8f0ec" stroke="#254d3c" strokeWidth="2" />
            <rect x="280" y="130" width="30" height="30" fill="#cbd8d2" />
            <rect x="330" y="130" width="30" height="30" fill="#cbd8d2" />

            {/* Lower Left Offices */}
            <rect x="20" y="220" width="120" height="110" fill="#e8f0ec" stroke="#254d3c" strokeWidth="2" />
            {/* Lower Right Offices */}
            <rect x="260" y="220" width="120" height="110" fill="#e8f0ec" stroke="#254d3c" strokeWidth="2" />

            {/* Bottom Section */}
            <rect x="20" y="330" width="120" height="110" fill="#e8f0ec" stroke="#254d3c" strokeWidth="2" />
            <rect x="260" y="330" width="120" height="110" fill="#e8f0ec" stroke="#254d3c" strokeWidth="2" />

            {/* Fire Exit Zones (FE in Red) */}
            <rect x="140" y="110" width="25" height="25" fill="#dc2626" rx="2" />
            <text x="152" y="127" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle">FE</text>

            <rect x="235" y="110" width="25" height="25" fill="#dc2626" rx="2" />
            <text x="247" y="127" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle">FE</text>

            <rect x="140" y="300" width="25" height="25" fill="#dc2626" rx="2" />
            <text x="152" y="317" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle">FE</text>

            <rect x="260" y="225" width="25" height="25" fill="#dc2626" rx="2" />
            <text x="272" y="242" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle">FE</text>

            {/* Exit E Badges with Arrows */}
            <rect x="145" y="210" width="22" height="18" fill="#15803d" rx="2" />
            <text x="156" y="223" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle">E</text>

            <rect x="235" y="210" width="22" height="18" fill="#15803d" rx="2" />
            <text x="246" y="223" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle">E</text>

            <rect x="120" y="315" width="22" height="18" fill="#15803d" rx="2" />
            <text x="131" y="328" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle">E</text>

            <rect x="235" y="330" width="22" height="18" fill="#15803d" rx="2" />
            <text x="246" y="343" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle">E</text>

            {/* Stationary Camera Pins (C in Navy) */}
            <circle cx="50" cy="45" r="14" fill="#0f293d" stroke="#38bdf8" strokeWidth="2" />
            <text x="50" y="50" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">C</text>

            <circle cx="350" cy="45" r="14" fill="#0f293d" stroke="#38bdf8" strokeWidth="2" />
            <text x="350" y="50" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">C</text>

            <circle cx="50" cy="405" r="14" fill="#0f293d" stroke="#38bdf8" strokeWidth="2" />
            <text x="50" y="410" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">C</text>

            <circle cx="350" cy="405" r="14" fill="#0f293d" stroke="#38bdf8" strokeWidth="2" />
            <text x="350" y="410" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">C</text>

            {/* Smoke Detector (S in Red/Alert) */}
            <circle cx="200" cy="225" r="13" fill="#dc2626" stroke="#fecaca" strokeWidth="2" className="animate-pulse" />
            <text x="200" y="230" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">S</text>

            <circle cx="350" cy="315" r="13" fill="#15803d" stroke="#bbf7d0" strokeWidth="2" />
            <text x="350" y="320" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">S</text>
          </svg>

          {/* Interactive Overlay Callout for Camera C103 (Matching Image 7) */}
          {activeMarker && (
            <div 
              style={{ top: '15%', right: '8%' }}
              className="absolute z-20 w-44 rounded-xl bg-[#092218] border border-emerald-500/60 p-2 shadow-2xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-200"
            >
              <div className="relative rounded-lg overflow-hidden h-16 mb-1.5 bg-black/60">
                <img
                  src={activeMarker.imageUrl || "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=300&auto=format&fit=crop&q=80"}
                  alt={activeMarker.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-1 right-1 px-1.5 py-0.5 rounded-sm bg-black/60 text-[9px] text-emerald-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>مباشر</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-bold text-white mb-1">
                <span>{activeMarker.name}</span>
                <span className="text-[10px] text-emerald-300 font-normal flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  الحالة: نشط
                </span>
              </div>

              <button
                onClick={() => setActiveModalFeed(activeMarker)}
                className="w-full py-1.5 px-2 rounded-lg bg-[#c49a45] hover:bg-[#d4af37] text-[#061810] font-bold text-[11px] flex items-center justify-center gap-1 cursor-pointer transition-all active:scale-95 shadow-sm"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>عرض البث المباشر</span>
              </button>
            </div>
          )}

          {/* Interactive Overlay Callout for Smoke Detector S-201 (Matching Image 7) */}
          {activeSmokeMarker && (
            <div 
              style={{ top: '48%', left: '15%' }}
              className="absolute z-20 w-44 rounded-xl bg-[#092218] border border-rose-600/70 p-2 shadow-2xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-200"
            >
              <div className="flex items-center justify-between text-xs font-bold text-white mb-1">
                <span>{activeSmokeMarker.name}</span>
                <span className="text-[10px] text-rose-400 font-normal flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                  الحالة: تنبيه
                </span>
              </div>

              <p className="text-[10px] text-emerald-200/70 mb-2 leading-tight">
                ردهة المصاعد المركزية (31°C)
              </p>

              <button
                onClick={() => onNavigate('disability-support')}
                className="w-full py-1.5 px-2 rounded-lg bg-[#c49a45] hover:bg-[#d4af37] text-[#061810] font-bold text-[11px] flex items-center justify-center gap-1 cursor-pointer transition-all active:scale-95 shadow-sm"
              >
                <span>عرض التفاصيل</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Camera Live Stream Simulated Modal */}
      {activeModalFeed && (
        <div className="absolute inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between p-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-[#143628]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
              <h2 className="text-sm font-bold text-white">{activeModalFeed.name} - بث حي مباشر 4K</h2>
            </div>
            <button
              onClick={() => setActiveModalFeed(null)}
              className="p-1 rounded-full bg-[#0b271c] text-emerald-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="relative rounded-xl overflow-hidden my-auto border border-amber-400/40 bg-black aspect-video flex items-center justify-center">
            <img
              src={activeModalFeed.imageUrl}
              alt={activeModalFeed.name}
              className="w-full h-full object-cover"
            />
            {/* Live OSD Overlay */}
            <div className="absolute top-3 left-3 bg-black/60 px-2.5 py-1 rounded text-xs font-mono text-emerald-400 border border-emerald-500/30">
              REC ● {new Date().toLocaleTimeString('ar-SA')} | 60 FPS
            </div>
            <div className="absolute bottom-3 right-3 bg-black/60 px-2.5 py-1 rounded text-xs text-white border border-white/20">
              الموقع: الجناح الشرقي - قاعة الاجتماعات
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => onNavigate('create-report')}
              className="py-2.5 px-4 rounded-xl bg-amber-400 text-[#061810] font-bold text-xs flex items-center gap-1.5"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>إبلاغ عن حدث من الكاميرا</span>
            </button>
            <button
              onClick={() => setActiveModalFeed(null)}
              className="py-2.5 px-4 rounded-xl bg-[#0b271c] border border-emerald-500/30 text-emerald-200 text-xs font-medium"
            >
              إغلاق البث
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
