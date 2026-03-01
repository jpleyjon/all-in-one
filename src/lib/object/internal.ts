import type { ObjectPath, ObjectRecord, PathSegment } from './types';

export function isNonNullObject(value: unknown): value is object {
  return typeof value === 'object' && value !== null;
}

export function isPlainObject(value: unknown): value is ObjectRecord {
  if (!isNonNullObject(value) || Array.isArray(value)) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

export function assertPlainObject(input: unknown, name = 'input'): asserts input is ObjectRecord {
  if (!isPlainObject(input)) {
    throw new TypeError(`${name} must be a plain object.`);
  }
}

export function assertObjectLike(input: unknown, name = 'input'): asserts input is object {
  if (!isNonNullObject(input)) {
    throw new TypeError(`${name} must be a non-null object.`);
  }
}

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

export function splitPathWithDelimiter(path: string, delimiter: string): PathSegment[] {
  if (path === '') {
    return [];
  }

  return path
    .split(delimiter)
    .filter((segment) => segment.length > 0)
    .map((segment) => (/^\d+$/.test(segment) ? Number(segment) : segment));
}

export function getAtPath(input: unknown, segments: readonly PathSegment[]): unknown {
  let current: unknown = input;

  for (const segment of segments) {
    if (!isNonNullObject(current)) {
      return undefined;
    }

    current = (current as Record<string | number, unknown>)[segment];
  }

  return current;
}

export function hasAtPath(input: unknown, segments: readonly PathSegment[]): boolean {
  let current: unknown = input;

  for (const segment of segments) {
    if (!isNonNullObject(current)) {
      return false;
    }

    if (!Object.prototype.hasOwnProperty.call(current, segment)) {
      return false;
    }

    current = (current as Record<string | number, unknown>)[segment];
  }

  return true;
}

function createContainer(nextSegment: PathSegment | undefined): unknown {
  return typeof nextSegment === 'number' ? [] : {};
}

export function setAtPath(
  input: unknown,
  segments: readonly PathSegment[],
  value: unknown,
): unknown {
  if (segments.length === 0) {
    return cloneDeepValue(value);
  }

  const [head, ...tail] = segments;
  const base = (
    Array.isArray(input) ? [...input] : isPlainObject(input) ? { ...input } : createContainer(head)
  ) as Record<string | number, unknown>;

  const current = base[head];
  const next = tail.length === 0 ? value : setAtPath(current, tail, value);

  base[head] = next;
  return base;
}

export function unsetAtPath(input: unknown, segments: readonly PathSegment[]): unknown {
  if (segments.length === 0 || !isNonNullObject(input)) {
    return input;
  }

  const [head, ...tail] = segments;

  if (!Object.prototype.hasOwnProperty.call(input, head)) {
    return input;
  }

  const base = (Array.isArray(input) ? [...input] : { ...(input as ObjectRecord) }) as Record<
    string | number,
    unknown
  >;

  if (tail.length === 0) {
    if (Array.isArray(base) && typeof head === 'number') {
      (base as unknown[]).splice(head, 1);
    } else {
      delete base[head];
    }

    return base;
  }

  base[head] = unsetAtPath(base[head], tail);
  return base;
}

export function cloneDeepValue<T>(input: T, seen = new WeakMap<object, unknown>()): T {
  if (!isNonNullObject(input)) {
    return input;
  }

  if (input instanceof Date) {
    return new Date(input.getTime()) as T;
  }

  if (seen.has(input)) {
    return seen.get(input) as T;
  }

  if (Array.isArray(input)) {
    const output: unknown[] = [];
    seen.set(input, output);

    for (const item of input) {
      output.push(cloneDeepValue(item, seen));
    }

    return output as T;
  }

  if (!isPlainObject(input)) {
    return input;
  }

  const output: ObjectRecord = {};
  seen.set(input, output);

  for (const [key, value] of Object.entries(input)) {
    output[key] = cloneDeepValue(value, seen);
  }

  return output as T;
}

export function deepMergeValue(left: unknown, right: unknown): unknown {
  if (isPlainObject(left) && isPlainObject(right)) {
    const output: ObjectRecord = { ...left };

    for (const [key, value] of Object.entries(right)) {
      output[key] = key in output ? deepMergeValue(output[key], value) : cloneDeepValue(value);
    }

    return output;
  }

  return cloneDeepValue(right);
}
