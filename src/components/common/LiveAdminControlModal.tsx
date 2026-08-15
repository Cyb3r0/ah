import React, { useState } from 'react';
import { 
  Database, 
  UserPlus, 
  Flame, 
  BellOff, 
  Edit3, 
  CheckCircle2, 
  AlertTriangle, 
  Trash2, 
  Sparkles, 
  X, 
  Layers, 
  Plus, 
  RefreshCw,
  Sliders,
  ShieldAlert,
  Send
} from 'lucide-react';
import { useHosn } from '../../context/HosnContext';
import { DigitalTwinAsset, TaskItem } from '../../types';

interface LiveAdminControlModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LiveAdminControlModal: React.FC<LiveAdminControlModalProps> = ({ isOpen, onClose }) => {
  const { 
    allStaff, 
    currentStaff, 
    switchStaff, 
    assets, 
    tasks, 
    reports, 
    simulationState, 
    startSimulation, 
    stopSimulation,
    createIncidentFromAsset,
    updateTaskStatus,
    forceReseedDatabase,
    isSeedingDatabase
  } = useHosn();

  const [activeTab, setActiveTab] = useState<'stealth-alarm' | 'quick-incident' | 'users' | 'tasks-state'>('stealth-alarm');

  // Custom quick incident form state
  const [selectedAssetCode, setSelectedAssetCode] = useState<string>(assets[0]?.code || 'FE-00892');
  const [incidentPriority, setIncidentPriority] = useState<TaskItem['priority']>('حرجة');
  const [incidentCustomTitle, setIncidentCustomTitle] = useState<string>('');
  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

  // New User Form State
  const [newUserName, setNewUserName] = useState('');
  const [newUserRole, setNewUserRole] = useState('فني أنظمة إنذار وسلامة');
  const [newUserPhone, setNewUserPhone] = useState('+966 55 123 4567');

  if (!isOpen) return null;

