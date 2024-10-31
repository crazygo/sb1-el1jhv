export interface Activity {
  id: string;
  createdAt: string;
  name: string;
  type: string;
  validUntil: string;
  status: 'active' | 'inactive' | 'expired';
}

export interface ActivityTableState {
  items: Activity[];
  hasMore: boolean;
  isLoading: boolean;
  page: number;
}