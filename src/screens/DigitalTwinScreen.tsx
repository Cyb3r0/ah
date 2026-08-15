import React, { useState } from 'react';
import { 
  Building2, 
  Flame, 
  DoorOpen, 
  Eye, 
  Layers, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Activity, 
  Zap, 
  ShieldCheck, 
  Wrench, 
  PlusCircle, 
  ArrowRight, 
  Maximize2, 
  Sliders, 
  Info,
  Compass,
  Sparkles,
  Gauge,
  Radio,
  FileCheck2,
  ChevronLeft,
  Search,
  Check,
  Video,
  Thermometer,
  Wind,
  ShieldAlert
} from 'lucide-react';
import { useHosn } from '../context/HosnContext';
import { DigitalTwinAsset, ScreenId } from '../types';
import { HosnLogo } from '../components/common/HosnLogo';

interface DigitalTwinScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const DigitalTwinScreen: React.FC<DigitalTwinScreenProps> = ({ onNavigate }) => {
  const { 
    floors, 
    selectedFloor, 
    setSelectedFloor, 
    assets, 
    selectedAsset, 
    setSelectedAsset,
    createIncidentFromAsset,
    currentStaff,
    simulationState,
    switchStaff,
    allStaff
  } = useHosn();

  const [viewMode3D, setViewMode3D] = useState<'isometric' | 'blueprint'>('isometric');
  const [createdNotice, setCreatedNotice] = useState<{ reportId: string; taskId: string; assetCode: string } | null>(null);
  const [selectedZone, setSelectedZone] = useState<string>('الجناح الشرقي (Zone B)');

  // Filter assets by selected floor
  const floorAssets = assets.filter(a => a.floor === selectedFloor);
  const currentFloorObj = floors.find(f => f.floorNumber === selectedFloor) || floors[1];

  const handleCreateReport = (asset: DigitalTwinAsset) => {
    const { reportId, taskId } = createIncidentFromAsset(asset.code, undefined, 'حرجة');
    setCreatedNotice({ reportId, taskId, assetCode: asset.code });
  };

  const getAssetIcon = (type: DigitalTwinAsset['type']) => {
    switch (type) {
      case 'extinguisher': return Flame;
      case 'emergency_door': return DoorOpen;
      case 'smoke_detector': return Radio;
      case 'elevator': return Building2;
      case 'camera': return Eye;
      case 'pump': return Gauge;
      default: return Activity;
    }
  };

