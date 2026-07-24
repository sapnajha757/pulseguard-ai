// Centralized mock data for PulseGuard AI dashboards.

export type Medicine = {
  id: string;
  name: string;
  dose: string;
  time: string;
  status: 'taken' | 'pending' | 'missed';
  icon: string;
};

export const todayMedicines: Medicine[] = [
  { id: 'm1', name: 'Metformin', dose: '500mg', time: '08:00', status: 'taken', icon: 'pill' },
  { id: 'm2', name: 'Atorvastatin', dose: '20mg', time: '09:00', status: 'taken', icon: 'pill' },
  { id: 'm3', name: 'Lisinopril', dose: '10mg', time: '13:00', status: 'pending', icon: 'pill' },
  { id: 'm4', name: 'Vitamin D3', dose: '1000IU', time: '18:00', status: 'pending', icon: 'sun' },
  { id: 'm5', name: 'Aspirin', dose: '81mg', time: '21:00', status: 'pending', icon: 'pill' },
];

export const upcomingMedicines: Medicine[] = [
  { id: 'u1', name: 'Insulin Glargine', dose: '15 units', time: 'Tomorrow 07:30', status: 'pending', icon: 'syringe' },
  { id: 'u2', name: 'Metformin', dose: '500mg', time: 'Tomorrow 08:00', status: 'pending', icon: 'pill' },
  { id: 'u3', name: 'Atorvastatin', dose: '20mg', time: 'Tomorrow 09:00', status: 'pending', icon: 'pill' },
];

export type Activity = {
  id: string;
  title: string;
  detail: string;
  time: string;
  tone: 'neon' | 'accent' | 'danger' | 'warning' | 'neutral';
};

export const recentActivity: Activity[] = [
  { id: 'a1', title: 'Heart rate logged', detail: '72 bpm — within healthy range', time: '12 min ago', tone: 'neon' },
  { id: 'a2', title: 'Medication taken', detail: 'Metformin 500mg at 08:00', time: '4 hr ago', tone: 'accent' },
  { id: 'a3', title: 'AI risk re-evaluated', detail: 'Risk score updated to 18 (Low)', time: '6 hr ago', tone: 'neutral' },
  { id: 'a4', title: 'Lab report uploaded', detail: 'Lipid panel — awaiting review', time: 'Yesterday', tone: 'warning' },
];

export type HighRiskPatient = {
  id: string;
  name: string;
  age: number;
  risk: number;
  trend: 'up' | 'down' | 'stable';
  condition: string;
  lastUpdate: string;
};

export const highRiskPatients: HighRiskPatient[] = [
  { id: 'p1', name: 'Eleanor Whitfield', age: 74, risk: 82, trend: 'up', condition: 'Atrial fibrillation', lastUpdate: '5 min ago' },
  { id: 'p2', name: 'Marcus Delgado', age: 61, risk: 71, trend: 'up', condition: 'Type 2 Diabetes', lastUpdate: '22 min ago' },
  { id: 'p3', name: 'Priya Nair', age: 58, risk: 64, trend: 'stable', condition: 'Hypertension', lastUpdate: '1 hr ago' },
  { id: 'p4', name: 'Tomás Ribeiro', age: 69, risk: 59, trend: 'down', condition: 'Post-operative recovery', lastUpdate: '2 hr ago' },
];

export type DoctorAlert = {
  id: string;
  patient: string;
  message: string;
  level: 'critical' | 'warning' | 'info';
  time: string;
};

export const doctorAlerts: DoctorAlert[] = [
  { id: 'da1', patient: 'Eleanor Whitfield', message: 'Irregular heartbeat detected — 142 bpm sustained', level: 'critical', time: '5 min ago' },
  { id: 'da2', patient: 'Marcus Delgado', message: 'Glucose spike to 218 mg/dL', level: 'critical', time: '22 min ago' },
  { id: 'da3', patient: 'Priya Nair', message: 'Missed Lisinopril dose', level: 'warning', time: '1 hr ago' },
  { id: 'da4', patient: 'Tomás Ribeiro', message: 'Wound temperature elevated', level: 'warning', time: '2 hr ago' },
];

export type Report = {
  id: string;
  patient: string;
  type: string;
  status: 'reviewed' | 'pending' | 'flagged';
  date: string;
};

export const recentReports: Report[] = [
  { id: 'r1', patient: 'Eleanor Whitfield', type: 'ECG Analysis', status: 'flagged', date: 'Today' },
  { id: 'r2', patient: 'Marcus Delgado', type: 'Glucose Trend', status: 'pending', date: 'Today' },
  { id: 'r3', patient: 'Priya Nair', type: 'Blood Pressure', status: 'reviewed', date: 'Yesterday' },
  { id: 'r4', patient: 'Tomás Ribeiro', type: 'Post-op Panel', status: 'pending', date: 'Yesterday' },
];

export type FamilyAlert = {
  id: string;
  title: string;
  detail: string;
  time: string;
  level: 'critical' | 'warning' | 'info';
};

export const familyAlerts: FamilyAlert[] = [
  { id: 'fa1', title: 'Medication missed', detail: 'Lisinopril 10mg was not taken at 13:00', time: '2 hr ago', level: 'warning' },
  { id: 'fa2', title: 'Heart rate normal', detail: 'Resting heart rate 71 bpm', time: '4 hr ago', level: 'info' },
  { id: 'fa3', title: 'Morning walk completed', detail: '2,340 steps — great progress', time: '6 hr ago', level: 'info' },
];

export type MedHistory = {
  id: string;
  name: string;
  dose: string;
  date: string;
  status: 'taken' | 'missed';
};

export const medicationHistory: MedHistory[] = [
  { id: 'h1', name: 'Metformin', dose: '500mg', date: 'Today 08:00', status: 'taken' },
  { id: 'h2', name: 'Atorvastatin', dose: '20mg', date: 'Today 09:00', status: 'taken' },
  { id: 'h3', name: 'Lisinopril', dose: '10mg', date: 'Today 13:00', status: 'missed' },
  { id: 'h4', name: 'Metformin', dose: '500mg', date: 'Yesterday 08:00', status: 'taken' },
  { id: 'h5', name: 'Atorvastatin', dose: '20mg', date: 'Yesterday 09:00', status: 'taken' },
  { id: 'h6', name: 'Lisinopril', dose: '10mg', date: 'Yesterday 13:00', status: 'taken' },
];

export type EmergencyContact = {
  id: string;
  name: string;
  relation: string;
  phone: string;
  available: boolean;
};

export const emergencyContacts: EmergencyContact[] = [
  { id: 'e1', name: 'Dr. Aanya Sharma', relation: 'Primary Physician', phone: '+1 (415) 555-0142', available: true },
  { id: 'e2', name: 'Ravi Nair', relation: 'Son', phone: '+1 (415) 555-0188', available: true },
  { id: 'e3', name: 'Meera Nair', relation: 'Daughter', phone: '+1 (415) 555-0199', available: false },
  { id: 'e4', name: 'Bay Area Emergency', relation: 'Emergency Services', phone: '911', available: true },
];
