import { describe, it } from 'node:test';
import assert from 'node:assert';
import { stripAccents } from './strip-accents';

describe('stripAccents', () => {
  it('should remove common latin accents', () => {
    assert.equal(
      stripAccents('àáâãäå çèéêë ìíîï ñ òóôõö ùúûü ýÿ'),
      'aaaaaa ceeee iiii n ooooo uuuu yy',
    );
  });

  it('should keep non-accented characters unchanged', () => {
    assert.equal(stripAccents('Hello 123'), 'Hello 123');
  });

  it('should keep non-latin scripts unchanged', () => {
    assert.equal(stripAccents('東京'), '東京');
  });
});
