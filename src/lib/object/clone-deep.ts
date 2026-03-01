import { cloneDeepValue } from './internal';

/**
 * Deeply clones objects, arrays, dates and primitives.
 */
export function cloneDeep<T>(input: T): T {
  return cloneDeepValue(input);
}