  return (
    <div className="flex-1 flex flex-col gap-4 text-emerald-50 font-['Tajawal',sans-serif]">
      {/* Header Banner & Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-3xl bg-gradient-to-r from-[#041a10] via-[#072d1c] to-[#041a10] border border-amber-400/30 shadow-2xl relative overflow-hidden">
        {/* Subtle Ambient Gold Glow */}
        <div className="absolute top-0 right-0 w-80 h-32 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex items-center gap-3.5 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 flex items-center justify-center text-[#061810] font-black shadow-[0_4px_20px_rgba(229,176,68,0.4)]">
            <Layers className="w-6 h-6 text-[#061810]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-amber-400 font-['Alexandria'] tracking-wider">المجسم الرقمي التفاعلي | DIGITAL TWIN</span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-400/40">
                برج حُصن الذكي (HOSN Tower)
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-black text-white leading-tight mt-0.5">
              التوأم الرقمي الهندسي الحي — مراقبة الأصول والممرات وتدفق الإخلاء
            </h1>
          </div>
        </div>

        {/* Quick Floor Selector Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-[#02120a] rounded-2xl border border-emerald-500/30 relative z-10 shadow-inner">
          {floors.map(floor => (
            <button
              key={floor.id}
              onClick={() => setSelectedFloor(floor.floorNumber)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedFloor === floor.floorNumber
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-[#061810] shadow-md font-black scale-105'
                  : 'text-emerald-300 hover:text-white hover:bg-[#072418]'
              }`}
            >
              {floor.name}
            </button>
          ))}
        </div>
      </div>

      {/* Firestore Database Hierarchical Context Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 rounded-2xl bg-[#03180f] border border-emerald-500/25 text-xs shadow-inner">
        <div className="flex items-center gap-2 flex-wrap text-emerald-300">
          <span className="text-amber-400 font-bold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>مسار قاعدة البيانات الحي (Firestore Schema):</span>
          </span>
          <span className="bg-[#062417] px-2.5 py-1 rounded-lg border border-emerald-500/30 text-white font-mono">
            🏢 Building-A (المقر الرئيسي)
          </span>
          <span className="text-emerald-600">➔</span>
          <span className="bg-[#062417] px-2.5 py-1 rounded-lg border border-emerald-500/30 text-white font-mono">
            📍 Floor-{selectedFloor < 0 ? 'B1' : `0${selectedFloor}`} ({currentFloorObj.name})
          </span>
          <span className="text-emerald-600">➔</span>
          <span className="bg-[#062417] px-2.5 py-1 rounded-lg border border-amber-400/40 text-amber-300 font-mono">
            🛡️ Zone-B ({selectedZone})
          </span>
          {selectedAsset && (
            <>
              <span className="text-emerald-600">➔</span>
              <span className="bg-gradient-to-r from-amber-400 to-amber-500 text-[#061810] font-black px-2.5 py-1 rounded-lg shadow-sm font-mono">
                ⚙️ {selectedAsset.code} ({selectedAsset.name})
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 text-[11px] text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>تزامن آني: <strong className="text-amber-300">مجموعة الأصول الحية</strong></span>
        </div>
      </div>

      {/* Incident Created Direct Notification Banner */}
      {createdNotice && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950 via-[#072e1c] to-emerald-950 border-2 border-amber-400 text-white shadow-2xl animate-in fade-in slide-in-from-top duration-300">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 text-[#061810] flex items-center justify-center font-black shadow-lg">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-amber-300">تم إنشاء بلاغ الصيانة الفوري ({createdNotice.reportId}) بنجاح!</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#02120a] text-emerald-300 font-mono border border-emerald-500/30">
                    الأصل: {createdNotice.assetCode}
                  </span>
                </div>
                <p className="text-xs text-emerald-100 mt-0.5">
                  تم إدراج أمر العمل تلقائياً لجدول الفني الميداني <span className="font-bold text-amber-300">م. تركي الشمري</span> للإصلاح والتحقق من المطابقة.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  switchStaff('staff-02'); // Switch to Technician Turky
                  onNavigate('technician-tasks');
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-[#061810] text-xs font-black flex items-center gap-1.5 shadow-[0_0_15px_rgba(229,176,68,0.4)] transition-all cursor-pointer"
              >
                <span>التبديل لحساب الفني وإغلاق البلاغ</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setCreatedNotice(null)}
                className="px-3 py-2 rounded-xl bg-[#02120a] hover:bg-[#072418] text-emerald-300 text-xs font-bold border border-emerald-500/30 cursor-pointer"
              >
                إخفاء
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Grid: Left Digital Twin Floor Layout + Right Asset Live Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left 8 Cols: Architectural Isometric Digital Floor Plan */}
        <div className="lg:col-span-8 flex flex-col gap-3">
          {/* Blueprint Card */}
          <div className="p-4 rounded-3xl bg-[#041a10] border border-emerald-500/30 shadow-2xl relative overflow-hidden flex flex-col justify-between">
            {/* Top Blueprint Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-emerald-500/20 mb-3">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-bold text-white">
                  المخطط الإنشائي للأصول والممرات — {currentFloorObj.name}
                </span>
                <span className="text-xs text-emerald-400/80 bg-[#02120a] px-2.5 py-0.5 rounded-lg border border-emerald-500/30">
                  {floorAssets.length} أصول متصلة بالشبكة
                </span>
              </div>

              {/* Status Tags & View Switcher */}
              <div className="flex items-center gap-2 text-xs">
                <span className="px-2.5 py-1 rounded-xl bg-[#02120a] border border-emerald-500/30 text-emerald-300 font-medium">
                  شاغلو الدور: <strong className="text-amber-300 font-bold">{currentFloorObj.occupancyCount}</strong> شخص
                </span>
                <span className="px-2.5 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-medium">
                  المخارج: <strong className="text-emerald-400 font-bold">سالكة 100%</strong>
                </span>
              </div>
            </div>

            {/* Interactive SVG Digital Twin Map Canvas */}
            <div className="relative w-full aspect-[16/10] bg-[#020e07] rounded-2xl border border-emerald-500/30 p-4 flex items-center justify-center overflow-hidden group select-none shadow-inner">
              {/* Architectural Futuristic Grid Background */}
              <div 
                className="absolute inset-0 opacity-25 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(#10b981 1.2px, transparent 1.2px), linear-gradient(to right, #10b98115 1px, transparent 1px), linear-gradient(to bottom, #10b98115 1px, transparent 1px)`,
                  backgroundSize: '24px 24px, 48px 48px, 48px 48px',
                }}
              />

