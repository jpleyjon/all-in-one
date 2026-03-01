/**
 * Clones values using JSON serialization semantics.
 *
 * @param input Value to clone.
 * @returns A cloned value produced by `JSON.stringify` + `JSON.parse`.
 * @throws {TypeError} If `input` is not JSON-serializable.
 */
export function safeJsonClone<T>(input: T): T {
  let serialized: string | undefined;

  try {
    serialized = JSON.stringify(input);
  } catch {
    throw new TypeError('input must be JSON-serializable.');
  }

  if (serialized === undefined) {
    throw new TypeError('input must be JSON-serializable.');
  }

  return JSON.parse(serialized) as T;
}
