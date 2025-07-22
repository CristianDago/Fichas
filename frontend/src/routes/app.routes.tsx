import { lazy } from "react";
import { createBrowserRouter, type RouteObject } from "react-router-dom";
import { ProtectedRoute } from "./protected.routes";
import ProtectedLayout from "../components/layouts/protected-layout/protected.layout";

const LoginPage = lazy(() => import("../pages/login/login.page"));
const Dashboard = lazy(() => import("../pages/dashboard/dashboard.page"));
const PatientProfile = lazy(() => import("../pages/dashboard/patient.profile.page"));
const AddPatient = lazy(() => import("../pages/dashboard/add.patient.page"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <ProtectedLayout />,
        children: [
          {
            path: "/dashboard",
            children: [
              { index: true, element: <AddPatient /> },
              { path: "records", element: <Dashboard /> },
              { path: "patient/:id", element: <PatientProfile /> },
              { path: "add-patient", element: <AddPatient /> },
            ],
          },
        ],
      },
    ],
  },
];

interface AppRouter extends ReturnType<typeof createBrowserRouter> {}
export const router: AppRouter = createBrowserRouter(routes);
