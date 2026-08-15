import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  updateDoc, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  limit,
  serverTimestamp,
  writeBatch
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { 
  BuildingDocument, 
  FloorLevel, 
  ZoneDocument, 
  DigitalTwinAsset, 
  ReportItem, 
  TaskItem, 
  StaffMember, 
  VisitorRecord, 
  ContractorRecord, 
  FirestoreEvent 
} from '../types';
import { 
  buildingFloors, 
  initialDigitalTwinAssets, 
  initialTasks, 
  initialReports, 
  saudiStaffMembers 
} from '../data/mockData';

// Collection Names
export const COLLECTIONS = {
  BUILDINGS: 'buildings',
  FLOORS: 'floors',
  ZONES: 'zones',
  ASSETS: 'assets',
  INCIDENTS: 'incidents',
  WORK_ORDERS: 'workOrders',
  USERS: 'users',
  VISITORS: 'visitors',
  CONTRACTORS: 'contractors',
  EVENTS: 'events'
};

// Initial Seed Data for Buildings, Zones, Visitors, Contractors
export const initialBuildings: BuildingDocument[] = [
  {
    id: 'BLD-MAIN',
    code: 'BLD-MAIN',
    name: 'برج حُصن الذكي (المقر الرئيسي)',
    englishName: 'HOSN Headquarters Tower',
    city: 'الرياض - حي الملقا',
    floorsCount: 4,
    totalAssets: 48,
    activeAlarms: 0,
    status: 'operational'
  }
];

export const initialZones: ZoneDocument[] = [
  {
    id: 'ZN-3B',
    code: 'ZN-3B',
    buildingId: 'BLD-MAIN',
    floorNumber: 3,
    name: 'قطاع ب - الجناح الشرقي',
    wing: 'الشرقي',
    occupancyCount: 142,
    status: 'safe',
    safeExitId: 'DOOR-00382'
  },
  {
    id: 'ZN-3A',
    code: 'ZN-3A',
    buildingId: 'BLD-MAIN',
    floorNumber: 3,
    name: 'قطاع أ - الجناح الغربي والمدراء',
    wing: 'الغربي',
    occupancyCount: 88,
    status: 'safe',
    safeExitId: 'DOOR-00382'
  },
  {
    id: 'ZN-2A',
    code: 'ZN-2A',
    buildingId: 'BLD-MAIN',
    floorNumber: 2,
    name: 'قاعة الابتكار والمكاتب المفتوحة',
    wing: 'الشرقي',
    occupancyCount: 95,
    status: 'safe',
    safeExitId: 'DOOR-00382'
  },
  {
    id: 'ZN-0G',
    code: 'ZN-0G',
    buildingId: 'BLD-MAIN',
    floorNumber: 0,
    name: 'البهو الرئيسي والاستقبال العام',
    wing: 'القلب المركزي',
    occupancyCount: 65,
    status: 'safe',
    safeExitId: 'DOOR-00382'
  },
  {
    id: 'ZN-B1',
    code: 'ZN-B1',
    buildingId: 'BLD-MAIN',
    floorNumber: -1,
    name: 'غرفة المضخات المركزية وخزانات الإطفاء B1',
    wing: 'القلب المركزي',
    occupancyCount: 8,
    status: 'safe',
    safeExitId: 'DOOR-00382'
  }
];

export const initialVisitors: VisitorRecord[] = [
  {
    id: 'VIS-901',
    fullName: 'أحمد بن عبد الله المنصور',
    nationalIdOrIqama: '1092837465',
    company: 'أرامكو السعودية',
    hostEmployee: 'م. سارة العتيبي',
    purpose: 'مراجعة التقييم الأمني والسلامة',
    badgeNumber: 'V-042',
    status: 'active_inside',
    entryTime: '08:30 ص'
  },
  {
    id: 'VIS-902',
    fullName: 'م. ديفيد سميث',
    nationalIdOrIqama: '2491827364',
    company: 'شركة سيمنز لأنظمة التحكم',
    hostEmployee: 'م. تركي الشمري',
    purpose: 'معايرة لوحة التحكم الرئيسية',
    badgeNumber: 'V-019',
    status: 'approved',
    entryTime: '10:00 ص'
  }
];

