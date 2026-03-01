function sortObjectKeys(value: unknown): unknown {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    return value;
  }

  const output: Record<string, unknown> = {};

  for (const key of Object.keys(value).sort()) {
    output[key] = (value as Record<string, unknown>)[key];
  }

  return output;
}

/**
 * Converts a value to a deterministic JSON string by sorting object keys.
 *
 * @param input Value to stringify.
 * @param space Optional indentation size.
 * @returns Deterministic JSON string representation of `input`.
 * @throws {RangeError} If `space` is not a non-negative integer.
 * @throws {TypeError} If `input` is not JSON-serializable.
 */
export function stableStringifyJson(input: unknown, space?: number): string {
  if (space !== undefined && (!Number.isInteger(space) || space < 0)) {
    throw new RangeError('space must be a non-negative integer.');
  }

  let serialized: string | undefined;

  try {
    serialized = JSON.stringify(input, (_key, value) => sortObjectKeys(value), space);
  } catch {
    throw new TypeError('input must be JSON-serializable.');
  }

  if (serialized === undefined) {
    throw new TypeError('input must be JSON-serializable.');
  }

  return serialized;
}

