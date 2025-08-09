import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { addToast } from '../redux/states/toast';
import type { Toast } from '../models/toast.model';

export function useToast() {
  const dispatch = useDispatch();

  const showToast = useCallback((toast: Omit<Toast, 'id'>) => {
    dispatch(addToast(toast));
  }, [dispatch]);

  const showSuccess = useCallback((message: string, duration?: number) => {
    showToast({ type: 'success', message, duration });
  }, [showToast]);

  const showError = useCallback((message: string, duration?: number) => {
    showToast({ type: 'error', message, duration });
  }, [showToast]);

  const showWarning = useCallback((message: string, duration?: number) => {
    showToast({ type: 'warning', message, duration });
  }, [showToast]);

  const showInfo = useCallback((message: string, duration?: number) => {
    showToast({ type: 'info', message, duration });
  }, [showToast]);

  return {
    showToast,
    showSuccess,
    showError,
    showWarning,
    showInfo
  };
}
