/**
 * Checks whether a value is a valid IPv4 address.
 *
 * @param value Value to validate.
 * @returns `true` when value is a valid IPv4 address.
 */
export function isIPv4(value: unknown): value is string {
  if (typeof value !== 'string') {
    return false;
  }

  const segments = value.split('.');

  if (segments.length !== 4) {
    return false;
  }

  return segments.every((segment) => {
    if (!/^\d+$/.test(segment)) {
      return false;
    }

    if (segment.length > 1 && segment.startsWith('0')) {
      return false;
    }

    const numeric = Number(segment);
    return numeric >= 0 && numeric <= 255;
  });
}
