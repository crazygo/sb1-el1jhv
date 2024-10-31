import React, { createContext, useCallback, useState } from 'react';

interface NavigationContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  visibleTabs: string[];
  removeTab: (tab: string) => void;
  defaultTabs: string[];
  isTabCloseable: (tab: string) => boolean;
}

export const NavigationContext = createContext<NavigationContextType | null>(null);

interface NavigationProviderProps {
  children: React.ReactNode;
  defaultTab?: string;
}

const DEFAULT_TABS = ['miniprogram', 'chat', 'coverage'];
const FIXED_TABS = ['miniprogram', 'chat'];

export function NavigationProvider({ 
  children, 
  defaultTab = 'coverage' 
}: NavigationProviderProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [visibleTabs, setVisibleTabs] = useState<string[]>([]);

  const handleSetActiveTab = useCallback((tab: string) => {
    setActiveTab(tab);
    if (!DEFAULT_TABS.includes(tab)) {
      setVisibleTabs(prev => 
        prev.includes(tab) ? prev : [...prev, tab]
      );
    }
  }, []);

  const isTabCloseable = useCallback((tab: string) => {
    return !FIXED_TABS.includes(tab);
  }, []);

  const removeTab = useCallback((tab: string) => {
    // 如果是固定标签页，不允许关闭
    if (!isTabCloseable(tab)) return;

    // 如果是 coverage 标签页，直接切换到第一个固定标签页
    if (tab === 'coverage') {
      setActiveTab(FIXED_TABS[0]);
      return;
    }

    // 处理其他动态添加的标签页
    setVisibleTabs(prev => prev.filter(t => t !== tab));
    if (activeTab === tab) {
      // 切换到第一个固定标签页
      setActiveTab(FIXED_TABS[0]);
    }
  }, [activeTab, isTabCloseable]);

  return (
    <NavigationContext.Provider 
      value={{ 
        activeTab, 
        setActiveTab: handleSetActiveTab,
        visibleTabs,
        removeTab,
        defaultTabs: DEFAULT_TABS,
        isTabCloseable
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}