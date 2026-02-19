import { describe, it } from 'node:test';
import assert from 'node:assert';
import { toKebabCase } from './to-kebab-case';

describe('toKebabCase', () => {
  it('should convert spaced words', () => {
    assert.equal(toKebabCase('hello world'), 'hello-world');
  });

  it('should convert snake_case words', () => {
    assert.equal(toKebabCase('hello_world_test'), 'hello-world-test');
  });

  it('should convert camel and pascal case words', () => {
    assert.equal(toKebabCase('helloWorld'), 'hello-world');
    assert.equal(toKebabCase('HelloWorld'), 'hello-world');
  });

  it('should normalize punctuation and repeated separators', () => {
    assert.equal(toKebabCase('  hello,---world___test!!  '), 'hello-world-test');
  });

  it('should preserve numeric parts', () => {
    assert.equal(toKebabCase('version 2 update'), 'version-2-update');
  });

  it('should return empty string for blank input', () => {
    assert.equal(toKebabCase(''), '');
    assert.equal(toKebabCase('   - _ ...   '), '');
  });
});
