type LogLevel = 'log' | 'warn' | 'error';

export const devLog = (
  level: LogLevel,
  message: string,
  meta?: unknown
) => {
  if (!__DEV__) return;

  const logger = console[level] ?? console.log;

  if (meta !== undefined) {
    logger(message, meta);
  } else {
    logger(message);
  }
};
