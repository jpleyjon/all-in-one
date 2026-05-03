import assert from 'node:assert';
import { describe, it } from 'node:test';

import { spawnColorLinesBalls } from './spawn-color-lines-balls';
import type { ColorLinesState } from './types';

function createState(
  board: ColorLinesState['board'],
  preview: ColorLinesState['preview'],
): ColorLinesState {
  return {
    board,
    config: {
      rows: 3,
      columns: 3,
      minLineLength: 3,
      spawnCount: 2,
      previewCount: 2,
      palette: ['red', 'blue'],
      spawnPolicy: 'after_non_clear_move',
      moveRule: 'path_through_empty_cells',
      pointsPerClearedBall: 2,
    },
    preview,
    score: 0,
    status: 'in_progress',
    turn: 0,
  };
}

describe('spawnColorLinesBalls', () => {
  it('places preview balls and refreshes the preview queue', () => {
    const state = createState(
      [null, null, null, null, null, null, null, null, null],
      ['red', 'blue'],
    );
    const nextState = spawnColorLinesBalls(state, () => 0);

    assert.deepEqual(nextState.board.slice(0, 3), ['red', 'blue', null]);
    assert.deepEqual(nextState.preview, ['red', 'red']);
    assert.equal(nextState.score, 0);
    assert.equal(nextState.status, 'in_progress');
  });

  it('clears matches formed by spawn and updates score', () => {
    const state = createState(
      ['red', 'red', null, null, null, null, null, null, null],
      ['red', 'blue'],
    );
    const nextState = spawnColorLinesBalls(state, () => 0);

    assert.deepEqual(nextState.board.slice(0, 3), [null, null, null]);
    assert.equal(nextState.score, 6);
  });

  it('handles full boards safely', () => {
    const state = createState(
      ['red', 'blue', 'red', 'blue', 'red', 'blue', 'red', 'blue', 'red'],
      ['red', 'blue'],
    );
    const nextState = spawnColorLinesBalls(state, () => 0);

    assert.equal(nextState.status, 'game_over');
    assert.deepEqual(nextState.preview, ['red', 'red']);
  });

  it('fills missing preview colors from the palette and clears spawned matches', () => {
    const state = createState(
      ['red', 'blue', 'red', 'blue', 'red', 'blue', null, 'blue', null],
      [],
    );
    const nextState = spawnColorLinesBalls(state, () => 0);

    assert.equal(nextState.board.filter((cell) => cell === null).length, 5);
    assert.equal(nextState.score, 10);
    assert.equal(nextState.status, 'in_progress');
  });

  it('respects limited remaining space and can end the game without a clear', () => {
    const state = createState(
      ['red', 'blue', 'red', 'red', 'blue', 'red', null, 'red', null],
      ['blue'],
    );
    const nextState = spawnColorLinesBalls(state, () => 0.999999);

    assert.equal(nextState.board.filter((cell) => cell === null).length, 0);
    assert.equal(nextState.status, 'game_over');
  });
});
