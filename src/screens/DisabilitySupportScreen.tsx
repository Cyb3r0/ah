import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Accessibility, 
  MapPin, 
  ChevronLeft, 
  PhoneCall, 
  Radio, 
  CheckCircle2, 
  ShieldAlert,
  Sparkles,
  X
} from 'lucide-react';
import { ScreenId } from '../types';
import { initialDisabilityEntries } from '../data/mockData';

interface DisabilitySupportScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const DisabilitySupportScreen: React.FC<DisabilitySupportScreenProps> = ({ onNavigate }) => {
  const [entries, setEntries] = useState(initialDisabilityEntries);
  const [isSosTriggered, setIsSosTriggered] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<any | null>(null);

  const handleToggleAssisted = (id: string) => {
    setEntries(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status: item.status === 'waiting' ? 'assisted' : 'waiting'
        };
      }
      return item;
    }));
  };

  const handleTriggerSOS = () => {
    setIsSosTriggered(true);
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-4 py-3 bg-[#061810] text-emerald-50 overflow-y-auto relative">
      {/* Top Header Bar */}
      <div className="flex items-center justify-center pb-2 border-b border-[#143628] relative">
        <h1 className="text-sm sm:text-base font-bold text-white text-center">
          دعم ذوي الإعاقة - النمط الداكن الموحد
        </h1>
      </div>

      {/* Red Emergency Warning Banner (Matching Image 4) */}
      <div className="my-2.5 p-3 rounded-xl bg-gradient-to-r from-rose-950 via-rose-900/90 to-rose-950 border border-rose-600/60 shadow-[0_0_20px_rgba(225,29,72,0.25)] flex items-center justify-between animate-pulse">
        <span className="text-xs font-bold text-rose-100 flex items-center gap-1.5">
          وضع الطوارئ نشط - فرق الاستجابة يرجى الانتباه
        </span>
        <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
      </div>

      {/* Primary Glowing Red Active Card (Matching Image 4) */}
      <div className="my-2 p-4 rounded-2xl bg-[#092218] border-2 border-rose-600/80 shadow-[0_0_25px_rgba(225,29,72,0.35)] animate-emergency-border relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div className="text-right">
            <h2 className="text-base sm:text-lg font-black text-white">
              الدور الخامس، المنطقة ب
            </h2>
            <p className="text-xs sm:text-sm text-emerald-200/90 mt-0.5">
              1 شخص - يحتاج مساعدة تنقل
            </p>
          </div>

          {/* Wheelchair Disability Icon */}
          <div className="w-12 h-12 rounded-xl bg-[#0b291d] border border-rose-500/50 flex items-center justify-center text-white shadow-inner">
            <Accessibility className="w-7 h-7 stroke-[2.2]" />
          </div>
        </div>

        {/* View Location and Details Button */}
        <button
          onClick={() => setSelectedEntry(entries[0])}
          className="w-full mt-3 py-2.5 px-3 rounded-xl bg-[#1d3d2e] hover:bg-[#254d3b] text-white font-bold text-xs flex flex-col items-center justify-center transition-all cursor-pointer border border-emerald-500/30"
        >
          <span className="text-xs">عرض الموقع والبيانات</span>
          <span className="text-[10px] text-emerald-300/70 font-normal">عرض الموقع والبيانات</span>
        </button>
      </div>

      {/* List of Registered Locations Needing Support */}
      <div className="space-y-2.5 my-2">
        {entries.slice(1).map((item, idx) => (
          <div
            key={item.id}
            onClick={() => setSelectedEntry(item)}
            className="p-3 rounded-xl bg-[#092218] border border-[#1d4634] hover:border-amber-400/50 transition-all flex items-center justify-between cursor-pointer group shadow-sm"
          >
            <ChevronLeft className="w-4 h-4 text-emerald-400 group-hover:-translate-x-1 transition-transform" />

            <div className="text-right flex-1 px-3">
              <h3 className="text-xs sm:text-sm font-bold text-white">
                {item.location}
              </h3>
              <p className="text-[11px] text-emerald-300/70">
                {item.personCount} شخص - {item.needDescription}
              </p>
            </div>

            {/* Status indicator checkbox */}
            <div 
              onClick={(e) => {
                e.stopPropagation();
                handleToggleAssisted(item.id);
              }}
              className={`w-6 h-6 rounded-md border flex items-center justify-center transition-colors cursor-pointer ${
                item.status === 'assisted'
                  ? 'bg-emerald-500 border-emerald-400 text-[#061810]'
                  : 'bg-[#061810] border-emerald-600/60 text-transparent'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 stroke-[3]" />
            </div>
          </div>
        ))}
      </div>

      {/* Big Glowing Red SOS Button (Matching Image 4) */}
      <div className="mt-4 mb-2 flex flex-col items-center justify-center">
        <button
          id="btn-sos-emergency"
          onClick={handleTriggerSOS}
          className="relative w-44 h-44 rounded-full bg-gradient-to-b from-[#e11d48] to-[#9f1239] text-white flex flex-col items-center justify-center text-center p-3 shadow-[0_0_50px_rgba(225,29,72,0.6)] animate-sos-pulse hover:scale-105 active:scale-95 transition-transform cursor-pointer border-4 border-rose-300/30"
        >
          {/* Inner SOS Badge */}
          <div className="w-12 h-6 rounded-full bg-white text-rose-700 text-xs font-black flex items-center justify-center mb-1 shadow">
            SOS
          </div>
          <span className="text-base font-black text-white leading-tight">
            طلب النجدة (SOS)
          </span>
          <span className="text-[10px] text-rose-100/90 font-medium mt-1">
            مع بث الموقع المباشر
          </span>
        </button>
      </div>

      {/* SOS Active Dispatch Modal */}
      {isSosTriggered && (
        <div className="absolute inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between p-5 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-rose-800/60">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
              <h2 className="text-base font-bold text-rose-300">تم إرسال نداء الاستغاثة فوراً</h2>
            </div>
            <button
              onClick={() => setIsSosTriggered(false)}
              className="p-1.5 rounded-full bg-rose-950 text-rose-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="my-auto text-center space-y-3">
            <div className="w-20 h-20 mx-auto rounded-full bg-rose-600/20 border-2 border-rose-500 flex items-center justify-center text-rose-400 animate-bounce">
              <ShieldAlert className="w-10 h-10" />
            </div>
            <h3 className="text-lg font-black text-white">فرق الإنقاذ والسلامة في طريقها إليك</h3>
            <p className="text-xs text-emerald-200/80 max-w-xs mx-auto">
              تم بث إحداثيات موقعك عبر مستشعرات المبنى إلى غرفة التحكم المركزية والدفاع المدني.
            </p>
            <div className="p-3 rounded-xl bg-[#0b291d] border border-amber-400/40 text-xs text-amber-300 font-mono">
              الموقع الدقيق: برج الرياض - الدور 5 - قطاع B2
            </div>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => onNavigate('smart-map')}
              className="w-full py-3 rounded-xl bg-amber-400 text-[#061810] font-black text-sm"
            >
              تتبع فريق الاستجابة على الخريطة
            </button>
            <button
              onClick={() => setIsSosTriggered(false)}
              className="w-full py-2.5 rounded-xl bg-[#092218] border border-rose-800 text-rose-300 text-xs font-bold"
            >
              إلغاء البلاغ
            </button>
          </div>
        </div>
      )}

      {/* Details Modal for Selected Person */}
      {selectedEntry && (
        <div className="absolute inset-0 z-40 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-2xl bg-[#092218] border border-amber-400/50 p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-[#1a4231] pb-2">
              <h3 className="text-sm font-bold text-white">{selectedEntry.location}</h3>
              <button onClick={() => setSelectedEntry(null)} className="text-emerald-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-1.5 text-xs text-emerald-200">
              <p><strong className="text-amber-300">الاحتياج:</strong> {selectedEntry.needDescription}</p>
              <p><strong className="text-amber-300">العدد:</strong> {selectedEntry.personCount} شخص</p>
              <p><strong className="text-amber-300">أقرب مخرج طوارئ:</strong> سلم الطوارئ الشمالي (E-01)</p>
            </div>
            <button
              onClick={() => {
                handleToggleAssisted(selectedEntry.id);
                setSelectedEntry(null);
              }}
              className="w-full py-2 rounded-lg bg-amber-400 text-[#061810] font-bold text-xs"
            >
              {selectedEntry.status === 'assisted' ? 'إلغاء علامة المساعدة' : 'تأكيد تقديم المساعدة'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
