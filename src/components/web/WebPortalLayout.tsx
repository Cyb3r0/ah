import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  BarChart3, 
  Map, 
  AlertOctagon, 
  ClipboardList, 
  CheckSquare, 
  FilePlus, 
  Laptop, 
  QrCode, 
  UserCheck, 
  Bell, 
  Search, 
  Smartphone, 
  Monitor, 
  Radio, 
  Flame, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  Activity, 
  Building2, 
  SlidersHorizontal,
  Clock,
  ShieldAlert,
  Layers,
  PhoneCall,
  Lock,
  LogOut,
  Maximize2,
  Wrench
} from 'lucide-react';
import { ScreenId } from '../../types';
import { HosnLogo } from '../common/HosnLogo';
import { useHosn } from '../../context/HosnContext';

interface WebPortalLayoutProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  onSwitchToMobile: () => void;
  children: React.ReactNode;
}

export const WebPortalLayout: React.FC<WebPortalLayoutProps> = ({
  currentScreen,
  onNavigate,
  onSwitchToMobile,
  children,
}) => {
  const { 
    currentStaff, 
    allStaff, 
    switchStaff, 
    tasks, 
    reports, 
    simulationState,
    setSelectedFloor,
    selectAssetByCode
  } = useHosn();

  const [currentTime, setCurrentTime] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const dateStr = now.toLocaleDateString('ar-SA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      setCurrentTime(`${dateStr} | ${timeStr}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const openTasksCount = tasks.filter(t => t.status !== 'completed').length;
  const criticalCount = reports.filter(r => r.priority === 'خطر فوري' || r.priority === 'عاجل').length + (simulationState.isActive ? 1 : 0);

  const navMenuItems: { id: ScreenId; title: string; subtitle: string; icon: any; badge?: string; badgeColor?: string; isHighlight?: boolean }[] = [
    { id: 'digital-twin', title: 'التوأم الرقمي (Digital Twin)', subtitle: 'نجم العرض والمجسم ثلاثي الأبعاد', icon: Layers, badge: 'نجم العرض ⭐', badgeColor: 'bg-amber-500', isHighlight: true },
    { id: 'simulation-center', title: 'محاكي أحداث الطوارئ', subtitle: 'محرك الأحداث والإنذار التفاعلي', icon: Flame, badge: simulationState.isActive ? 'طوارئ نشطة' : 'محاكي حي', badgeColor: simulationState.isActive ? 'bg-rose-600 animate-pulse' : 'bg-rose-700' },
    { id: 'ai-intelligence', title: 'HOSN Intelligence', subtitle: 'الذكاء الاصطناعي وتحليل الأصول', icon: Sparkles, badge: 'AI ذكي', badgeColor: 'bg-amber-600' },
    { id: 'manager-dashboard', title: 'لوحة القيادة والمؤشرات', subtitle: 'نظرة عامة ومعدلات التشغيل', icon: BarChart3 },
    { id: 'technician-tasks', title: 'مهام الصيانة وإغلاق البلاغات', subtitle: 'دورة عمل الفني الميداني', icon: CheckSquare, badge: `${openTasksCount} مهام`, badgeColor: 'bg-blue-600' },
    { id: 'disability-support', title: 'دعم ذوي الإعاقة وطوارئ SOS', subtitle: 'بث المواقع والاستجابة السريعة', icon: AlertOctagon, badge: 'طوارئ', badgeColor: 'bg-rose-600' },
    { id: 'smart-map', title: 'المخطط والخريطة الذكية', subtitle: 'مراقبة الكاميرات والمستشعرات', icon: Map },
    { id: 'asset-details-qr', title: 'سجل الأصول وفحص QR', subtitle: 'معدات الإطفاء والأنظمة', icon: QrCode },
    { id: 'create-report', title: 'إنشاء تقرير وبلاغ جديد', subtitle: 'توثيق الحوادث والملاحظات', icon: FilePlus },
    { id: 'inspection-tour', title: 'جولات التفتيش والسلامة', subtitle: 'قوائم التحقق والتقارير الأسبوعية', icon: ClipboardList },
    { id: 'device-entry', title: 'تسجيل دخول الأجهزة', subtitle: 'تصاريح ومعدات الزوار', icon: Laptop },
    { id: 'user-profile', title: 'الملف الشخصي والصلاحيات', subtitle: 'فريق العمل والكوادر الوطنية', icon: UserCheck },
  ];

  return (
    <div className="min-h-screen bg-[#02120a] text-emerald-50 flex flex-col font-['Tajawal',sans-serif] selection:bg-amber-400 selection:text-black">
      {/* Top Universal Enterprise Header Bar */}
      <header className="sticky top-0 z-50 bg-[#051c12]/95 backdrop-blur-xl border-b border-emerald-500/20 shadow-2xl px-4 lg:px-6 py-2.5 flex items-center justify-between relative">
        {/* Subtle Top Gold Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/80 to-transparent" />

        {/* Right Section: Brand & Sidebar Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-2 rounded-xl bg-[#082619] border border-emerald-500/30 text-emerald-300 hover:text-amber-300 hover:border-amber-400/60 transition-all cursor-pointer shadow-sm hover:scale-105"
            title="تبديل القائمة الجانبية"
          >
            {isSidebarCollapsed ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>

          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onNavigate('digital-twin')}>
            <HosnLogo size="sm" showText={false} />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-base tracking-wide gold-gradient-text font-['Alexandria']">حُصن | HOSN</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 font-bold border border-emerald-400/30">
                  بوابة الويب المركزية
                </span>
              </div>
              <p className="text-[11px] text-emerald-400/70 hidden sm:block">
                المنصة الذكية الموحدة لإدارة الأمن والسلامة وتشغيل المباني
              </p>
            </div>
          </div>
        </div>

        {/* Center Section: Global Search & Live KSA Time */}
        <div className="hidden md:flex items-center gap-4 flex-1 max-w-xl mx-6">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="بحث في الأصول (مثال: FE-00892 / DOOR-00382 / الدور الثالث)..."
              className="w-full py-2 px-4 pr-10 rounded-xl bg-[#03180f] border border-[#1a4a35] text-xs text-white placeholder:text-emerald-500/60 focus:outline-none focus:border-amber-400/80 focus:ring-1 focus:ring-amber-400/30 transition-all shadow-inner"
            />
            <Search className="w-4 h-4 text-amber-400/80 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="shrink-0 text-left text-[11px] text-emerald-300 font-mono hidden lg:flex items-center gap-1.5 bg-[#03180f] px-3 py-1.5 rounded-xl border border-emerald-500/30 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-amber-400 font-bold">الرياض:</span>
            <span>{currentTime || 'توقيت المملكة العربية السعودية'}</span>
          </div>
        </div>

        {/* Left Section: Action Switcher & User Profile */}
        <div className="flex items-center gap-2.5">
          {/* Quick Role Switcher */}
          <div className="hidden sm:flex items-center bg-[#03180f] rounded-xl p-1 border border-[#1a4a35] shadow-inner">
            <button
              onClick={() => switchStaff('staff-01')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currentStaff.id === 'staff-01' ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-[#061810] shadow-sm font-black' : 'text-emerald-300 hover:text-white'
              }`}
            >
              م. سارة (إدارة)
            </button>
            <button
              onClick={() => switchStaff('staff-02')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currentStaff.id === 'staff-02' ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-[#061810] shadow-sm font-black' : 'text-emerald-300 hover:text-white'
              }`}
            >
              م. تركي (فني)
            </button>
          </div>

          {/* Switch to Mobile App Simulator Button */}
          <button
            onClick={onSwitchToMobile}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#082a1c] border border-amber-400/40 hover:border-amber-400 hover:bg-[#0c3a26] text-amber-300 text-xs font-bold transition-all shadow-sm cursor-pointer group"
            title="التبديل إلى واجهة تطبيق الهاتف الميداني"
          >
            <Smartphone className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">محاكي الجوال</span>
          </button>

          {/* Quick SOS Emergency Broadcast Button */}
          <button
            onClick={() => onNavigate('simulation-center')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-white text-xs font-black transition-all cursor-pointer shadow-md ${
              simulationState.isActive 
                ? 'bg-rose-600 animate-pulse shadow-[0_0_20px_rgba(225,29,72,0.8)] border border-rose-400' 
                : 'bg-gradient-to-r from-rose-700 to-rose-800 hover:from-rose-600 hover:to-rose-700 border border-rose-600/50'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span className="hidden sm:inline">محاكي الطوارئ</span>
          </button>

          {/* User Profile Capsule */}
          <div 
            onClick={() => onNavigate('user-profile')}
            className="flex items-center gap-2 p-1.5 pr-2.5 rounded-xl bg-[#041a10] border border-amber-400/30 hover:border-amber-400 transition-colors cursor-pointer group shadow-sm"
          >
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-white leading-none">{currentStaff.name}</p>
              <p className="text-[10px] text-amber-400 leading-none mt-0.5">{currentStaff.role}</p>
            </div>
            <img
              src={currentStaff.avatarUrl}
              alt={currentStaff.name}
              className="w-7 h-7 rounded-full border-2 border-amber-400 object-cover shadow-sm group-hover:scale-105 transition-transform"
            />
          </div>
        </div>
      </header>

      {/* Main Web Portal Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Collapsible Royal Green Sidebar */}
        <aside
          className={`bg-[#041910] border-l border-emerald-500/20 transition-all duration-300 flex flex-col justify-between z-40 select-none ${
            isSidebarCollapsed ? 'w-20' : 'w-72'
          }`}
        >
          {/* Top Menu Links */}
          <div className="p-3 space-y-1.5 overflow-y-auto">
            <div className="px-3 py-1.5 text-[10px] font-black text-amber-400/80 uppercase tracking-wider font-['Alexandria'] flex items-center justify-between">
              {!isSidebarCollapsed && <span>الوحدات والعمليات التشغيلية</span>}
              {!isSidebarCollapsed && <span className="w-2 h-2 rounded-full bg-emerald-400" />}
            </div>

            {navMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full p-2.5 rounded-xl text-right flex items-center justify-between transition-all cursor-pointer group ${
                    isActive
                      ? 'bg-gradient-to-r from-[#0d3b27] to-[#072418] text-amber-300 border border-amber-400/70 shadow-[0_4px_16px_rgba(229,176,68,0.15)] font-bold'
                      : item.isHighlight
                      ? 'text-amber-200 bg-[#072719] border border-amber-500/30 hover:border-amber-400/70 hover:bg-[#0a3321]'
                      : 'text-emerald-200/80 hover:text-white hover:bg-[#08281a] border border-transparent'
                  }`}
                  title={item.title}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                        isActive
                          ? 'bg-gradient-to-br from-amber-400 to-amber-500 text-[#061810] shadow-md scale-105'
                          : item.isHighlight
                          ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                          : 'bg-[#03180f] text-emerald-400 group-hover:text-amber-300 group-hover:bg-[#0b3322]'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    {!isSidebarCollapsed && (
                      <div className="text-right">
                        <p className="text-xs font-bold leading-tight">{item.title}</p>
                        <p className="text-[10px] text-emerald-400/60 leading-none mt-0.5">{item.subtitle}</p>
                      </div>
                    )}
                  </div>

                  {!isSidebarCollapsed && item.badge && (
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full text-white shadow-sm ${
                        item.badgeColor || 'bg-emerald-600'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Bottom Sidebar Status */}
          <div className="p-3 border-t border-emerald-500/20 space-y-2 bg-[#02120a]">
            {!isSidebarCollapsed ? (
              <div className="p-3 rounded-2xl bg-[#062417] border border-emerald-500/30 space-y-2 shadow-inner">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-emerald-300 font-bold">جاهزية المنصة</span>
                  <span className="flex items-center gap-1.5 font-bold text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    {simulationState.isActive ? 'محاكاة طوارئ' : 'مستقرة 100%'}
                  </span>
                </div>
                <div className="w-full bg-[#021008] rounded-full h-1.5 overflow-hidden p-0.5 border border-[#143628]">
                  <div className="bg-gradient-to-r from-emerald-400 via-amber-400 to-emerald-300 h-full rounded-full w-[98%]" />
                </div>
                <div className="flex items-center justify-between text-[10px] text-emerald-400/70">
                  <span>المستخدم: {currentStaff.name}</span>
                  <span className="text-amber-400 font-bold">SBC Certified</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" title="النظام متصل" />
              </div>
            )}
          </div>
        </aside>

        {/* Central Dynamic Content Area with Adaptive Desktop Canvas */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 flex flex-col justify-between">
          <div className="w-full max-w-7xl mx-auto space-y-4">
            {/* Breadcrumb Navigation & Top Action Summary */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-emerald-500/20">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-emerald-400/70 font-medium">منصة حُصن</span>
                <ChevronLeft className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-300 font-bold">المقر الرئيسي</span>
                <ChevronLeft className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-amber-400 font-black">
                  {navMenuItems.find(m => m.id === currentScreen)?.title || 'لوحة التحكم'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] px-3 py-1 rounded-xl bg-[#062417] border border-emerald-500/30 text-emerald-300 font-bold shadow-sm">
                  🏢 برج حُصن الذكي — الرياض
                </span>
                <button
                  onClick={onSwitchToMobile}
                  className="text-xs px-3 py-1 rounded-xl bg-[#082a1c] hover:bg-[#0c3a26] border border-amber-400/40 text-amber-300 font-bold transition-all shadow-sm"
                >
                  📱 عرض كشاشة جوال
                </button>
              </div>
            </div>

            {/* The Actual Screen Content rendered inside Web View Container */}
            <div className="w-full rounded-3xl bg-[#041a10] border border-emerald-500/25 shadow-2xl p-4 sm:p-6 relative overflow-hidden">
              {/* Corner Ambient Glows */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                {children}
              </div>
            </div>
          </div>

          {/* Web Enterprise Footer */}
          <footer className="w-full max-w-7xl mx-auto mt-6 pt-4 border-t border-emerald-500/20 flex flex-wrap items-center justify-between text-xs text-emerald-400/60">
            <p>
              جميع الحقوق محفوظة © {new Date().getFullYear()} — منصة حُصن (HOSN) الذكية لإدارة الأمن والسلامة | المملكة العربية السعودية
            </p>
            <div className="flex items-center gap-4 text-[11px]">
              <span className="text-emerald-400 font-medium">متوافق مع معايير الدفاع المدني وكود البناء السعودي SBC</span>
              <span className="text-amber-400 font-mono font-bold bg-[#03180f] px-2 py-0.5 rounded border border-[#143628]">v2.5.0 Enterprise Web</span>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};
