export type User = {
  id?: string;
  email?: string;
  phone?: string;
  profileImage?: string;
};

export type Device = {
  id: string;
  name: string;
  type: string;
  createdAt: string;
};

export type TelemetryItem = {
  id: string;
  deviceId: string;
  heartRate: number;
  steps: number;
  battery: number;
  createdAt: string;
};

export type LatestTelemetry = {
  deviceId: string;
  heartRate: number;
  steps: number;
  battery: number;
  createdAt: string;
};

export type Alert = {
  id: string;
  deviceId: string;
  metric: string;
  value: number;
  severity: "CRITICAL" | "WARNING";
  acknowledged: boolean;
  createdAt: string;
};

export type ECGSession = {
  id: string;
  deviceId: string;
  signal: number[];
  samplingRate: number;
  durationMs: number;
  createdAt: string;
};