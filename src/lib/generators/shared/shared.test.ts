import assert from 'node:assert';
import { describe, it } from 'node:test';

import { createSeededRandom } from './create-seeded-random';
import { createUniqueGenerator } from './create-unique-generator';
import { generateArray } from './generate-array';
import { maybeGenerate } from './maybe-generate';
import { randomAlphaString } from './random-alpha-string';
import { randomAlphanumericString } from './random-alphanumeric-string';
import { randomBool } from './random-bool';
import { randomDigitString } from './random-digit-string';
import { randomPick } from './random-pick';
import { randomWeightedPick } from './random-weighted-pick';

describe('generator shared helpers', () => {
  it('creates deterministic seeded random sources', () => {
    const left = createSeededRandom('fixture-seed');
    const right = createSeededRandom('fixture-seed');

    assert.equal(left(), right());
    assert.equal(left(), right());
  });

  it('picks random values and validates input', () => {
    const left = createSeededRandom(42);
    const right = createSeededRandom(42);

    assert.equal(randomPick(['a', 'b', 'c'], left), randomPick(['a', 'b', 'c'], right));
    assert.throws(() => randomPick([], left), RangeError);
    assert.throws(() => randomPick(['a'], null as never), TypeError);
  });

  it('generates booleans and validates probability', () => {
    assert.equal(
      randomBool(0, () => 0.9),
      false,
    );
    assert.equal(
      randomBool(1, () => 0.1),
      true,
    );
    assert.throws(() => randomBool(-0.1), RangeError);
    assert.throws(() => randomBool(1.1), RangeError);
  });

  it('generates deterministic digit, alpha, and alphanumeric strings', () => {
    const randomA = createSeededRandom('alpha');
    const randomB = createSeededRandom('alpha');

    assert.equal(randomDigitString(6, randomA), randomDigitString(6, randomB));
    assert.match(randomAlphaString(8, createSeededRandom('letters')), /^[a-z]{8}$/);
    assert.match(randomAlphanumericString(10, createSeededRandom('mixed')), /^[a-z0-9]{10}$/);
    assert.throws(() => randomDigitString(-1), RangeError);
    assert.throws(() => randomAlphaString(-1), RangeError);
    assert.throws(() => randomAlphanumericString(-1), RangeError);
  });

  it('supports weighted picks, optional generation, arrays, and uniqueness wrappers', () => {
    const weightedA = randomWeightedPick(
      [
        { value: 'low', weight: 1 },
        { value: 'high', weight: 3 },
      ],
      createSeededRandom('weighted-inline'),
    );
    const weightedB = randomWeightedPick(
      [
        { value: 'low', weight: 1 },
        { value: 'high', weight: 3 },
      ],
      createSeededRandom('weighted-inline'),
    );
    const maybe = maybeGenerate(
      () => 'value',
      1,
      () => 0,
    );
    const maybeNull = maybeGenerate(
      () => 'value',
      0,
      () => 0.999,
    );
    const values = generateArray(3, (index) => index + 1);
    let index = 0;
    const unique = createUniqueGenerator(() => ['a', 'b', 'c'][index++]);

    assert.equal(weightedA, weightedB);
    assert.equal(maybe, 'value');
    assert.equal(maybeNull, null);
    assert.deepEqual(values, [1, 2, 3]);
    assert.equal(unique(), 'a');
    assert.equal(unique(), 'b');
  });

  it('covers weighted fallback behavior', () => {
    assert.equal(
      randomWeightedPick(
        [
          { value: 'low', weight: 1 },
          { value: 'high', weight: 3 },
        ],
        () => 1,
      ),
      'high',
    );
  });
});
