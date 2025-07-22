export default interface AuthContextType {
  token: string | null;
  userId: string | null;
  email: string | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginError: string | null; 
}
