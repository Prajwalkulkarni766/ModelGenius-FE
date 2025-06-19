import { ToasConfig } from "./toastConfig"
import { toast } from "react-toastify"

export const Toast = {
  success: (msg: string) => toast.success(msg, ToasConfig),
  error: (msg: string) => toast.error(msg, ToasConfig),
  warn: (msg: string) => toast.warn(msg, ToasConfig),
  info: (msg: string) => toast.info(msg, ToasConfig)
}