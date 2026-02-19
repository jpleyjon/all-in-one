import { describe, it } from 'node:test';
import assert from 'node:assert';
import { toCamelCase } from './to-camel-case';

describe('toCamelCase', () => {
  it('should convert spaced words', () => {
    assert.equal(toCamelCase('hello world'), 'helloWorld');
  });

  it('should convert kebab-case words', () => {
    assert.equal(toCamelCase('hello-world-test'), 'helloWorldTest');
  });

  it('should convert snake_case words', () => {
    assert.equal(toCamelCase('hello_world_test'), 'helloWorldTest');
  });

  it('should normalize extra spaces and punctuation', () => {
    assert.equal(toCamelCase('  hello,   world! this   is...fine  '), 'helloWorldThisIsFine');
  });

  it('should handle existing camel and pascal case boundaries', () => {
    assert.equal(toCamelCase('helloWorld ExampleValue'), 'helloWorldExampleValue');
    assert.equal(toCamelCase('ExampleValue'), 'exampleValue');
  });

  it('should normalize acronyms', () => {
    assert.equal(toCamelCase('API response code'), 'apiResponseCode');
  });

  it('should preserve numeric parts', () => {
    assert.equal(toCamelCase('version 2 update'), 'version2Update');
    assert.equal(toCamelCase('2 fast 2 furious'), '2Fast2Furious');
  });

  it('should return empty string for blank input', () => {
    assert.equal(toCamelCase(''), '');
    assert.equal(toCamelCase('   - _ ...   '), '');
  });
});
