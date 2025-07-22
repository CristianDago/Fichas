import { useState, useCallback } from "react";
import { useAuthStorage } from "../../components/auth/auth.storage";
import { useDecodeToken } from "./use.decode.token";
import * as Sentry from "@sentry/react";
import { UseLoginResult } from "../../interface/hooks/login.props";

export const useLogin = (): UseLoginResult => {
  const { updateToken, clearToken } = useAuthStorage();
  const { decodeToken } = useDecodeToken(null);

  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const login = useCallback(
    async (newToken: string) => {
      setIsLoading(true);
      setLoginError(null);
      try {
        const decoded = decodeToken(newToken);
        if (!decoded) {
          clearToken();
          const errorMessage =
            "El token recibido es inválido o está corrupto. Por favor, intente iniciar sesión nuevamente.";
          setLoginError(errorMessage);
          throw new Error(errorMessage);
        }

        updateToken(newToken);
      } catch (error) {
        Sentry.captureException(error);
        clearToken();

        setLoginError(
          error instanceof Error
            ? error.message
            : "Ocurrió un error inesperado durante el login."
        );
        throw error;
      } finally {
        setIsLoading(false);
      }
    },

    [updateToken, clearToken, decodeToken]
  );

  return { isLoading, loginError, login };
};
