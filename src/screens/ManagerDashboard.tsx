import React, { useState } from 'react';
import { HosnLogo } from '../components/common/HosnLogo';
import { 
  CheckCircle2, 
  Users, 
  Bell, 
  FileText, 
  ChevronLeft, 
  ChevronRight, 
  User, 
  TrendingUp, 
  ShieldAlert,
  Activity,
  ArrowUpRight,
  Layers,
  Sparkles,
  Flame,
  Wrench,
  Building2,
  Check,
  Database,
  Workflow,
  Radio,
  Server
} from 'lucide-react';
import { ScreenId } from '../types';
import { useHosn } from '../context/HosnContext';

interface ManagerDashboardProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenNotifications?: () => void;
}

export const ManagerDashboard: React.FC<ManagerDashboardProps> = ({ 
  onNavigate,
  onOpenNotifications
}) => {
  const { 
    currentStaff, 
    tasks, 
    reports, 
    simulationState, 
    assets,
    buildings,
    floors,
    zones,
    events,
    visitors,
    contractors,
    setSelectedFloor,
    isFirebaseConnected,
    isSeedingDatabase
  } = useHosn();

  const [selectedPoint, setSelectedPoint] = useState<number | null>(4); // Default to 'اليوم'

  const openIncidentsCount = reports.filter(r => r.status !== 'resolved').length;
  const criticalCount = reports.filter(r => r.priority === 'خطر فوري' || r.priority === 'عاجل').length + (simulationState.isActive ? 1 : 0);

  const timeline = [
    { label: 'الماضي', cam: '99.8%', elev: '98.5%', camVal: 99.8, elevVal: 98.5 },
    { label: 'الأسبوع', cam: '99.8%', elev: '98.0%', camVal: 99.8, elevVal: 98.0 },
    { label: 'السابق', cam: '99.8%', elev: '98.5%', camVal: 99.8, elevVal: 98.5 },
    { label: 'أمس', cam: '99.8%', elev: '98.5%', camVal: 99.8, elevVal: 98.5 },
    { label: 'اليوم', cam: '99.8%', elev: '98.5%', camVal: 99.8, elevVal: 98.5 },
  ];

  return (
    <div className="flex-1 flex flex-col justify-between px-4 py-3 bg-[#02120a] text-emerald-50 overflow-y-auto font-['Tajawal',sans-serif]">
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-emerald-500/20">
        {/* Right side: Brand & Saudi Manager Profile */}
        <div className="flex items-center gap-3">
          <HosnLogo size="sm" showText={false} />
          <div className="flex flex-col">
            <span className="text-[10px] text-amber-400 font-bold tracking-wider font-['Alexandria']">HOSN | حُصن</span>
            <h1 className="text-base sm:text-lg font-black text-white leading-tight">
              لوحة قيادة العمليات — {currentStaff.name}
            </h1>
          </div>
        </div>

        {/* Left side: Avatar & Emergency Bell & Database Status */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#041a10] border border-emerald-500/30 text-[11px] text-emerald-300 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Firestore: <strong className="text-amber-300">10 مجموعات سحابية</strong></span>
          </div>

          <button
            onClick={() => onNavigate('simulation-center')}
            className={`relative p-2 rounded-xl bg-[#041a10] border transition-all cursor-pointer shadow-md ${
              simulationState.isActive 
                ? 'border-rose-500 text-rose-400 animate-pulse ring-2 ring-rose-500/50' 
                : 'border-amber-400/30 text-amber-400 hover:text-amber-300 hover:border-amber-400'
            }`}
            title="محاكاة الطوارئ"
          >
            <Bell className="w-5 h-5" />
            {criticalCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center animate-pulse shadow-md">
                {criticalCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onNavigate('user-profile')}
            className="w-10 h-10 rounded-xl border-2 border-amber-400 overflow-hidden bg-emerald-900 flex items-center justify-center cursor-pointer hover:scale-105 transition-all shadow-[0_0_15px_rgba(229,176,68,0.3)]"
            title={currentStaff.name}
          >
            <img
              src={currentStaff.avatarUrl}
              alt={currentStaff.name}
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </div>

      {/* 🚀 The Platform Architecture Pipeline Banner (Database -> State -> Workflow -> Simulation -> Digital Twin -> AI) */}
      <div className="my-3 p-4 rounded-3xl bg-[#041a10] border border-emerald-500/30 shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-emerald-500/20">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-black text-amber-400 font-['Alexandria'] tracking-wide">
              المعمارية الهندسية لمنصة حُصن | HOSN ARCHITECTURE PIPELINE
            </span>
          </div>
          <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono border border-emerald-500/30">
            Firebase Firestore Connected
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 text-center text-[11px]">
          <div className="p-2.5 rounded-2xl bg-[#02120a] border border-emerald-500/20 shadow-inner">
            <span className="text-amber-400 font-black block">1. Database</span>
            <span className="text-emerald-300/80 text-[10px]">10 مجموعات Firestore</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-[#02120a] border border-emerald-500/20 shadow-inner">
            <span className="text-amber-400 font-black block">2. Real State</span>
            <span className="text-emerald-300/80 text-[10px]">مزامنة لحظية onSnapshot</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-[#02120a] border border-emerald-500/20 shadow-inner">
            <span className="text-amber-400 font-black block">3. Workflow</span>
            <span className="text-emerald-300/80 text-[10px]">بلاغ ← فني ← إغلاق</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-[#02120a] border border-emerald-500/20 shadow-inner">
            <span className="text-amber-400 font-black block">4. Event Sim.</span>
            <span className="text-emerald-300/80 text-[10px]">محرك الحريق والإخلاء</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-gradient-to-b from-[#072e1c] to-[#041a10] border border-amber-400/60 shadow-[0_0_15px_rgba(229,176,68,0.25)]">
            <span className="text-amber-300 font-black block">5. Digital Twin ⭐</span>
            <span className="text-amber-200 text-[10px]">المجسم التفاعلي</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-[#02120a] border border-emerald-500/20 shadow-inner">
            <span className="text-amber-400 font-black block">6. AI Layer</span>
            <span className="text-emerald-300/80 text-[10px]">استعلام HOSN الذكي</span>
          </div>
        </div>
      </div>

      {/* Hero Showcase Card: Digital Twin Feature Card (The Star of the Show) */}
      <div 
        onClick={() => {
          setSelectedFloor(3);
          onNavigate('digital-twin');
        }}
        className="my-2 p-5 rounded-3xl bg-gradient-to-r from-[#041d12] via-[#073320] to-[#041d12] border-2 border-amber-400/90 hover:border-amber-300 shadow-[0_4px_30px_rgba(229,176,68,0.25)] transition-all cursor-pointer group relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-96 h-40 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-3 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 flex items-center justify-center text-[#061810] font-black shadow-[0_0_20px_rgba(229,176,68,0.5)] group-hover:scale-110 transition-transform">
              <Layers className="w-6 h-6 text-[#061810]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-amber-400 font-['Alexandria'] tracking-wide">نجم العرض | THE STAR</span>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 font-bold border border-emerald-400/40">
                  مرتبط بـ Firestore مباشرة
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-white group-hover:text-amber-300 transition-colors">
                التوأم الرقمي (Digital Twin) — برج حُصن الذكي
              </h2>
              <p className="text-xs text-emerald-200/90 mt-0.5 font-mono">
                Building-A ➔ Floor-03 ➔ Zone-B ➔ DOOR-00382 / FE-00892
              </p>
            </div>
          </div>

          <button className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 group-hover:from-amber-300 group-hover:to-amber-400 text-[#061810] text-xs font-black flex items-center gap-2 shadow-[0_0_20px_rgba(229,176,68,0.4)] transition-all">
            <span>دخول المجسم الرقمي</span>
            <ArrowUpRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>
      </div>

      {/* 2x2 Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 my-2">
        {/* Card 1: حالة المبنى العام */}
        <div 
          onClick={() => {
            setSelectedFloor(3);
            onNavigate('digital-twin');
          }}
          className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between shadow-sm group ${
            simulationState.isActive 
              ? 'bg-rose-950/80 border-rose-500 animate-pulse' 
              : 'bg-[#092218] border-[#1d4634] hover:border-amber-400/50'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-medium">
            <span className={simulationState.isActive ? 'text-rose-300 font-bold' : 'text-emerald-300/80'}>
              حالة المبنى العام
            </span>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
              simulationState.isActive ? 'bg-rose-500 text-white' : 'bg-amber-400/20 text-amber-300'
            }`}>
              {simulationState.isActive ? <Flame className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
            </div>
          </div>
          <div className="mt-2 text-right">
            <span className={`text-xl sm:text-2xl font-black ${
              simulationState.isActive ? 'text-rose-400' : 'text-white group-hover:text-amber-300'
            }`}>
              {simulationState.isActive ? 'طوارئ نشطة' : 'مستقرة (BLD-MAIN)'}
            </span>
          </div>
        </div>

        {/* Card 2: الإشغال */}
        <div 
          onClick={() => {
            setSelectedFloor(3);
            onNavigate('digital-twin');
          }}
          className="p-3.5 rounded-2xl bg-[#092218] border border-[#1d4634] hover:border-amber-400/50 transition-all cursor-pointer flex flex-col justify-between shadow-sm group"
        >
          <div className="flex items-center justify-between text-emerald-300/80 text-xs font-medium">
            <span>الإشغال الكلي والزوار</span>
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
              <Users className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 text-right">
            <span className="text-xl sm:text-2xl font-black text-amber-300 group-hover:text-white transition-colors">
              1,283 <span className="text-xs font-normal text-emerald-200/70">شخص ({visitors.length} زائر)</span>
            </span>
          </div>
        </div>

        {/* Card 3: تنبيهات حرجة */}
        <div 
          onClick={() => onNavigate('simulation-center')}
          className="p-3.5 rounded-2xl bg-[#092218] border border-rose-900/40 hover:border-rose-500/60 transition-all cursor-pointer flex flex-col justify-between shadow-sm group relative overflow-hidden"
        >
          <div className="flex items-center justify-between text-rose-300/80 text-xs font-medium">
            <span>تنبيهات حرجة</span>
            <div className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center animate-bounce">
              <Bell className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 text-right">
            <span className="text-2xl sm:text-3xl font-black text-rose-500 group-hover:text-rose-400 transition-colors">
              {criticalCount}
            </span>
          </div>
        </div>

        {/* Card 4: تقارير مفتوحة */}
        <div 
          onClick={() => onNavigate('technician-tasks')}
          className="p-3.5 rounded-2xl bg-[#092218] border border-[#1d4634] hover:border-amber-400/50 transition-all cursor-pointer flex flex-col justify-between shadow-sm group"
        >
          <div className="flex items-center justify-between text-emerald-300/80 text-xs font-medium">
            <span>أوامر العمل (WorkOrders)</span>
            <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Wrench className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 text-right">
            <span className="text-2xl sm:text-3xl font-black text-amber-400 group-hover:text-white transition-colors">
              {openIncidentsCount} <span className="text-xs text-emerald-400 font-normal">من أصل {tasks.length}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Action Quick Launchers Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-2">
        <button
          onClick={() => onNavigate('simulation-center')}
          className="p-3 rounded-2xl bg-gradient-to-r from-rose-950/60 to-[#0c1f17] border border-rose-600/40 hover:border-rose-500 text-right flex items-center gap-3 transition-all cursor-pointer shadow-md"
        >
          <div className="w-9 h-9 rounded-xl bg-rose-600/30 text-rose-400 flex items-center justify-center shrink-0">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-rose-300 block">محاكي أحداث الطوارئ</span>
            <span className="text-[10px] text-emerald-400/70">تشغيل سيناريو الإخلاء والحريق</span>
          </div>
        </button>

        <button
          onClick={() => onNavigate('ai-intelligence')}
          className="p-3 rounded-2xl bg-gradient-to-r from-[#092218] to-[#0d2e20] border border-amber-400/40 hover:border-amber-400 text-right flex items-center gap-3 transition-all cursor-pointer shadow-md"
        >
          <div className="w-9 h-9 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-amber-300 block">HOSN Intelligence</span>
            <span className="text-[10px] text-emerald-400/70">استعلام الأصول والتنبؤ بالأعطال</span>
          </div>
        </button>

        <button
          onClick={() => onNavigate('technician-tasks')}
          className="p-3 rounded-2xl bg-gradient-to-r from-[#092218] to-[#0d2e20] border border-[#1d4634] hover:border-emerald-400 text-right flex items-center gap-3 transition-all cursor-pointer shadow-md"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-emerald-300 block">مهام الفني الميداني</span>
            <span className="text-[10px] text-emerald-400/70">مباشرة وإغلاق البلاغات الحية</span>
          </div>
        </button>
      </div>

      {/* Chart: جاهزية الأنظمة */}
      <div className="p-4 rounded-2xl bg-[#092218] border border-[#1d4634] my-2 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs sm:text-sm font-bold text-white">
              جاهزية الأنظمة والأصول ({assets.length} أصل مراقب في Firestore)
            </h3>
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <span className="flex items-center gap-1 text-emerald-300">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
              الكاميرات
            </span>
            <span className="flex items-center gap-1 text-amber-300">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
              المصاعد
            </span>
          </div>
        </div>

        {/* Double Line / Area SVG Chart */}
        <div className="relative w-full h-24 sm:h-28">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 400 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="camGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34d399" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#34d399" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="elevGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid lines */}
            <line x1="0" y1="20" x2="400" y2="20" stroke="#133827" strokeDasharray="3 3" strokeWidth="0.8" />
            <line x1="0" y1="50" x2="400" y2="50" stroke="#133827" strokeDasharray="3 3" strokeWidth="0.8" />
            <line x1="0" y1="80" x2="400" y2="80" stroke="#133827" strokeDasharray="3 3" strokeWidth="0.8" />

            {/* Area 1: Cameras */}
            <path d="M 0 35 Q 100 25, 200 30 T 400 20 L 400 100 L 0 100 Z" fill="url(#camGrad)" />
            <path d="M 0 35 Q 100 25, 200 30 T 400 20" fill="none" stroke="#34d399" strokeWidth="2.5" />

            {/* Area 2: Elevators */}
            <path d="M 0 60 Q 100 70, 200 55 T 400 40 L 400 100 L 0 100 Z" fill="url(#elevGrad)" />
            <path d="M 0 60 Q 100 70, 200 55 T 400 40" fill="none" stroke="#fbbf24" strokeWidth="2" strokeDasharray="4 2" />

            {/* Interactive Data Dots */}
            {timeline.map((item, idx) => {
              const xPos = (idx / 4) * 380 + 10;
              const yCam = 35 - idx * 3;
              return (
                <circle 
                  key={idx}
                  cx={xPos} 
                  cy={yCam} 
                  r={selectedPoint === idx ? 5 : 3.5} 
                  fill="#061a12"
                  stroke="#34d399"
                  strokeWidth={2}
                  className="cursor-pointer transition-all"
                  onClick={() => setSelectedPoint(idx)}
                />
              );
            })}
          </svg>
        </div>

        {/* Timeline Bottom Labels */}
        <div className="flex items-center justify-between pt-2 border-t border-[#143628] text-[11px] text-emerald-400/70">
          {timeline.map((t, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedPoint(idx)}
              className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                selectedPoint === idx 
                  ? 'bg-amber-400/20 text-amber-300 font-bold border border-amber-400/40' 
                  : 'hover:text-emerald-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