export const initialContractors: ContractorRecord[] = [
  {
    id: 'CTR-01',
    companyName: 'مؤسسة درع الأمان لأنظمة الإطفاء والسلامة',
    contractNumber: 'CNT-2026-991',
    leadTechnician: 'م. عبد العزيز الدوسري',
    safetyPermitNumber: 'SASO-SP-8821',
    workScope: 'فحص دوري لشبكات الرش الآلي ومضخات الحريق',
    permitStatus: 'valid',
    expiryDate: '2026-12-31',
    authorizedZones: ['ZN-B1', 'ZN-3B', 'ZN-3A']
  },
  {
    id: 'CTR-02',
    companyName: 'شركة أوتيس للمصاعد والسلالم المتحركة',
    contractNumber: 'CNT-2026-402',
    leadTechnician: 'فني صيانة معتمد',
    safetyPermitNumber: 'SASO-SP-1102',
    workScope: 'صيانة وقائية دورية لمصاعد الركاب الذكية',
    permitStatus: 'valid',
    expiryDate: '2026-10-15',
    authorizedZones: ['ZN-0G', 'ZN-2A', 'ZN-3A', 'ZN-3B']
  }
];

export const initialEvents: FirestoreEvent[] = [
  {
    id: 'EVT-1001',
    type: 'IOT_TELEMETRY',
    title: 'قراءة دورية لشبكة الإطفاء',
    detail: 'ضغط مضخة الديزل PUMP-01 مستقر عند 12.8 Bar في قبو B1.',
    buildingId: 'BLD-MAIN',
    floorNumber: -1,
    zoneId: 'ZN-B1',
    assetCode: 'PUMP-01',
    severity: 'info',
    timestamp: 'منذ 10 دقائق',
    isSimulated: true
  },
  {
    id: 'EVT-1002',
    type: 'CCTV_ANOMALY',
    title: 'تحليل الرؤية الحاسوبية (CCTV AI)',
    detail: 'المسار أمام مخرج الطوارئ DOOR-00382 سالك بنسبة 100% وخالٍ من العوائق.',
    buildingId: 'BLD-MAIN',
    floorNumber: 3,
    zoneId: 'ZN-3B',
    assetCode: 'DOOR-00382',
    severity: 'info',
    timestamp: 'منذ 25 دقيقة',
    isSimulated: true
  }
];

