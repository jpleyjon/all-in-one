import assert from 'node:assert';
import { describe, it } from 'node:test';

import { isColorLinesGameOver } from './is-color-lines-game-over';
import type { ColorLinesState } from './types';

describe('isColorLinesGameOver', () => {
  it('returns false when empty cells remain', () => {
    const state: ColorLinesState = {
      board: ['red', null, 'blue'],
      config: {
        rows: 1,
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

    assert.equal(isColorLinesGameOver(state), false);
  });

  it('returns true when the board is full', () => {
    const state: ColorLinesState = {
      board: ['red', 'blue', 'green'],
      config: {
        rows: 1,
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
      status: 'game_over',
      turn: 0,
    };

    assert.equal(isColorLinesGameOver(state), true);
  });
});
