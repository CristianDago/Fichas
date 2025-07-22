export interface UseLoginResult {
  isLoading: boolean;
  loginError: string | null;
  login: (newToken: string) => Promise<void>;
}
