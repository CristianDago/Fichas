import {
  useContext,
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { useAuthStorage } from "./auth.storage";
import { useDecodeToken } from "../../hooks/auth/use.decode.token";
import AuthProviderProps from "../../interface/auth/auth.provider.props";
import AuthContextType from "../../interface/auth/auth.context.type";

const AuthContext = createContext<AuthContextType>({
  token: null,
  userId: null,
  email: null,
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
  isLoading: false,
  loginError: null,
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { token: storedToken, updateToken, clearToken } = useAuthStorage();
  const { userId, email, decodeToken } = useDecodeToken(storedToken);

  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoginProcessLoading, setIsLoginProcessLoading] = useState(false);

  useEffect(() => {
    setIsInitialLoading(true);
    setLoginError(null);

    if (storedToken) {
      const decoded = decodeToken(storedToken);
      if (decoded) {
        setIsAuthenticated(true);
      } else {
        clearToken();
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
    setIsInitialLoading(false);
  }, [storedToken, decodeToken, clearToken]);

  const login = useCallback(
    async (newToken: string) => {
      setIsLoginProcessLoading(true);
      setLoginError(null);
      try {
        const decoded = decodeToken(newToken);
        if (!decoded) {
          clearToken();
          setIsAuthenticated(false);
          const errorMessage =
            "El token recibido es inválido o corrupto. Por favor, intente iniciar sesión nuevamente.";
          setLoginError(errorMessage);
          throw new Error(errorMessage);
        }
        await updateToken(newToken);
        setIsAuthenticated(true);
      } catch (error: any) {
        console.error("Error al iniciar sesión en el AuthProvider:", error);
        clearToken();
        setIsAuthenticated(false);
        setLoginError(error.message || "Error al procesar el token de sesión.");
        throw error;
      } finally {
        setIsLoginProcessLoading(false);
      }
    },
    [updateToken, clearToken, decodeToken, setIsAuthenticated]
  );

  const logout = useCallback(() => {
    clearToken();
    setIsAuthenticated(false);
    setLoginError(null);
  }, [clearToken, setIsAuthenticated]);

  const value = useMemo(
    () => ({
      token: storedToken,
      userId,
      email,
      isAuthenticated,
      isLoading: isInitialLoading || isLoginProcessLoading,
      login,
      logout,
      loginError,
    }),
    [
      storedToken,
      userId,
      email,
      isAuthenticated,
      isInitialLoading,
      isLoginProcessLoading,
      login,
      logout,
      loginError,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
