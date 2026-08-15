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
  Lock,
  Phone,
  CreditCard,
  UserCheck,
  Sparkles
} from 'lucide-react';
import { ScreenId, StaffMember } from '../types';
import { useHosn } from '../context/HosnContext';

interface UserProfileScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onLogout?: () => void;
}

export const UserProfileScreen: React.FC<UserProfileScreenProps> = ({ 
  onNavigate,
  onLogout 
}) => {
  const { currentStaff, allStaff, switchStaff } = useHosn();
  const [faceIdEnabled, setFaceIdEnabled] = useState(currentStaff.faceIdEnabled);
  const [isEditing, setIsEditing] = useState(false);
  const [editSuccess, setEditSuccess] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    setEditSuccess(true);
    setTimeout(() => setEditSuccess(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-4 py-3 bg-[#061810] text-emerald-50 overflow-y-auto relative font-['Tajawal',sans-serif]">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between pb-2 border-b border-[#143628]">
        <button
          onClick={() => {
            if (isEditing) handleSave();
            else setIsEditing(true);
          }}
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

      {/* Switch Team Member Selector */}
      <div className="my-3 p-3 rounded-2xl bg-[#092218] border border-[#1d4634] space-y-2">
        <span className="text-xs font-bold text-amber-400 block">
          اختر الكادر الوطني للتجربة التفاعلية:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {allStaff.map(staff => (
            <button
              key={staff.id}
              onClick={() => switchStaff(staff.id)}
              className={`p-2 rounded-xl text-right flex items-center gap-2 transition-all cursor-pointer ${
                currentStaff.id === staff.id
                  ? 'bg-amber-400 text-[#061810] font-black shadow-md'
                  : 'bg-[#061810] border border-[#183d2c] text-emerald-200 hover:text-white'
              }`}
            >
              <img
                src={staff.avatarUrl}
                alt={staff.name}
                className="w-7 h-7 rounded-full object-cover shrink-0"
              />
              <div className="overflow-hidden">
                <p className="text-[11px] font-bold truncate leading-tight">{staff.name}</p>
                <p className="text-[9px] opacity-75 truncate">{staff.roleType === 'manager' ? 'إدارة' : 'ميداني'}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Profile Header Visual */}
      <div className="flex flex-col items-center justify-center my-2 text-center">
        {/* Avatar with Circular Gold Ring */}
        <div className="relative w-24 h-24 rounded-full p-1 border-2 border-amber-400/80 shadow-[0_0_20px_rgba(196,154,69,0.3)] mb-2">
          <img
            src={currentStaff.avatarUrl}
            alt={currentStaff.name}
            className="w-full h-full rounded-full object-cover"
          />
          <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-emerald-500 border-2 border-[#061810] flex items-center justify-center text-white">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
        </div>

        <h2 className="text-lg sm:text-xl font-black text-white font-['Alexandria']">
          {currentStaff.name}
        </h2>
        <p className="text-xs font-bold text-amber-400 mt-0.5">
          {currentStaff.role}
        </p>
        <span className="text-[11px] text-emerald-300/70 mt-0.5">
          {currentStaff.department}
        </span>
      </div>

      {/* Success Notification */}
      {editSuccess && (
        <div className="mb-2 p-2 rounded-xl bg-emerald-900/60 border border-emerald-400 text-emerald-100 text-xs text-center font-bold">
          تم تحديث وتثبيت الصلاحيات بنجاح
        </div>
      )}

      {/* Info Cards List */}
      <div className="space-y-2.5 my-2">
        {/* Card 1: Department & Building */}
        <div className="p-3 rounded-2xl bg-[#092218] border border-[#1d4634] space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-emerald-400/80 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-emerald-400" />
              <span>المقر والمبنى:</span>
            </span>
            <span className="font-bold text-white">{currentStaff.building}</span>
          </div>

          <div className="flex items-center justify-between text-xs pt-2 border-t border-[#183f2e]">
            <span className="text-emerald-400/80 flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-emerald-400" />
              <span>الهوية الوطنية الموثقة:</span>
            </span>
            <span className="font-mono text-emerald-200 font-bold">{currentStaff.nationalId || '1088492011'}</span>
          </div>

          <div className="flex items-center justify-between text-xs pt-2 border-t border-[#183f2e]">
            <span className="text-emerald-400/80 flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>رقم التواصل:</span>
            </span>
            <span className="font-mono text-amber-300 font-bold">{currentStaff.phone}</span>
          </div>
        </div>

        {/* Card 2: Permissions Matrix */}
        <div className="p-3 rounded-2xl bg-[#092218] border border-[#1d4634] space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 pb-1.5 border-b border-[#183f2e]">
            <ShieldCheck className="w-4 h-4" />
            <span>مصفوفة الصلاحيات المعتمدة</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 rounded-xl bg-[#061810] border border-[#143628] flex items-center justify-between">
              <span>إدارة التوأم الرقمي:</span>
              <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
            </div>

            <div className="p-2 rounded-xl bg-[#061810] border border-[#143628] flex items-center justify-between">
              <span>إطلاق محاكاة الطوارئ:</span>
              <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
            </div>

            <div className="p-2 rounded-xl bg-[#061810] border border-[#143628] flex items-center justify-between">
              <span>اعتماد إغلاق البلاغات:</span>
              <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
            </div>

            <div className="p-2 rounded-xl bg-[#061810] border border-[#143628] flex items-center justify-between">
              <span>التحكم في بوابات الأمن:</span>
              <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
            </div>
          </div>
        </div>

        {/* Card 3: Biometric FaceID Toggle */}
        <div className="p-3 rounded-2xl bg-[#092218] border border-[#1d4634] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center">
              <Fingerprint className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-white leading-tight">بصمة الوجه (FaceID) عبر نفاذ</p>
              <p className="text-[10px] text-emerald-400/60 leading-tight mt-0.5">تسجيل الدخول البيومتري الآمن</p>
            </div>
          </div>

          <button
            onClick={() => setFaceIdEnabled(!faceIdEnabled)}
            className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
              faceIdEnabled ? 'bg-emerald-500' : 'bg-zinc-700'
            }`}
          >
            <span
              className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                faceIdEnabled ? 'right-1' : 'left-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Logout Action */}
      <button
        onClick={onLogout || (() => onNavigate('login'))}
        className="w-full py-2.5 rounded-xl bg-[#0b271c] hover:bg-rose-950/60 text-rose-300 border border-rose-900/40 hover:border-rose-500/60 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer my-2"
      >
        <LogOut className="w-4 h-4" />
        <span>تسجيل الخروج والتبديل</span>
      </button>
    </div>
  );
};
