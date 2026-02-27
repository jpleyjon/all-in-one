import { assertFiniteNumber } from './internal';

/**
 * Creates a date from UNIX timestamp in seconds.
 *
 * @param seconds UNIX timestamp in seconds.
 * @returns Date instance.
 */
export function fromUnixTimestamp(seconds: number): Date {
  assertFiniteNumber(seconds, 'seconds');
  return new Date(seconds * 1000);
}
