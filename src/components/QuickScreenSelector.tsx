import React, { useState } from 'react';
import { 
  Shield, 
  Lock, 
  BarChart3, 
  FilePlus, 
  Laptop, 
  AlertOctagon, 
  CheckSquare, 
  Map, 
  ClipboardList, 
  UserCheck, 
  QrCode,
  Layers,
  ChevronUp,
  ChevronDown,
  Sparkles,
  Smartphone,
  Monitor,
  Maximize2,
  Minimize2,
  Flame,
  Bot,
  Sliders,
  Share2,
  Copy,
  Check
} from 'lucide-react';
import { ScreenId } from '../types';
import { useHosn } from '../context/HosnContext';
import { LiveAdminControlModal } from './common/LiveAdminControlModal';

export type ViewMode = 'web' | 'mobile-framed' | 'mobile-fullscreen';

interface QuickScreenSelectorProps {
  currentScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
  viewMode: ViewMode;
  onSelectViewMode: (mode: ViewMode) => void;
  isMobileView?: boolean;
}

export const screenItems: { id: ScreenId; title: string; imageRef: string; icon: any; category: string; isStar?: boolean }[] = [
  { id: 'digital-twin', title: 'التوأم الرقمي (نجم العرض)', imageRef: 'Digital Twin 3D', icon: Layers, category: 'الرئيسية', isStar: true },
  { id: 'simulation-center', title: 'محاكي أحداث الطوارئ', imageRef: 'Event Engine', icon: Flame, category: 'الطوارئ', isStar: true },
  { id: 'ai-intelligence', title: 'HOSN Intelligence (الذكاء)', imageRef: 'AI Analytics', icon: Sparkles, category: 'الذكاء', isStar: true },
  { id: 'manager-dashboard', title: 'لوحة القيادة للمديرين', imageRef: 'Image 1.jpeg', icon: BarChart3, category: 'الإدارة' },
  { id: 'technician-tasks', title: 'مهام الفني الميداني وإغلاق البلاغ', imageRef: 'Image 5.jpeg', icon: CheckSquare, category: 'الصيانة', isStar: true },
  { id: 'disability-support', title: 'دعم ذوي الإعاقة وطوارئ SOS', imageRef: 'Image 4.jpeg', icon: AlertOctagon, category: 'الطوارئ' },
  { id: 'smart-map', title: 'الخريطة الذكية - المخطط الداخلي', imageRef: 'Image 7.jpeg', icon: Map, category: 'المراقبة' },
  { id: 'asset-details-qr', title: 'تفاصيل الأصل وفحص QR', imageRef: 'Image 10.jpeg', icon: QrCode, category: 'الأصول' },
  { id: 'create-report', title: 'إنشاء تقرير بلاغ جديد', imageRef: 'Image 2.jpeg', icon: FilePlus, category: 'البلاغات' },
  { id: 'inspection-tour', title: 'جولة التفتيش وقائمة التحقق', imageRef: 'Image 8.jpeg', icon: ClipboardList, category: 'التفتيش' },
  { id: 'device-entry', title: 'تسجيل دخول الأجهزة والمعدات', imageRef: 'Image 3.jpeg', icon: Laptop, category: 'الأمن' },
  { id: 'user-profile', title: 'الملف الشخصي والصلاحيات', imageRef: 'Image 9.jpeg', icon: UserCheck, category: 'الحساب' },
];

