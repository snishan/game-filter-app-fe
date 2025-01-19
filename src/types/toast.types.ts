export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  message: string;
  type: ToastType;
  duration?: number;
  onClose: () => void;
}

export interface ToastState {
  message: string;
  type: ToastType;
  isVisible: boolean;
}
