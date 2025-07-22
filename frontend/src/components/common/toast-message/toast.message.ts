import { toast, ToastOptions } from "react-toastify";
import { ToastMessageProps } from "../../../interface/common/toast-message/toast-message.props";

const defaultOptions: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

export const ToastMessage = ({ type, message, options }: ToastMessageProps) => {
  const mergedOptions = { ...defaultOptions, ...options };

  switch (type) {
    case "success":
      toast.success(message, mergedOptions);
      break;
    case "error":
      toast.error(message, mergedOptions);
      break;
    case "warning":
      toast.warn(message, mergedOptions);
      break;
    case "info":
      toast.info(message, mergedOptions);
      break;
    default:
      toast(message, mergedOptions);
      break;
  }
};