// Seed Firestore Database Function
export const seedFirestoreDatabase = async (force: boolean = false): Promise<boolean> => {
  try {
    console.log('[Firestore] Checking if database seeding is required...');
    
    // Check if assets collection already has docs
    const assetsSnap = await getDocs(collection(db, COLLECTIONS.ASSETS));
    if (!force && !assetsSnap.empty) {
      console.log(`[Firestore] Database already seeded (${assetsSnap.size} assets found).`);
      return false;
    }

    console.log('[Firestore] Seeding all 10 collections...');
    const batch = writeBatch(db);

    // 1. Buildings
    initialBuildings.forEach(b => {
      const ref = doc(db, COLLECTIONS.BUILDINGS, b.id);
      batch.set(ref, b);
    });

    // 2. Floors
    buildingFloors.forEach(f => {
      const ref = doc(db, COLLECTIONS.FLOORS, f.id);
      batch.set(ref, f);
    });

    // 3. Zones
    initialZones.forEach(z => {
      const ref = doc(db, COLLECTIONS.ZONES, z.id);
      batch.set(ref, z);
    });

    // 4. Assets
    initialDigitalTwinAssets.forEach(a => {
      const ref = doc(db, COLLECTIONS.ASSETS, a.code);
      batch.set(ref, a);
    });

    // 5. Incidents / Reports
    initialReports.forEach(r => {
      const ref = doc(db, COLLECTIONS.INCIDENTS, r.id);
      batch.set(ref, r);
    });

    // 6. Work Orders / Tasks
    initialTasks.forEach(t => {
      const ref = doc(db, COLLECTIONS.WORK_ORDERS, t.id);
      batch.set(ref, t);
    });

    // 7. Users / Staff
    saudiStaffMembers.forEach(u => {
      const ref = doc(db, COLLECTIONS.USERS, u.id);
      batch.set(ref, u);
    });

    // 8. Visitors
    initialVisitors.forEach(v => {
      const ref = doc(db, COLLECTIONS.VISITORS, v.id);
      batch.set(ref, v);
    });

    // 9. Contractors
    initialContractors.forEach(c => {
      const ref = doc(db, COLLECTIONS.CONTRACTORS, c.id);
      batch.set(ref, c);
    });

    // 10. Events
    initialEvents.forEach(e => {
      const ref = doc(db, COLLECTIONS.EVENTS, e.id);
      batch.set(ref, e);
    });

    await batch.commit();
    console.log('[Firestore] Successfully seeded all 10 collections into Firestore!');
    return true;
  } catch (error) {
    console.error('[Firestore] Seeding error:', error);
    return false;
  }
};

// Real-Time Subscriptions
export const subscribeToAssets = (onUpdate: (assets: DigitalTwinAsset[]) => void) => {
  try {
    const assetsRef = collection(db, COLLECTIONS.ASSETS);
    return onSnapshot(assetsRef, (snapshot) => {
      if (!snapshot.empty) {
        const list = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as DigitalTwinAsset));
        onUpdate(list);
      }
    }, (err) => {
      console.warn('[Firestore] Asset subscription warning:', err);
    });
  } catch (err) {
    console.warn('[Firestore] Could not attach asset listener:', err);
    return () => {};
  }
};

export const subscribeToIncidents = (onUpdate: (incidents: ReportItem[]) => void) => {
  try {
    const incidentsRef = collection(db, COLLECTIONS.INCIDENTS);
    return onSnapshot(incidentsRef, (snapshot) => {
      if (!snapshot.empty) {
        const list = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as ReportItem));
        onUpdate(list);
      }
    }, (err) => {
      console.warn('[Firestore] Incidents subscription warning:', err);
    });
  } catch (err) {
    console.warn('[Firestore] Could not attach incidents listener:', err);
    return () => {};
  }
};

export const subscribeToWorkOrders = (onUpdate: (tasks: TaskItem[]) => void) => {
  try {
    const tasksRef = collection(db, COLLECTIONS.WORK_ORDERS);
    return onSnapshot(tasksRef, (snapshot) => {
      if (!snapshot.empty) {
        const list = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as TaskItem));
        onUpdate(list);
      }
    }, (err) => {
      console.warn('[Firestore] Work orders subscription warning:', err);
    });
  } catch (err) {
    console.warn('[Firestore] Could not attach work orders listener:', err);
    return () => {};
  }
};

export const subscribeToEvents = (onUpdate: (events: FirestoreEvent[]) => void) => {
  try {
    const eventsRef = collection(db, COLLECTIONS.EVENTS);
    return onSnapshot(eventsRef, (snapshot) => {
      if (!snapshot.empty) {
        const list = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as FirestoreEvent));
        onUpdate(list);
      }
    }, (err) => {
      console.warn('[Firestore] Events subscription warning:', err);
    });
  } catch (err) {
    console.warn('[Firestore] Could not attach events listener:', err);
    return () => {};
  }
};

// Write Operations
export const updateAssetInFirestore = async (assetCode: string, updates: Partial<DigitalTwinAsset>) => {
  try {
    const assetRef = doc(db, COLLECTIONS.ASSETS, assetCode);
    await updateDoc(assetRef, updates);
    console.log(`[Firestore] Asset ${assetCode} updated:`, updates);
  } catch (error) {
    console.error(`[Firestore] Failed to update asset ${assetCode}:`, error);
  }
};

