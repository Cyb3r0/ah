import React, { useState } from 'react';
import { 
  ChevronRight, 
  Briefcase, 
  Building2, 
  ShieldCheck, 
  Fingerprint, 
  Edit3, 
  LogOut, 
  Check,
  Bell,
  Lock
} from 'lucide-react';
import { ScreenId, UserProfile } from '../types';
import { initialUserProfile } from '../data/mockData';

interface UserProfileScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onLogout?: () => void;
}

export const UserProfileScreen: React.FC<UserProfileScreenProps> = ({ 
  onNavigate,
  onLogout 
}) => {
  const [profile, setProfile] = useState<UserProfile>(initialUserProfile);
  const [faceIdEnabled, setFaceIdEnabled] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editSuccess, setEditSuccess] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    setEditSuccess(true);
    setTimeout(() => setEditSuccess(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-4 py-3 bg-[#061810] text-emerald-50 overflow-y-auto relative">
      {/* Top Header Bar (Matching Image 9) */}
      <div className="flex items-center justify-between pb-2 border-b border-[#143628]">
        {/* Edit Button */}
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
        >
          {isEditing ? 'حفظ' : 'تعديل'}
        </button>

        <h1 className="text-sm sm:text-base font-bold text-white text-center">
          الملف الشخصي والصلاحيات
        </h1>

        <button
          onClick={() => onNavigate('manager-dashboard')}
          className="p-1 text-emerald-300 hover:text-white transition-colors cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Profile Header Visual (Matching Image 9) */}
      <div className="flex flex-col items-center justify-center my-3 text-center">
        {/* Avatar with Circular Gold Ring */}
        <div className="relative w-24 h-24 rounded-full p-1 border-2 border-amber-400/80 shadow-[0_0_20px_rgba(196,154,69,0.3)] mb-2">
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            className="w-full h-full rounded-full object-cover"
          />
          <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-emerald-500 border-2 border-[#061810] flex items-center justify-center text-white">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
        </div>

        <h2 className="text-lg sm:text-xl font-black text-white font-['Alexandria']">
          {profile.name}
        </h2>
        <p className="text-xs font-bold text-amber-400 mt-0.5">
          {profile.role}
        </p>
      </div>

      {/* Card 1: المعلومات الشخصية (Matching Image 9) */}
      <div className="p-3.5 rounded-2xl bg-[#092218] border border-[#1d4634] shadow-sm space-y-2.5 my-1.5">
        <h3 className="text-xs font-bold text-amber-400/90 text-right">
          المعلومات الشخصية
        </h3>

        {/* Department Row */}
        <div className="flex items-center justify-between text-xs pt-1 border-t border-[#133827]">
          <span className="text-emerald-100 font-medium">{profile.department}</span>
          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <span>القسم</span>
            <Briefcase className="w-4 h-4 text-amber-400" />
          </div>
        </div>

        {/* Building Row */}
        <div className="flex items-center justify-between text-xs pt-1 border-t border-[#133827]">
          <span className="text-emerald-100 font-medium">{profile.building}</span>
          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <span>المبنى</span>
            <Building2 className="w-4 h-4 text-amber-400" />
          </div>
        </div>
      </div>

      {/* Card 2: الصلاحيات (Matching Image 9) */}
      <div className="p-3.5 rounded-2xl bg-[#092218] border border-[#1d4634] shadow-sm space-y-2.5 my-1.5">
        <h3 className="text-xs font-bold text-amber-400/90 text-right">
          الصلاحيات
        </h3>

        {/* Perm 1 */}
        <div className="flex items-center justify-between text-xs pt-1 border-t border-[#133827]">
          <span className="text-emerald-400 font-bold">مفعل</span>
          <span className="text-emerald-100 font-medium">مدير المنشأة</span>
        </div>

        {/* Perm 2 */}
        <div className="flex items-center justify-between text-xs pt-1 border-t border-[#133827]">
          <span className="text-emerald-400 font-bold">مفعل</span>
          <span className="text-emerald-100 font-medium">إدارة الزوار</span>
        </div>

        {/* Perm 3 */}
        <div className="flex items-center justify-between text-xs pt-1 border-t border-[#133827]">
          <span className="text-emerald-400 font-bold">مفعل</span>
          <span className="text-emerald-100 font-medium">عرض التقارير</span>
        </div>
      </div>

      {/* Card 3: الأمان (Matching Image 9) */}
      <div className="p-3.5 rounded-2xl bg-[#092218] border border-[#1d4634] shadow-sm space-y-2.5 my-1.5">
        <h3 className="text-xs font-bold text-amber-400/90 text-right">
          الأمان
        </h3>

        {/* FaceID / Biometric Toggle */}
        <div className="flex items-center justify-between pt-1 border-t border-[#133827]">
          {/* Custom Gold/White Toggle Switch (Matching Image 9) */}
          <button
            type="button"
            onClick={() => setFaceIdEnabled(!faceIdEnabled)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
              faceIdEnabled ? 'bg-[#c49a45]' : 'bg-[#0f3524]'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out my-auto ${
                faceIdEnabled ? 'translate-x-5' : 'translate-x-0.5'
              }`}
            />
          </button>

          <span className="text-xs text-emerald-100 font-medium">
            تسجيل الدخول بالبصمة / FaceID
          </span>
        </div>
      </div>

      {/* Logout Action Button */}
      <div className="mt-2 pt-2">
        <button
          onClick={() => {
            if (onLogout) onLogout();
            else onNavigate('login');
          }}
          className="w-full py-2.5 rounded-xl bg-rose-950/40 border border-rose-800/40 hover:bg-rose-900/40 text-rose-300 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>تسجيل الخروج من المنصة</span>
        </button>
      </div>
    </div>
  );
};
