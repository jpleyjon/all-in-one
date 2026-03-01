import assert from 'node:assert';
import { describe, it } from 'node:test';
import { isLuhnNumber } from './is-luhn-number';

describe('isLuhnNumber', () => {
  it('accepts valid Luhn numbers', () => {
    assert.equal(isLuhnNumber('4111111111111111'), true);
    assert.equal(isLuhnNumber('4111 1111-1111 1111'), true);
    assert.equal(isLuhnNumber('79927398713'), true);
  });

  it('rejects invalid values', () => {
    assert.equal(isLuhnNumber(1), false);
    assert.equal(isLuhnNumber(''), false);
    assert.equal(isLuhnNumber('abcd'), false);
    assert.equal(isLuhnNumber('4111111111111112'), false);
  });
});
