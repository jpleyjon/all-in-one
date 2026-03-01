import assert from 'node:assert';
import { describe, it } from 'node:test';
import { isEmail } from './is-email';

describe('isEmail', () => {
  it('accepts valid pragmatic email values', () => {
    assert.equal(isEmail('user@example.com'), true);
    assert.equal(isEmail('user.name+tag@example-domain.com'), true);
  });

  it('rejects invalid base formats', () => {
    assert.equal(isEmail(1), false);
    assert.equal(isEmail(' user@example.com '), false);
    assert.equal(isEmail('userexample.com'), false);
    assert.equal(isEmail('@example.com'), false);
    assert.equal(isEmail('user@@example.com'), false);
  });

  it('rejects invalid local part values', () => {
    assert.equal(isEmail('.user@example.com'), false);
    assert.equal(isEmail('user.@example.com'), false);
    assert.equal(isEmail('us..er@example.com'), false);
    assert.equal(isEmail('us er@example.com'), false);
    assert.equal(isEmail(`${'a'.repeat(65)}@example.com`), false);
  });

  it('rejects invalid domain values', () => {
    assert.equal(isEmail('user@example'), false);
    assert.equal(isEmail('user@.example.com'), false);
    assert.equal(isEmail('user@example.com.'), false);
    assert.equal(isEmail('user@-example.com'), false);
    assert.equal(isEmail('user@example-.com'), false);
    assert.equal(isEmail('user@example!.com'), false);
  });

  it('rejects values longer than 254 characters', () => {
    const tooLong = `${'a'.repeat(245)}@example.com`;
    assert.equal(isEmail(tooLong), false);
  });
});
