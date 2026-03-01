import assert from 'node:assert';
import { describe, it } from 'node:test';
import { mapValues } from './map-values';

describe('mapValues', () => {
  it('maps values while preserving keys', () => {
    const input = { a: 1, b: 2 };
    const result = mapValues(input, (value, key) => `${String(key)}:${value * 2}`);

    assert.deepEqual(result, { a: 'a:2', b: 'b:4' });
  });

  it('throws for invalid input', () => {
    assert.throws(
      () => mapValues(undefined as never, () => 1),
      TypeError,
      'input must be a plain object.',
    );
  });
});
