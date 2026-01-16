import { useToast as toastHook } from "../context/ToastContext";

export default function useToast() {
  return toastHook();
}