              {/* Live Environmental HUD Overlay */}
              <div className="absolute top-3 right-3 z-10 flex items-center gap-2 bg-[#02140c]/90 backdrop-blur-md p-1.5 rounded-xl border border-emerald-500/30 text-[10px] text-emerald-300">
                <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#041d11]">
                  <Thermometer className="w-3 h-3 text-amber-400" />
                  <span>22.4°C</span>
                </span>
                <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#041d11]">
                  <Wind className="w-3 h-3 text-emerald-400" />
                  <span>نقاء الهواء: 99%</span>
                </span>
                <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#041d11]">
                  <Video className="w-3 h-3 text-blue-400" />
                  <span>CCTV: مباشر</span>
                </span>
              </div>

              {/* Emergency Simulation Aura */}
              {simulationState.isActive && simulationState.affectedFloor === selectedFloor && (
                <div className="absolute inset-0 bg-rose-600/20 border-2 border-rose-500/70 rounded-2xl animate-pulse pointer-events-none z-10 flex items-center justify-center">
                  <div className="px-4 py-2.5 rounded-2xl bg-rose-950/95 border border-rose-500 text-rose-200 text-xs font-black shadow-2xl flex items-center gap-2 animate-bounce">
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                    <span>منطقة طوارئ نشطة — قطاع ب (إخلاء فوري نحو DOOR-00382)</span>
                  </div>
                </div>
              )}

              {/* Architectural Zones Layout (SVG) */}
              <svg className="w-full h-full" viewBox="0 0 1000 600" fill="none">
                {/* Exterior Wall */}
                <rect x="50" y="40" width="900" height="520" rx="18" stroke="#1d4e38" strokeWidth="4" fill="#041a10" />
                
                {/* Zone 1: West Meeting Wing */}
                <rect 
                  x="70" y="60" width="260" height="230" rx="10" 
                  stroke="#16432f" strokeWidth="2" fill="#062417" 
                  className="transition-colors hover:fill-[#08301f] cursor-pointer"
                  onClick={() => setSelectedZone('الجناح الغربي (Zone A)')}
                />
                <text x="85" y="90" fill="#34d399" fontSize="14" fontWeight="bold" fontFamily="Tajawal">قاعات الاجتماعات الغربية A1-A4</text>
                
                {/* Zone 2: North Staircase & Emergency Exit DOOR-00382 */}
                <rect 
                  x="70" y="310" width="260" height="230" rx="10" 
                  stroke="#16432f" strokeWidth="2" fill="#062417"
                  className="transition-colors hover:fill-[#08301f] cursor-pointer"
                  onClick={() => setSelectedZone('مسار الطوارئ الشمالي')}
                />
                <text x="85" y="340" fill="#34d399" fontSize="14" fontWeight="bold" fontFamily="Tajawal">مسار الطوارئ والدرج الشمالي</text>

                {/* Zone 3: Central Elevator Core & Corridor */}
                <rect 
                  x="350" y="60" width="300" height="480" rx="10" 
                  stroke="#235c42" strokeWidth="2" fill="#03160e" 
                  onClick={() => setSelectedZone('ردهة المصاعد والممر المركزي')}
                />
                <text x="365" y="90" fill="#f0b942" fontSize="14" fontWeight="bold" fontFamily="Tajawal">ردهة المصاعد المركزية والممر 302</text>
                
                {/* Elevator Shafts */}
                <rect x="420" y="360" width="160" height="150" rx="8" stroke="#f0b942" strokeWidth="2" strokeDasharray="5 5" fill="#082b1c" />
                <text x="440" y="440" fill="#f0b942" fontSize="12" fontWeight="bold" fontFamily="Tajawal">مصاعد الركاب (ELEV-02)</text>

