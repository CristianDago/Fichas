import { useState, useEffect, useMemo, useCallback } from "react";
import Cookies from "js-cookie";

const TOKEN_COOKIE_NAME = "token";
const TOKEN_EXPIRATION_DAYS = 1;

export const useAuthStorage = () => {
  const [token, setToken] = useState<string | null>(() => {
    const cookieToken = Cookies.get(TOKEN_COOKIE_NAME);
    return cookieToken || null;
  });

  const clearToken = useCallback(() => setToken(null), []);
  const updateToken = useCallback((newToken: string) => setToken(newToken), []);

  useEffect(() => {
    if (token) {
      Cookies.set(TOKEN_COOKIE_NAME, token, {
        expires: TOKEN_EXPIRATION_DAYS,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
    } else {
      Cookies.remove(TOKEN_COOKIE_NAME);
    }
  }, [token]);

  return useMemo(
    () => ({
      token,
      clearToken,
      updateToken,
    }),
    [token, clearToken, updateToken]
  );
};
