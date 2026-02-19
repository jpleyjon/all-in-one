import { describe, it } from 'node:test';
import assert from 'node:assert';
import { toSnakeCase } from './to-snake-case';

describe('toSnakeCase', () => {
  it('should convert spaced words', () => {
    assert.equal(toSnakeCase('hello world'), 'hello_world');
  });

  it('should convert kebab-case words', () => {
    assert.equal(toSnakeCase('hello-world-test'), 'hello_world_test');
  });

  it('should convert camel and pascal case words', () => {
    assert.equal(toSnakeCase('helloWorld'), 'hello_world');
    assert.equal(toSnakeCase('HelloWorld'), 'hello_world');
  });

  it('should normalize punctuation and repeated separators', () => {
    assert.equal(toSnakeCase('  hello,___world---test!!  '), 'hello_world_test');
  });

  it('should preserve numeric parts', () => {
    assert.equal(toSnakeCase('version 2 update'), 'version_2_update');
  });

  it('should return empty string for blank input', () => {
    assert.equal(toSnakeCase(''), '');
    assert.equal(toSnakeCase('   - _ ...   '), '');
  });
});
