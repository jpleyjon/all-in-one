import { describe, it } from 'node:test';
import assert from 'node:assert';
import { toPascalCase } from './to-pascal-case';

describe('toPascalCase', () => {
  it('should convert spaced words', () => {
    assert.equal(toPascalCase('hello world'), 'HelloWorld');
  });

  it('should convert kebab and snake case words', () => {
    assert.equal(toPascalCase('hello-world-test'), 'HelloWorldTest');
    assert.equal(toPascalCase('hello_world_test'), 'HelloWorldTest');
  });

  it('should convert camel and pascal case words', () => {
    assert.equal(toPascalCase('helloWorld'), 'HelloWorld');
    assert.equal(toPascalCase('HelloWorld'), 'HelloWorld');
  });

  it('should normalize punctuation and repeated separators', () => {
    assert.equal(toPascalCase('  hello,---world___test!!  '), 'HelloWorldTest');
  });

  it('should preserve numeric parts', () => {
    assert.equal(toPascalCase('version 2 update'), 'Version2Update');
    assert.equal(toPascalCase('2 fast 2 furious'), '2Fast2Furious');
  });

  it('should return empty string for blank input', () => {
    assert.equal(toPascalCase(''), '');
    assert.equal(toPascalCase('   - _ ...   '), '');
  });
});
