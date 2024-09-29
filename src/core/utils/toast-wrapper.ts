import { ToasterProps, toast } from 'sonner';

export const TOAST_SHORT_DURATION = 2000;
export const TOAST_LONG_DURATION = 5000;
export const TOAST_POSITION = 'top-right';

/**
 * A wrapper object for displaying toast messages.
 */
export const toastWrapper = {
  dismiss: (id?: number | string) => {
    toast.dismiss(id);
  },
  loading: (message?: string, options?: ToasterProps) => {
    return toast.loading(message, {
      ...options,
      duration: TOAST_LONG_DURATION, // Default duration for loading toast
      position: TOAST_POSITION, // Default position for loading toast
    });
  },
  /**
   * Displays a success toast message.
   * @param message - The message to be displayed.
   * @param options - Optional toaster props.
   */
  success: (message: string, options?: ToasterProps) => {
    toast.success(message, {
      ...options,
      duration: TOAST_SHORT_DURATION, // Default duration for success toast
      position: TOAST_POSITION, // Default position for success toast
    });
  },
  /**
   * Displays an error toast message.
   * @param message - The message to be displayed.
   * @param options - Optional toaster props.
   */
  error: (message: string, options?: ToasterProps) => {
    toast.error(message, {
      ...options,
      duration: TOAST_SHORT_DURATION, // Default duration for error toast
      position: TOAST_POSITION, // Default position for error toast
    });
  },
  /**
   * Displays a warning toast message.
   * @param message - The message to be displayed.
   * @param options - Optional toaster props.
   */
  warning: (message: string, options?: ToasterProps) => {
    toast.warning(message, {
      ...options,
      duration: TOAST_SHORT_DURATION, // Default duration for warning toast
      position: TOAST_POSITION, // Default position for warning toast
    });
  },
  /**
   * Displays an info toast message.
   * @param message - The message to be displayed.
   * @param options - Optional toaster props.
   */
  info: (message: string, options?: ToasterProps) => {
    toast.info(message, {
      ...options,
      duration: TOAST_SHORT_DURATION, // Default duration for info toast
      position: TOAST_POSITION, // Default position for info toast
    });
  },
};
