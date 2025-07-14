import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { User, AuthState } from '../types/user';

interface AuthContextType extends AuthState {
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false
  });

  const login = useCallback((userData: User) => {
    setAuthState({
      user: userData,
      isAuthenticated: true,
      isLoading: false
    });
    
    if (window.heap) {
      try {
        window.heap.identify(userData.userId);
        
        window.heap.addUserProperties({
          userRole: userData.userRole,
          planType: userData.planType, 
          email: userData.email,
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          loginTimestamp: new Date().toISOString(),
          environment: import.meta.env.MODE
        });
        
        window.heap.track('User Login', {
          loginMethod: 'demo',
          userRole: userData.userRole,
          planType: userData.planType,
          timestamp: new Date().toISOString()
        });
        
        console.log('✅ Heap: User successfully identified', {
          userId: userData.userId,
          userRole: userData.userRole,
          planType: userData.planType
        });
      } catch (error) {
        console.error('❌ Heap Analytics error:', error);
      }
    }
  }, []);

  const logout = useCallback(() => {
    if (window.heap && authState.user) {
      window.heap.track('User Logout', {
        userRole: authState.user.userRole,
        planType: authState.user.planType,
        sessionDuration: Date.now(),
        timestamp: new Date().toISOString()
      });
      
      window.heap.resetIdentity();
    }
    
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
  }, [authState.user]);

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};