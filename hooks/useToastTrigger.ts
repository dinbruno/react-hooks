import { toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ToastTriggerProps = {
  type: "success" | "error";
  message: string;
};

export const toastTrigger = ({ type, message }: ToastTriggerProps) => {
  const toastConfig: ToastOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
    theme: "dark",
  };

  const toastType = ({ [type]: toast[type] } = {
    success: toast.success,
    error: toast.error,
  });

  const toastfy = toastType[type](message, toastConfig);

  return toastfy;
};
