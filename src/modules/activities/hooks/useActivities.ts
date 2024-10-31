import { useState, useEffect, useCallback } from 'react';
import { Activity, ActivityTableState } from '../types';

const PAGE_SIZE = 20;

// Mock data generator
const generateMockData = (page: number): Activity[] => {
  return Array.from({ length: PAGE_SIZE }, (_, i) => ({
    id: `${page}-${i}`,
    createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
    name: `Activity ${page * PAGE_SIZE + i + 1}`,
    type: ['Promotion', 'Campaign', 'Flash Sale', 'Holiday Special'][Math.floor(Math.random() * 4)],
    validUntil: new Date(Date.now() + Math.random() * 10000000000).toISOString(),
    status: ['active', 'inactive', 'expired'][Math.floor(Math.random() * 3)] as Activity['status']
  }));
};

export function useActivities() {
  const [state, setState] = useState<ActivityTableState>({
    items: [],
    hasMore: true,
    isLoading: false,
    page: 0
  });

  const loadMore = useCallback(async () => {
    if (state.isLoading || !state.hasMore) return;

    setState(prev => ({ ...prev, isLoading: true }));

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    const newItems = generateMockData(state.page);

    setState(prev => ({
      items: [...prev.items, ...newItems],
      hasMore: prev.page < 5, // Limit to 100 items total (5 pages * 20 items)
      isLoading: false,
      page: prev.page + 1
    }));
  }, [state.isLoading, state.hasMore, state.page]);

  useEffect(() => {
    loadMore();
  }, []);

  return {
    ...state,
    loadMore
  };
}