import { assertFiniteNumber } from './assert-finite-number';

const MS_IN_SECOND = 1000;
const MS_IN_MINUTE = 60 * MS_IN_SECOND;
const MS_IN_HOUR = 60 * MS_IN_MINUTE;
const MS_IN_DAY = 24 * MS_IN_HOUR;

/**
 * Converts a duration in milliseconds to a compact human-readable form.
 *
 * @param milliseconds Duration in milliseconds.
 * @returns Human-readable duration string.
 */
export function humanizeDuration(milliseconds: number): string {
  assertFiniteNumber(milliseconds, 'milliseconds');

  const sign = milliseconds < 0 ? '-' : '';
  let remaining = Math.trunc(Math.abs(milliseconds));

  if (remaining === 0) {
    return '0ms';
  }

  const parts: string[] = [];

  const dayCount = Math.floor(remaining / MS_IN_DAY);
  if (dayCount > 0) {
    parts.push(`${dayCount}d`);
    remaining -= dayCount * MS_IN_DAY;
  }

  const hourCount = Math.floor(remaining / MS_IN_HOUR);
  if (hourCount > 0) {
    parts.push(`${hourCount}h`);
    remaining -= hourCount * MS_IN_HOUR;
  }

  const minuteCount = Math.floor(remaining / MS_IN_MINUTE);
  if (minuteCount > 0) {
    parts.push(`${minuteCount}m`);
    remaining -= minuteCount * MS_IN_MINUTE;
  }

  const secondCount = Math.floor(remaining / MS_IN_SECOND);
  if (secondCount > 0) {
    parts.push(`${secondCount}s`);
    remaining -= secondCount * MS_IN_SECOND;
  }

  if (remaining > 0) {
    parts.push(`${remaining}ms`);
  }

  return sign + parts.join(' ');
}
