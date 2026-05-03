import assert from 'node:assert';
import { describe, it } from 'node:test';

import { findColorLinesMatches } from './find-color-lines-matches';
import type { ColorLinesState } from './types';

function createState(board: ColorLinesState['board'], minLineLength = 5): ColorLinesState {
  return {
    board,
    config: {
      rows: 5,
      columns: 5,
      minLineLength,
      spawnCount: 3,
      previewCount: 3,
      palette: ['red', 'blue'],
      spawnPolicy: 'after_non_clear_move',
      moveRule: 'path_through_empty_cells',
      pointsPerClearedBall: 1,
    },
    preview: ['red', 'blue', 'red'],
    score: 0,
    status: 'in_progress',
    turn: 0,
  };
}

describe('findColorLinesMatches', () => {
  it('finds horizontal matches', () => {
    const state = createState([
      'red',
      'red',
      'red',
      'red',
      'red',
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ]);

    assert.deepEqual(findColorLinesMatches(state), [
      { row: 0, column: 0 },
      { row: 0, column: 1 },
      { row: 0, column: 2 },
      { row: 0, column: 3 },
      { row: 0, column: 4 },
    ]);
  });

  it('finds vertical and diagonal matches', () => {
    const vertical = createState([
      'blue',
      null,
      null,
      null,
      null,
      'blue',
      null,
      null,
      null,
      null,
      'blue',
      null,
      null,
      null,
      null,
      'blue',
      null,
      null,
      null,
      null,
      'blue',
      null,
      null,
      null,
      null,
    ]);
    const diagonal = createState([
      'red',
      null,
      null,
      null,
      null,
      null,
      'red',
      null,
      null,
      null,
      null,
      null,
      'red',
      null,
      null,
      null,
      null,
      null,
      'red',
      null,
      null,
      null,
      null,
      null,
      'red',
    ]);
    const antiDiagonal = createState([
      null,
      null,
      null,
      null,
      'blue',
      null,
      null,
      null,
      'blue',
      null,
      null,
      null,
      'blue',
      null,
      null,
      null,
      'blue',
      null,
      null,
      null,
      'blue',
      null,
      null,
      null,
      null,
    ]);

    assert.equal(findColorLinesMatches(vertical).length, 5);
    assert.equal(findColorLinesMatches(diagonal).length, 5);
    assert.equal(findColorLinesMatches(antiDiagonal).length, 5);
  });

  it('dedupes overlapping lines and respects custom thresholds', () => {
    const overlapping = createState([
      null,
      null,
      'red',
      null,
      null,
      null,
      null,
      'red',
      null,
      null,
      'red',
      'red',
      'red',
      'red',
      'red',
      null,
      null,
      'red',
      null,
      null,
      null,
      null,
      'red',
      null,
      null,
    ]);
    const shorter = createState(
      [
        'blue',
        'blue',
        'blue',
        'blue',
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ],
      4,
    );

    assert.equal(findColorLinesMatches(overlapping).length, 9);
    assert.equal(findColorLinesMatches(shorter).length, 4);
  });

  it('returns no matches for runs shorter than the threshold', () => {
    const state = createState([
      'blue',
      'blue',
      'blue',
      'blue',
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ]);

    assert.deepEqual(findColorLinesMatches(state), []);
  });
});
