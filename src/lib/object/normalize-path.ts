import type { ObjectPath, PathSegment } from './types';

/**
 * Normalizes an object path into path segments.
 *
 * @param path Path represented as dot-notation string or segment array.
 * @returns Normalized path segments.
 * @throws If `path` is not a string or segment array, or contains invalid segments.
 */
export function normalizePath(path: ObjectPath): PathSegment[] {
  if (Array.isArray(path)) {
    return path.map((segment, index) => {
      if (typeof segment !== 'string' && !Number.isInteger(segment)) {
        throw new TypeError(`path[${index}] must be a string or integer.`);
      }

      if (typeof segment === 'number' && segment < 0) {
        throw new RangeError(`path[${index}] must be a non-negative integer when numeric.`);
      }

      return segment;
    });
  }

  if (typeof path !== 'string') {
    throw new TypeError('path must be a string or an array of segments.');
  }

  if (path === '') {
    return [];
  }

  return path
    .split('.')
    .filter((segment) => segment.length > 0)
    .map((segment) => (/^\d+$/.test(segment) ? Number(segment) : segment));
}
