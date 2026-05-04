import { randomInt } from '../number/random-int';
import type { GenerateUUIDOptions } from './types';

/**
 * Generates a UUID v4 string.
 *
 * @param options Optional generator settings.
 * @returns UUID v4 string.
 */
export function generateUUID(options: GenerateUUIDOptions = {}): string {
  const bytes = Array.from({ length: 16 }, () => randomInt(0, 255, options.random));

  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  const hex = bytes.map((value) => value.toString(16).padStart(2, '0')).join('');

  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}
