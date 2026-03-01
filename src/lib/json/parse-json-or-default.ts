import { safeParseJson } from './safe-parse-json';

/**
 * Parses JSON and returns a fallback value when parsing fails.
 *
 * @param input JSON string to parse.
 * @param fallback Value returned when parsing fails.
 * @returns Parsed JSON value or `fallback` when parsing fails.
 */
export function parseJsonOrDefault<T>(input: string, fallback: T): T {
  const result = safeParseJson<T>(input);
  return result.ok ? result.value : fallback;
}
