import { describe, it } from 'node:test';
import assert from 'node:assert';
import { slugify } from './slugify';

describe('slugify', () => {
  it('should slugify basic text', () => {
    assert.equal(slugify('Hello World'), 'hello-world');
  });

  it('should strip accents and punctuation', () => {
    assert.equal(slugify('Crème brûlée!!!'), 'creme-brulee');
  });

  it('should split camel and pascal case boundaries', () => {
    assert.equal(slugify('helloWorld ExampleValue'), 'hello-world-example-value');
  });

  it('should keep numbers', () => {
    assert.equal(slugify('Version 2 Update'), 'version-2-update');
  });

  it('should return empty string for blank input', () => {
    assert.equal(slugify('   --- ___ '), '');
  });
});
