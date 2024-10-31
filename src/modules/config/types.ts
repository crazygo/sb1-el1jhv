export interface GrayConfig {
  id: string;
  createdAt: string;
  name: string;
  key: string;
  value: string;
  description: string;
  status: 'active' | 'inactive';
  percentage: number;
}

export interface UpgradeConfig {
  id: string;
  createdAt: string;
  version: string;
  platform: 'ios' | 'android' | 'all';
  forceUpgrade: boolean;
  minVersion: string;
  description: string;
  status: 'active' | 'inactive';
}

export interface ConfigTableState<T> {
  items: T[];
  hasMore: boolean;
  isLoading: boolean;
  page: number;
}