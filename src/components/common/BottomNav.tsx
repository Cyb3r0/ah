import React from 'react';
import { 
  Home, 
  BarChart3, 
  FileText, 
  Settings, 
  ClipboardCheck, 
  Calendar, 
  User, 
  AlertTriangle, 
  Map, 
  Bell, 
  MoreHorizontal, 
  Wrench, 
  Box, 
  ShieldAlert,
  Sliders
} from 'lucide-react';
import { ScreenId } from '../../types';

interface BottomNavProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  variant?: 'manager' | 'technician' | 'emergency' | 'map' | 'inspection' | 'simple';
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentScreen,
  onNavigate,
  variant = 'manager',
}) => {
  // Determine nav items based on variant
  const getNavItems = () => {
    switch (variant) {
      case 'technician':
        return [
          { id: 'manager-dashboard', label: 'الرئيسية', icon: Home },
          { id: 'technician-tasks', label: 'المهام', icon: ClipboardCheck },
          { id: 'smart-map', label: 'الجدول', icon: Calendar },
          { id: 'user-profile', label: 'الملف الشخصي', icon: User },
        ];
      case 'emergency':
        return [
          { id: 'manager-dashboard', label: 'الرئيسي', icon: Home },
          { id: 'create-report', label: 'التبليغات', icon: FileText },
          { id: 'disability-support', label: 'الطوارئ', icon: ShieldAlert, alert: true },
          { id: 'user-profile', label: 'الشخصي', icon: User },
        ];
      case 'map':
        return [
          { id: 'manager-dashboard', label: 'الرئيسية', icon: Home },
          { id: 'smart-map', label: 'الخريطة', icon: Map },
          { id: 'technician-tasks', label: 'المهام', icon: ClipboardCheck },
          { id: 'disability-support', label: 'التنبيهات', icon: Bell },
          { id: 'inspection-tour', label: 'المزيد', icon: MoreHorizontal },
        ];
      case 'inspection':
        return [
          { id: 'manager-dashboard', label: 'لوحة التحكم', icon: Sliders },
          { id: 'inspection-tour', label: 'الجولات', icon: Map },
          { id: 'create-report', label: 'الطلبات', icon: Wrench },
          { id: 'asset-details-qr', label: 'الأصول', icon: Box },
          { id: 'user-profile', label: 'المزيد', icon: MoreHorizontal },
        ];
      case 'manager':
      default:
        return [
          { id: 'manager-dashboard', label: 'الرئيسية', icon: Home },
          { id: 'smart-map', label: 'التحليلات', icon: BarChart3 },
          { id: 'create-report', label: 'التقارير', icon: FileText },
          { id: 'user-profile', label: 'والإعدادات', icon: Settings },
        ];
    }
  };

  const navItems = getNavItems();

  return (
    <div className="w-full bg-[#072016]/95 backdrop-blur-md border-t border-[#1a4231] px-3 py-2 flex items-center justify-around z-30 select-none">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentScreen === item.id;
        
        return (
          <button
            key={item.label}
            id={`nav-btn-${item.id}`}
            onClick={() => onNavigate(item.id as ScreenId)}
            className={`flex flex-col items-center justify-center gap-1 py-1 px-2.5 transition-all duration-200 relative group cursor-pointer ${
              isActive 
                ? 'text-amber-400 font-bold scale-105' 
                : 'text-emerald-300/70 hover:text-emerald-100'
            }`}
          >
            <div className="relative">
              <Icon 
                className={`w-5 h-5 transition-transform duration-200 ${
                  isActive ? 'text-amber-400 stroke-[2.4]' : 'text-emerald-400/80 stroke-[1.8]'
                }`} 
              />
              {item.alert && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              )}
            </div>
            <span className="text-[11px] leading-none whitespace-nowrap">
              {item.label}
            </span>
            {isActive && (
              <span className="w-4 h-0.5 bg-amber-400 rounded-full mt-0.5" />
            )}
          </button>
        );
      })}
    </div>
  );
};
