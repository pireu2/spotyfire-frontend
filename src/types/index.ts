export interface LandParcel {
  id: string;
  name: string;
  coordinates: [number, number][];
  ndviIndex: number;
  status: 'healthy' | 'fire' | 'flood';
  area: number;
  damageEstimate?: number;
}

export interface Alert {
  id: string;
  type: 'fire' | 'flood' | 'warning';
  message: string;
  timestamp: Date;
  sector: string;
  severity: 'low' | 'medium' | 'high';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface NDVIDataPoint {
  date: string;
  value: number;
}

export interface ClaimReport {
  id: string;
  parcelId: string;
  parcelName: string;
  disasterType: 'fire' | 'flood';
  damageEstimate: number;
  area: number;
  date: Date;
  status: 'pending' | 'approved' | 'rejected';
}
