import { isPlainObject } from '../object/is-plain-object';

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
export function memoize<TThis = unknown, TArgs extends unknown[] = unknown[], TReturn = unknown>(
  fn: (this: TThis, ...args: TArgs) => TReturn,
  resolver?: (...args: TArgs) => string,
): (this: TThis, ...args: TArgs) => TReturn {
  if (typeof fn !== 'function') {
    throw new TypeError('fn must be a function.');
  }

  if (resolver !== undefined && typeof resolver !== 'function') {
    throw new TypeError('resolver must be a function.');
  }

  const cache = new Map<string, TReturn>();
  const contextIds = new WeakMap<object, string>();
  const contextObjectCache = new WeakMap<object, WeakMap<object, TReturn>>();
  const primitiveContextObjectCache = new Map<string, WeakMap<object, TReturn>>();
  const symbolIds = new Map<symbol, string>();
  let contextCounter = 0;
  let symbolCounter = 0;

  const getContextKey = (context: unknown): string => {
    if (typeof context === 'symbol') {
      const existing = symbolIds.get(context);

      if (existing !== undefined) {
        return existing;
      }

      const nextSymbolId = `__memoize_symbol_${(symbolCounter += 1)}`;
      symbolIds.set(context, nextSymbolId);

      return nextSymbolId;
    }

    if (context !== null && (typeof context === 'object' || typeof context === 'function')) {
      const objectContext = context as object;
      const existingId = contextIds.get(objectContext);

      if (existingId !== undefined) {
        return existingId;
      }

      const nextId = `__memoize_context_${(contextCounter += 1)}`;
      contextIds.set(objectContext, nextId);

      return nextId;
    }

    return `${typeof context}:${String(context)}`;
  };

  const getContextObjectArgCache = (context: unknown): WeakMap<object, TReturn> => {
    if (context !== null && (typeof context === 'object' || typeof context === 'function')) {
      const contextCache = contextObjectCache.get(context as object);

      if (contextCache !== undefined) {
        return contextCache;
      }

      const nextCache = new WeakMap<object, TReturn>();
      contextObjectCache.set(context as object, nextCache);

      return nextCache;
    }

    const contextKey = getContextKey(context);
    const primitiveCache = primitiveContextObjectCache.get(contextKey);

    if (primitiveCache !== undefined) {
      return primitiveCache;
    }

    const nextPrimitiveCache = new WeakMap<object, TReturn>();
    primitiveContextObjectCache.set(contextKey, nextPrimitiveCache);

    return nextPrimitiveCache;
  };

  const defaultResolver = function (this: TThis, ...args: TArgs): string {
    if (args.length === 0) {
      return JSON.stringify([`this:${getContextKey(this)}`]);
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
        case 'symbol': {
          const symbolId = symbolIds.get(value);

          if (symbolId !== undefined) {
            return `symbol:${symbolId}`;
          }

          const nextSymbolId = `__memoize_symbol_${(symbolCounter += 1)}`;
          symbolIds.set(value, nextSymbolId);

          return `symbol:${nextSymbolId}`;
        }
        case 'function':
          return `function:${getContextKey(value)}`;
        default:
          if (value instanceof Date) {
            return `date:${value.getTime()}`;
          }

          if (!Array.isArray(value) && !isPlainObject(value)) {
            return `object:${getContextKey(value)}`;
          }

          try {
            const serialized = JSON.stringify(value);

            if (serialized === undefined) {
              return `object:${getContextKey(value)}`;
            }

            return `object:${serialized}`;
          } catch {
            return `object:${getContextKey(value)}`;
          }
      }
    };

    return JSON.stringify([`this:${getContextKey(this)}`, ...args.map(toCacheKey)]);
  };

  const resolve = resolver ?? defaultResolver;

  return function (this: TThis, ...args: TArgs): TReturn {
    if (resolver === undefined && args.length === 1) {
      const arg = args[0];

      if (arg !== null && (typeof arg === 'object' || typeof arg === 'function')) {
        const contextCache = getContextObjectArgCache(this);
        if (contextCache.has(arg)) {
          return contextCache.get(arg) as TReturn;
        }

        const value = fn.apply(this, args);
        contextCache.set(arg, value);

        return value;
      }
    }

    const key = resolver === undefined ? defaultResolver.apply(this, args) : resolve(...args);

    if (typeof key !== 'string') {
      throw new TypeError('resolver must return a string.');
    }

    if (cache.has(key)) {
      return cache.get(key) as TReturn;
    }

    const value = fn.apply(this, args);
    cache.set(key, value);

    return value;
  };
}
