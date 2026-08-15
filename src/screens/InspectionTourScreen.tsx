import React, { useState } from 'react';
import { 
  Flame, 
  DoorOpen, 
  Radio, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Camera, 
  Save, 
  Check, 
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ScreenId } from '../types';
import { initialInspectionItems } from '../data/mockData';

interface InspectionTourScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const InspectionTourScreen: React.FC<InspectionTourScreenProps> = ({ onNavigate }) => {
  const [items, setItems] = useState(initialInspectionItems);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [notesText, setNotesText] = useState('تم فحص جميع أدوات السلامة بالطابق الأرضي والثاني.');
  const [isSaved, setIsSaved] = useState(false);

  // Calculate completion percentage
  const intactCount = items.filter(i => i.status === 'intact').length;
  const percentage = Math.round((intactCount / items.length) * 100);

  const handleStatusChange = (id: string, newStatus: 'intact' | 'needs-followup' | 'defective') => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, status: newStatus };
      }
      return item;
    }));
  };

  const handleSaveProgress = () => {
    setIsSaved(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#c49a45', '#10b981', '#ffffff']
    });
    setTimeout(() => setIsSaved(false), 2500);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'fire':
        return <Flame className="w-5 h-5 text-rose-400" />;
      case 'exit':
        return <DoorOpen className="w-5 h-5 text-emerald-400" />;
      case 'smoke':
      default:
        return <Radio className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-4 py-3 bg-[#061810] text-emerald-50 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-center pb-2 border-b border-[#143628]">
        <h1 className="text-sm sm:text-base font-bold text-white text-center">
          جولة التفتيش - النمط الأخضر الداكن الموحد
        </h1>
      </div>

      {/* Circular Progress Meter (Matching Image 8: 40% مكتمل) */}
      <div className="my-3 flex flex-col items-center justify-center">
        <div className="relative w-32 h-32 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            {/* Background Ring */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke="#0b2c1f"
              strokeWidth="9"
            />
            {/* Emerald Base Segment */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke="#15803d"
              strokeWidth="9"
              strokeDasharray="251.2"
              strokeDashoffset="150"
              strokeLinecap="round"
            />
            {/* Gold Active Progress Arc (40%) */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke="#d4af37"
              strokeWidth="9"
              strokeDasharray="251.2"
              strokeDashoffset={251.2 - (251.2 * percentage) / 100}
              strokeLinecap="round"
              className="transition-all duration-500"
            />
          </svg>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-black text-white leading-none">
              {percentage}%
            </span>
            <span className="text-[11px] font-bold text-emerald-300 mt-0.5">
              مكتمل
            </span>
            <span className="text-[9px] text-emerald-400/70 font-medium">
              جولة السلامة الأسبوعية
            </span>
          </div>
        </div>
      </div>

      {/* Checklist Section Title */}
      <div className="text-center my-1">
        <h2 className="text-sm font-bold text-emerald-200">
          قائمة التحقق الأسبوعية
        </h2>
      </div>

      {/* Checklist Items (Matching Image 8) */}
      <div className="space-y-3 my-2">
        {items.slice(0, 3).map((item) => (
          <div
            key={item.id}
            className="p-3.5 rounded-2xl bg-[#092218] border border-[#1d4634] shadow-sm space-y-2.5"
          >
            {/* Title Row with Icon */}
            <div className="flex items-center justify-between">
              <div className="text-right">
                <h3 className="text-sm font-bold text-white">
                  {item.title}
                </h3>
                <p className="text-[11px] text-emerald-300/70">
                  {item.location} ({item.unitsCount})
                </p>
              </div>

              <div className="w-9 h-9 rounded-lg bg-[#0b291d] border border-emerald-500/30 flex items-center justify-center">
                {getIcon(item.iconType)}
              </div>
            </div>

            {/* 3-State Radio Options Row (Matching Image 8) */}
            <div className="grid grid-cols-3 gap-1.5 pt-1">
              {/* Option 1: سليم (Intact) */}
              <button
                onClick={() => handleStatusChange(item.id, 'intact')}
                className={`py-2 px-1 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                  item.status === 'intact'
                    ? 'bg-[#c49a45] text-[#061810] shadow-[0_2px_10px_rgba(196,154,69,0.3)]'
                    : 'bg-[#061810] text-emerald-300/70 border border-[#143628] hover:text-white'
                }`}
              >
                <span>سليم</span>
                <CheckCircle2 className="w-3.5 h-3.5" />
              </button>

              {/* Option 2: يحتاج متابعة (Needs Followup) */}
              <button
                onClick={() => handleStatusChange(item.id, 'needs-followup')}
                className={`py-2 px-1 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                  item.status === 'needs-followup'
                    ? 'bg-amber-500 text-[#061810] shadow-[0_2px_10px_rgba(245,158,11,0.3)]'
                    : 'bg-[#061810] text-amber-400/80 border border-[#143628] hover:text-amber-200'
                }`}
              >
                <span>يحتاج متابعة</span>
                <AlertTriangle className="w-3.5 h-3.5" />
              </button>

              {/* Option 3: غير سليم (Defective) */}
              <button
                onClick={() => handleStatusChange(item.id, 'defective')}
                className={`py-2 px-1 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                  item.status === 'defective'
                    ? 'bg-rose-600 text-white shadow-[0_2px_10px_rgba(225,29,72,0.3)]'
                    : 'bg-[#061810] text-rose-400/80 border border-[#143628] hover:text-rose-200'
                }`}
              >
                <span>غير سليم</span>
                <XCircle className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Notes / Photos Link */}
      <button
        onClick={() => setShowNotesModal(true)}
        className="w-full text-center py-2 text-xs font-semibold text-emerald-200 hover:text-amber-300 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
      >
        <Camera className="w-4 h-4 text-amber-400" />
        <span>اضافة ملاحظات / صور</span>
      </button>

      {/* Save Progress Button */}
      <button
        id="btn-save-inspection"
        onClick={handleSaveProgress}
        className="w-full py-3.5 px-4 rounded-xl bg-[#092218] border border-[#1d4634] hover:border-amber-400 text-amber-300 hover:text-amber-200 font-bold text-sm shadow-sm active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
      >
        {isSaved ? (
          <>
            <Check className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-300">تم حفظ التقدم بنجاح!</span>
          </>
        ) : (
          <>
            <Save className="w-4 h-4" />
            <span>حفظ التقدم</span>
          </>
        )}
      </button>

      {/* Notes Modal */}
      {showNotesModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-2xl bg-[#092218] border border-amber-400/50 p-4 space-y-3">
            <h3 className="text-sm font-bold text-white">إضافة ملاحظات وصور للجولة</h3>
            <textarea
              value={notesText}
              onChange={(e) => setNotesText(e.target.value)}
              rows={3}
              className="w-full p-2.5 rounded-xl bg-[#061810] border border-[#1d4634] text-xs text-white placeholder:text-emerald-500 focus:outline-none focus:border-amber-400"
              placeholder="اكتب ملاحظات الجولة..."
            />
            <div className="flex gap-2">
              <button
                onClick={() => setShowNotesModal(false)}
                className="flex-1 py-2 rounded-lg bg-amber-400 text-[#061810] font-bold text-xs"
              >
                تأكيد الملاحظات
              </button>
              <button
                onClick={() => setShowNotesModal(false)}
                className="py-2 px-3 rounded-lg bg-[#061810] text-emerald-300 text-xs"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
