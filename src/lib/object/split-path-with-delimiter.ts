import type { PathSegment } from './types';

/**
 * Splits a path string using a custom delimiter and converts numeric segments.
 *
 * @param path Delimited path string.
 * @param delimiter Delimiter used to split the path.
 * @returns Path segments with numeric tokens converted to numbers.
 */
export function splitPathWithDelimiter(path: string, delimiter: string): PathSegment[] {
  if (path === '') {
    return [];
  }

  return path
    .split(delimiter)
    .filter((segment) => segment.length > 0)
    .map((segment) => (/^\d+$/.test(segment) ? Number(segment) : segment));
}
