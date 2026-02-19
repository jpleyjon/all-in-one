import type { PrimitiveComparable } from './types';

/**
 * Finds the item with the largest selector value.
 *
 * @param input Source array.
 * @param selector Selector used to compare values.
 * @returns Maximum item or `undefined` for empty arrays.
 */
export function maxBy<T>(
  input: readonly T[],
  selector: (item: T, index: number, source: readonly T[]) => PrimitiveComparable,
): T | undefined {
  if (input.length === 0) {
    return undefined;
  }

  const normalize = (value: PrimitiveComparable): string | number | bigint => {
    if (value instanceof Date) {
      return value.getTime();
    }

    return value;
  };

  let maxItem = input[0];
  let maxValue = normalize(selector(maxItem, 0, input));

  for (let index = 1; index < input.length; index += 1) {
    const currentItem = input[index];
    const currentValue = normalize(selector(currentItem, index, input));

    if (currentValue > maxValue) {
      maxItem = currentItem;
      maxValue = currentValue;
    }
  }

  return maxItem;
}
