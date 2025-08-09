import { useToast } from '../../hooks/useToast';
import { logger } from '../../utilities/logger.utility';
import './TestErrorHandling.css';

function TestErrorHandling() {
  const { showSuccess, showError, showWarning, showInfo } = useToast();

  const testToasts = () => {
    showSuccess('¡Operación exitosa!');
    setTimeout(() => showError('Error de prueba'), 1000);
    setTimeout(() => showWarning('Advertencia de prueba'), 2000);
    setTimeout(() => showInfo('Información de prueba'), 3000);
  };

  const testLogger = () => {
    logger.info('Mensaje de información');
    logger.warn('Mensaje de advertencia');
    logger.error('Mensaje de error');
    logger.debug('Mensaje de debug');
  };

  const testErrorBoundary = () => {
    // Esto debería ser capturado por el ErrorBoundary
    throw new Error('Error de prueba para ErrorBoundary');
  };

  return (
    <div className="test-error-handling">
      <button onClick={testToasts}>Probar Toasts</button>
      <button onClick={testLogger}>Probar Logger</button>
      <button onClick={testErrorBoundary}>Probar ErrorBoundary</button>
    </div>
  );
}

export default TestErrorHandling;
