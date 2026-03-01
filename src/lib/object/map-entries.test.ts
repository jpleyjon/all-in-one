import assert from 'node:assert';
import { describe, it } from 'node:test';
import { mapEntries } from './map-entries';

describe('mapEntries', () => {
  it('maps entries into new key/value pairs', () => {
    const result = mapEntries({ a: 1, b: 2 }, (value, key) => [
      String(key).toUpperCase(),
      value * 10,
    ]);
    assert.deepEqual(result, { A: 10, B: 20 });
  });

  it('throws for invalid input', () => {
    assert.throws(
      () => mapEntries('x' as never, () => ['x', 1]),
      TypeError,
      'input must be a plain object.',
    );
  });
});
