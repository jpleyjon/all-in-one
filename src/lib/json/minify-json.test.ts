import assert from 'node:assert';
import { describe, it } from 'node:test';
import { minifyJson } from './minify-json';

describe('minifyJson', () => {
  it('removes unnecessary whitespace', () => {
    assert.equal(minifyJson('{ "a": 1, "b": [1, 2] }'), '{"a":1,"b":[1,2]}');
  });

  it('supports primitive JSON values', () => {
    assert.equal(minifyJson(' true '), 'true');
  });

  it('throws for non-string inputs', () => {
    assert.throws(() => minifyJson(1 as never), TypeError, 'input must be a string.');
  });

  it('throws for invalid JSON strings', () => {
    assert.throws(() => minifyJson('{ invalid }'), SyntaxError);
  });
});

