import { TEXTS } from '@/shared/consts';

export const convertBytesToHuman = (bytes: number): string => {
  if (!Number.isFinite(bytes) || bytes < 0) {
    return TEXTS.empty;
  }

  const byteUnits = ['B', 'kB', 'MB', 'GB', 'TB'];

  let unitIndex = 0;

  while (bytes >= 1024 && unitIndex < byteUnits.length - 1) {
    bytes /= 1024;
    unitIndex++;
  }

  return `${+bytes.toFixed(2)} ${byteUnits[unitIndex]}`;
};
