import React from 'react';
import { 
  Flame, 
  AlertOctagon, 
  Radio, 
  Activity, 
  DoorOpen, 
  Users, 
  ShieldAlert, 
  RotateCcw, 
  Play, 
  CheckCircle2, 
  ChevronLeft, 
  Sparkles, 
  ArrowRight,
  Zap,
  Volume2,
  PhoneCall
} from 'lucide-react';
import { useHosn } from '../context/HosnContext';
import { ScreenId, SimulationType } from '../types';

interface SimulationCenterScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const SimulationCenterScreen: React.FC<SimulationCenterScreenProps> = ({ onNavigate }) => {
  const { 
    simulationState, 
    startSimulation, 
    stopSimulation, 
    advanceSimulationStep,
    selectedFloor,
    setSelectedFloor
  } = useHosn();

  return (
    <div className="flex-1 flex flex-col gap-4 text-emerald-50 font-['Tajawal',sans-serif]">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-gradient-to-r from-[#1f0a0e] via-[#2d0f14] to-[#1f0a0e] border border-rose-600/50 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-rose-700 flex items-center justify-center text-white font-black shadow-lg animate-pulse">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-rose-400 font-['Alexandria']">مركز محاكاة الطوارئ | SIMULATION ENGINE</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold border border-rose-500/40">
                محرك أحداث هندسي تفاعلي
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-black text-white leading-tight">
              محاكاة سيناريوهات الإخلاء والأحداث الحرجة المباشرة
            </h1>
          </div>
        </div>

        {/* Emergency Simulation Active Indicator */}
        <div className="flex items-center gap-2">
          {simulationState.isActive ? (
            <button
              onClick={stopSimulation}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-xs font-black flex items-center gap-1.5 shadow-lg transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>إيقاف المحاكاة واستعادة الوضع الطبيعي</span>
            </button>
          ) : (
            <button
              onClick={() => startSimulation('FIRE_ALARM')}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white text-xs font-black flex items-center gap-1.5 shadow-[0_0_20px_rgba(225,29,72,0.6)] transition-all cursor-pointer animate-bounce"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>تشغيل محاكاة إنذار حريق (Fire Alarm)</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Simulation Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left 7 Cols: The Step-by-Step Incident Pipeline (FIRE_DETECTED -> INCIDENT_CREATED) */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          <div className="p-4 rounded-2xl bg-[#061810] border border-[#1d4634] shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#143628]">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-amber-400" />
                <h2 className="text-sm font-bold text-white">
                  مسار تسلسل أحداث الطوارئ الآلي (Automated Event Pipeline)
                </h2>
              </div>
              <span className="text-xs text-amber-400 font-mono font-bold">
                {simulationState.isActive ? `الخطوة ${simulationState.currentStepIndex + 1} من ${simulationState.steps.length}` : 'جاهز للبدء'}
              </span>
            </div>

            {/* Stepper Timeline */}
            <div className="space-y-3">
              {simulationState.steps.map((step, idx) => {
                const isPassed = simulationState.isActive && idx <= simulationState.currentStepIndex;
                const isCurrent = simulationState.isActive && idx === simulationState.currentStepIndex;

                return (
                  <div
                    key={step.key}
                    className={`p-3 rounded-xl border transition-all duration-300 flex items-start gap-3 ${
                      isCurrent
                        ? 'bg-rose-950/80 border-rose-500 shadow-[0_0_15px_rgba(225,29,72,0.4)] ring-1 ring-rose-400'
                        : isPassed
                        ? 'bg-[#092419] border-emerald-500/40 text-emerald-100'
                        : 'bg-[#04110a] border-[#143628] opacity-50'
                    }`}
                  >
                    {/* Step Icon Badge */}
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5 ${
                        isCurrent
                          ? 'bg-rose-500 text-white animate-pulse'
                          : isPassed
                          ? 'bg-emerald-500 text-[#061810]'
                          : 'bg-[#092419] text-emerald-400'
                      }`}
                    >
                      {isPassed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                    </div>

                    <div className="flex-1 text-right">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-black ${isCurrent ? 'text-rose-300' : 'text-white'}`}>
                          {step.title}
                        </span>
                        <span className="text-[10px] font-mono text-amber-400">
                          {step.key}
                        </span>
                      </div>
                      <p className="text-[11px] text-emerald-300/80 mt-1 leading-relaxed">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Manual Advance / Trigger Button */}
            {simulationState.isActive && (
              <div className="pt-2 flex items-center justify-between border-t border-[#183d2c]">
                <button
                  onClick={advanceSimulationStep}
                  className="py-2 px-3 rounded-xl bg-[#092419] hover:bg-[#0c2f21] border border-amber-400/40 text-amber-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <span>تسريع الخطوة التالية يدوياً</span>
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    setSelectedFloor(3);
                    onNavigate('digital-twin');
                  }}
                  className="py-2 px-4 rounded-xl bg-amber-400 text-[#061810] text-xs font-black flex items-center gap-1.5 shadow-md cursor-pointer hover:bg-amber-300"
                >
                  <span>معاينة الإخلاء على الـ Digital Twin</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right 5 Cols: Live Simulated Telemetry & Evacuation Metrics */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {/* Evacuation Progress Meter */}
          <div className="p-4 rounded-2xl bg-[#061810] border border-[#1d4634] shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#143628]">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-400" />
                <span>إحصائيات الإخلاء وتتبع الأشخاص الحية</span>
              </span>
              <span className="text-xs font-mono font-black text-amber-400">
                {simulationState.evacuationProgress}%
              </span>
            </div>

            {/* Large Progress Bar */}
            <div className="w-full bg-[#03110a] rounded-full h-3 overflow-hidden p-0.5 border border-[#183d2c]">
              <div 
                className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${simulationState.evacuationProgress}%` }}
              />
            </div>

            {/* 2x2 Metric Cards */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-[#092419] border border-[#143628]">
                <span className="text-[11px] text-emerald-400/70">المتواجدون بالدور 3:</span>
                <p className="text-lg font-black text-white mt-1">342 شخصاً</p>
              </div>

              <div className="p-3 rounded-xl bg-[#092419] border border-[#143628]">
                <span className="text-[11px] text-rose-400/80">حالات ذوي الإعاقة:</span>
                <p className="text-lg font-black text-rose-300 mt-1">1 حالة (غرفة 312)</p>
              </div>

              <div className="p-3 rounded-xl bg-[#092419] border border-[#143628]">
                <span className="text-[11px] text-emerald-400/70">مخارج الطوارئ النشطة:</span>
                <p className="text-lg font-black text-emerald-300 mt-1">DOOR-00382</p>
              </div>

              <div className="p-3 rounded-xl bg-[#092419] border border-[#143628]">
                <span className="text-[11px] text-emerald-400/70">سرعة الإخلاء التقديرية:</span>
                <p className="text-lg font-black text-amber-300 mt-1">2.4 دقيقة</p>
              </div>
            </div>

            {/* Special Emergency Broadcast Message */}
            <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-xs text-rose-200 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-rose-300">
                <Volume2 className="w-4 h-4 animate-bounce" />
                <span>البث الصوتي الموجه للمبنى:</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                «انتباه لجميع شاغلي الدور الثالث: يرجى التوجه بهدوء إلى مخرج الدرج الشمالي الغربي DOOR-00382 وعدم استخدام المصاعد نهائياً.»
              </p>
            </div>
          </div>

          {/* Quick Scenario Triggers */}
          <div className="p-4 rounded-2xl bg-[#061810] border border-[#1d4634] shadow-xl space-y-2">
            <span className="text-xs font-bold text-emerald-300 block mb-2">
              سيناريوهات المحاكاة الإضافية المتاحة:
            </span>

            <button
              onClick={() => startSimulation('FIRE_ALARM')}
              className="w-full p-2.5 rounded-xl bg-[#092419] hover:bg-rose-900/30 border border-rose-500/30 text-xs font-bold text-rose-200 flex items-center justify-between text-right cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-rose-400" />
                <span>محاكاة إنذار الحريق (Fire Alarm)</span>
              </div>
              <span className="text-[10px] text-rose-400 font-mono">نشط</span>
            </button>

            <button
              onClick={() => {
                startSimulation('DISABILITY_SOS');
                onNavigate('disability-support');
              }}
              className="w-full p-2.5 rounded-xl bg-[#092419] hover:bg-amber-900/30 border border-amber-400/30 text-xs font-bold text-amber-200 flex items-center justify-between text-right cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <AlertOctagon className="w-4 h-4 text-amber-400" />
                <span>محاكاة نداء طوارئ ذوي الإعاقة SOS</span>
              </div>
              <span className="text-[10px] text-amber-400 font-mono">جاهز</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
