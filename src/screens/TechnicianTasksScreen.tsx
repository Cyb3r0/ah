import React, { useState } from 'react';
import { HosnLogo } from '../components/common/HosnLogo';
import { 
  Play, 
  CheckCircle2, 
  Clock, 
  Building, 
  Layers, 
  AlertCircle,
  X,
  Wrench,
  Check,
  UserCheck,
  ArrowRight,
  ShieldCheck,
  Send,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ScreenId, TaskItem } from '../types';
import { useHosn } from '../context/HosnContext';

interface TechnicianTasksScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const TechnicianTasksScreen: React.FC<TechnicianTasksScreenProps> = ({ onNavigate }) => {
  const { 
    tasks, 
    updateTaskStatus, 
    currentStaff, 
    switchStaff, 
    allStaff,
    setSelectedFloor,
    selectAssetByCode
  } = useHosn();

  const [activeTab, setActiveTab] = useState<'daily' | 'upcoming' | 'history'>('daily');
  const [activeTaskInProgress, setActiveTaskInProgress] = useState<TaskItem | null>(null);
  const [resolutionText, setResolutionText] = useState('');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const handleStartTask = (task: TaskItem) => {
    updateTaskStatus(task.id, 'in-progress');
    setActiveTaskInProgress(task);
    setResolutionText('تمت مباشرة الموقع، وفحص سلامة الأصل والضغط والتوصيلات بنجاح.');
  };

