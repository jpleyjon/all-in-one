import assert from 'node:assert';
import { describe, it } from 'node:test';

import { generateArray } from './generate-array';

describe('generateArray', () => {
  it('generates values from an indexed factory', () => {
    assert.deepEqual(
      generateArray(4, (index) => index * 2),
      [0, 2, 4, 6],
    );
  });

  it('validates inputs', () => {
    assert.throws(() => generateArray(-1, () => 0), RangeError);
    assert.throws(() => generateArray(1, null as never), TypeError);
  });
});
