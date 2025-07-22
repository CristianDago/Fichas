import { useCallback } from "react";
import { useAuthStorage } from "../../components/auth/auth.storage";
import { UseLogoutResult } from "../../interface/hooks/logout.props";

export const useLogout = (): UseLogoutResult => {
  const { clearToken } = useAuthStorage();

  const logout = useCallback(() => {
    clearToken();
  }, [clearToken]);

  return { logout };
};
