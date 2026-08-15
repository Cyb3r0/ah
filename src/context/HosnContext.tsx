import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  StaffMember, 
  DigitalTwinAsset, 
  FloorLevel, 
  TaskItem, 
  ReportItem, 
  SimulationState, 
  SimulationType,
  SimulationStep,
  ScreenId,
  BuildingDocument,
  ZoneDocument,
  VisitorRecord,
  ContractorRecord,
  FirestoreEvent
} from '../types';
import { 
  saudiStaffMembers, 
  buildingFloors, 
  initialDigitalTwinAssets, 
  initialTasks, 
  initialReports, 
  fireAlarmSimulationSteps 
} from '../data/mockData';
import {
  seedFirestoreDatabase,
  subscribeToAssets,
  subscribeToIncidents,
  subscribeToWorkOrders,
  subscribeToEvents,
  createIncidentAndTaskInFirestore,
  resolveTaskInFirestore,
  triggerEmergencyInFirestore,
  resetEmergencyInFirestore,
  initialBuildings,
  initialZones,
  initialVisitors,
  initialContractors,
  initialEvents
} from '../services/firestoreService';

interface HosnContextType {
  currentStaff: StaffMember;
  allStaff: StaffMember[];
  switchStaff: (staffId: string) => void;
  buildings: BuildingDocument[];
  floors: FloorLevel[];
  zones: ZoneDocument[];
  selectedFloor: number;
  setSelectedFloor: (floorNum: number) => void;
  assets: DigitalTwinAsset[];
  selectedAsset: DigitalTwinAsset | null;
  setSelectedAsset: (asset: DigitalTwinAsset | null) => void;
  selectAssetByCode: (code: string) => DigitalTwinAsset | null;
  tasks: TaskItem[];
  reports: ReportItem[];
  events: FirestoreEvent[];
  visitors: VisitorRecord[];
  contractors: ContractorRecord[];
  createIncidentFromAsset: (assetCode: string, title?: string, priority?: TaskItem['priority']) => Promise<{ reportId: string; taskId: string }>;
  createManualReport: (report: Omit<ReportItem, 'id' | 'timestamp'>) => Promise<string>;
  updateTaskStatus: (taskId: string, status: TaskItem['status'], resolutionNotes?: string) => Promise<void>;
  simulationState: SimulationState;
  startSimulation: (type: SimulationType) => void;
  stopSimulation: () => void;
  advanceSimulationStep: () => void;
  searchFilter: string;
  setSearchFilter: (query: string) => void;
  lastCreatedIncidentId: string | null;
  isFirebaseConnected: boolean;
  isSeedingDatabase: boolean;
  forceReseedDatabase: () => Promise<void>;
}

const HosnContext = createContext<HosnContextType | undefined>(undefined);

const initialSimulation: SimulationState = {
  isActive: false,
  type: 'FIRE_ALARM',
  title: 'محاكاة إنذار الحريق الذكي والإخلاء الآمن',
  affectedFloor: 3,
  affectedZone: 'قطاع ب - الجناح الشرقي',
  affectedAssetCode: 'SD-104',
  currentStepIndex: 0,
  steps: fireAlarmSimulationSteps,
  evacueesCount: 342,
  peopleWithSpecialNeedsCount: 1,
  evacuationProgress: 0,
  safeExits: ['DOOR-00382', 'مخرج الدرج الشمالي الغربي'],
  activeAlarmTone: false,
};

