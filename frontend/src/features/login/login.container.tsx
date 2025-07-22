import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../components/auth/auth.context";
import { useNavigate } from "react-router-dom";
import { Grid } from "../../components/common/grid/grid";
import { LoginForm } from "./components/login.form";
import { authenticateUser } from "../../utils/api/auth.utils";
import css from "../../assets/styles/layout/login.form.module.scss";
import { ToastMessage } from "../../components/common/toast-message/toast.message";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();
  const goTo = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) goTo("/dashboard");
  }, [auth.isAuthenticated, goTo]);

  const handleLogin = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      try {
        const token = await authenticateUser(email, password);
        await auth.login(token);
        ToastMessage({ type: "success", message: "Inicio de sesión exitoso!" });
        goTo("/dashboard");
      } catch (error: any) {
        ToastMessage({
          type: "error",
          message:
            error instanceof Error
              ? error.message
              : "Ocurrió un error inesperado.",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [auth.login, goTo]
  );

  return (
    <Grid className={css.loginContainer}>
      <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
    </Grid>
  );
}
