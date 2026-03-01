import assert from 'node:assert';
import { describe, it } from 'node:test';
import { parseJson } from './parse-json';

describe('parseJson', () => {
  it('parses valid JSON strings', () => {
    assert.deepEqual(parseJson<{ a: number; b: string }>('{ "a": 1, "b": "x" }'), { a: 1, b: 'x' });
    assert.equal(parseJson<number>('123'), 123);
  });

  it('throws for invalid JSON strings', () => {
    assert.throws(() => parseJson('{ invalid }'), SyntaxError);
  });

  it('throws for non-string input', () => {
    assert.throws(() => parseJson(123 as never), TypeError, 'input must be a string.');
  });
});

