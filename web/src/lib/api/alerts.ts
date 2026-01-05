import { apiRequest } from './index';

export interface Alert {
  id: string;
  deviceId: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  message?: string;
}

export const getAlerts = () =>
  apiRequest<Alert[]>('/alerts');

export const acknowledgeAlert = (alertId: string) =>
  apiRequest<void>(`/alerts/${alertId}/ack`, {
    method: 'POST',
  });
