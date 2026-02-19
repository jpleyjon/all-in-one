import { describe, it } from 'node:test';
import assert from 'node:assert';
import { toTitleCase } from './to-title-case';

describe('toTitleCase', () => {
  it('should convert spaced words', () => {
    assert.equal(toTitleCase('hello world'), 'Hello World');
  });

  it('should normalize mixed separators', () => {
    assert.equal(toTitleCase('hello_world-test'), 'Hello World Test');
  });

  it('should split camel and pascal case boundaries', () => {
    assert.equal(toTitleCase('helloWorld ExampleValue'), 'Hello World Example Value');
  });

  it('should normalize case', () => {
    assert.equal(toTitleCase('hELLO woRLD'), 'Hello World');
  });

  it('should return empty string for blank input', () => {
    assert.equal(toTitleCase('  ... --- ___ '), '');
  });
});
