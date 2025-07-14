export interface User {
  userId: string;
  email: string;
  userRole: 'admin' | 'subscriber';
  planType: 'free' | 'premium';
  firstName?: string;
  lastName?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}