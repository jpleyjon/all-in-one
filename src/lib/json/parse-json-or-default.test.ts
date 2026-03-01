import assert from 'node:assert';
import { describe, it } from 'node:test';
import { parseJsonOrDefault } from './parse-json-or-default';

describe('parseJsonOrDefault', () => {
  it('returns parsed values for valid JSON', () => {
    assert.deepEqual(parseJsonOrDefault('{ "a": 1 }', { a: 0 }), { a: 1 });
  });

  it('returns fallback for invalid JSON', () => {
    const fallback = { a: 0 };
    assert.deepEqual(parseJsonOrDefault('{ invalid }', fallback), fallback);
  });

  it('returns fallback for non-string input', () => {
    const fallback = { a: 0 };
    assert.deepEqual(parseJsonOrDefault(123 as never, fallback), fallback);
  });
});
