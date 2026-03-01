import assert from 'node:assert';
import { describe, it } from 'node:test';
import { nullable } from './nullable';

describe('nullable', () => {
  it('builds validators that accept null', () => {
    const validator = nullable((value: unknown): value is number => typeof value === 'number');

    assert.equal(validator(null), true);
    assert.equal(validator(1), true);
    assert.equal(validator('1'), false);
  });

  it('throws for invalid validator input', () => {
    assert.throws(() => nullable(1 as never), TypeError, 'validator must be a function.');
  });
});
