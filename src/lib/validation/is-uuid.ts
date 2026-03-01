import type { UuidVersion } from './types';

/**
 * Checks whether a value is a UUID string.
 *
 * @param value Value to validate.
 * @param version Optional UUID version restriction.
 * @returns `true` when value is a valid UUID.
 * @throws {RangeError} If `version` is invalid.
 */
export function isUUID(value: unknown, version?: UuidVersion): value is string {
  if (version !== undefined && version !== 1 && version !== 3 && version !== 4 && version !== 5) {
    throw new RangeError('version must be 1, 3, 4, or 5.');
  }

  if (typeof value !== 'string') {
    return false;
  }

  const versionPart = version === undefined ? '[1-5]' : String(version);
  const pattern = new RegExp(
    `^[0-9a-f]{8}-[0-9a-f]{4}-${versionPart}[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$`,
    'i',
  );

  return pattern.test(value);
}
