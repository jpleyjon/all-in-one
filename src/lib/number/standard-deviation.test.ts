import assert from 'node:assert';
import { describe, it } from 'node:test';
import { standardDeviation } from './standard-deviation';

describe('standardDeviation', () => {
  it('computes population and sample standard deviation', () => {
    assert.equal(standardDeviation([1, 2, 3]), Math.sqrt(2 / 3));
    assert.equal(standardDeviation([1, 2, 3], true), 1);
  });

  it('throws through variance validations', () => {
    assert.throws(
      () => standardDeviation([1], true),
      RangeError,
      'sample variance requires at least two values.',
    );
  });
});
