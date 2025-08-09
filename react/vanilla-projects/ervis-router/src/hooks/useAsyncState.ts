import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addToast } from '../redux/states/toast';
import { logger } from '../utilities/logger.utility';

interface AsyncState {
  loading: boolean;
  error: string | null;
}

interface UseAsyncStateOptions {
  showErrorToast?: boolean;
  errorMessage?: string;
}

export function useAsyncState(options: UseAsyncStateOptions = {}) {
  const { showErrorToast = true, errorMessage } = options;
  const [state, setState] = useState<AsyncState>({
    loading: false,
    error: null
  });
  const dispatch = useDispatch();

  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, loading }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState(prev => ({ ...prev, error }));
    if (error && showErrorToast) {
      dispatch(addToast({
        type: 'error',
        message: errorMessage || error
      }));
      logger.error('AsyncState Error', error);
    }
  }, [dispatch, showErrorToast, errorMessage]);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  const executeAsync = useCallback(async <T>(
    asyncFn: () => Promise<T>,
    successMessage?: string
  ): Promise<T | null> => {
    try {
      setLoading(true);
      clearError();
      
      const result = await asyncFn();
      
      if (successMessage) {
        dispatch(addToast({
          type: 'success',
          message: successMessage
        }));
      }
      
      return result;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Error desconocido';
      setError(errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, clearError, dispatch]);

  return {
    ...state,
    setLoading,
    setError,
    clearError,
    executeAsync
  };
}
