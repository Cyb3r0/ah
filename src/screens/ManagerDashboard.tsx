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
  ArrowUpRight
} from 'lucide-react';
import { ScreenId } from '../types';

interface ManagerDashboardProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenNotifications?: () => void;
}

export const ManagerDashboard: React.FC<ManagerDashboardProps> = ({ 
  onNavigate,
  onOpenNotifications
}) => {
  const [selectedPoint, setSelectedPoint] = useState<number | null>(4); // Default to 'اليوم'

  const timeline = [
    { label: 'الماضي', cam: '99.8%', elev: '98.5%', camVal: 99.8, elevVal: 98.5 },
    { label: 'الأسبوع', cam: '99.8%', elev: '98.0%', camVal: 99.8, elevVal: 98.0 },
    { label: 'السابق', cam: '99.8%', elev: '98.5%', camVal: 99.8, elevVal: 98.5 },
    { label: 'أمس', cam: '99.8%', elev: '98.5%', camVal: 99.8, elevVal: 98.5 },
    { label: 'اليوم', cam: '99.8%', elev: '98.5%', camVal: 99.8, elevVal: 98.5 },
  ];

  return (
    <div className="flex-1 flex flex-col justify-between px-4 py-3 bg-[#061a12] text-emerald-50 overflow-y-auto">
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-[#143628]">
        {/* Right side in Arabic: Logo & Title */}
        <div className="flex items-center gap-2">
          <HosnLogo size="sm" showText={false} />
          <div className="flex flex-col">
            <span className="text-[10px] text-amber-400 font-bold tracking-wider">HOSN</span>
            <h1 className="text-base sm:text-lg font-bold text-white leading-tight">
              لوحة القيادة للمديرين
            </h1>
          </div>
        </div>

        {/* Left side in Arabic: Profile Avatar & Notification Bell */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('disability-support')}
            className="relative p-1.5 rounded-full bg-[#0b271c] border border-amber-500/30 text-amber-300 hover:text-amber-200 transition-colors cursor-pointer"
            title="تنبيهات الطوارئ"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
              1
            </span>
          </button>

          <button
            onClick={() => onNavigate('user-profile')}
            className="w-8 h-8 rounded-full border border-amber-400/50 overflow-hidden bg-emerald-800 flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-amber-400/40 transition-all"
          >
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
              alt="أحمد المنصور"
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </div>

      {/* 2x2 Metric Cards Grid */}
      <div className="grid grid-cols-2 gap-3 my-3">
        {/* Card 1: حالة المبنى العام */}
        <div 
          onClick={() => onNavigate('smart-map')}
          className="p-3.5 rounded-2xl bg-[#092218] border border-[#1d4634] hover:border-amber-400/50 transition-all duration-200 cursor-pointer flex flex-col justify-between shadow-sm group"
        >
          <div className="flex items-center justify-between text-emerald-300/80 text-xs font-medium">
            <span>حالة المبنى العام</span>
            <div className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 text-right">
            <span className="text-xl sm:text-2xl font-black text-white group-hover:text-amber-300 transition-colors">
              مستقرة
            </span>
          </div>
        </div>

        {/* Card 2: الإشغال */}
        <div 
          onClick={() => onNavigate('smart-map')}
          className="p-3.5 rounded-2xl bg-[#092218] border border-[#1d4634] hover:border-amber-400/50 transition-all duration-200 cursor-pointer flex flex-col justify-between shadow-sm group"
        >
          <div className="flex items-center justify-between text-emerald-300/80 text-xs font-medium">
            <span>الإشغال</span>
            <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
              <Users className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 text-right">
            <span className="text-xl sm:text-2xl font-black text-amber-300 group-hover:text-white transition-colors">
              1,283 <span className="text-xs font-normal text-emerald-200/70">شخص</span>
            </span>
          </div>
        </div>

        {/* Card 3: تنبيهات حرجة */}
        <div 
          onClick={() => onNavigate('disability-support')}
          className="p-3.5 rounded-2xl bg-[#092218] border border-rose-900/40 hover:border-rose-500/60 transition-all duration-200 cursor-pointer flex flex-col justify-between shadow-sm group relative overflow-hidden"
        >
          <div className="flex items-center justify-between text-rose-300/80 text-xs font-medium">
            <span>تنبيهات حرجة</span>
            <div className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center animate-bounce">
              <Bell className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 text-right">
            <span className="text-2xl sm:text-3xl font-black text-rose-500 group-hover:text-rose-400 transition-colors">
              1
            </span>
          </div>
        </div>

        {/* Card 4: تقارير مفتوحة */}
        <div 
          onClick={() => onNavigate('create-report')}
          className="p-3.5 rounded-2xl bg-[#092218] border border-[#1d4634] hover:border-amber-400/50 transition-all duration-200 cursor-pointer flex flex-col justify-between shadow-sm group"
        >
          <div className="flex items-center justify-between text-emerald-300/80 text-xs font-medium">
            <span>تقارير مفتوحة</span>
            <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center">
              <FileText className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 text-right">
            <span className="text-2xl sm:text-3xl font-black text-amber-200 group-hover:text-white transition-colors">
              14
            </span>
          </div>
        </div>
      </div>

      {/* Uptime Chart Card: وقت تشغيل الكاميرات والمصاعد */}
      <div className="my-2 p-4 rounded-2xl bg-[#092218] border border-[#1d4634] shadow-md">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
            <span>وقت تشغيل الكاميرات والمصاعد</span>
          </h2>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end gap-4 text-xs mb-3 text-emerald-300/80">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span>كاميرات</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span>مصاعد</span>
          </div>
        </div>

        {/* SVG Area / Line Chart with Authentic Curves */}
        <div className="relative w-full h-36 mt-1">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 320 120" preserveAspectRatio="none">
            <defs>
              <linearGradient id="camGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#d4af37" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#d4af37" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="elevGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid line */}
            <line x1="0" y1="100" x2="320" y2="100" stroke="#133827" strokeDasharray="3,3" />
            <line x1="0" y1="40" x2="320" y2="40" stroke="#133827" strokeDasharray="3,3" />

            {/* Camera Area & Path (Top smooth line ~99.8%) */}
            <path
              d="M 0 35 Q 80 32, 160 30 T 240 31 T 320 28 L 320 110 L 0 110 Z"
              fill="url(#camGrad)"
            />
            <path
              d="M 0 35 Q 80 32, 160 30 T 240 31 T 320 28"
              fill="none"
              stroke="#d4af37"
              strokeWidth="2.5"
            />

            {/* Elevators Area & Path (Lower dip curve from 10% to 77% to 98.5%) */}
            <path
              d="M 0 85 C 40 75, 70 70, 100 60 C 140 45, 170 38, 200 40 C 240 42, 280 35, 320 33 L 320 110 L 0 110 Z"
              fill="url(#elevGrad)"
            />
            <path
              d="M 0 85 C 40 75, 70 70, 100 60 C 140 45, 170 38, 200 40 C 240 42, 280 35, 320 33"
              fill="none"
              stroke="#10b981"
              strokeWidth="2.5"
            />

            {/* Interactive Data Nodes */}
            {[
              { cx: 20, cy: 35, cam: '99.8%', elev: '98.5%' },
              { cx: 90, cy: 32, cam: '99.8%', elev: '98.0%' },
              { cx: 160, cy: 30, cam: '99.8%', elev: '98.5%' },
              { cx: 230, cy: 31, cam: '99.8%', elev: '98.5%' },
              { cx: 300, cy: 28, cam: '99.8%', elev: '98.5%' },
            ].map((node, i) => (
              <g key={i} className="cursor-pointer" onClick={() => setSelectedPoint(i)}>
                <circle cx={node.cx} cy={node.cy} r={selectedPoint === i ? 5 : 3.5} fill="#d4af37" stroke="#061a12" strokeWidth="2" />
                <text x={node.cx} y={node.cy - 8} fontSize="9" fill="#d4af37" textAnchor="middle" fontWeight="bold">
                  {node.cam}
                </text>
              </g>
            ))}
          </svg>

          {/* X Axis Labels */}
          <div className="flex justify-between items-center text-[11px] text-emerald-300/70 pt-1 font-medium">
            {timeline.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedPoint(idx)}
                className={`transition-colors cursor-pointer ${selectedPoint === idx ? 'text-amber-400 font-bold' : 'hover:text-emerald-100'}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2.5 my-2">
        {/* Action 1: عرض التقارير التفصيلية */}
        <button
          id="btn-detailed-reports"
          onClick={() => onNavigate('create-report')}
          className="w-full py-3 px-4 rounded-xl bg-[#092218] border border-[#1d4634] hover:border-amber-400 text-amber-300 hover:text-amber-200 font-bold text-sm flex items-center justify-between transition-all cursor-pointer group shadow-sm active:scale-[0.99]"
        >
          <ChevronLeft className="w-4 h-4 text-emerald-400 group-hover:-translate-x-1 transition-transform" />
          <span>عرض التقارير التفصيلية</span>
          <ChevronRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Action 2: حالة النظام الشاملة */}
        <button
          id="btn-system-status"
          onClick={() => onNavigate('smart-map')}
          className="w-full py-3 px-4 rounded-xl bg-[#092218] border border-[#1d4634] hover:border-amber-400 text-amber-300 hover:text-amber-200 font-bold text-sm flex items-center justify-between transition-all cursor-pointer group shadow-sm active:scale-[0.99]"
        >
          <ChevronLeft className="w-4 h-4 text-emerald-400 group-hover:-translate-x-1 transition-transform" />
          <span>حالة النظام الشاملة</span>
          <ChevronRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
