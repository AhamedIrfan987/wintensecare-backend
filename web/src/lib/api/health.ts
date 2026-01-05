import { apiRequest } from './index';

export interface HealthResponse {
  status: string;
}

export const healthCheck = () =>
  apiRequest<HealthResponse>('/health');