export const QuickScreenSelector: React.FC<QuickScreenSelectorProps> = ({
  currentScreen,
  onSelectScreen,
  viewMode,
  onSelectViewMode,
  isMobileView = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const { currentStaff, switchStaff, simulationState } = useHosn();

  const activeItem = screenItems.find(s => s.id === currentScreen) || screenItems[0];

  const handleCopyShareLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  // Mobile Top Bar (Clean, compact, native app look)
  if (isMobileView) {
    return (
      <div className="w-full bg-[#051c12]/95 backdrop-blur-xl border-b border-emerald-500/25 sticky top-0 z-50 px-3 py-2 select-none font-['Tajawal',sans-serif]">
        <div className="flex items-center justify-between gap-2">
          {/* Right: App Brand & Screen Switcher Trigger */}
          <div 
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 cursor-pointer active:scale-95 transition-transform"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-[#061810] font-black font-['Alexandria'] text-xs shadow-md">
              H
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black text-white">{activeItem.title}</span>
                <ChevronDown className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <p className="text-[10px] text-emerald-400/80 leading-none">
                {currentStaff.name} ({currentStaff.roleType === 'manager' ? 'مديرة' : 'فني'})
              </p>
            </div>
          </div>

          {/* Left: Quick Actions for Mobile */}
          <div className="flex items-center gap-1.5">
            {/* Live Demo Controller */}
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-[#061810] text-[11px] font-black flex items-center gap-1 shadow-md active:scale-95 transition-all"
              title="لوحة التحكم بالبيانات والإنذار بالخفاء"
            >
              <Sliders className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Demo</span>
              <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-ping" />
            </button>

            {/* Quick Role Switcher Avatar */}
            <button
              onClick={() => switchStaff(currentStaff.id === 'staff-01' ? 'staff-02' : 'staff-01')}
              className="px-2 py-1 rounded-xl bg-[#082a1c] border border-emerald-500/40 text-emerald-300 text-[11px] font-bold flex items-center gap-1 active:scale-95 transition-all"
              title="تبديل الدور بين المديرة والفني"
            >
              <span>{currentStaff.id === 'staff-01' ? '👤 سارة' : '🔧 تركي'}</span>
            </button>

            {/* Share */}
            <button
              onClick={() => setShowShareModal(true)}
              className="p-1.5 rounded-xl bg-[#082a1c] border border-emerald-500/40 text-amber-400 active:scale-95 transition-all"
              title="مشاركة الرابط"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Mobile Fullscreen Screen Drawer */}
        {isOpen && (
          <div className="mt-2.5 p-3 rounded-2xl bg-[#041a10] border border-amber-400/50 shadow-2xl max-h-[70vh] overflow-y-auto space-y-2 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-emerald-500/20 text-xs font-bold text-emerald-200">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>شاشات المنصة ({screenItems.length}):</span>
              </span>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-xs text-amber-400 font-bold px-2 py-0.5 rounded bg-white/5"
              >
                إغلاق ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {screenItems.map((item) => {
                const Icon = item.icon;
                const isCurrent = currentScreen === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectScreen(item.id);
                      setIsOpen(false);
                    }}
                    className={`p-2.5 rounded-xl text-right flex items-center gap-2 transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-[#061810] font-bold shadow-md'
                        : item.isStar
                        ? 'bg-[#082a1c] border border-amber-400/50 text-emerald-100'
                        : 'bg-[#02140c] border border-emerald-500/20 text-emerald-200'
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg shrink-0 ${isCurrent ? 'bg-[#061810]/20' : 'bg-[#041a10]'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold truncate">{item.title}</p>
                      <p className="text-[9px] opacity-75">{item.category}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Share Modal */}
        {showShareModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="w-full max-w-sm rounded-3xl bg-[#041a10] border border-amber-400 p-5 text-emerald-50 shadow-2xl space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-emerald-500/30">
                <h3 className="text-sm font-black text-white flex items-center gap-1.5">
                  <Share2 className="w-4 h-4 text-amber-400" />
                  <span>مشاركة رابط منصة حُصن</span>
                </h3>
                <button onClick={() => setShowShareModal(false)} className="text-emerald-400 text-sm">✕</button>
              </div>
              <p className="text-xs text-emerald-300">
                شارك الرابط لفتح المنصة مباشرة على أي جهاز وجوال:
              </p>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-[#02120a] border border-emerald-500/40">
                <input
                  type="text"
                  readOnly
                  value={window.location.href}
                  className="bg-transparent flex-1 text-xs text-amber-300 font-mono focus:outline-none px-1"
                />
                <button
                  onClick={handleCopyShareLink}
                  className="px-3 py-1.5 rounded-lg bg-amber-400 text-[#061810] text-xs font-black shrink-0"
                >
                  {copiedLink ? 'تم النسخ!' : 'نسخ'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Live Admin Controller Modal */}
        <LiveAdminControlModal
          isOpen={isAdminModalOpen}
          onClose={() => setIsAdminModalOpen(false)}
        />
      </div>
    );
  }

  // Desktop Top Bar (Full Experience)

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-2 select-none font-['Tajawal',sans-serif]">
      {/* Top Bar with Screen Switcher & View Mode Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-[#041a10]/95 border border-emerald-500/30 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        {/* Subtle Gold Shimmer accent */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />

        {/* Right side: Brand & Current Active Screen */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 flex items-center justify-center text-[#061810] font-black font-['Alexandria'] shadow-[0_2px_12px_rgba(229,176,68,0.4)]">
            H
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-amber-400 font-['Alexandria'] tracking-wider">حُصن | HOSN</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-bold">
                {currentStaff.name} ({currentStaff.roleType === 'manager' ? 'مدير' : 'فني'})
              </span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
              <span>{activeItem.title}</span>
              {activeItem.isStar && <span className="text-amber-400 text-xs animate-pulse">⭐</span>}
            </p>
          </div>
        </div>

        {/* Center / Left Controls: View Mode Switchers & Role Toggle & Magic Demo Control */}
        <div className="flex flex-wrap items-center gap-2">
          {/* 🔥 🔴 THE SECRET LIVE DEMO CONTROLLER BUTTON */}
          <button
            onClick={() => setIsAdminModalOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-400 text-[#061810] text-xs font-black flex items-center gap-1.5 shadow-[0_0_20px_rgba(229,176,68,0.5)] transition-all cursor-pointer hover:scale-105 border border-amber-300"
            title="لوحة التحكم بالبيانات والإنذار بالخفاء"
          >
            <Sliders className="w-4 h-4 text-[#061810] stroke-[2.5]" />
            <span>لوحة التحكم المباشرة (Demo Controls)</span>
            <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
          </button>

          {/* Share Button */}
          <button
            onClick={() => setShowShareModal(true)}
            className="px-3 py-1.5 rounded-xl bg-[#02120a] hover:bg-[#072418] border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
            title="مشاركة رابط المنصة"
          >
            <Share2 className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">مشاركة الرابط</span>
          </button>

          {/* Quick Role Switcher */}
          <div className="hidden sm:flex items-center bg-[#02120a] rounded-xl p-1 border border-emerald-500/30 shadow-inner">
            <button
              onClick={() => switchStaff('staff-01')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currentStaff.id === 'staff-01' ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-[#061810] shadow-sm font-black' : 'text-emerald-300 hover:text-white'
              }`}
              title="التبديل لدور مديرة العمليات"
            >
              م. سارة (إدارة)
            </button>
            <button
              onClick={() => switchStaff('staff-02')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currentStaff.id === 'staff-02' ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-[#061810] shadow-sm font-black' : 'text-emerald-300 hover:text-white'
              }`}
              title="التبديل لدور الفني الميداني"
            >
              م. تركي (فني)
            </button>
          </div>

          {/* Mode 1: Web Portal */}
          <button
            onClick={() => onSelectViewMode('web')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'web'
                ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-black shadow-md border border-emerald-400/40'
                : 'bg-[#02120a] text-emerald-200 border border-emerald-500/30 hover:text-white hover:border-amber-400/50'
            }`}
          >
            <Monitor className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">بوابة الويب</span>
          </button>

          {/* Mode 2: Mobile Framed */}
          <button
            onClick={() => onSelectViewMode('mobile-framed')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'mobile-framed'
                ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-black shadow-md border border-emerald-400/40'
                : 'bg-[#02120a] text-emerald-200 border border-emerald-500/30 hover:text-white hover:border-amber-400/50'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">محاكي الجوال</span>
          </button>

          {/* Quick Drawer Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-900 hover:from-emerald-700 hover:to-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm border border-emerald-400/40 transition-all cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5 text-amber-300" />
            <span>الشاشات ({screenItems.length})</span>
            {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Expandable Screen Grid Navigator */}
      {isOpen && (
        <div className="mt-2.5 p-4 rounded-2xl bg-[#041a10]/98 border border-amber-400/50 backdrop-blur-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-emerald-500/20 mb-3">
            <h3 className="text-xs font-bold text-emerald-200 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>انتقل مباشرة إلى أي شاشة في المنصة:</span>
            </h3>
            <span className="text-[11px] text-amber-400 font-bold bg-[#02120a] px-2.5 py-1 rounded-lg border border-amber-400/30">
              ⭐ الشاشات المجهزة للعرض والتقييم المباشر
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
            {screenItems.map((item, index) => {
              const Icon = item.icon;
              const isCurrent = currentScreen === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectScreen(item.id);
                    setIsOpen(false);
                  }}
                  className={`p-3 rounded-xl text-right flex flex-col justify-between transition-all cursor-pointer group relative overflow-hidden ${
                    isCurrent
                      ? 'bg-gradient-to-br from-amber-400 to-amber-500 text-[#061810] shadow-[0_0_18px_rgba(229,176,68,0.55)] font-bold scale-[1.02]'
                      : item.isStar
                      ? 'bg-[#082a1c] border border-amber-400/60 text-emerald-100 hover:border-amber-400 hover:bg-[#0c3926]'
                      : 'bg-[#03180f] border border-emerald-500/25 text-emerald-100 hover:border-amber-400/50 hover:bg-[#062417]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                      isCurrent ? 'bg-[#061810] text-amber-400 font-black' : 'bg-[#02120a] text-emerald-400'
                    }`}>
                      0{index + 1}
                    </span>
                    <Icon className={`w-4 h-4 ${isCurrent ? 'text-[#061810]' : 'text-amber-400'}`} />
                  </div>

                  <span className="text-xs leading-snug line-clamp-2">
                    {item.title}
                  </span>

                  <span className={`text-[9px] mt-1.5 opacity-75 font-mono ${isCurrent ? 'text-[#061810] font-bold' : 'text-emerald-300'}`}>
                    {item.imageRef}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl bg-[#041a10] border-2 border-amber-400 p-6 text-emerald-50 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-500/30">
              <div className="flex items-center gap-2">
                <Share2 className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-black text-white">مشاركة رابط منصة حُصن المباشر</h3>
              </div>
              <button 
                onClick={() => setShowShareModal(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-emerald-300"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-emerald-200 leading-relaxed">
              يمكن لأي شخص فتح هذا الرابط وتجربة بوابة الويب أو محاكي الجوال مباشرة دون الحاجة لتثبيت أي برامج أو تطبيق خارجي:
            </p>

            <div className="flex items-center gap-2 p-2 rounded-2xl bg-[#02120a] border border-emerald-500/40">
              <input
                type="text"
                readOnly
                value={window.location.href}
                className="bg-transparent flex-1 text-xs text-amber-300 font-mono focus:outline-none px-2 select-all"
              />
              <button
                onClick={handleCopyShareLink}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-[#061810] text-xs font-black flex items-center gap-1.5 cursor-pointer shadow-md transition-all shrink-0"
              >
                {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedLink ? 'تم النسخ!' : 'نسخ الرابط'}</span>
              </button>
            </div>

            <div className="p-3 rounded-2xl bg-[#02140c] border border-amber-400/20 text-[11px] text-emerald-300 space-y-1">
              <p className="font-bold text-amber-300">💡 نصيحة للعرض التقديمي (Live Demo):</p>
              <p>
                يمكنك فتح هذا الرابط على جهاز العرض الرئيسي (Projector)، وفتح الرابط أيضاً من جوالك والتحكم بـ <strong>لوحة التحكم المباشرة</strong> لإطلاق الإنذار أو إرسال بلاغ وتشاهد الحضور ينبهرون بالتحديث اللحظي عبر الشاشات!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Live Admin Controller Modal */}
      <LiveAdminControlModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />
    </div>
  );
};

