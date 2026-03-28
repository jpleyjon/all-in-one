import assert from 'node:assert';
import { describe, it } from 'node:test';
import * as string from '.';

describe('string index', () => {
  it('re-exports all public helpers', () => {
    const exported = [
      'capitalize',
      'capitalizeWords',
      'equalsIgnoreCase',
      'includesIgnoreCase',
      'initials',
      'mask',
      'normalizeWhitespace',
      'slugify',
      'truncate',
      'truncateWords',
      'toCamelCase',
      'toKebabCase',
      'toPascalCase',
      'toSnakeCase',
      'toTitleCase',
      'toWords',
      'stripAccents',
    ] as const;

    exported.forEach((name) => {
      assert.equal(typeof (string as Record<string, unknown>)[name], 'function');
    });
  });
});