export const createIncidentAndTaskInFirestore = async (
  incident: ReportItem, 
  task: TaskItem, 
  assetCode?: string
) => {
  try {
    const batch = writeBatch(db);
    
    // 1. Add Incident
    const incidentRef = doc(db, COLLECTIONS.INCIDENTS, incident.id);
    batch.set(incidentRef, incident);

    // 2. Add Work Order
    const taskRef = doc(db, COLLECTIONS.WORK_ORDERS, task.id);
    batch.set(taskRef, task);

    // 3. Update Asset Status if linked
    if (assetCode) {
      const assetRef = doc(db, COLLECTIONS.ASSETS, assetCode);
      batch.update(assetRef, {
        status: 'تحت الصيانة',
        statusColor: 'orange',
        linkedIncidentId: incident.id
      });
    }

    // 4. Log Event
    const eventId = `EVT-${Date.now().toString().slice(-4)}`;
    const eventRef = doc(db, COLLECTIONS.EVENTS, eventId);
    const newEvent: FirestoreEvent = {
      id: eventId,
      type: 'WORK_ORDER',
      title: `إنشاء بلاغ صيانة للأصل: ${assetCode || 'مرفق عام'}`,
      detail: `تم إسناد أمر العمل (${task.id}) إلى ${task.technicianName || 'الفني الميداني'}.`,
      buildingId: 'BLD-MAIN',
      floorNumber: 3,
      assetCode: assetCode,
      severity: task.priority === 'حرجة' ? 'critical' : 'high',
      timestamp: 'الآن',
      isSimulated: false
    };
    batch.set(eventRef, newEvent);

    await batch.commit();
    console.log(`[Firestore] Incident ${incident.id} and Task ${task.id} committed successfully.`);
  } catch (error) {
    console.error('[Firestore] Error in createIncidentAndTask:', error);
  }
};

export const resolveTaskInFirestore = async (
  taskId: string, 
  assetCode: string | undefined, 
  notes: string, 
  resolvedAt: string
) => {
  try {
    const batch = writeBatch(db);

    // 1. Update Work Order
    const taskRef = doc(db, COLLECTIONS.WORK_ORDERS, taskId);
    batch.update(taskRef, {
      status: 'completed',
      resolutionNotes: notes,
      resolvedAt: resolvedAt
    });

    // 2. Update Asset back to healthy
    if (assetCode) {
      const assetRef = doc(db, COLLECTIONS.ASSETS, assetCode);
      batch.update(assetRef, {
        status: 'جاهز',
        statusColor: 'green',
        lastInspection: 'اليوم (تمت الصيانة)',
        notes: notes ? `تم الفحص والمعايرة: ${notes}` : 'تم الفحص والمعايرة بنجاح.'
      });
    }

    // 3. Log Event
    const eventId = `EVT-${Date.now().toString().slice(-4)}`;
    const eventRef = doc(db, COLLECTIONS.EVENTS, eventId);
    const newEvent: FirestoreEvent = {
      id: eventId,
      type: 'WORK_ORDER',
      title: `إغلاق أمر العمل بنجاح (${taskId})`,
      detail: `أكمل ${assetCode ? `صيانة الأصل ${assetCode}` : 'المهمة'} واعتمد المعايرة بنجاح.`,
      buildingId: 'BLD-MAIN',
      floorNumber: 3,
      assetCode: assetCode,
      severity: 'info',
      timestamp: 'الآن',
      isSimulated: false
    };
    batch.set(eventRef, newEvent);

    await batch.commit();
    console.log(`[Firestore] Task ${taskId} marked completed in Firestore.`);
  } catch (error) {
    console.error('[Firestore] Error in resolveTask:', error);
  }
};

