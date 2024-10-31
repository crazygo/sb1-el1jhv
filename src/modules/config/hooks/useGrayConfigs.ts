import { useState, useEffect, useCallback } from 'react';
import { GrayConfig, ConfigTableState } from '../types';

const PAGE_SIZE = 20;

const generateMockGrayConfigs = (page: number): GrayConfig[] => {
  return Array.from({ length: PAGE_SIZE }, (_, i) => ({
    id: `gray-config-${page}-${i}`,
    createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
    name: `Feature Toggle ${page * PAGE_SIZE + i + 1}`,
    key: `feature_toggle_${page * PAGE_SIZE + i + 1}`,
    value: Math.random() > 0.5 ? 'true' : 'false',
    description: `Controls feature ${page * PAGE_SIZE + i + 1} visibility`,
    status: Math.random() > 0.3 ? 'active' : 'inactive',
    percentage: Math.floor(Math.random() * 100)
  }));
};

export function useGrayConfigs() {
  const [state, setState] = useState<ConfigTableState<GrayConfig>>({
    items: [],
    hasMore: true,
    isLoading: false,
    page: 0
  });

  const loadMore = useCallback(async () => {
    if (state.isLoading || !state.hasMore) return;

    setState(prev => ({ ...prev, isLoading: true }));

    await new Promise(resolve => setTimeout(resolve, 500));
    const newItems = generateMockGrayConfigs(state.page);

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