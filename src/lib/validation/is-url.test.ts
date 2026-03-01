import assert from 'node:assert';
import { describe, it } from 'node:test';
import { isUrl } from './is-url';

describe('isUrl', () => {
  it('accepts valid URLs with default protocols', () => {
    assert.equal(isUrl('https://example.com'), true);
    assert.equal(isUrl('http://example.com/path?x=1'), true);
  });

  it('rejects invalid base input values', () => {
    assert.equal(isUrl(''), false);
    assert.equal(isUrl(' https://example.com '), false);
    assert.equal(isUrl(1), false);
    assert.equal(isUrl('not-a-url'), false);
  });

  it('enforces protocol and localhost options', () => {
    assert.equal(isUrl('ftp://example.com'), false);
    assert.equal(isUrl('https://localhost'), false);
    assert.equal(isUrl('https://localhost', { allowLocalhost: true }), true);
    assert.equal(isUrl('mailto:test@example.com', { protocols: ['mailto:'] }), false);
  });

  it('throws for invalid option shapes', () => {
    assert.throws(
      () => isUrl('https://example.com', 1 as never),
      TypeError,
      'options must be an object.',
    );
    assert.throws(
      () => isUrl('https://example.com', { protocols: ['https:', ''] }),
      TypeError,
      'options.protocols must be an array of non-empty strings.',
    );
    assert.throws(
      () => isUrl('https://example.com', { allowLocalhost: 'yes' as never }),
      TypeError,
      'options.allowLocalhost must be a boolean.',
    );
  });
});
