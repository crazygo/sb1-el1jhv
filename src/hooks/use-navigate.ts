import { useContext } from 'react';
import { NavigationContext } from '@/components/navigation-provider';

export function useNavigate() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigate must be used within a NavigationProvider');
  }
  return context;
}