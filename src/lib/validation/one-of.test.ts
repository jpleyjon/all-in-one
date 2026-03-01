import assert from 'node:assert';
import { describe, it } from 'node:test';
import { oneOf } from './one-of';

describe('oneOf', () => {
  it('passes when any validator passes', () => {
    const validator = oneOf(
      (value: unknown): value is number => typeof value === 'number',
      (value: unknown): value is string => typeof value === 'string',
    );

    assert.equal(validator(2), true);
    assert.equal(validator('2'), true);
    assert.equal(validator(false), false);
  });

  it('throws when validators list is invalid', () => {
    assert.throws(() => oneOf(), RangeError, 'at least one validator is required.');
    assert.throws(
      () => oneOf((() => true) as never, 1 as never),
      TypeError,
      'validators must be functions.',
    );
  });
});
