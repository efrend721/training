import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { AppStore } from '../../redux/store';
import { removeToast } from '../../redux/states/toast';
import './ToastContainer.css';

function ToastContainer() {
  const { toasts } = useSelector((store: AppStore) => store.toast);
  const dispatch = useDispatch();

  useEffect(() => {
    toasts.forEach(toast => {
      if (toast.duration !== 0) {
        const timer = setTimeout(() => {
          dispatch(removeToast(toast.id));
        }, toast.duration || 5000);

        return () => clearTimeout(timer);
      }
    });
  }, [toasts, dispatch]);

  const handleRemove = (id: string) => {
    dispatch(removeToast(id));
  };

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <div 
          key={toast.id} 
          className={`toast toast--${toast.type}`}
        >
          <div className="toast__content">
            <span className="toast__message">{toast.message}</span>
            <button 
              className="toast__close"
              onClick={() => handleRemove(toast.id)}
              aria-label="Cerrar notificación"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ToastContainer;
