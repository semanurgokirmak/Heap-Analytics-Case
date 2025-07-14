import { useCallback } from 'react';
import type { User } from '../types/user';

export const useHeapTracking = (user: User | null, isAuthenticated: boolean) => {
  const trackEvent = useCallback((eventName: string, properties?: Record<string, any>) => {
    if (window.heap && user && isAuthenticated) {
      window.heap.track(eventName, {
        ...properties,
        userRole: user.userRole,
        planType: user.planType,
        timestamp: new Date().toISOString()
      });
      
      console.log('📊 Heap Event:', eventName, properties);
    }
  }, [user, isAuthenticated]);

  return { trackEvent };
};