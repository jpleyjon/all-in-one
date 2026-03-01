function escapeRegexCharacter(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function resolveSeparators(locales?: string | string[]): {
  group: string;
  decimal: string;
  numerals: Map<string, string>;
} {
  const formatter = new Intl.NumberFormat(locales);
  const parts = formatter.formatToParts(12345.6);

  const group = parts.find((part) => part.type === 'group')?.value ?? ',';
  const decimal = parts.find((part) => part.type === 'decimal')?.value ?? '.';

  const numerals = new Map<string, string>();

  for (let index = 0; index < 10; index += 1) {
    const localized = formatter.format(index);
    numerals.set(localized, String(index));
  }

  return { group, decimal, numerals };
}

/**
 * Parses a localized numeric string into a finite number.
 *
 * @param input Text representation of a number.
 * @param locales Optional locale or locales list.
 * @returns Parsed finite number.
 * @throws {TypeError} If `input` is not a valid numeric string.
 */
export function parseNumber(input: string, locales?: string | string[]): number {
  if (typeof input !== 'string') {
    throw new TypeError('input must be a string.');
  }

  const trimmed = input.trim();

  if (trimmed.length === 0) {
    throw new TypeError('input must be a non-empty numeric string.');
  }

  const { group, decimal, numerals } = resolveSeparators(locales);

  const withoutSpaces = trimmed.replace(/[\s\u00A0\u202F]/g, '');

  let normalized = '';

  for (const character of withoutSpaces) {
    normalized += numerals.get(character) ?? character;
  }

  if (group.length > 0) {
    const groupRegex = new RegExp(escapeRegexCharacter(group), 'g');
    normalized = normalized.replace(groupRegex, '');
  }

  if (decimal !== '.') {
    const decimalRegex = new RegExp(escapeRegexCharacter(decimal), 'g');
    normalized = normalized.replace(decimalRegex, '.');
  }

  if (!/^[+-]?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?$/.test(normalized)) {
    throw new TypeError('input must be a valid numeric string.');
  }

  const parsed = Number(normalized);

  if (!Number.isFinite(parsed)) {
    throw new TypeError('input must be a valid numeric string.');
  }

  return parsed;
}