                {/* Zone 4: East Operations & Control Hub */}
                <rect 
                  x="670" y="60" width="260" height="230" rx="10" 
                  stroke="#16432f" strokeWidth="2" fill="#062417" 
                  className="transition-colors hover:fill-[#08301f] cursor-pointer"
                  onClick={() => setSelectedZone('غرفة التحكم والعمليات 3B')}
                />
                <text x="685" y="90" fill="#34d399" fontSize="14" fontWeight="bold" fontFamily="Tajawal">غرفة التحكم والعمليات 3B</text>

                {/* Zone 5: East Offices */}
                <rect 
                  x="670" y="310" width="260" height="230" rx="10" 
                  stroke="#16432f" strokeWidth="2" fill="#062417" 
                  className="transition-colors hover:fill-[#08301f] cursor-pointer"
                  onClick={() => setSelectedZone('المكاتب الإدارية ومرفق الخدمات')}
                />
                <text x="685" y="340" fill="#34d399" fontSize="14" fontWeight="bold" fontFamily="Tajawal">المكاتب الإدارية ومرفق الخدمات</text>

                {/* Evacuation Green Arrow Path */}
                <path 
                  d="M 500 200 L 250 200 L 250 310" 
                  stroke="#10b981" 
                  strokeWidth="4" 
                  strokeDasharray="8 6" 
                  className="animate-pulse" 
                />
                <circle cx="250" cy="310" r="8" fill="#10b981" />
              </svg>

