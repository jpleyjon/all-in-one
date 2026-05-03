import assert from 'node:assert';
import { describe, it } from 'node:test';

import { assertGridPosition } from './assert-grid-position';
import { findGridPath } from './find-grid-path';
import { getOrthogonalNeighbors } from './get-orthogonal-neighbors';
import { indexToPosition } from './index-to-position';
import { positionToIndex } from './position-to-index';

describe('games shared helpers', () => {
  it('validates grid positions', () => {
    assert.doesNotThrow(() => assertGridPosition({ row: 1, column: 1 }, 3, 3));
    assert.throws(() => assertGridPosition({ row: 0, column: 0 }, 0, 3), TypeError);
    assert.throws(() => assertGridPosition({ row: 0, column: 0 }, 3, 0), TypeError);
    assert.throws(() => assertGridPosition(null as never, 3, 3), TypeError);
    assert.throws(() => assertGridPosition({ row: 1 } as never, 3, 3), TypeError);
    assert.throws(() => assertGridPosition({ row: 1.5, column: 1 }, 3, 3), TypeError);
    assert.throws(() => assertGridPosition({ row: 1, column: 1.5 }, 3, 3), TypeError);
    assert.throws(() => assertGridPosition({ row: 1, column: 5 }, 3, 3), RangeError);
  });

  it('converts between positions and indexes', () => {
    assert.equal(positionToIndex({ row: 2, column: 1 }, 4), 9);
    assert.deepEqual(indexToPosition(9, 4), { row: 2, column: 1 });
    assert.throws(() => positionToIndex({ row: 0, column: 0 }, 0), TypeError);
    assert.throws(() => indexToPosition(-1, 4), TypeError);
    assert.throws(() => indexToPosition(0, 0), TypeError);
  });

  it('returns orthogonal neighbors within bounds', () => {
    assert.deepEqual(getOrthogonalNeighbors({ row: 1, column: 1 }, 3, 3), [
      { row: 0, column: 1 },
      { row: 2, column: 1 },
      { row: 1, column: 0 },
      { row: 1, column: 2 },
    ]);
    assert.deepEqual(getOrthogonalNeighbors({ row: 0, column: 0 }, 3, 3), [
      { row: 1, column: 0 },
      { row: 0, column: 1 },
    ]);
  });

  it('finds paths through traversable cells', () => {
    const board = [null, null, null, 'X', 'X', null, null, null, null];

    const path = findGridPath(
      board,
      3,
      3,
      { row: 0, column: 0 },
      { row: 2, column: 2 },
      (cell) => cell === null,
    );

    assert.deepEqual(path, [
      { row: 0, column: 0 },
      { row: 0, column: 1 },
      { row: 0, column: 2 },
      { row: 1, column: 2 },
      { row: 2, column: 2 },
    ]);
  });

  it('returns null when no path exists', () => {
    const board = [null, 'X', null, 'X', 'X', 'X', null, 'X', null];

    const path = findGridPath(
      board,
      3,
      3,
      { row: 0, column: 0 },
      { row: 2, column: 2 },
      (cell) => cell === null,
    );

    assert.equal(path, null);
  });

  it('returns the source when origin and destination match', () => {
    const path = findGridPath(
      [null],
      1,
      1,
      { row: 0, column: 0 },
      { row: 0, column: 0 },
      () => true,
    );

    assert.deepEqual(path, [{ row: 0, column: 0 }]);
  });

  it('validates the traversal predicate', () => {
    assert.throws(
      () => findGridPath([null], 1, 1, { row: 0, column: 0 }, { row: 0, column: 0 }, null as never),
      TypeError,
    );
  });
});
