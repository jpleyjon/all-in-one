import assert from 'node:assert';
import { describe, it } from 'node:test';
import { arrayOf } from './array-of';

describe('arrayOf', () => {
  it('builds array validators from item validators', () => {
    const validator = arrayOf((value: unknown): value is number => typeof value === 'number');

    assert.equal(validator([1, 2, 3]), true);
    assert.equal(validator([1, '2']), false);
    assert.equal(validator('1,2,3'), false);
  });

  it('throws for invalid validator input', () => {
    assert.throws(() => arrayOf(1 as never), TypeError, 'validator must be a function.');
  });
});
