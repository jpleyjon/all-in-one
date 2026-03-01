import assert from 'node:assert';
import { describe, it } from 'node:test';
import { prettifyJson } from './prettify-json';

describe('prettifyJson', () => {
  it('formats valid JSON using default indentation', () => {
    assert.equal(prettifyJson('{"a":1}'), '{\n  "a": 1\n}');
  });

  it('supports custom indentation', () => {
    assert.equal(prettifyJson('{"a":1}', 4), '{\n    "a": 1\n}');
  });

  it('throws for non-string inputs', () => {
    assert.throws(() => prettifyJson(1 as never), TypeError, 'input must be a string.');
  });

  it('throws for invalid JSON strings', () => {
    assert.throws(() => prettifyJson('{ invalid }'), SyntaxError);
  });

  it('throws for invalid indentation values', () => {
    assert.throws(
      () => prettifyJson('{"a":1}', -1),
      RangeError,
      'space must be a non-negative integer.',
    );
  });
});