// Emergency Event Engine Simulation in Firestore
export const triggerEmergencyInFirestore = async (
  floorNumber: number = 3, 
  zoneId: string = 'ZN-3B', 
  triggerAsset: string = 'SD-104'
) => {
  try {
    const batch = writeBatch(db);

    // Update Building status
    const bldRef = doc(db, COLLECTIONS.BUILDINGS, 'BLD-MAIN');
    batch.update(bldRef, {
      status: 'emergency',
      activeAlarms: 1
    });

    // Update Floor status
    const floorRef = doc(db, COLLECTIONS.FLOORS, `floor-${floorNumber}`);
    batch.update(floorRef, {
      isEmergencyActive: true,
      activeIncidentsCount: 2
    });

    // Update Zone status
    const zoneRef = doc(db, COLLECTIONS.ZONES, zoneId);
    batch.update(zoneRef, {
      status: 'evacuation'
    });

    // Update Asset trigger
    const assetRef = doc(db, COLLECTIONS.ASSETS, triggerAsset);
    batch.update(assetRef, {
      status: 'طوارئ',
      statusColor: 'red'
    });

    // Log Emergency Event
    const eventId = `EVT-EMG-${Date.now().toString().slice(-4)}`;
    const eventRef = doc(db, COLLECTIONS.EVENTS, eventId);
    const newEvent: FirestoreEvent = {
      id: eventId,
      type: 'EMERGENCY_FIRE',
      title: '🚨 رصد دخان وتفعيل إنذار الحريق الذكي',
      detail: `الحساس ${triggerAsset} بالدور الثالث (قطاع ب) أطلق إشارة الإنذار. تم بدء الإخلاء وفتح مخارج الطوارئ تلقائياً.`,
      buildingId: 'BLD-MAIN',
      floorNumber: floorNumber,
      zoneId: zoneId,
      assetCode: triggerAsset,
      severity: 'critical',
      timestamp: 'الآن',
      isSimulated: true
    };
    batch.set(eventRef, newEvent);

    await batch.commit();
    console.log('[Firestore] Emergency triggered and persisted to Firestore!');
  } catch (error) {
    console.error('[Firestore] Error triggering emergency:', error);
  }
};

export const resetEmergencyInFirestore = async () => {
  try {
    const batch = writeBatch(db);

    // Reset Building
    const bldRef = doc(db, COLLECTIONS.BUILDINGS, 'BLD-MAIN');
    batch.update(bldRef, {
      status: 'operational',
      activeAlarms: 0
    });

    // Reset Floor
    const floorRef = doc(db, COLLECTIONS.FLOORS, 'floor-3');
    batch.update(floorRef, {
      isEmergencyActive: false,
      activeIncidentsCount: 0
    });

    // Reset Zone
    const zoneRef = doc(db, COLLECTIONS.ZONES, 'ZN-3B');
    batch.update(zoneRef, {
      status: 'safe'
    });

    // Reset Asset
    const assetRef = doc(db, COLLECTIONS.ASSETS, 'SD-104');
    batch.update(assetRef, {
      status: 'نشط',
      statusColor: 'blue'
    });

    // Log Reset Event
    const eventId = `EVT-CLR-${Date.now().toString().slice(-4)}`;
    const eventRef = doc(db, COLLECTIONS.EVENTS, eventId);
    const newEvent: FirestoreEvent = {
      id: eventId,
      type: 'EMERGENCY_FIRE',
      title: '✅ إعادة ضبط المبنى للوضع الطبيعي الآمن',
      detail: 'تمت السيطرة على الحدث وتأكيد خلو المنطقة وإغلاق الإنذار بنجاح.',
      buildingId: 'BLD-MAIN',
      floorNumber: 3,
      severity: 'info',
      timestamp: 'الآن',
      isSimulated: true
    };
    batch.set(eventRef, newEvent);

    await batch.commit();
    console.log('[Firestore] Emergency reset in Firestore.');
  } catch (error) {
    console.error('[Firestore] Error resetting emergency:', error);
  }
};
