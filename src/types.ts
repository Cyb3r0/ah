export type ScreenId = 
  | 'splash'            // Splash / Brand intro
  | 'login'             // Login with Nafath
  | 'digital-twin'      // THE STAR: 3D Multi-floor interactive digital twin with live assets
  | 'manager-dashboard' // Manager Dashboard with KPI cards and chart
  | 'technician-tasks'  // Field Technician active task queue & resolution workflow
  | 'simulation-center' // Emergency event engine & incident pipeline
  | 'ai-intelligence'   // HOSN Intelligence operational query engine
  | 'create-report'     // Create new incident / report
  | 'smart-map'         // Smart indoor floor map with interactive pins
  | 'disability-support'// Disability support & SOS emergency
  | 'inspection-tour'   // Safety round with radio check items
  | 'asset-details-qr'  // QR asset details & field datasheet
  | 'device-entry'      // Device / equipment check-in
  | 'user-profile';     // User profile & permissions

export type UserRole = 'manager' | 'technician' | 'supervisor';

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  roleType: UserRole;
  department: string;
  building: string;
  avatarUrl: string;
  nationalId?: string;
  phone: string;
  status: 'active' | 'on_duty' | 'on_break';
  permissions: {
    facilityManager: boolean;
    visitorManagement: boolean;
    viewReports: boolean;
    accessControl: boolean;
    closeIncidents?: boolean;
    executeEmergency?: boolean;
  };
  faceIdEnabled: boolean;
}

export type UserProfile = StaffMember;

export type AssetType = 'extinguisher' | 'emergency_door' | 'smoke_detector' | 'elevator' | 'camera' | 'pump' | 'panel';

export interface DigitalTwinAsset {
  id: string;
  code: string; // e.g. FE-00892, DOOR-00382, SD-104, ELEV-02
  name: string;
  type: AssetType;
  floor: number; // 0, 1, 2, 3, 5, -1
  floorName: string; // 'الدور الثالث'
  zone: string; // 'قطاع ب - الجناح الشرقي'
  x: number; // 0-100 percentage
  y: number; // 0-100 percentage
  status: 'جاهز' | 'نشط' | 'تنبيه' | 'عطل' | 'تحت الصيانة' | 'طوارئ';
  statusColor: 'green' | 'blue' | 'yellow' | 'red' | 'orange';
  serialNumber: string;
  manufacturer: string;
  model: string;
  lastInspection: string;
  nextMaintenance: string;
  pressure?: string; // e.g. 14.5 Bar
  batteryLevel?: number; // 98%
  currentReading?: string;
  notes?: string;
  qrCodeUrl?: string;
  imageUrl?: string;
  linkedIncidentId?: string;
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
  assetCode?: string;
  createdTime?: string;
  technicianName?: string;
  resolutionNotes?: string;
  resolvedAt?: string;
}

export interface ReportItem {
  id: string;
  title: string;
  location: string;
  floor?: string;
  timestamp: string;
  type: 'أمن' | 'سلامة' | 'كهرباء' | 'ميكانيكا' | 'طوارئ';
  priority: 'عادي' | 'مهم' | 'عاجل' | 'خطر فوري';
  photos: string[];
  description?: string;
  assetCode?: string;
  status: 'open' | 'in_review' | 'assigned' | 'resolved';
  assignedTech?: string;
}

export interface FloorLevel {
  id: string;
  floorNumber: number;
  name: string;
  englishName: string;
  occupancyCount: number;
  activeIncidentsCount: number;
  assetCount: number;
  isEmergencyActive?: boolean;
}

export type SimulationType = 'FIRE_ALARM' | 'WATER_LEAK' | 'DISABILITY_SOS' | 'POWER_OUTAGE';

export interface SimulationStep {
  key: string;
  title: string;
  detail: string;
  timestamp: string;
  completed: boolean;
}

export interface SimulationState {
  isActive: boolean;
  type: SimulationType;
  title: string;
  affectedFloor: number;
  affectedZone: string;
  affectedAssetCode: string;
  currentStepIndex: number;
  steps: SimulationStep[];
  evacueesCount: number;
  peopleWithSpecialNeedsCount: number;
  evacuationProgress: number; // 0 - 100%
  safeExits: string[];
  activeAlarmTone: boolean;
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

export interface DeviceLogItem {
  id: string;
  deviceType: string;
  serialNumber: string;
  ownerName: string;
  entryTime: string;
  status: 'entered' | 'exited' | 'pending';
  approvedBy?: string;
  photoUrl?: string;
}

export interface MapMarker {
  id: string;
  type: 'camera' | 'smoke' | 'exit' | 'extinguisher' | 'elevator' | 'door' | 'alarm';
  code: string;
  name: string;
  status: 'نشط' | 'تنبيه' | 'عطل' | 'جاهز' | 'active' | 'warning' | 'error';
  x: number;
  y: number;
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

export interface BuildingDocument {
  id: string; // e.g. BLD-MAIN
  code: string;
  name: string;
  englishName: string;
  city: string;
  floorsCount: number;
  totalAssets: number;
  activeAlarms: number;
  status: 'operational' | 'emergency' | 'maintenance';
}

export interface ZoneDocument {
  id: string; // e.g. ZN-3B
  code: string;
  buildingId: string;
  floorNumber: number;
  name: string;
  wing: 'الشرقي' | 'الغربي' | 'الشمالي' | 'الجنوبي' | 'القلب المركزي';
  occupancyCount: number;
  status: 'safe' | 'warning' | 'evacuation' | 'cleared';
  safeExitId: string;
}

export interface FirestoreEvent {
  id: string;
  type: 'EMERGENCY_FIRE' | 'IOT_TELEMETRY' | 'CCTV_ANOMALY' | 'ACCESS_CONTROL' | 'WORK_ORDER';
  title: string;
  detail: string;
  buildingId: string;
  floorNumber: number;
  zoneId?: string;
  assetCode?: string;
  severity: 'critical' | 'high' | 'medium' | 'info';
  timestamp: string;
  isSimulated?: boolean;
}

export interface VisitorRecord {
  id: string;
  fullName: string;
  nationalIdOrIqama: string;
  company?: string;
  hostEmployee: string;
  purpose: string;
  badgeNumber: string;
  status: 'approved' | 'active_inside' | 'checked_out';
  entryTime: string;
  exitTime?: string;
}

export interface ContractorRecord {
  id: string;
  companyName: string;
  contractNumber: string;
  leadTechnician: string;
  safetyPermitNumber: string;
  workScope: string;
  permitStatus: 'valid' | 'expiring_soon' | 'expired';
  expiryDate: string;
  authorizedZones: string[];
}

export interface AIQueryPreset {
  id: string;
  question: string;
  category: 'maintenance' | 'incidents' | 'digital_twin' | 'safety';
  icon: string;
}

