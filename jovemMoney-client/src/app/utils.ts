export const url = (id: number, baseUrl: string, stringFind: string) => baseUrl.replace(stringFind, id.toString());

// Simple logger helper for Angular components
export type LogLevel = 'INFO' | 'DEBUG' | 'ERROR';

function getTimestamp() {
  return new Date().toISOString();
}

export function createLogger(context: string) {
  function log(level: LogLevel, ...args: any[]) {
    const msg = args.map(a => (typeof a === 'object' ? JSON.stringify(a) : a)).join(' ');
    // eslint-disable-next-line no-console
    console.log(`${level} - ${context} - ${getTimestamp()} - ${msg}`);
  }
  return {
    info: (...args: any[]) => log('INFO', ...args),
    debug: (...args: any[]) => log('DEBUG', ...args),
    error: (...args: any[]) => log('ERROR', ...args),
  };
}