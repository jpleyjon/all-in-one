/**
 * Checks whether a value is a pragmatic email address.
 *
 * @param value Value to validate.
 * @returns `true` when value is a valid email-like address.
 */
export function isEmail(value: unknown): value is string {
  if (typeof value !== 'string' || value !== value.trim() || value.length > 254) {
    return false;
  }

  const atIndex = value.indexOf('@');

  if (atIndex <= 0 || atIndex !== value.lastIndexOf('@') || atIndex === value.length - 1) {
    return false;
  }

  const localPart = value.slice(0, atIndex);
  const domainPart = value.slice(atIndex + 1);

  if (localPart.length > 64 || localPart.startsWith('.') || localPart.endsWith('.')) {
    return false;
  }

  if (localPart.includes('..') || !/^[A-Za-z0-9!#$%&'*+/=?^_`{|}~.-]+$/.test(localPart)) {
    return false;
  }

  if (
    domainPart.length === 0 ||
    !domainPart.includes('.') ||
    domainPart.startsWith('.') ||
    domainPart.endsWith('.')
  ) {
    return false;
  }

  return domainPart
    .split('.')
    .every(
      (label) =>
        label.length > 0 &&
        !label.startsWith('-') &&
        !label.endsWith('-') &&
        /^[A-Za-z0-9-]+$/.test(label),
    );
}
