import type { DateInput } from './types';
import { parseDate } from './parse-date';

export const MS_IN_SECOND = 1000;
export const MS_IN_MINUTE = 60 * MS_IN_SECOND;
export const MS_IN_HOUR = 60 * MS_IN_MINUTE;
export const MS_IN_DAY = 24 * MS_IN_HOUR;

export function requireDate(value: DateInput, name: string): Date {
  const parsed = parseDate(value);

  if (parsed === null) {
    throw new RangeError(`${name} must be a valid date.`);
  }

  return parsed;
}

export function assertInteger(value: number, name: string): void {
  if (!Number.isInteger(value)) {
    throw new RangeError(`${name} must be an integer.`);
  }
}

export function assertWeekStartsOn(value: number): void {
  if (!Number.isInteger(value) || value < 0 || value > 6) {
    throw new RangeError('weekStartsOn must be an integer between 0 and 6.');
  }
}

export function assertFiniteNumber(value: number, name: string): void {
  if (!Number.isFinite(value)) {
    throw new RangeError(`${name} must be a finite number.`);
  }
}

export function pad(value: number, width: number): string {
  return String(value).padStart(width, '0');
}

export function differenceInMilliseconds(a: DateInput, b: DateInput): number {
  return requireDate(a, 'a').getTime() - requireDate(b, 'b').getTime();
}
