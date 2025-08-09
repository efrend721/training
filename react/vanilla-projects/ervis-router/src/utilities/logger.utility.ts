type LogLevel = 'info' | 'warn' | 'error' | 'debug';

class Logger {
  private isDevelopment = import.meta.env.DEV;

  private formatMessage(level: LogLevel, message: string, data?: unknown): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${data ? ` - ${JSON.stringify(data)}` : ''}`;
  }

  private log(level: LogLevel, message: string, data?: unknown): void {
    const formattedMessage = this.formatMessage(level, message, data);
    
    if (this.isDevelopment) {
      switch (level) {
        case 'error':
          console.error(formattedMessage, data);
          break;
        case 'warn':
          console.warn(formattedMessage, data);
          break;
        case 'debug':
          console.debug(formattedMessage, data);
          break;
        default:
          console.log(formattedMessage, data);
      }
    }

    // En producción, aquí enviarías los logs a un servicio externo
    if (!this.isDevelopment && level === 'error') {
      // Ejemplo: enviar a servicio de logging
      // this.sendToLoggingService({ level, message, timestamp: new Date(), data });
    }
  }

  info(message: string, data?: unknown): void {
    this.log('info', message, data);
  }

  warn(message: string, data?: unknown): void {
    this.log('warn', message, data);
  }

  error(message: string, data?: unknown): void {
    this.log('error', message, data);
  }

  debug(message: string, data?: unknown): void {
    this.log('debug', message, data);
  }

  // Método específico para errores de autenticación
  authError(message: string, error?: Error): void {
    this.error(`[AUTH] ${message}`, error);
  }

  // Método específico para errores de API
  apiError(endpoint: string, error: Error, response?: Response): void {
    this.error(`[API] Error en ${endpoint}`, { 
      error: error.message, 
      status: response?.status,
      statusText: response?.statusText 
    });
  }
}

export const logger = new Logger();
