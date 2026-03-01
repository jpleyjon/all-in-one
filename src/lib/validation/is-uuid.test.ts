import assert from 'node:assert';
import { describe, it } from 'node:test';
import { isUUID } from './is-uuid';

describe('isUUID', () => {
  it('validates UUID strings with optional versions', () => {
    const v4 = '550e8400-e29b-41d4-a716-446655440000';
    const v1 = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';

    assert.equal(isUUID(v4), true);
    assert.equal(isUUID(v4, 4), true);
    assert.equal(isUUID(v4, 1), false);
    assert.equal(isUUID(v1, 1), true);
  });

  it('returns false for invalid values', () => {
    assert.equal(isUUID(1), false);
    assert.equal(isUUID('not-a-uuid'), false);
    assert.equal(isUUID('550e8400e29b41d4a716446655440000'), false);
  });

  it('throws for invalid version filters', () => {
    assert.throws(
      () => isUUID('550e8400-e29b-41d4-a716-446655440000', 2 as never),
      RangeError,
      'version must be 1, 3, 4, or 5.',
    );
  });
});
