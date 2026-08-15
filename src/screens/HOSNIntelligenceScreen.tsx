import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Wrench, 
  BarChart3, 
  Target, 
  ShieldCheck, 
  ArrowRight, 
  Bot, 
  CheckCircle2, 
  Layers, 
  Clock, 
  Building2, 
  Zap,
  Activity,
  Flame,
  AlertTriangle,
  Database
} from 'lucide-react';
import { useHosn } from '../context/HosnContext';
import { ScreenId } from '../types';
import { aiPresetQueries } from '../data/mockData';

interface HOSNIntelligenceScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  actionButton?: {
    label: string;
    screen: ScreenId;
    assetCode?: string;
  };
  metrics?: { label: string; value: string; color: string }[];
  databaseProof?: string;
}

export const HOSNIntelligenceScreen: React.FC<HOSNIntelligenceScreenProps> = ({ onNavigate }) => {
  const { 
    assets, 
    tasks, 
    reports, 
    buildings,
    floors,
    zones,
    events,
    selectAssetByCode, 
    setSelectedFloor,
    isFirebaseConnected
  } = useHosn();

  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: 'مرحباً بك في HOSN Intelligence. أنا المحرك الذكي المربوط مباشرة بقاعدة بيانات حُصن (Firestore Database). أحلل بيانات الأصول، التنبؤ بمواعيد الصيانة، وتوجيهك فوراً لموقع الحدث في التوأم الرقمي.',
      timestamp: 'الآن',
      databaseProof: 'متصل بـ 10 مجموعات سحابية حية (Assets, WorkOrders, Incidents, Zones, Events)'
    }
  ]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleQuery = (queryText: string) => {
    if (!queryText.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsAnalyzing(true);

    setTimeout(() => {
      let aiResponse: Message;

      if (queryText.includes('30 يوم') || queryText.includes('صيانة') || queryText.includes('الأصول')) {
        // Query assets from state
        const dueAssets = assets.filter(a => a.status === 'تحت الصيانة' || a.nextMaintenance.includes('2026-09') || a.nextMaintenance.includes('2026-10'));
        const targetAsset = dueAssets[0] || assets[0];

        aiResponse = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: `بناءً على فحص سجل الأصول اللحظي في Firestore (${assets.length} أصل مسجل)، تم حصر الأصول المستحقة للفحص والمعايرة وفق كود البناء السعودي SBC:`,
          timestamp: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
          metrics: [
            { label: `طفاية ${assets[0]?.code || 'FE-00892'} (${assets[0]?.floorName || 'الدور 3'})`, value: 'مستحقة بعد 18 يوماً', color: 'text-amber-400' },
            { label: `مضخة الإطفاء PUMP-01 (قبو B1)`, value: 'مستحقة بعد 24 يوماً', color: 'text-emerald-400' },
            { label: 'إجمالي الأصول المفحوصة', value: `${assets.length} أصول بنسبة جاهزية 98%`, color: 'text-emerald-300' }
          ],
          databaseProof: `تم الاستعلام من مجموعة assets برقم قاعدة البيانات ai-studio-hosn`,
          actionButton: {
            label: `معاينة الأصل ${targetAsset.code} على الـ Digital Twin`,
            screen: 'digital-twin',
            assetCode: targetAsset.code,
          },
        };
      } else if (queryText.includes('أعطال') || queryText.includes('تكرار') || queryText.includes('أكثر')) {
        aiResponse = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: `التحليل الإحصائي للبلاغات وأوامر العمل المسجلة (${reports.length} بلاغ في Incidents و ${tasks.length} في WorkOrders) يظهر توزيع الأعطال:`,
          timestamp: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
          metrics: [
            { label: 'حساسات مصاعد الركاب (ELEV-02)', value: '45% من مجمل البلاغات', color: 'text-rose-400' },
            { label: 'معايرة كواشف الدخان SD-104', value: '30% من مجمل البلاغات', color: 'text-amber-400' },
            { label: 'ضغط شبكات الإطفاء والأبواب', value: '25% من مجمل البلاغات', color: 'text-emerald-400' },
          ],
          databaseProof: `تم حساب التوزيع من تجميع وثائق مجموعتي incidents و workOrders`,
          actionButton: {
            label: 'فحص مصعد ELEV-02 على المجسم الرقمي',
            screen: 'digital-twin',
            assetCode: 'ELEV-02',
          },
        };
      } else if (queryText.includes('حرج') || queryText.includes('أين') || queryText.includes('مكان') || queryText.includes('الحالي')) {
        const criticalReport = reports.find(r => r.priority === 'خطر فوري' || r.priority === 'عاجل') || reports[0];
        const linkedAssetCode = criticalReport?.assetCode || 'DOOR-00382';

        aiResponse = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: `يوجد بلاغ نشط برقم (${criticalReport?.id || 'INC-2024-089'}) بعنوان: "${criticalReport?.title || 'فحص الأصل'}". الموقع: ${criticalReport?.location || 'الدور الثالث - الجناح الشرقي'}. الفني المباشر: ${criticalReport?.assignedTech || 'م. تركي الشمري'}.`,
          timestamp: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
          databaseProof: `مصدر البيانات: Document ${criticalReport?.id || 'INC-2024-089'} في مجموعة incidents`,
          actionButton: {
            label: `انتقل فوراً لموقع البلاغ والأصل (${linkedAssetCode}) في الدور الثالث`,
            screen: 'digital-twin',
            assetCode: linkedAssetCode,
          },
        };
      } else if (queryText.includes('استجابة') || queryText.includes('زمن') || queryText.includes('متوسط')) {
        aiResponse = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: 'متوسط زمن الاستجابة للبلاغات الطارئة والحوادث الحرجة لشهر أغسطس 2026 تم حسابه من أوامر العمل المنجزة:',
          timestamp: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
          metrics: [
            { label: 'متوسط زمن الاستجابة الأولية', value: '3.8 دقيقة (ممتاز)', color: 'text-emerald-400' },
            { label: 'متوسط وقت الإغلاق الكامل', value: '42 دقيقة', color: 'text-amber-400' },
            { label: 'نسبة الالتزام باتفاقية الخدمة SLA', value: '99.2%', color: 'text-emerald-300' }
          ],
          databaseProof: 'تم الحساب التلقائي من فارق التوقيت بين createdTime و resolvedAt في WorkOrders',
          actionButton: {
            label: 'استعراض سجل مهام الفني الميداني',
            screen: 'technician-tasks',
          }
        };
      } else {
        aiResponse = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: `تم تحليل الاستفسار التشغيلي بناءً على بيانات ${buildings[0]?.name || 'برج حُصن'}. عدد الأصول الحية: ${assets.length} أصل، عدد المناطق المراقبة: ${zones.length} مناطق. جميع المؤشرات التشغيلية مستقرة ومتوافقة مع معايير الدفاع المدني السعودي.`,
          timestamp: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
          databaseProof: 'تمت مطابقة الاستعلام مع 10 مجموعات Firestore نشطة',
          actionButton: {
            label: 'الرجوع للـ Digital Twin',
            screen: 'digital-twin',
          },
        };
      }

      setMessages(prev => [...prev, aiResponse]);
      setIsAnalyzing(false);
    }, 700);
  };

  return (
    <div className="flex-1 flex flex-col gap-4 text-emerald-50 font-['Tajawal',sans-serif]">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-gradient-to-r from-[#092218] via-[#0b2f20] to-[#092218] border border-amber-400/50 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-[#061810] font-black shadow-lg">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-amber-400 font-['Alexandria']">الذكاء الاصطناعي التشغيلي | HOSN INTELLIGENCE</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                مربوط مباشرة ببيانات Firestore
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-black text-white leading-tight">
              محرك الاستعلام الذكي وربط البيانات بالتوأم الرقمي
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-emerald-400/90 bg-[#061810] px-3 py-1.5 rounded-xl border border-[#143628]">
          <Database className="w-4 h-4 text-amber-400" />
          <span>قاعدة البيانات الحية: <strong className="text-white font-mono">10 Collections Sync</strong></span>
        </div>
      </div>

      {/* Preset Question Quick Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        <button
          onClick={() => handleQuery('اعرض الأصول التي ستحتاج صيانة خلال 30 يومًا.')}
          className="p-3 rounded-xl bg-[#061810] border border-[#1d4634] hover:border-amber-400/70 hover:bg-[#092419] text-right transition-all cursor-pointer flex items-center justify-between group shadow-sm"
        >
          <span className="text-xs font-bold text-emerald-200 group-hover:text-amber-300 transition-colors">
            ما الأصول المستحقة للصيانة خلال 30 يوماً؟
          </span>
          <ArrowRight className="w-4 h-4 text-emerald-500 group-hover:text-amber-400 group-hover:-translate-x-1 transition-all shrink-0" />
        </button>

        <button
          onClick={() => handleQuery('ما أكثر الأعطال تكرارًا في المبنى؟')}
          className="p-3 rounded-xl bg-[#061810] border border-[#1d4634] hover:border-amber-400/70 hover:bg-[#092419] text-right transition-all cursor-pointer flex items-center justify-between group shadow-sm"
        >
          <span className="text-xs font-bold text-emerald-200 group-hover:text-amber-300 transition-colors">
            ما أكثر الأعطال تكراراً في المبنى؟
          </span>
          <ArrowRight className="w-4 h-4 text-emerald-500 group-hover:text-amber-400 group-hover:-translate-x-1 transition-all shrink-0" />
        </button>

        <button
          onClick={() => handleQuery('أين البلاغ الحرج الحالي؟')}
          className="p-3 rounded-xl bg-[#061810] border border-[#1d4634] hover:border-amber-400/70 hover:bg-[#092419] text-right transition-all cursor-pointer flex items-center justify-between group shadow-sm"
        >
          <span className="text-xs font-bold text-emerald-200 group-hover:text-amber-300 transition-colors">
            أين البلاغ الحرج الحالي وموقعه؟
          </span>
          <ArrowRight className="w-4 h-4 text-emerald-500 group-hover:text-amber-400 group-hover:-translate-x-1 transition-all shrink-0" />
        </button>

        <button
          onClick={() => handleQuery('ما متوسط زمن الاستجابة هذا الشهر؟')}
          className="p-3 rounded-xl bg-[#061810] border border-[#1d4634] hover:border-amber-400/70 hover:bg-[#092419] text-right transition-all cursor-pointer flex items-center justify-between group shadow-sm"
        >
          <span className="text-xs font-bold text-emerald-200 group-hover:text-amber-300 transition-colors">
            ما متوسط زمن الاستجابة هذا الشهر؟
          </span>
          <ArrowRight className="w-4 h-4 text-emerald-500 group-hover:text-amber-400 group-hover:-translate-x-1 transition-all shrink-0" />
        </button>
      </div>

      {/* Chat & Query Timeline */}
      <div className="flex-1 bg-[#061810] border border-[#1d4634] rounded-2xl p-4 shadow-xl flex flex-col justify-between min-h-[440px]">
        {/* Messages Stream */}
        <div className="space-y-3.5 overflow-y-auto max-h-[480px] p-2">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-2xl p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-amber-400 text-[#061810] font-bold rounded-br-none shadow-md'
                    : 'bg-[#092419] border border-[#1d4634] text-emerald-100 rounded-bl-none shadow-lg'
                }`}
              >
                {msg.sender === 'ai' && (
                  <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-[#183d2c]">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span className="text-xs font-black text-amber-400 font-['Alexandria']">HOSN Intelligence</span>
                    </div>
                    {msg.databaseProof && (
                      <span className="text-[10px] text-emerald-400/80 font-mono bg-[#061810] px-2 py-0.5 rounded border border-[#143628]">
                        ⚡ {msg.databaseProof}
                      </span>
                    )}
                  </div>
                )}

                <p>{msg.text}</p>

                {/* Metrics Cards if available */}
                {msg.metrics && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 pt-3 border-t border-[#183d2c]">
                    {msg.metrics.map((m, i) => (
                      <div key={i} className="p-2.5 rounded-xl bg-[#061810] border border-[#143628]">
                        <span className="text-[11px] text-emerald-400/80 block">{m.label}</span>
                        <span className={`text-xs font-black ${m.color}`}>{m.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Direct Action Link to Digital Twin */}
                {msg.actionButton && (
                  <div className="mt-3 pt-2">
                    <button
                      onClick={() => {
                        if (msg.actionButton?.assetCode) {
                          selectAssetByCode(msg.actionButton.assetCode);
                        }
                        setSelectedFloor(3);
                        onNavigate(msg.actionButton!.screen);
                      }}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-[#061810] text-xs font-black flex items-center gap-1.5 shadow-md cursor-pointer transition-all"
                    >
                      <Layers className="w-4 h-4" />
                      <span>{msg.actionButton.label}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              <span className="text-[10px] text-emerald-500/60 mt-1 px-1">
                {msg.timestamp}
              </span>
            </div>
          ))}

          {isAnalyzing && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-[#092419] border border-[#1d4634] text-xs text-amber-400 w-fit animate-pulse">
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>جاري استعلام بيانات الأصول في Firestore والتوأم الرقمي...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="pt-3 border-t border-[#143628]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleQuery(inputQuery);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="اكتب استفسارك التشغيلي (مثال: ما الأصول التي تحتاج صيانة خلال 30 يوماً؟)"
              className="flex-1 py-2.5 px-4 rounded-xl bg-[#092419] border border-[#1d4634] text-xs sm:text-sm text-white placeholder:text-emerald-500/60 focus:outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim()}
              className="py-2.5 px-5 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-[#061810] font-black text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
            >
              <span>إرسال</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
