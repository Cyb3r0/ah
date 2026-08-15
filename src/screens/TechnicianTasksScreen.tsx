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
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ScreenId, TaskItem } from '../types';
import { initialTasks } from '../data/mockData';

interface TechnicianTasksScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const TechnicianTasksScreen: React.FC<TechnicianTasksScreenProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'daily' | 'upcoming' | 'history'>('daily');
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);
  const [activeTaskInProgress, setActiveTaskInProgress] = useState<TaskItem | null>(null);

  const handleStartTask = (task: TaskItem) => {
    setActiveTaskInProgress(task);
  };

  const handleCompleteTask = (taskId: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return { ...t, status: 'completed' };
      }
      return t;
    }));
    setActiveTaskInProgress(null);
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.7 },
      colors: ['#c49a45', '#10b981']
    });
  };

  const filteredTasks = tasks.filter(t => {
    if (activeTab === 'daily') return t.status !== 'completed';
    if (activeTab === 'upcoming') return t.id === 'T-104';
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
    <div className="flex-1 flex flex-col justify-between px-4 py-3 bg-[#061810] text-emerald-50 overflow-y-auto relative">
      {/* Top Header Bar (Matching Image 5) */}
      <div className="flex items-center justify-between pb-2 border-b border-[#143628]">
        <div className="text-right">
          <span className="text-[11px] text-emerald-300/80 font-medium">26 أكتوبر 2024</span>
        </div>

        <h1 className="text-sm sm:text-base font-bold text-white text-center">
          قائمة مهام الفني
        </h1>

        <HosnLogo size="sm" showText={false} />
      </div>

      {/* Segmented Control Tabs (Matching Image 5) */}
      <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-[#092218] border border-[#1d4634] my-2.5 text-xs">
        <button
          onClick={() => setActiveTab('daily')}
          className={`py-2 px-2 rounded-lg font-bold transition-all cursor-pointer ${
            activeTab === 'daily'
              ? 'bg-[#1a4231] text-amber-300 shadow-sm'
              : 'text-emerald-300/70 hover:text-emerald-100'
          }`}
        >
          مهامي اليومية
        </button>

        <button
          onClick={() => setActiveTab('upcoming')}
          className={`py-2 px-2 rounded-lg font-bold transition-all cursor-pointer ${
            activeTab === 'upcoming'
              ? 'bg-[#1a4231] text-amber-300 shadow-sm'
              : 'text-emerald-300/70 hover:text-emerald-100'
          }`}
        >
          القادمة
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`py-2 px-2 rounded-lg font-bold transition-all cursor-pointer ${
            activeTab === 'history'
              ? 'bg-[#1a4231] text-amber-300 shadow-sm'
              : 'text-emerald-300/70 hover:text-emerald-100'
          }`}
        >
          السجل
        </button>
      </div>

      {/* Task Cards List (Matching Image 5) */}
      <div className="space-y-3 my-1">
        {filteredTasks.length === 0 ? (
          <div className="p-8 text-center text-emerald-300/60 text-xs">
            لا توجد مهام في هذا القسم حالياً
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className="p-4 rounded-2xl bg-[#092218] border border-[#1d4634] shadow-sm space-y-2.5 hover:border-amber-400/40 transition-all"
            >
              {/* Task Header with Indicator & Priority */}
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-2 text-right">
                  <div className="mt-1">{getPriorityDot(task.priorityColor)}</div>
                  <div>
                    <h3 className="text-base font-black text-white leading-tight">
                      {task.title}
                    </h3>
                    <p className="text-xs font-bold text-amber-400/90 mt-0.5">
                      الأولوية: {task.priority}
                    </p>
                  </div>
                </div>

                <div className="text-left text-xs font-bold text-amber-300/90">
                  {task.title}
                  <div className="text-[11px] text-emerald-300/70 font-normal">
                    الأولوية: {task.priority}
                  </div>
                </div>
              </div>

              {/* Task Metadata Details */}
              <div className="grid grid-cols-2 gap-2 text-xs text-emerald-200/90 pt-1 border-t border-[#133527]">
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-400 font-semibold">المبنى:</span>
                  <span>{task.building}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-400 font-semibold">الطابق:</span>
                  <span>{task.floor}</span>
                </div>
                <div className="col-span-2 flex items-center gap-1.5 text-amber-200">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-emerald-400 font-semibold">الوقت المنقضي:</span>
                  <span>{task.timeElapsed}</span>
                </div>
              </div>

              {/* Action Button: بدء المهمة (Gold) */}
              <button
                id={`start-task-${task.id}`}
                onClick={() => handleStartTask(task)}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#c49a45] to-[#b88c32] hover:from-[#e5c06e] hover:to-[#c49a45] text-[#061810] font-black text-sm shadow-[0_2px_12px_rgba(196,154,69,0.3)] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>بدء المهمة</span>
              </button>
            </div>
          ))
        )}
      </div>

      {/* Active Task Work Modal */}
      {activeTaskInProgress && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-2xl bg-[#092218] border border-amber-400/50 p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1a4231] pb-3">
              <div className="flex items-center gap-2">
                <Wrench className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">{activeTaskInProgress.title}</h3>
              </div>
              <button onClick={() => setActiveTaskInProgress(null)} className="text-emerald-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs text-emerald-200">
              <p><strong className="text-amber-300">الموقع:</strong> {activeTaskInProgress.building} - الطابق {activeTaskInProgress.floor}</p>
              <p><strong className="text-amber-300">الوصف:</strong> {activeTaskInProgress.description}</p>
              <div className="p-2.5 rounded-lg bg-[#061810] border border-[#143628] flex items-center justify-between text-amber-300 font-mono">
                <span>عداد العمل المباشر:</span>
                <span className="font-bold">00:14:32</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => handleCompleteTask(activeTaskInProgress.id)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>إتمام المهمة وتسجيل الحل</span>
              </button>

              <button
                onClick={() => {
                  setActiveTaskInProgress(null);
                  onNavigate('create-report');
                }}
                className="w-full py-2.5 rounded-xl bg-[#0b291d] border border-amber-400/30 text-amber-300 text-xs font-semibold"
              >
                رفع تقرير فني إضافي
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
