import { parseJson } from './parse-json';
import type { SafeParseJsonResult } from './types';

/**
 * Parses JSON and returns a discriminated result instead of throwing.
 *
 * @param input JSON string to parse.
 * @returns `{ ok: true, value }` on success, or `{ ok: false, error }` on failure.
 */
export function safeParseJson<T = unknown>(input: string): SafeParseJsonResult<T> {
  try {
    return {
      ok: true,
      value: parseJson<T>(input),
    };
  } catch (error) {
    if (error instanceof SyntaxError) {
      return { ok: false, error };
    }

    return {
      ok: false,
      error: new SyntaxError('input must be valid JSON.'),
    };
  }
}
