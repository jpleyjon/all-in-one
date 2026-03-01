import assert from 'node:assert';
import { describe, it } from 'node:test';
import { redactJson } from './redact-json';

describe('redactJson', () => {
  it('redacts nested object and array paths', () => {
    const input = {
      user: {
        password: 'secret',
        tokens: [{ value: 'abc' }],
      },
      keep: true,
    };

    const result = redactJson(input, ['user.password', 'user.tokens.0.value']);

    assert.deepEqual(result, {
      user: {
        password: '[REDACTED]',
        tokens: [{ value: '[REDACTED]' }],
      },
      keep: true,
    });
    assert.deepEqual(input, {
      user: {
        password: 'secret',
        tokens: [{ value: 'abc' }],
      },
      keep: true,
    });
    assert.notStrictEqual(result, input);
  });

  it('supports custom masks and tolerant dot-path parsing', () => {
    assert.deepEqual(redactJson({ a: { b: 1 } }, ['a..b'], 0), { a: { b: 0 } });
  });

  it('ignores missing paths', () => {
    assert.deepEqual(redactJson({ a: { b: 1 } }, ['a.c.d']), { a: { b: 1 } });
    assert.deepEqual(redactJson({ a: {} }, ['a.b']), { a: {} });
  });

  it('returns mask for root path redaction', () => {
    assert.equal(redactJson({ a: 1 }, ['']), '[REDACTED]');
  });

  it('returns primitive inputs unchanged for non-root paths', () => {
    assert.equal(redactJson(123, ['a.b']), 123);
  });

  it('throws for invalid paths inputs', () => {
    assert.throws(
      () => redactJson({ a: 1 }, 'a.b' as never),
      TypeError,
      'paths must be an array of path strings.',
    );
    assert.throws(
      () => redactJson({ a: 1 }, ['a.b', 1 as never]),
      TypeError,
      'paths[1] must be a string.',
    );
  });
});
