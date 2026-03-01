import assert from 'node:assert';
import { describe, it } from 'node:test';
import { optional } from './optional';

describe('optional', () => {
  it('builds validators that accept undefined', () => {
    const validator = optional((value: unknown): value is number => typeof value === 'number');

    assert.equal(validator(undefined), true);
    assert.equal(validator(1), true);
    assert.equal(validator('1'), false);
  });

  it('throws for invalid validator input', () => {
    assert.throws(() => optional(1 as never), TypeError, 'validator must be a function.');
  });
});
