import assert from 'node:assert';
import { describe, it } from 'node:test';
import { allocateCents } from './allocate-cents';

describe('allocateCents', () => {
  it('allocates positive cents and preserves totals', () => {
    const result = allocateCents(10, 3);

    assert.deepEqual(result, [4, 3, 3]);
    assert.equal(
      result.reduce((total, value) => total + value, 0),
      10,
    );
  });

  it('allocates negative cents and preserves totals', () => {
    const result = allocateCents(-10, 3);

    assert.deepEqual(result, [-4, -3, -3]);
    assert.equal(
      result.reduce((total, value) => total + value, 0),
      -10,
    );
  });

  it('allocates zero cents', () => {
    assert.deepEqual(allocateCents(0, 4), [0, 0, 0, 0]);
  });

  it('throws for invalid cents values', () => {
    assert.throws(() => allocateCents(1.5, 2), RangeError, 'cents must be a safe integer.');
  });

  it('throws for invalid parts values', () => {
    assert.throws(() => allocateCents(10, 0), RangeError, 'parts must be a positive integer.');
    assert.throws(() => allocateCents(10, 1.5), RangeError, 'parts must be a positive integer.');
  });
});