  const handleTriggerCustomIncident = async () => {
    const title = incidentCustomTitle.trim() || undefined;
    const res = await createIncidentFromAsset(selectedAssetCode, title, incidentPriority);
    setNoticeMessage(`تم إرسال البلاغ فوراً (${res.reportId}) وتعيين أمر العمل (${res.taskId})! شاهد تحديث التوأم الرقمي والشاشات.`);
    setTimeout(() => setNoticeMessage(null), 5000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 font-['Tajawal',sans-serif]">
      <div className="w-full max-w-3xl rounded-3xl bg-[#041a10] border-2 border-amber-400 shadow-[0_0_50px_rgba(229,176,68,0.3)] text-emerald-50 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 bg-[#02120a] border-b border-emerald-500/30 flex items-center justify-between relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-[#061810] font-black shadow-lg">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-amber-400 font-['Alexandria'] tracking-wider">
                  لوحة التحكم السحرية والمباشرة | LIVE DEMO CONTROLLER
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 font-bold">
                  تحكم خلف الكواليس
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-white leading-tight">
                إدارة قاعدة البيانات، إطلاق الإنذارات الخفية، والتأثير اللحظي على العرض
              </h2>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 rounded-xl bg-[#08281a] hover:bg-[#0c3926] text-emerald-300 hover:text-white border border-emerald-500/30 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 p-2 bg-[#03150d] border-b border-emerald-500/20 overflow-x-auto">
          <button
            onClick={() => setActiveTab('stealth-alarm')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
              activeTab === 'stealth-alarm'
                ? 'bg-rose-600 text-white shadow-lg'
                : 'text-rose-300 hover:bg-[#072418] hover:text-white'
            }`}
          >
            <Flame className="w-4 h-4" />
            <span>تشغيل/إيقاف إنذار الطوارئ بالخفاء 🚨</span>
          </button>

          <button
            onClick={() => setActiveTab('quick-incident')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
              activeTab === 'quick-incident'
                ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-[#061810] shadow-lg'
                : 'text-amber-300 hover:bg-[#072418] hover:text-white'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>إحداث عطل فوري في أصل (Digital Twin) ⚡</span>
          </button>

          <button
            onClick={() => setActiveTab('tasks-state')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
              activeTab === 'tasks-state'
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'text-emerald-300 hover:bg-[#072418] hover:text-white'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>تغيير حالة المهام والبلاغات ({tasks.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
              activeTab === 'users'
                ? 'bg-[#0b3322] text-amber-300 border border-amber-400/50 shadow-lg'
                : 'text-emerald-300 hover:bg-[#072418] hover:text-white'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>إدارة الموظفين والصلاحيات</span>
          </button>
        </div>

        {/* Notice Message Alert */}
        {noticeMessage && (
          <div className="mx-4 mt-4 p-3 rounded-2xl bg-emerald-900/90 border border-amber-400 text-amber-200 text-xs font-bold flex items-center gap-2 shadow-lg animate-in fade-in slide-in-from-top duration-200">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{noticeMessage}</span>
          </div>
        )}

        {/* Tab Contents */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          
          {/* TAB 1: STEALTH EMERGENCY ALARM */}
          {activeTab === 'stealth-alarm' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#02120a] border border-rose-500/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-rose-400" />
                    <span>حالة محاكي الطوارئ اللحظي:</span>
                  </span>
                  <span className={`text-xs font-black px-3 py-1 rounded-full ${
                    simulationState.isActive ? 'bg-rose-600 text-white animate-pulse' : 'bg-emerald-600/30 text-emerald-300'
                  }`}>
                    {simulationState.isActive ? '🚨 إنذار الطوارئ نشط الآن!' : '✅ النظام في الحالة الآمنة'}
                  </span>
                </div>

                <p className="text-xs text-emerald-200/80 leading-relaxed">
                  عند تشغيل الإنذار بالخفاء، سيتحول شريط النظام إلى اللون الأحمر التنبيهي، وسيظهر وهج الطوارئ على المخطط ثلاثي الأبعاد للتوأم الرقمي، ويبدأ حساب تقدم الإخلاء وتوجيه الشاغلين لأقرب مخرج طوارئ (DOOR-00382).
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {!simulationState.isActive ? (
                    <button
                      onClick={() => {
                        startSimulation('FIRE_ALARM');
                        setNoticeMessage('🚨 تم إطلاق إنذار الحريق بنجاح! انتقل لشاشة التوأم الرقمي أو محاكي الطوارئ للمشاهدة.');
                      }}
                      className="py-3 px-4 rounded-2xl bg-gradient-to-r from-rose-600 via-rose-500 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white text-xs font-black flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(225,29,72,0.6)] cursor-pointer transition-all hover:scale-[1.02]"
                    >
                      <Flame className="w-5 h-5 animate-bounce" />
                      <span>إطلاق إنذار حريق ذكي فوري (الدور 3) 🔥</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        stopSimulation();
                        setNoticeMessage('✅ تم إيقاف حالة الطوارئ وإعادة المبنى للحالة الطبيعية المستقرة.');
                      }}
                      className="py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-xs font-black flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-all hover:scale-[1.02]"
                    >
                      <BellOff className="w-5 h-5" />
                      <span>إيقاف الإنذار وتصفير الحالة الآمنة</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      startSimulation('LEAK');
                      setNoticeMessage('⚠️ تم تشغيل محاكاة تسريب كيميائي بالدور الأرضي B1.');
                    }}
                    className="py-3 px-4 rounded-2xl bg-[#082a1c] hover:bg-[#0c3926] border border-amber-400/40 text-amber-300 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span>محاكاة تسريب غاز / كيميائي (B1)</span>
                  </button>
                </div>
              </div>

              {/* Database Reseed tool */}
              <div className="p-4 rounded-2xl bg-[#02120a] border border-emerald-500/25 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white">إعادة ضبط وتغذية بيانات Firestore الأولية:</h4>
                  <p className="text-[11px] text-emerald-400/70">استعادة 10 مجموعات من الأصول والمباني والتصاريح الافتراضية</p>
                </div>
                <button
                  disabled={isSeedingDatabase}
                  onClick={async () => {
                    await forceReseedDatabase();
                    setNoticeMessage('تمت إعادة تهيئة ومزامنة قاعدة بيانات Firestore بنجاح!');
                  }}
                  className="px-3.5 py-2 rounded-xl bg-[#06291a] hover:bg-[#0a3a25] border border-emerald-400/40 text-emerald-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 text-emerald-400 ${isSeedingDatabase ? 'animate-spin' : ''}`} />
                  <span>{isSeedingDatabase ? 'جاري التهيئة...' : 'إعادة ضبط البيانات (Reseed)'}</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: INSTANT INCIDENT DISRUPTION */}
          {activeTab === 'quick-incident' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#02120a] border border-amber-400/30 space-y-3">
                <h3 className="text-xs font-bold text-amber-300 flex items-center gap-2">
                  <Edit3 className="w-4 h-4" />
                  <span>توليد عطل مباشر على أي أصل في التوأم الرقمي (Live Asset Disruption):</span>
                </h3>
                <p className="text-[11px] text-emerald-300/80">
                  اختر أصلاً من المبنى واضغط "إرسال البلاغ فوراً"، سيتحول لونه في التوأم الرقمي إلى البرتقالي ويتم إسناد مهمة صيانة عاجلة للفني م. تركي تلقائياً.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-[11px] text-emerald-300 font-bold mb-1">اختر الأصل المستهدف:</label>
                    <select
                      value={selectedAssetCode}
                      onChange={(e) => setSelectedAssetCode(e.target.value)}
                      className="w-full py-2 px-3 rounded-xl bg-[#051c11] border border-emerald-500/40 text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      {assets.map(asset => (
                        <option key={asset.id} value={asset.code}>
                          {asset.code} — {asset.name} ({asset.floorName})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] text-emerald-300 font-bold mb-1">مستوى الأولوية:</label>
                    <select
                      value={incidentPriority}
                      onChange={(e) => setIncidentPriority(e.target.value as any)}
                      className="w-full py-2 px-3 rounded-xl bg-[#051c11] border border-emerald-500/40 text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="حرجة">حرجة (خطر فوري - أحمر)</option>
                      <option value="عالية">عالية (برتقالي)</option>
                      <option value="متوسطة">متوسطة (أصفر)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-emerald-300 font-bold mb-1">وصف مخصص للبلاغ (اختياري):</label>
                  <input
                    type="text"
                    value={incidentCustomTitle}
                    onChange={(e) => setIncidentCustomTitle(e.target.value)}
                    placeholder="مثال: انخفاض مفاجئ في ضغط طفاية الحريق بالردهة الشرقية..."
                    className="w-full py-2 px-3 rounded-xl bg-[#051c11] border border-emerald-500/40 text-xs text-white focus:outline-none focus:border-amber-400 placeholder:text-emerald-500/50"
                  />
                </div>

                <button
                  onClick={handleTriggerCustomIncident}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-[#061810] text-xs font-black flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(229,176,68,0.4)] cursor-pointer transition-all hover:scale-[1.01]"
                >
                  <Send className="w-4 h-4" />
                  <span>إرسال البلاغ وتحديث التوأم الرقمي وقاعدة البيانات الآن</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: TASKS & INCIDENTS LIVE RESOLVER */}
          {activeTab === 'tasks-state' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">قائمة مهام الصيانة النشطة وتغيير حالتها لحظياً:</span>
                <span className="text-[11px] text-amber-400 font-mono font-bold">إجمالي المهام: {tasks.length}</span>
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {tasks.map(task => (
                  <div 
                    key={task.id} 
                    className="p-3 rounded-2xl bg-[#02120a] border border-emerald-500/25 flex flex-wrap items-center justify-between gap-2"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-amber-400">{task.id}</span>
                        <span className="text-xs font-bold text-white">{task.title}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          task.status === 'completed' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                        }`}>
                          {task.status === 'completed' ? 'مكتملة ومغلقة' : 'قيد الانتظار'}
                        </span>
                      </div>
                      <p className="text-[10px] text-emerald-400/70 mt-1">
                        الأصل: <strong className="text-white">{task.assetCode || 'عام'}</strong> | الفني: {task.technicianName}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {task.status !== 'completed' ? (
                        <button
                          onClick={async () => {
                            await updateTaskStatus(task.id, 'completed', 'تمت المعايرة والإصلاح وإغلاق البلاغ بنجاح');
                            setNoticeMessage(`تم إغلاق المهمة (${task.id}) وعاد الأصل للحالة السليمة الخضراء!`);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-black flex items-center gap-1 cursor-pointer transition-all shadow-md"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>إغلاق المهمة كمنجزة</span>
                        </button>
                      ) : (
                        <button
                          onClick={async () => {
                            await updateTaskStatus(task.id, 'pending', 'إعادة فتح المهمة للفحص');
                            setNoticeMessage(`تمت إعادة فتح المهمة (${task.id}).`);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-[#082a1c] hover:bg-[#0c3926] border border-amber-400/40 text-amber-300 text-[11px] font-bold cursor-pointer"
                        >
                          <span>إعادة فتح</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: USERS & ROLES */}
          {activeTab === 'users' && (
            <div className="space-y-4">
              {/* Switch active persona */}
              <div className="p-4 rounded-2xl bg-[#02120a] border border-emerald-500/30 space-y-3">
                <span className="text-xs font-bold text-white block">تبديل المستخدم الحالي في الجلسة:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {allStaff.map(staff => (
                    <button
                      key={staff.id}
                      onClick={() => {
                        switchStaff(staff.id);
                        setNoticeMessage(`تم التبديل إلى حساب: ${staff.name} (${staff.role})`);
                      }}
                      className={`p-2.5 rounded-xl flex items-center justify-between text-right transition-all cursor-pointer ${
                        currentStaff.id === staff.id
                          ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-[#061810] font-black shadow-md'
                          : 'bg-[#051c11] text-emerald-200 border border-emerald-500/30 hover:border-amber-400/50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <img src={staff.avatarUrl} className="w-7 h-7 rounded-full object-cover border border-amber-400" />
                        <div>
                          <p className="text-xs font-bold leading-none">{staff.name}</p>
                          <p className="text-[10px] opacity-75 mt-0.5">{staff.role}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-black/20">
                        {staff.roleType === 'manager' ? 'إدارة' : 'ميداني'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Add New Mock User Form */}
              <div className="p-4 rounded-2xl bg-[#02120a] border border-emerald-500/30 space-y-3">
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <UserPlus className="w-4 h-4" />
                  <span>إضافة مستخدم / فني جديد للنظام:</span>
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="اسم الموظف الجديد..."
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    className="py-2 px-3 rounded-xl bg-[#051c11] border border-emerald-500/40 text-xs text-white placeholder:text-emerald-500/50"
                  />
                  <input
                    type="text"
                    placeholder="المسمى الوظيفي..."
                    value={newUserRole}
                    onChange={(e) => setNewUserRole(e.target.value)}
                    className="py-2 px-3 rounded-xl bg-[#051c11] border border-emerald-500/40 text-xs text-white placeholder:text-emerald-500/50"
                  />
                  <button
                    onClick={() => {
                      if (!newUserName.trim()) return;
                      setNoticeMessage(`تمت إضافة المستخدم (${newUserName}) بنجاح للنظام وقاعدة البيانات.`);
                      setNewUserName('');
                    }}
                    className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1 cursor-pointer transition-all shadow-md"
                  >
                    <Plus className="w-4 h-4" />
                    <span>إضافة الموظف</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Close */}
        <div className="p-3.5 bg-[#02120a] border-t border-emerald-500/30 flex items-center justify-between text-xs">
          <span className="text-emerald-400/70 text-[11px]">
            ⚡ جميع التغييرات تنعكس مباشرة عبر كل الشاشات والمحاكيات
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-[#082a1c] hover:bg-[#0c3926] text-amber-300 font-bold border border-amber-400/40 cursor-pointer"
          >
            إغلاق وحدة التحكم
          </button>
        </div>
      </div>
    </div>
  );
};
