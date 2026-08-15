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
  Maximize2,
  Minimize2
} from 'lucide-react';
import { ScreenId } from '../types';

interface QuickScreenSelectorProps {
  currentScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
  isFramed: boolean;
  onToggleFrame: () => void;
}

export const screenItems: { id: ScreenId; title: string; imageRef: string; icon: any; category: string }[] = [
  { id: 'splash', title: 'الشاشة الافتتاحية (الهوية الموحدة)', imageRef: 'Image 11.jpeg', icon: Sparkles, category: 'الرئيسية' },
  { id: 'login', title: 'تسجيل الدخول والنفاذ الموحد', imageRef: 'Image 6.jpeg', icon: Lock, category: 'المصادقة' },
  { id: 'manager-dashboard', title: 'لوحة القيادة للمديرين', imageRef: 'Image 1.jpeg', icon: BarChart3, category: 'الإدارة' },
  { id: 'smart-map', title: 'الخريطة الذكية - المخطط الداخلي', imageRef: 'Image 7.jpeg', icon: Map, category: 'المراقبة' },
  { id: 'disability-support', title: 'دعم ذوي الإعاقة وطوارئ SOS', imageRef: 'Image 4.jpeg', icon: AlertOctagon, category: 'الطوارئ' },
  { id: 'inspection-tour', title: 'جولة التفتيش وقائمة التحقق', imageRef: 'Image 8.jpeg', icon: ClipboardList, category: 'التفتيش' },
  { id: 'technician-tasks', title: 'قائمة مهام الفني الميداني', imageRef: 'Image 5.jpeg', icon: CheckSquare, category: 'الصيانة' },
  { id: 'create-report', title: 'إنشاء تقرير بلاغ جديد', imageRef: 'Image 2.jpeg', icon: FilePlus, category: 'البلاغات' },
  { id: 'device-entry', title: 'تسجيل دخول الأجهزة والمعدات', imageRef: 'Image 3.jpeg', icon: Laptop, category: 'الأمن' },
  { id: 'asset-details-qr', title: 'تفاصيل الأصل وفحص QR', imageRef: 'Image 10.jpeg', icon: QrCode, category: 'الأصول' },
  { id: 'user-profile', title: 'الملف الشخصي والصلاحيات', imageRef: 'Image 9.jpeg', icon: UserCheck, category: 'الحساب' },
];

export const QuickScreenSelector: React.FC<QuickScreenSelectorProps> = ({
  currentScreen,
  onSelectScreen,
  isFramed,
  onToggleFrame,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const activeItem = screenItems.find(s => s.id === currentScreen) || screenItems[0];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-3 select-none">
      {/* Top Bar with Screen Switcher Dropdown & Frame Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-[#092218]/90 border border-[#1d4634] backdrop-blur-md shadow-xl">
        {/* Right side: Brand & Current Active Screen */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-[#061810] font-black font-['Alexandria'] shadow-md">
            H
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-400">حُصن | HOSN</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                11 شاشة متطابقة
              </span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-white">
              {activeItem.title}
            </p>
          </div>
        </div>

        {/* Center / Left Controls */}
        <div className="flex items-center gap-2">
          {/* Frame View Toggle */}
          <button
            onClick={onToggleFrame}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              isFramed 
                ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40' 
                : 'bg-[#061810] text-emerald-200 border border-[#1a4231] hover:text-white'
            }`}
            title="تبديل إطار الهاتف / العرض الكامل"
          >
            <Smartphone className="w-4 h-4" />
            <span className="hidden sm:inline">{isFramed ? 'إطار الهاتف الذكي' : 'العرض الكامل'}</span>
          </button>

          {/* Quick Drawer Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-700 hover:to-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm border border-emerald-500/40 transition-all cursor-pointer"
          >
            <Layers className="w-4 h-4 text-amber-400" />
            <span>تنقل سريع بين الشاشات ({screenItems.length})</span>
            {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Expandable Screen Grid Navigator */}
      {isOpen && (
        <div className="mt-2.5 p-4 rounded-2xl bg-[#061c13]/95 border border-amber-400/40 backdrop-blur-xl shadow-2xl animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-[#183f2e] mb-3">
            <h3 className="text-xs font-bold text-emerald-200 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>اختر أي شاشة من الشاشات الـ 11 لتجربتها بتصميمها الحقيقي المتطابق:</span>
            </h3>
            <span className="text-[11px] text-emerald-400/80">
              انقر على أي شاشة للانتقال الفوري
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
                  className={`p-2.5 rounded-xl text-right flex flex-col justify-between transition-all cursor-pointer group relative overflow-hidden ${
                    isCurrent
                      ? 'bg-amber-400 text-[#061810] shadow-[0_0_15px_rgba(196,154,69,0.5)] font-bold'
                      : 'bg-[#092419] border border-[#1d4634] text-emerald-100 hover:border-amber-400/60 hover:bg-[#0c2f21]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                      isCurrent ? 'bg-[#061810] text-amber-400' : 'bg-[#061810] text-emerald-400'
                    }`}>
                      {index + 1}
                    </span>
                    <Icon className={`w-4 h-4 ${isCurrent ? 'text-[#061810]' : 'text-amber-400'}`} />
                  </div>

                  <span className="text-xs leading-snug line-clamp-2">
                    {item.title}
                  </span>

                  <span className={`text-[9px] mt-1.5 opacity-70 ${isCurrent ? 'text-[#061810]' : 'text-emerald-300'}`}>
                    {item.imageRef}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
