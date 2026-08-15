import React, { useState } from 'react';
import { HosnLogo } from '../components/common/HosnLogo';
import { 
  ChevronRight, 
  Camera, 
  MapPin, 
  Clock, 
  ChevronDown, 
  Send, 
  Plus, 
  X,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ScreenId } from '../types';

interface CreateReportScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const CreateReportScreen: React.FC<CreateReportScreenProps> = ({ onNavigate }) => {
  const [reportType, setReportType] = useState('أمن');
  const [priority, setPriority] = useState('عاجل');
  const [location, setLocation] = useState('المبنى الرئيسي، الرياض');
  const [timestamp, setTimestamp] = useState('10:30 ص - 24 مايو 2024');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [photos, setPhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&auto=format&fit=crop&q=80',
  ]);

  const reportTypes = ['أمن', 'سلامة', 'كهرباء', 'تكييف إلخ', 'مصاعد', 'أخرى'];
  const priorities = ['عادي', 'مهم', 'عاجل', 'خطر فوري'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#c49a45', '#10b981', '#ffffff']
      });
      setTimeout(() => {
        setSubmitted(false);
        onNavigate('manager-dashboard');
      }, 1500);
    }, 600);
  };

  const handleAddPhoto = () => {
    const samplePhotos = [
      'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=300&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=300&auto=format&fit=crop&q=80'
    ];
    setPhotos(prev => [...prev, samplePhotos[prev.length % samplePhotos.length]]);
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-4 py-3 bg-[#061810] text-emerald-50 overflow-y-auto relative">
      {/* Top Header Bar (Matching Image 2) */}
      <div className="flex items-center justify-between pb-2 border-b border-[#143628]">
        {/* Back and Title */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('manager-dashboard')}
            className="p-1 text-emerald-300 hover:text-white transition-colors cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <h1 className="text-sm sm:text-base font-bold text-white">
            إنشاء تقرير جديد
          </h1>
        </div>

        {/* Top HOSN Logo center */}
        <div className="hidden sm:block">
          <span className="font-extrabold text-sm text-amber-400 font-['Alexandria']">HOSN</span>
        </div>

        {/* Send Button Top Right */}
        <button
          onClick={handleSubmit}
          className="py-1.5 px-3.5 rounded-lg bg-amber-400/90 hover:bg-amber-300 text-[#061810] font-bold text-xs shadow-sm transition-all cursor-pointer"
        >
          إرسال
        </button>
      </div>

      {/* Form Body */}
      <form onSubmit={handleSubmit} className="space-y-3.5 my-2">
        {/* Add Photos Section with Camera Icon (Matching Image 2) */}
        <div className="p-3.5 rounded-2xl bg-[#092218] border border-[#1d4634] flex flex-col items-center justify-center">
          <button
            type="button"
            onClick={handleAddPhoto}
            className="flex items-center gap-2 text-amber-400 hover:text-amber-300 font-bold text-xs mb-3 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full bg-[#0c2e20] border border-amber-400/50 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Camera className="w-4 h-4 text-amber-400" />
            </div>
            <span>إضافة صور</span>
          </button>

          {/* Photo Thumbnails Gallery */}
          <div className="flex items-center gap-3 overflow-x-auto max-w-full pb-1">
            {photos.map((url, index) => (
              <div key={index} className="relative w-16 h-16 rounded-xl overflow-hidden border border-emerald-500/40 shrink-0 group">
                <img src={url} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => handleRemovePhoto(index)}
                  className="absolute top-0.5 right-0.5 p-0.5 rounded-full bg-black/70 text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddPhoto}
              className="w-16 h-16 rounded-xl border border-dashed border-emerald-500/40 bg-[#061810] flex flex-col items-center justify-center text-emerald-400/70 hover:text-amber-300 hover:border-amber-400/50 transition-all shrink-0 cursor-pointer"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Location Row (Matching Image 2) */}
        <div className="p-3 rounded-xl bg-[#092218] border border-[#1d4634] flex items-center justify-between text-xs">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-transparent text-emerald-100 font-medium focus:outline-none text-right"
          />
          <div className="flex items-center gap-1.5 text-amber-400 shrink-0 mr-2">
            <span className="font-bold">الموقع:</span>
            <MapPin className="w-4 h-4" />
          </div>
        </div>

        {/* Time Row (Matching Image 2) */}
        <div className="p-3 rounded-xl bg-[#092218] border border-[#1d4634] flex items-center justify-between text-xs">
          <input
            type="text"
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
            className="w-full bg-transparent text-emerald-100 font-medium focus:outline-none text-right"
          />
          <div className="flex items-center gap-1.5 text-amber-400 shrink-0 mr-2">
            <span className="font-bold">الوقت:</span>
            <Clock className="w-4 h-4" />
          </div>
        </div>

        {/* Incident Type Dropdown (Matching Image 2) */}
        <div className="space-y-1 text-right">
          <label className="text-xs font-bold text-emerald-200">
            نوع البلاغ
          </label>
          <div className="relative">
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full appearance-none py-3 px-3.5 pr-4 pl-9 rounded-xl bg-[#092218] border border-[#1d4634] text-amber-300 font-bold text-xs focus:outline-none focus:border-amber-400 cursor-pointer"
            >
              {reportTypes.map((t) => (
                <option key={t} value={t} className="bg-[#092218] text-white">
                  {t}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Priority Level Dropdown (Matching Image 2) */}
        <div className="space-y-1 text-right">
          <label className="text-xs font-bold text-emerald-200">
            مستوى الأولوية
          </label>
          <div className="relative">
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full appearance-none py-3 px-3.5 pr-4 pl-9 rounded-xl bg-[#092218] border border-[#1d4634] text-amber-300 font-bold text-xs focus:outline-none focus:border-amber-400 cursor-pointer"
            >
              {priorities.map((p) => (
                <option key={p} value={p} className="bg-[#092218] text-white">
                  {p}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Submit Report Button (Matching Image 2) */}
        <button
          id="btn-submit-report"
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-4 py-3.5 px-4 rounded-xl bg-[#0f3826] hover:bg-[#154c34] border border-emerald-500/40 text-amber-300 font-bold text-sm shadow-sm active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <div className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
          ) : submitted ? (
            <span className="text-emerald-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> تم تقديم التقرير بنجاح
            </span>
          ) : (
            <span>تقديم التقرير</span>
          )}
        </button>
      </form>
    </div>
  );
};
