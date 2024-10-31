import { useState, useEffect, useCallback } from 'react';
import { UpgradeConfig, ConfigTableState } from '../types';

const PAGE_SIZE = 20;

const generateMockUpgradeConfigs = (page: number): UpgradeConfig[] => {
  return Array.from({ length: PAGE_SIZE }, (_, i) => ({
    id: `${page}-${i}`,
    createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
    version: `${Math.floor(Math.random() * 3 + 1)}.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}`,
    platform: ['ios', 'android', 'all'][Math.floor(Math.random() * 3)] as UpgradeConfig['platform'],
    forceUpgrade: Math.random() > 0.7,
    minVersion: '1.0.0',
    description: `Version upgrade configuration ${page * PAGE_SIZE + i + 1}`,
    status: Math.random() > 0.3 ? 'active' : 'inactive'
  }));
};

export function useUpgradeConfigs() {
  const [state, setState] = useState<ConfigTableState<UpgradeConfig>>({
    items: [],
    hasMore: true,
    isLoading: false,
    page: 0
  });

  const loadMore = useCallback(async () => {
    if (state.isLoading || !state.hasMore) return;

    setState(prev => ({ ...prev, isLoading: true }));

    await new Promise(resolve => setTimeout(resolve, 500));
    const newItems = generateMockUpgradeConfigs(state.page);

    setState(prev => ({
      items: [...prev.items, ...newItems],
      hasMore: prev.page < 5,
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