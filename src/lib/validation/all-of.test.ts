import assert from 'node:assert';
import { describe, it } from 'node:test';
import { allOf } from './all-of';

describe('allOf', () => {
  it('passes when all validators pass', () => {
    const validator = allOf(
      (value: unknown): value is number => typeof value === 'number',
      (value: unknown): value is number => Number.isInteger(value),
    );

    assert.equal(validator(2), true);
    assert.equal(validator(2.5), false);
  });

  it('throws when validators list is invalid', () => {
    assert.throws(() => allOf(), RangeError, 'at least one validator is required.');
    assert.throws(
      () => allOf((() => true) as never, 1 as never),
      TypeError,
      'validators must be functions.',
    );
  });
});
