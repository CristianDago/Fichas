import { useEffect } from "react";
import { useAuth } from "../../components/auth/auth.context";
import { useNavigate, useLocation } from "react-router-dom";

export const useProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/", { replace: true, state: { from: location.pathname } });
    }
  }, [isAuthenticated, isLoading, navigate, location]);

  return isLoading;
};