export const HosnProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStaff, setCurrentStaff] = useState<StaffMember>(() => {
    const saved = localStorage.getItem('hosn_current_staff');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* use default */ }
    }
    return saudiStaffMembers[0]; // م. سارة العتيبي (المديرة)
  });

  const [buildings, setBuildings] = useState<BuildingDocument[]>(initialBuildings);
  const [zones, setZones] = useState<ZoneDocument[]>(initialZones);
  const [visitors, setVisitors] = useState<VisitorRecord[]>(initialVisitors);
  const [contractors, setContractors] = useState<ContractorRecord[]>(initialContractors);
  const [events, setEvents] = useState<FirestoreEvent[]>(initialEvents);

  const [selectedFloor, setSelectedFloor] = useState<number>(3); // الدور الثالث
  const [assets, setAssets] = useState<DigitalTwinAsset[]>(initialDigitalTwinAssets);
  const [selectedAsset, setSelectedAsset] = useState<DigitalTwinAsset | null>(initialDigitalTwinAssets[0]); // FE-00892 by default
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);
  const [reports, setReports] = useState<ReportItem[]>(initialReports);

  const [simulationState, setSimulationState] = useState<SimulationState>(initialSimulation);
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [lastCreatedIncidentId, setLastCreatedIncidentId] = useState<string | null>(null);
  const [isFirebaseConnected, setIsFirebaseConnected] = useState<boolean>(true);
  const [isSeedingDatabase, setIsSeedingDatabase] = useState<boolean>(false);

  // 1. Initial Firestore Bootstrap & Seed Check
  useEffect(() => {
    let mounted = true;
    const initDatabase = async () => {
      try {
        setIsSeedingDatabase(true);
        await seedFirestoreDatabase(false);
        if (mounted) {
          setIsFirebaseConnected(true);
        }
      } catch (err) {
        console.warn('[HosnContext] Firestore initial connection note:', err);
      } finally {
        if (mounted) setIsSeedingDatabase(false);
      }
    };

    initDatabase();
    return () => { mounted = false; };
  }, []);

  // 2. Real-time Subscriptions to Firestore Collections
  useEffect(() => {
    const unsubAssets = subscribeToAssets((liveAssets) => {
      setAssets(liveAssets);
      // Keep selectedAsset up to date
      setSelectedAsset(prev => {
        if (!prev) return liveAssets[0] || null;
        const matched = liveAssets.find(a => a.code === prev.code);
        return matched || prev;
      });
    });

    const unsubIncidents = subscribeToIncidents((liveIncidents) => {
      setReports(liveIncidents);
    });

    const unsubWorkOrders = subscribeToWorkOrders((liveTasks) => {
      setTasks(liveTasks);
    });

    const unsubEvents = subscribeToEvents((liveEvents) => {
      setEvents(liveEvents);
    });

    return () => {
      unsubAssets();
      unsubIncidents();
      unsubWorkOrders();
      unsubEvents();
    };
  }, []);

  // Save current staff in localStorage
  useEffect(() => {
    localStorage.setItem('hosn_current_staff', JSON.stringify(currentStaff));
  }, [currentStaff]);

  // Simulation timer engine
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (simulationState.isActive && simulationState.currentStepIndex < simulationState.steps.length - 1) {
      timer = setTimeout(() => {
        setSimulationState(prev => {
          const nextIndex = prev.currentStepIndex + 1;
          const progress = Math.min(100, Math.round(((nextIndex + 1) / prev.steps.length) * 100));
          return {
            ...prev,
            currentStepIndex: nextIndex,
            evacuationProgress: progress,
          };
        });
      }, 3500); // Progress step every 3.5 seconds
    }
    return () => clearTimeout(timer);
  }, [simulationState.isActive, simulationState.currentStepIndex]);

  const switchStaff = (staffId: string) => {
    const found = saudiStaffMembers.find(s => s.id === staffId);
    if (found) {
      setCurrentStaff(found);
    }
  };

  const selectAssetByCode = (code: string) => {
    const asset = assets.find(a => a.code.toLowerCase() === code.toLowerCase());
    if (asset) {
      setSelectedAsset(asset);
      setSelectedFloor(asset.floor);
      return asset;
    }
    return null;
  };

  const forceReseedDatabase = async () => {
    setIsSeedingDatabase(true);
    try {
      await seedFirestoreDatabase(true);
    } catch (e) {
      console.error('Failed to reseed:', e);
    } finally {
      setIsSeedingDatabase(false);
    }
  };

  // 🔥 🔴 THE STAR LIFECYCLE: Create Incident from Digital Twin Asset + Firestore Persistence
  const createIncidentFromAsset = async (
    assetCode: string, 
    customTitle?: string, 
    customPriority: TaskItem['priority'] = 'حرجة'
  ) => {
    const asset = assets.find(a => a.code === assetCode);
    const dateStr = new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });
    const reportId = `INC-${Date.now().toString().slice(-4)}`;
    const taskId = `T-${Date.now().toString().slice(-3)}`;

    const title = customTitle || `بلاغ فحص طارئ للأصل ${assetCode} (${asset?.name || ''})`;

    const newReport: ReportItem = {
      id: reportId,
      title: title,
      location: `برج حُصن - ${asset?.floorName || 'الدور الثالث'} (${asset?.zone || 'القطاع الشرقي'})`,
      floor: asset?.floorName || 'الدور الثالث',
      timestamp: `${dateStr} - اليوم`,
      type: asset?.type === 'extinguisher' ? 'سلامة' : asset?.type === 'emergency_door' ? 'أمن' : 'كهرباء',
      priority: customPriority === 'حرجة' ? 'خطر فوري' : 'عاجل',
      photos: [asset?.imageUrl || 'https://images.unsplash.com/photo-1599818818556-9b578c773a46?w=400&auto=format&fit=crop&q=80'],
      description: `تم إنشاء البلاغ مباشرة من الـ Digital Twin بواسطة ${currentStaff.name}. مطلوب فحص فوري ومعايرة للأصل ${assetCode}.`,
      assetCode: assetCode,
      status: 'assigned',
      assignedTech: 'م. تركي الشمري',
    };

    const newTask: TaskItem = {
      id: taskId,
      title: `فحص وصيانة الأصل: ${assetCode}`,
      priority: customPriority,
      priorityColor: customPriority === 'حرجة' ? 'red' : customPriority === 'عالية' ? 'orange' : 'yellow',
      building: 'برج حُصن - المقر الرئيسي',
      floor: asset?.floorName || 'الدور الثالث',
      timeElapsed: 'الآن',
      status: 'pending',
      category: 'مهام الـ Digital Twin المباشرة',
      description: `مهمة صيانة صادرة عن البلاغ (${reportId}). الأصل: ${asset?.name || assetCode}. الموقع: ${asset?.zone || 'الجناح الشرقي'}.`,
      assetCode: assetCode,
      technicianName: 'م. تركي الشمري',
      createdTime: dateStr,
    };

    // 1. Optimistic Local State Update
    setReports(prev => [newReport, ...prev]);
    setTasks(prev => [newTask, ...prev]);
    setLastCreatedIncidentId(reportId);

    setAssets(prev => prev.map(a => {
      if (a.code === assetCode) {
        return {
          ...a,
          status: 'تحت الصيانة',
          statusColor: 'orange',
          linkedIncidentId: reportId,
        };
      }
      return a;
    }));

    // 2. Real Firestore Cloud Persistence
    createIncidentAndTaskInFirestore(newReport, newTask, assetCode).catch(e => {
      console.warn('[Firestore] Background save note:', e);
    });

    return { reportId, taskId };
  };

  const createManualReport = async (reportData: Omit<ReportItem, 'id' | 'timestamp'>) => {
    const reportId = `INC-${Date.now().toString().slice(-4)}`;
    const taskId = `T-${Date.now().toString().slice(-3)}`;
    const dateStr = new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });

    const newReport: ReportItem = {
      ...reportData,
      id: reportId,
      timestamp: `${dateStr} - اليوم`,
      assignedTech: 'م. تركي الشمري',
      status: 'assigned',
    };

    const newTask: TaskItem = {
      id: taskId,
      title: reportData.title,
      priority: reportData.priority === 'خطر فوري' ? 'حرجة' : reportData.priority === 'عاجل' ? 'عالية' : 'متوسطة',
      priorityColor: reportData.priority === 'خطر فوري' ? 'red' : reportData.priority === 'عاجل' ? 'orange' : 'yellow',
      building: 'برج حُصن الرئيسي',
      floor: reportData.floor || 'الدور الثالث',
      timeElapsed: 'الآن',
      status: 'pending',
      category: 'بلاغ عمليات',
      description: reportData.description,
      assetCode: reportData.assetCode,
      technicianName: 'م. تركي الشمري',
      createdTime: dateStr,
    };

    setReports(prev => [newReport, ...prev]);
    setTasks(prev => [newTask, ...prev]);
    setLastCreatedIncidentId(reportId);

    // Save to Firestore
    createIncidentAndTaskInFirestore(newReport, newTask, reportData.assetCode).catch(e => {
      console.warn('[Firestore] Manual report save note:', e);
    });

    return reportId;
  };

  // 🔥 🔴 CLOSED LOOP: Technician resolves task & Manager sees real update
  const updateTaskStatus = async (taskId: string, newStatus: TaskItem['status'], resolutionNotes?: string) => {
    const nowTime = new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });
    let updatedAssetCode: string | undefined;

    // 1. Optimistic Local State
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        updatedAssetCode = t.assetCode;
        return {
          ...t,
          status: newStatus,
          resolutionNotes: resolutionNotes || t.resolutionNotes,
          resolvedAt: newStatus === 'completed' ? nowTime : undefined,
        };
      }
      return t;
    }));

    if (newStatus === 'completed') {
      setReports(prev => prev.map(r => {
        if (r.assetCode && r.assetCode === updatedAssetCode) {
          return { ...r, status: 'resolved' };
        }
        return r;
      }));

      if (updatedAssetCode) {
        setAssets(prev => prev.map(a => {
          if (a.code === updatedAssetCode) {
            return {
              ...a,
              status: 'جاهز',
              statusColor: 'green',
              lastInspection: 'اليوم (تمت الصيانة)',
              notes: resolutionNotes ? `آخر تحديث: ${resolutionNotes}` : a.notes,
            };
          }
          return a;
        }));
      }

      // 2. Persist to Firestore
      resolveTaskInFirestore(taskId, updatedAssetCode, resolutionNotes || 'تمت المعايرة بنجاح', nowTime).catch(e => {
        console.warn('[Firestore] Task resolution save note:', e);
      });
    }
  };

  // 🔴 🔥 EMERGENCY SIMULATION ENGINE
  const startSimulation = (type: SimulationType) => {
    setSimulationState({
      ...initialSimulation,
      isActive: true,
      type: type,
      currentStepIndex: 0,
      evacuationProgress: 14,
      activeAlarmTone: true,
    });

    // Firestore emergency persistence
    triggerEmergencyInFirestore(3, 'ZN-3B', 'SD-104').catch(e => console.warn(e));
  };

  const stopSimulation = () => {
    setSimulationState({
      ...initialSimulation,
      isActive: false,
      currentStepIndex: 0,
      evacuationProgress: 0,
      activeAlarmTone: false,
    });

    // Firestore reset persistence
    resetEmergencyInFirestore().catch(e => console.warn(e));
  };

  const advanceSimulationStep = () => {
    setSimulationState(prev => {
      const nextIndex = Math.min(prev.steps.length - 1, prev.currentStepIndex + 1);
      const progress = Math.min(100, Math.round(((nextIndex + 1) / prev.steps.length) * 100));
      return {
        ...prev,
        currentStepIndex: nextIndex,
        evacuationProgress: progress,
      };
    });
  };

  return (
    <HosnContext.Provider
      value={{
        currentStaff,
        allStaff: saudiStaffMembers,
        switchStaff,
        buildings,
        floors: buildingFloors,
        zones,
        selectedFloor,
        setSelectedFloor,
        assets,
        selectedAsset,
        setSelectedAsset,
        selectAssetByCode,
        tasks,
        reports,
        events,
        visitors,
        contractors,
        createIncidentFromAsset,
        createManualReport,
        updateTaskStatus,
        simulationState,
        startSimulation,
        stopSimulation,
        advanceSimulationStep,
        searchFilter,
        setSearchFilter,
        lastCreatedIncidentId,
        isFirebaseConnected,
        isSeedingDatabase,
        forceReseedDatabase,
      }}
    >
      {children}
    </HosnContext.Provider>
  );
};

export const useHosn = () => {
  const context = useContext(HosnContext);
  if (!context) {
    throw new Error('useHosn must be used within a HosnProvider');
  }
  return context;
};
