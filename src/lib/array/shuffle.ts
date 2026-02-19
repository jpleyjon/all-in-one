/**
 * Returns a shuffled copy of an array.
 *
 * @param input Source array.
 * @param random Optional random number generator (0 to <1).
 * @returns Shuffled array.
 */
export function shuffle<T>(
  input: readonly T[],
  random: () => number = Math.random,
): T[] {
  const result = [...input];

  for (let index = result.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(random() * (index + 1));
    const current = result[index];
    result[index] = result[randomIndex];
    result[randomIndex] = current;
  }

  return result;
}
