import { Outlet } from "react-router-dom";
import { useAuth } from "../components/auth/auth.context";
import { LoadingSpinner } from "../components/ui/loading.spinner";
import { useProtectedRoute } from "../hooks/auth/use.protected.route";

export const ProtectedRoute = () => {
  const isLoadingAuth = useProtectedRoute();
  const { isAuthenticated } = useAuth();

  if (isLoadingAuth) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <Outlet />;
};
