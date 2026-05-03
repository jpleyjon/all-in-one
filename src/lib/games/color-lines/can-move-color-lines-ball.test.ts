import assert from 'node:assert';
import { describe, it } from 'node:test';

import { canMoveColorLinesBall } from './can-move-color-lines-ball';
import type { ColorLinesState } from './types';

function createState(board: ColorLinesState['board']): ColorLinesState {
  return {
    board,
    config: {
      rows: 3,
      columns: 3,
      minLineLength: 3,
      spawnCount: 1,
      previewCount: 1,
      palette: ['red'],
      spawnPolicy: 'after_non_clear_move',
      moveRule: 'path_through_empty_cells',
      pointsPerClearedBall: 1,
    },
    preview: ['red'],
    score: 0,
    status: 'in_progress',
    turn: 0,
  };
}

describe('canMoveColorLinesBall', () => {
  it('returns true when a path exists', () => {
    const state = createState(['red', null, null, 'blue', 'blue', null, null, null, null]);

    assert.equal(canMoveColorLinesBall(state, { row: 0, column: 0 }, { row: 2, column: 2 }), true);
  });

  it('returns false for illegal moves', () => {
    const blocked = createState(['red', 'blue', null, 'blue', 'blue', 'blue', null, 'blue', null]);

    assert.equal(
      canMoveColorLinesBall(blocked, { row: 0, column: 0 }, { row: 2, column: 2 }),
      false,
    );
    assert.equal(
      canMoveColorLinesBall(blocked, { row: 0, column: 2 }, { row: 2, column: 2 }),
      false,
    );
    assert.equal(
      canMoveColorLinesBall(blocked, { row: 0, column: 0 }, { row: 0, column: 0 }),
      false,
    );
    assert.equal(
      canMoveColorLinesBall(blocked, { row: 0, column: 0 }, { row: 0, column: 1 }),
      false,
    );
  });

  it('returns false when the board is full', () => {
    const full = createState(['red', 'blue', 'red', 'blue', 'red', 'blue', 'red', 'blue', 'red']);

    assert.equal(canMoveColorLinesBall(full, { row: 0, column: 0 }, { row: 0, column: 1 }), false);
  });

  it('throws for invalid positions', () => {
    const state = createState(['red', null, null, null, null, null, null, null, null]);

    assert.throws(
      () => canMoveColorLinesBall(state, null as never, { row: 0, column: 1 }),
      TypeError,
    );
    assert.throws(
      () => canMoveColorLinesBall(state, { row: 0, column: 0 }, { row: 3, column: 0 }),
      RangeError,
    );
  });
});
