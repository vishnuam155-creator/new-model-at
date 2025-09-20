export interface User {
  username: string;
  plan: string;
  authToken: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  authToken: string | null;
}

export interface UsageData {
  uploads_used: number;
  limit: number;
  error?: string;
}