import { stringifyJson } from './stringify-json';

const UTF8_ENCODER = new TextEncoder();

/**
 * Computes the UTF-8 byte size of a JSON value.
 *
 * @param input Value to measure.
 * @returns Number of bytes in the JSON string representation.
 * @throws {RangeError} If serialization options are invalid.
 * @throws {TypeError} If `input` is not JSON-serializable.
 */
export function jsonByteSize(input: unknown): number {
  return UTF8_ENCODER.encode(stringifyJson(input)).byteLength;
}
