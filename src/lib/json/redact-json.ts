import { cloneDeep } from '../object/clone-deep';

type PathSegment = string | number;

function parsePath(path: string): PathSegment[] {
  if (path === '') {
    return [];
  }

  return path
    .split('.')
    .filter((segment) => segment.length > 0)
    .map((segment) => (/^\d+$/.test(segment) ? Number(segment) : segment));
}

function isObjectLike(value: unknown): value is Record<string | number, unknown> {
  return typeof value === 'object' && value !== null;
}

function redactAtPath(target: unknown, segments: readonly PathSegment[], mask: unknown): void {
  let current: unknown = target;

  for (let index = 0; index < segments.length - 1; index += 1) {
    const segment = segments[index];

    if (!isObjectLike(current) || !Object.prototype.hasOwnProperty.call(current, segment)) {
      return;
    }

    current = current[segment];
  }

  if (!isObjectLike(current)) {
    return;
  }

  const lastSegment = segments[segments.length - 1];

  if (!Object.prototype.hasOwnProperty.call(current, lastSegment)) {
    return;
  }

  current[lastSegment] = mask;
}

/**
 * Redacts selected dot-paths from a cloned value.
 *
 * @param input Value to redact.
 * @param paths Dot-paths to redact.
 * @param mask Replacement value applied to each matched path.
 * @returns A redacted cloned value.
 * @throws {TypeError} If `paths` is not an array of strings.
 */
export function redactJson(input: unknown, paths: readonly string[], mask: unknown = '[REDACTED]'): unknown {
  if (!Array.isArray(paths)) {
    throw new TypeError('paths must be an array of path strings.');
  }

  const output = cloneDeep(input);

  for (const [index, path] of paths.entries()) {
    if (typeof path !== 'string') {
      throw new TypeError(`paths[${index}] must be a string.`);
    }

    const segments = parsePath(path);

    if (segments.length === 0) {
      return mask;
    }

    redactAtPath(output, segments, mask);
  }

  return output;
}

