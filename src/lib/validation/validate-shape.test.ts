import assert from 'node:assert';
import { describe, it } from 'node:test';
import { validateShape } from './validate-shape';

describe('validateShape', () => {
  it('validates objects using field predicates', () => {
    const shape = {
      id: (value: unknown) => typeof value === 'number',
      name: (value: unknown) => typeof value === 'string',
    };

    assert.equal(validateShape({ id: 1, name: 'A' }, shape), true);
    assert.equal(validateShape({ id: 1 }, shape), false);
    assert.equal(validateShape({ id: 1, name: 2 }, shape), false);
    assert.equal(validateShape(null, shape), false);
  });

  it('throws for invalid shape definitions', () => {
    assert.throws(
      () => validateShape({}, [] as never),
      TypeError,
      'shape must be an object of validator functions.',
    );
    assert.throws(
      () => validateShape({}, { a: 1 as never }),
      TypeError,
      'shape["a"] must be a function.',
    );
  });
});
