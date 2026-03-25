import toast from "react-hot-toast";

export const notifySuccess = (message: string) => {
  toast.success(message);
};

export const notifyFailed = (message: string) => {
  toast.error(message);
};