              {/* Interactive Dynamic Asset Pins on Map */}
              {floorAssets.map(asset => {
                const Icon = getAssetIcon(asset.type);
                const isSelected = selectedAsset?.code === asset.code;
                const isSpecialAlarm = simulationState.isActive && asset.code === simulationState.affectedAssetCode;

                return (
                  <button
                    key={asset.id}
                    onClick={() => setSelectedAsset(asset)}
                    style={{ left: `${asset.x}%`, top: `${asset.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-2xl flex items-center gap-1.5 transition-all duration-300 cursor-pointer z-20 group ${
                      isSelected
                        ? 'bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-[#061810] ring-4 ring-amber-400/50 scale-110 shadow-[0_0_25px_rgba(245,158,11,0.9)] font-black'
                        : isSpecialAlarm
                        ? 'bg-rose-600 text-white ring-4 ring-rose-500 animate-ping shadow-[0_0_30px_rgba(225,29,72,0.9)]'
                        : asset.status === 'تحت الصيانة'
                        ? 'bg-orange-500 text-[#061810] shadow-md hover:scale-105'
                        : 'bg-[#06291a] text-emerald-300 border border-emerald-400/50 hover:bg-emerald-600 hover:text-white hover:scale-105 shadow-md'
                    }`}
                    title={`${asset.name} (${asset.code})`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="text-[10px] font-mono font-bold leading-none hidden sm:inline">
                      {asset.code}
                    </span>

                    {/* Status Pill Badge */}
                    <span className={`w-2 h-2 rounded-full shrink-0 ${
                      asset.status === 'جاهز' ? 'bg-emerald-400' :
                      asset.status === 'تحت الصيانة' ? 'bg-amber-300' :
                      asset.status === 'تنبيه' ? 'bg-yellow-400' : 'bg-rose-500'
                    }`} />
                  </button>
                );
              })}
            </div>

            {/* Quick Interactive Legend */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-emerald-500/20 text-xs text-emerald-400/80">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm" />
                  <span>جاهز وسليم (SASO)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-amber-400 shadow-sm" />
                  <span>تحت الصيانة الميدانية</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500 shadow-sm" />
                  <span>طوارئ / تنبيه نشط</span>
                </span>
              </div>

              <span className="text-amber-400 text-[11px] font-bold">
                💡 انقر على أي أصل على المخطط لفتح بطاقة الفحص وإنشاء البلاغ
              </span>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Active Asset Inspector & Direct Incident Trigger */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          {selectedAsset ? (
            <div className="p-4 rounded-3xl bg-[#041a10] border border-amber-400/60 shadow-2xl flex flex-col justify-between h-full space-y-4 relative overflow-hidden">
              {/* Gold Top Light */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

              {/* Asset Header */}
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-emerald-500/20">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold border border-amber-400/40">
                      {React.createElement(getAssetIcon(selectedAsset.type), { className: 'w-5 h-5' })}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-amber-400 font-bold">
                        {selectedAsset.code}
                      </span>
                      <h3 className="text-sm font-black text-white leading-tight">
                        {selectedAsset.name}
                      </h3>
                    </div>
                  </div>

                  <span className={`text-[10px] font-black px-2.5 py-1 rounded-full ${
                    selectedAsset.status === 'جاهز' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/50' :
                    selectedAsset.status === 'تحت الصيانة' ? 'bg-amber-500/20 text-amber-300 border border-amber-400/50' :
                    'bg-rose-500/20 text-rose-300 border border-rose-500/50'
                  }`}>
                    {selectedAsset.status}
                  </span>
                </div>

                {/* Asset Picture & Live Specs */}
                {selectedAsset.imageUrl && (
                  <div className="my-3 rounded-2xl overflow-hidden h-32 border border-emerald-500/30 relative">
                    <img 
                      src={selectedAsset.imageUrl} 
                      alt={selectedAsset.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded-lg bg-[#02120a]/90 text-[10px] text-amber-300 border border-amber-400/30 font-bold">
                      {selectedAsset.zone}
                    </div>
                  </div>
                )}

                {/* Detailed Specifications Table */}
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-[#02120a] border border-emerald-500/20 flex items-center justify-between">
                    <span className="text-emerald-400/70">الرقم التسلسلي (SN):</span>
                    <span className="font-mono text-white font-bold">{selectedAsset.serialNumber}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#02120a] border border-emerald-500/20 flex items-center justify-between">
                    <span className="text-emerald-400/70">الجهة المصنعة:</span>
                    <span className="text-emerald-200 font-medium text-left">{selectedAsset.manufacturer}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#02120a] border border-emerald-500/20 flex items-center justify-between">
                    <span className="text-emerald-400/70">قراءة الضغط / الحالة:</span>
                    <span className="text-amber-300 font-bold">{selectedAsset.pressure || 'طبيعي'}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#02120a] border border-emerald-500/20 flex items-center justify-between">
                    <span className="text-emerald-400/70">تاريخ آخر فحص:</span>
                    <span className="text-emerald-200">{selectedAsset.lastInspection}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#02120a] border border-emerald-500/20 flex items-center justify-between">
                    <span className="text-emerald-400/70">الصيانة الدورية القادمة:</span>
                    <span className="text-amber-400 font-bold">{selectedAsset.nextMaintenance}</span>
                  </div>
                </div>

                {/* Notes box */}
                {selectedAsset.notes && (
                  <div className="mt-2.5 p-2.5 rounded-xl bg-[#02140c] border border-amber-400/20 text-[11px] text-emerald-300">
                    <span className="font-bold text-amber-400">ملاحظات الفحص: </span>
                    {selectedAsset.notes}
                  </div>
                )}
              </div>

              {/* Action Buttons: Create Incident & QR Code View */}
              <div className="space-y-2 pt-2 border-t border-emerald-500/20">
                <button
                  onClick={() => handleCreateReport(selectedAsset)}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600 hover:from-rose-500 hover:to-rose-400 text-white text-xs font-black flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(225,29,72,0.5)] transition-all cursor-pointer hover:scale-[1.02]"
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>إنشاء بلاغ صيانة عاجل للأصل ({selectedAsset.code})</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onNavigate('asset-details-qr')}
                    className="py-2 px-3 rounded-xl bg-[#02140c] hover:bg-[#072418] border border-emerald-500/30 text-xs font-bold text-emerald-300 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>سجل الأصل QR</span>
                  </button>
                  <button
                    onClick={() => onNavigate('technician-tasks')}
                    className="py-2 px-3 rounded-xl bg-[#02140c] hover:bg-[#072418] border border-amber-400/40 text-xs font-bold text-amber-400 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>مهام الفني</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-3xl bg-[#041a10] border border-emerald-500/25 flex flex-col items-center justify-center text-center h-full shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-[#02120a] border border-emerald-500/30 flex items-center justify-center mb-3">
                <Info className="w-6 h-6 text-amber-400" />
              </div>
              <p className="text-xs text-white font-black">حدد أي أصل من المخطط</p>
              <p className="text-[11px] text-emerald-400/70 mt-1 max-w-xs leading-relaxed">
                انقر على طفاية الحريق FE-00892 أو باب الطوارئ DOOR-00382 لمعاينة المواصفات وتدفق البلاغ المباشر.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
