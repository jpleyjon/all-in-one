import assert from 'node:assert';
import { describe, it } from 'node:test';
import { mapKeys } from './map-keys';

describe('mapKeys', () => {
  it('maps keys while preserving values', () => {
    const result = mapKeys({ firstName: 'Ada', lastName: 'Lovelace' }, (key) =>
      String(key).toUpperCase(),
    );

    assert.deepEqual(result, { FIRSTNAME: 'Ada', LASTNAME: 'Lovelace' });
  });

  it('uses last value on key collisions', () => {
    const result = mapKeys({ a: 1, b: 2 }, () => 'x');
    assert.deepEqual(result, { x: 2 });
  });

  it('throws for invalid input', () => {
    assert.throws(
      () => mapKeys([] as never, (key) => String(key)),
      TypeError,
      'input must be a plain object.',
    );
  });
});
