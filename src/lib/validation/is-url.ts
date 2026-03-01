import type { UrlValidationOptions } from './types';

/**
 * Checks whether a value is a URL using allowed protocols.
 *
 * @param value Value to validate.
 * @param options URL validation options.
 * @returns `true` when value is a URL that matches options.
 * @throws {TypeError} If `options` has an invalid shape.
 */
export function isUrl(value: unknown, options?: UrlValidationOptions): value is string {
  if (typeof value !== 'string' || value.length === 0 || value !== value.trim()) {
    return false;
  }

  if (
    options !== undefined &&
    (typeof options !== 'object' || options === null || Array.isArray(options))
  ) {
    throw new TypeError('options must be an object.');
  }

  const protocols = options?.protocols ?? ['http:', 'https:'];
  const allowLocalhost = options?.allowLocalhost ?? false;

  if (
    !Array.isArray(protocols) ||
    protocols.some((protocol) => typeof protocol !== 'string' || protocol.length === 0)
  ) {
    throw new TypeError('options.protocols must be an array of non-empty strings.');
  }

  if (typeof allowLocalhost !== 'boolean') {
    throw new TypeError('options.allowLocalhost must be a boolean.');
  }

  try {
    const parsed = new URL(value);

    if (!protocols.includes(parsed.protocol)) {
      return false;
    }

    if (parsed.hostname.length === 0) {
      return false;
    }

    if (!allowLocalhost && parsed.hostname === 'localhost') {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}
