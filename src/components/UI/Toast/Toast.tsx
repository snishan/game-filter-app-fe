import React, { useEffect } from 'react';
import { ToastProps } from '../../../types/toast.types';
import './styles.scss'

export const Toast: React.FC<ToastProps> = ({
  message,
  type,
  duration = 3000,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getToastColor = () => {
    switch (type) {
      case 'success':
        return '#4caf50';
      case 'error':
        return '#f44336';
      case 'warning':
        return '#ff9800';
      case 'info':
        return '#2196f3';
      default:
        return '#333';
    }
  };

  return (
    <div
      className="toast"
      style={{
        backgroundColor: getToastColor(),
      }}
    >
      <p className="toast-message">{message}</p>
      <button className="toast-close" onClick={onClose}>
        ×
      </button>
    </div>
  );
};