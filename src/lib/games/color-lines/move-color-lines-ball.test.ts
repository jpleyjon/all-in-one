import assert from 'node:assert';
import { describe, it } from 'node:test';

import { moveColorLinesBall } from './move-color-lines-ball';
import type { ColorLinesState } from './types';

function createState(
  board: ColorLinesState['board'],
  overrides: Partial<ColorLinesState['config']> = {},
): ColorLinesState {
  return {
    board,
    config: {
      rows: 3,
      columns: 3,
      minLineLength: 3,
      spawnCount: 1,
      previewCount: 1,
      palette: ['red', 'blue'],
      spawnPolicy: 'after_non_clear_move',
      moveRule: 'path_through_empty_cells',
      pointsPerClearedBall: 1,
      ...overrides,
    },
    preview: ['blue'],
    score: 0,
    status: 'in_progress',
    turn: 0,
  };
}

describe('moveColorLinesBall', () => {
  it('moves a ball and spawns when no line is cleared', () => {
    const state = createState(['red', null, null, null, null, null, null, null, null]);
    const nextState = moveColorLinesBall(
      state,
      { row: 0, column: 0 },
      { row: 1, column: 1 },
      () => 0,
    );

    assert.equal(nextState.board[0], 'blue');
    assert.equal(nextState.board[4], 'red');
    assert.deepEqual(nextState.preview, ['red']);
    assert.equal(nextState.score, 0);
    assert.equal(nextState.turn, 1);
  });

  it('clears lines and scores on a successful move', () => {
    const state = createState(['red', 'red', null, null, null, null, null, 'red', null]);
    const nextState = moveColorLinesBall(
      state,
      { row: 2, column: 1 },
      { row: 0, column: 2 },
      () => 0,
    );

    assert.deepEqual(nextState.board.slice(0, 3), [null, null, null]);
    assert.equal(nextState.score, 3);
    assert.equal(nextState.turn, 1);
    assert.deepEqual(nextState.preview, ['blue']);
  });

  it('can still spawn after a clear when configured', () => {
    const state = createState(['red', 'red', null, null, null, null, null, 'red', null], {
      spawnPolicy: 'after_every_valid_move',
    });
    const nextState = moveColorLinesBall(
      state,
      { row: 2, column: 1 },
      { row: 0, column: 2 },
      () => 0,
    );

    assert.equal(nextState.board[0], 'blue');
    assert.equal(nextState.score, 3);
    assert.equal(nextState.turn, 1);
  });

  it('throws for illegal moves', () => {
    const state = createState(['red', 'blue', null, 'blue', 'blue', 'blue', null, 'blue', null]);
    const full = createState(['red', 'blue', 'red', 'blue', 'red', 'blue', 'red', 'blue', 'red']);

    assert.throws(
      () => moveColorLinesBall(state, { row: 0, column: 0 }, { row: 0, column: 0 }),
      Error,
    );
    assert.throws(
      () => moveColorLinesBall(state, { row: 1, column: 1 }, { row: 2, column: 2 }),
      Error,
    );
    assert.throws(
      () => moveColorLinesBall(state, { row: 0, column: 0 }, { row: 2, column: 2 }),
      Error,
    );
    assert.throws(
      () => moveColorLinesBall(state, { row: 0, column: 2 }, { row: 2, column: 2 }),
      Error,
    );
    assert.throws(
      () => moveColorLinesBall(state, { row: 0, column: 0 }, { row: 0, column: 1 }),
      Error,
    );
    assert.throws(
      () => moveColorLinesBall(full, { row: 0, column: 0 }, { row: 0, column: 1 }),
      Error,
    );
    assert.throws(
      () => moveColorLinesBall(state, { row: 3, column: 0 } as never, { row: 0, column: 2 }),
      RangeError,
    );
  });
});
