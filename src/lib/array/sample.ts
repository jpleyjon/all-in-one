/**
 * Picks a random item from an array.
 *
 * @param input Source array.
 * @param random Optional random number generator (0 to <1).
 * @returns Random item or `undefined` for empty arrays.
 */
export function sample<T>(
  input: readonly T[],
  random: () => number = Math.random,
): T | undefined {
  if (input.length === 0) {
    return undefined;
  }

  const randomIndex = Math.floor(random() * input.length);
  return input[randomIndex];
}
