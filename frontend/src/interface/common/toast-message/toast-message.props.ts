import { ToastOptions } from "react-toastify";

export interface ToastMessageProps {
  type: "success" | "error" | "warning" | "info";
  message: string;
  options?: ToastOptions;
}
