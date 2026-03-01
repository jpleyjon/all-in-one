import assert from 'node:assert';
import { describe, it } from 'node:test';
import { parseJsonWithReviver } from './parse-json-with-reviver';

describe('parseJsonWithReviver', () => {
  it('parses JSON and applies the reviver', () => {
    const result = parseJsonWithReviver<{ total: number; label: string }>(
      '{ "total": "10", "label": "ok" }',
      (key, value) => (key === 'total' ? Number(value) : value),
    );

    assert.deepEqual(result, { total: 10, label: 'ok' });
  });

  it('throws for non-string inputs', () => {
    assert.throws(
      () => parseJsonWithReviver(1 as never, (_key, value) => value),
      TypeError,
      'input must be a string.',
    );
  });

  it('throws for invalid revivers', () => {
    assert.throws(
      () => parseJsonWithReviver('{"a":1}', 1 as never),
      TypeError,
      'reviver must be a function.',
    );
  });

  it('throws for invalid JSON strings', () => {
    assert.throws(
      () => parseJsonWithReviver('{ invalid }', (_key, value) => value),
      SyntaxError,
    );
  });
});

