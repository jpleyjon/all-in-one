/**
 * Memoizes a function using a resolver or a default argument-based cache key.
 *
 * @param fn Function to memoize.
 * @param resolver Optional key resolver.
 * @returns Memoized function.
 * @throws {TypeError} If `fn` is not a function.
 * @throws {TypeError} If `resolver` is provided and is not a function.
 * @throws {TypeError} If resolver returns a non-string key.
 */
export function memoize<TArgs extends unknown[], TReturn>(
  fn: (...args: TArgs) => TReturn,
  resolver?: (...args: TArgs) => string,
): (...args: TArgs) => TReturn {
  if (typeof fn !== 'function') {
    throw new TypeError('fn must be a function.');
  }

  if (resolver !== undefined && typeof resolver !== 'function') {
    throw new TypeError('resolver must be a function.');
  }

  const cache = new Map<string, TReturn>();
  const objectCache = new WeakMap<object, TReturn>();

  const defaultResolver = (...args: TArgs): string => {
    if (args.length === 0) {
      return '__memoize__empty__';
    }

    const toCacheKey = (value: unknown): string => {
      if (value === null) {
        return 'null';
      }

      switch (typeof value) {
        case 'undefined':
          return 'undefined';
        case 'string':
          return `string:${value}`;
        case 'number':
          return `number:${Object.is(value, -0) ? '-0' : value}`;
        case 'boolean':
          return `boolean:${value}`;
        case 'bigint':
          return `bigint:${value.toString()}`;
        case 'symbol':
          return `symbol:${value.toString()}`;
        case 'function':
          return `function:${value.toString()}`;
        default:
          try {
            return `object:${JSON.stringify(value)}`;
          } catch {
            return `object:${Object.prototype.toString.call(value)}`;
          }
      }
    };

    return args.map(toCacheKey).join('|');
  };

  const resolve = resolver ?? defaultResolver;

  return (...args: TArgs): TReturn => {
    if (resolver === undefined && args.length === 1) {
      const keyCandidate = args[0];
      if (keyCandidate !== null && (typeof keyCandidate === 'object' || typeof keyCandidate === 'function')) {
        if (objectCache.has(keyCandidate)) {
          return objectCache.get(keyCandidate) as TReturn;
        }

        const result = fn(...args);
        objectCache.set(keyCandidate, result);

        return result;
      }
    }

    const key = resolve(...args);

    if (typeof key !== 'string') {
      throw new TypeError('resolver must return a string.');
    }

    if (cache.has(key)) {
      return cache.get(key) as TReturn;
    }

    const value = fn(...args);
    cache.set(key, value);

    return value;
  };
}
