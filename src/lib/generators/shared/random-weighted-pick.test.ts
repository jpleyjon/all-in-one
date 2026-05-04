import assert from 'node:assert';
import { describe, it } from 'node:test';

import { createSeededRandom } from './create-seeded-random';
import { randomWeightedPick } from './random-weighted-pick';

describe('randomWeightedPick', () => {
  it('returns one of the weighted values deterministically', () => {
    const random = createSeededRandom('weighted');

    assert.equal(
      randomWeightedPick(
        [
          { value: 'low', weight: 1 },
          { value: 'high', weight: 4 },
        ],
        random,
      ),
      'high',
    );
  });

  it('validates inputs', () => {
    assert.throws(() => randomWeightedPick([]), RangeError);
    assert.throws(() => randomWeightedPick([{ value: 'x', weight: 0 }]), RangeError);
    assert.throws(() => randomWeightedPick([{ value: 'x', weight: Number.NaN }]), RangeError);
    assert.throws(() => randomWeightedPick([{ value: 'x', weight: 1 }], null as never), TypeError);
  });
});
