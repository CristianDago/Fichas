import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/app.routes";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./components/auth/auth.context";
import "react-toastify/dist/ReactToastify.css";
import "./assets/styles/global.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<div>Cargando...</div>}>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          draggable
          pauseOnHover
          theme="light"
        />
      </AuthProvider>
    </Suspense>
  </StrictMode>
);