  const handleCompleteTask = (taskId: string) => {
    updateTaskStatus(taskId, 'completed', resolutionText);
    setActiveTaskInProgress(null);
    setSuccessToast(`تم إغلاق المهمة (${taskId}) بنجاح وتحديث حالة الأصل في الـ Digital Twin!`);
    
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#c49a45', '#10b981', '#ffffff']
    });

    setTimeout(() => {
      setSuccessToast(null);
    }, 5000);
  };

  const filteredTasks = tasks.filter(t => {
    if (activeTab === 'daily') return t.status !== 'completed';
    if (activeTab === 'upcoming') return t.priority === 'منخفضة' || t.priority === 'متوسطة';
    return t.status === 'completed';
  });

  const getPriorityDot = (color: string) => {
    switch (color) {
      case 'red':
        return <span className="w-3.5 h-3.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.7)] inline-block" />;
      case 'orange':
        return <span className="w-3.5 h-3.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.7)] inline-block" />;
      case 'yellow':
      default:
        return <span className="w-3.5 h-3.5 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.7)] inline-block" />;
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-4 py-3 bg-[#061810] text-emerald-50 overflow-y-auto relative font-['Tajawal',sans-serif]">
      {/* Role Switcher Demo Bar (For testing the manager -> tech -> manager loop) */}
      <div className="p-2.5 mb-3 rounded-xl bg-[#092218] border border-[#1d4634] flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-emerald-400/80">المستخدم الحالي:</span>
          <span className="font-bold text-amber-400">{currentStaff.name} ({currentStaff.role})</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-emerald-400/60 hidden sm:inline">تبديل الدور:</span>
          <button
            onClick={() => switchStaff('staff-01')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all text-xs ${
              currentStaff.id === 'staff-01' ? 'bg-amber-400 text-[#061810]' : 'bg-[#061810] text-emerald-300 border border-[#183d2c]'
            }`}
          >
            المديرة: م. سارة العتيبي
          </button>
          <button
            onClick={() => switchStaff('staff-02')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all text-xs ${
              currentStaff.id === 'staff-02' ? 'bg-amber-400 text-[#061810]' : 'bg-[#061810] text-emerald-300 border border-[#183d2c]'
            }`}
          >
            الفني: م. تركي الشمري
          </button>
        </div>
      </div>

      {/* Success Toast */}
      {successToast && (
        <div className="mb-3 p-3 rounded-xl bg-emerald-900/90 border border-emerald-400 text-emerald-100 text-xs font-bold flex items-center justify-between shadow-xl animate-in fade-in slide-in-from-top duration-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            <span>{successToast}</span>
          </div>
          <button
            onClick={() => {
              setSelectedFloor(3);
              onNavigate('digital-twin');
            }}
            className="px-2.5 py-1 rounded-lg bg-amber-400 text-[#061810] text-[11px] font-black"
          >
            معاينة الأصل على الـ Digital Twin
          </button>
        </div>
      )}

      {/* Top Header Bar */}
      <div className="flex items-center justify-between pb-2 border-b border-[#143628]">
        <div className="text-right">
          <span className="text-[11px] text-emerald-300/80 font-medium">المهام الميدانية النشطة</span>
        </div>

        <h1 className="text-sm sm:text-base font-black text-white text-center">
          مهام الفني الميداني (م. تركي الشمري)
        </h1>

        <HosnLogo size="sm" showText={false} />
      </div>

      {/* Segmented Control Tabs */}
      <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-[#092218] border border-[#1d4634] my-2.5 text-xs">
        <button
          onClick={() => setActiveTab('daily')}
          className={`py-2 px-2 rounded-lg font-bold transition-all cursor-pointer ${
            activeTab === 'daily'
              ? 'bg-[#1a4231] text-amber-300 shadow-sm'
              : 'text-emerald-300/70 hover:text-emerald-100'
          }`}
        >
          مهامي اليومية ({tasks.filter(t => t.status !== 'completed').length})
        </button>

        <button
          onClick={() => setActiveTab('upcoming')}
          className={`py-2 px-2 rounded-lg font-bold transition-all cursor-pointer ${
            activeTab === 'upcoming'
              ? 'bg-[#1a4231] text-amber-300 shadow-sm'
              : 'text-emerald-300/70 hover:text-emerald-100'
          }`}
        >
          المهام المجدولة
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`py-2 px-2 rounded-lg font-bold transition-all cursor-pointer ${
            activeTab === 'history'
              ? 'bg-[#1a4231] text-amber-300 shadow-sm'
              : 'text-emerald-300/70 hover:text-emerald-100'
          }`}
        >
          سجل المنجزة ({tasks.filter(t => t.status === 'completed').length})
        </button>
      </div>

      {/* Task List */}
      <div className="space-y-2.5 my-2 flex-1">
        {filteredTasks.length === 0 ? (
          <div className="p-8 text-center bg-[#092218] rounded-2xl border border-[#1d4634] space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <p className="text-sm font-bold text-white">لا توجد مهام معلقة في هذا القسم</p>
            <p className="text-xs text-emerald-400/60">
              جميع البلاغات المنشأة من الـ Digital Twin تم إغلاقها بنجاح!
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const isDone = task.status === 'completed';
            const inProgress = task.status === 'in-progress';

            return (
              <div 
                key={task.id}
                className={`p-3.5 rounded-2xl border transition-all ${
                  inProgress 
                    ? 'bg-[#0b2b1d] border-amber-400 shadow-lg ring-1 ring-amber-400/30'
                    : isDone
                    ? 'bg-[#081f15] border-emerald-900/40 opacity-80'
                    : 'bg-[#092218] border-[#1d4634] hover:border-amber-400/40'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {getPriorityDot(task.priorityColor)}
                    <span className="text-xs font-bold text-white leading-tight">
                      {task.title}
                    </span>
                    {task.assetCode && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#061810] text-amber-400 font-mono font-bold">
                        {task.assetCode}
                      </span>
                    )}
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isDone 
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                      : inProgress
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  }`}>
                    {isDone ? 'تم الإغلاق' : inProgress ? 'قيد المعالجة' : task.priority}
                  </span>
                </div>

                {task.description && (
                  <p className="text-[11px] text-emerald-300/80 mt-1.5 leading-relaxed text-right">
                    {task.description}
                  </p>
                )}

                <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-[#183f2e] text-xs">
                  <div className="flex items-center gap-3 text-emerald-400/80 text-[11px]">
                    <span className="flex items-center gap-1">
                      <Building className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{task.building}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{task.floor}</span>
                    </span>
                  </div>

                  {/* Actions */}
                  {!isDone && (
                    <div className="flex items-center gap-2">
                      {!inProgress ? (
                        <button
                          onClick={() => handleStartTask(task)}
                          className="py-1 px-3 rounded-lg bg-amber-400 text-[#061810] text-xs font-bold hover:bg-amber-300 flex items-center gap-1 shadow-sm cursor-pointer"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>بدء الإجراء</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => setActiveTaskInProgress(task)}
                          className="py-1 px-3 rounded-lg bg-emerald-500 text-[#061810] text-xs font-black hover:bg-emerald-400 flex items-center gap-1 shadow-sm cursor-pointer animate-pulse"
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>إغلاق البلاغ</span>
                        </button>
                      )}
                    </div>
                  )}

                  {isDone && task.resolutionNotes && (
                    <span className="text-[10px] text-emerald-300 italic">
                      ملاحظة الفني: {task.resolutionNotes}
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Task Completion Modal Dialog */}
      {activeTaskInProgress && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#092218] border border-amber-400/60 rounded-2xl p-5 max-w-md w-full shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#1d4634]">
              <div className="flex items-center gap-2">
                <Wrench className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm font-black text-white">
                  إغلاق مهمة الصيانة وتحديث الـ Digital Twin
                </h3>
              </div>
              <button 
                onClick={() => setActiveTaskInProgress(null)}
                className="p-1 rounded-lg text-emerald-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-2.5 rounded-xl bg-[#061810] border border-[#183d2c]">
                <span className="text-emerald-400/80 block text-[11px]">المهمة:</span>
                <p className="font-bold text-white">{activeTaskInProgress.title}</p>
                {activeTaskInProgress.assetCode && (
                  <span className="text-amber-400 font-mono text-[10px] block mt-0.5">
                    الأصل المستهدف: {activeTaskInProgress.assetCode}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-emerald-300 font-bold mb-1.5">
                  ملاحظات الفني الميداني وتقرير الإنجاز:
                </label>
                <textarea
                  value={resolutionText}
                  onChange={(e) => setResolutionText(e.target.value)}
                  rows={3}
                  className="w-full p-2.5 rounded-xl bg-[#061810] border border-[#1d4634] text-white text-xs placeholder:text-emerald-600 focus:outline-none focus:border-amber-400"
                  placeholder="اكتب الإجراءات المنفذة (مثلاً: تم فحص البودرة، وإعادة ضبط مستشعر الأمان)..."
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#1d4634]">
              <button
                onClick={() => setActiveTaskInProgress(null)}
                className="px-3 py-2 rounded-xl bg-[#061810] text-emerald-300 hover:text-white text-xs font-bold"
              >
                إلغاء
              </button>
              <button
                onClick={() => handleCompleteTask(activeTaskInProgress.id)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-[#061810] text-xs font-black flex items-center gap-1.5 shadow-lg"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>اعتماد الإغلاق وتحديث الأصل</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
