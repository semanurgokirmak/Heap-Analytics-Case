import { useEffect, useCallback, useRef } from 'react';
import type { User } from '../types/user';

export const useHeapTracking = (user: User | null, isAuthenticated: boolean) => {
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isAuthenticated && user && window.heap && !isInitialized.current) {
      try {
        window.heap.identify(user.userId);
        
        window.heap.addUserProperties({
          userRole: user.userRole,
          planType: user.planType,
          email: user.email,
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          loginTimestamp: new Date().toISOString(),
          environment: import.meta.env.MODE 
        });
        
        isInitialized.current = true;
        console.log('✅ Heap: Kullanıcı başarıyla tanıtıldı', {
          userId: user.userId,
          userRole: user.userRole,
          planType: user.planType
        });
      } catch (error) {
        console.error('❌ Heap Analytics hatası:', error);
      }
    }
    
    if (!isAuthenticated) {
      isInitialized.current = false;
    }
  }, [isAuthenticated, user]);

  const trackEvent = useCallback((eventName: string, properties?: Record<string, any>) => {
    if (window.heap && user) {
      window.heap.track(eventName, {
        ...properties,
        userRole: user.userRole,
        planType: user.planType,
        timestamp: new Date().toISOString()
      });
      
      console.log('📊 Heap Event:', eventName, properties);
    }
  }, [user]);

  return { trackEvent };
};