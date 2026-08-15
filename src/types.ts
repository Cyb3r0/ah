export type ScreenId = 
  | 'splash'            // Image 11: Splash / Brand intro
  | 'login'             // Image 6: Login with Nafath
  | 'manager-dashboard' // Image 1: Manager Dashboard with KPI cards and chart
  | 'create-report'     // Image 2: Create new incident / report
  | 'device-entry'      // Image 3: Device / equipment check-in
  | 'disability-support'// Image 4: Disability support & SOS emergency
  | 'technician-tasks'  // Image 5: Technician task list
  | 'smart-map'         // Image 7: Smart indoor floor map with interactive pins
  | 'inspection-tour'   // Image 8: Weekly inspection round with radio items
  | 'user-profile'      // Image 9: Operations manager profile & permissions
  | 'asset-details-qr'; // Image 10: QR asset details (Fire Extinguisher)

export interface UserProfile {
  name: string;
  role: string;
  department: string;
  building: string;
  avatarUrl: string;
  permissions: {
    facilityManager: boolean;
    visitorManagement: boolean;
    viewReports: boolean;
    accessControl?: boolean;
  };
  faceIdEnabled: boolean;
}

export interface TaskItem {
  id: string;
  title: string;
  priority: 'حرجة' | 'عالية' | 'متوسطة' | 'منخفضة';
  priorityColor: 'red' | 'orange' | 'yellow' | 'green';
  building: string;
  floor: string;
  timeElapsed: string;
  status: 'pending' | 'in-progress' | 'completed';
  category: string;
  description?: string;
}

export interface InspectionCheckItem {
  id: string;
  title: string;
  location: string;
  unitsCount: string;
  iconType: 'fire' | 'exit' | 'smoke' | 'alarm';
  status: 'intact' | 'needs-followup' | 'defective';
  notes?: string;
}

export interface DeviceEntry {
  id: string;
  deviceType: string;
  serialNumber: string;
  ownerName: string;
  entryTime: string;
  photoUrl?: string;
}

export interface ReportItem {
  id: string;
  title: string;
  location: string;
  timestamp: string;
  type: 'أمن' | 'سلامة' | 'كهرباء' | 'تكييف إلخ';
  priority: 'عادي' | 'مهم' | 'عاجل' | 'خطر فوري';
  photos: string[];
  description?: string;
  status: 'open' | 'in_review' | 'resolved';
}

export interface MapMarker {
  id: string;
  type: 'camera' | 'smoke' | 'exit' | 'extinguisher' | 'elevator';
  code: string;
  name: string;
  status: 'نشط' | 'تنبيه' | 'عطل' | 'جاهز';
  x: number; // percentage on map
  y: number; // percentage on map
  imageUrl?: string;
  details?: string;
}

export interface DisabilityEntry {
  id: string;
  location: string;
  personCount: number;
  needDescription: string;
  isUrgent?: boolean;
  status: 'waiting' | 'assisted';
}
