import assert from 'node:assert';
import { describe, it } from 'node:test';

import { listColorLinesMoves } from './list-color-lines-moves';
import type { ColorLinesState } from './types';

function createState(
  board: ColorLinesState['board'],
  status: ColorLinesState['status'] = 'in_progress',
): ColorLinesState {
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
    status,
    turn: 0,
  };
}

describe('listColorLinesMoves', () => {
  it('lists reachable destinations for a source ball', () => {
    const state = createState(['red', null, null, 'blue', 'blue', null, null, null, null]);

    assert.deepEqual(listColorLinesMoves(state, { row: 0, column: 0 }), [
      { row: 0, column: 1 },
      { row: 0, column: 2 },
      { row: 1, column: 2 },
      { row: 2, column: 0 },
      { row: 2, column: 1 },
      { row: 2, column: 2 },
    ]);
  });

  it('returns empty for empty sources or finished games', () => {
    const state = createState(['red', null, null, null, null, null, null, null, null]);
    const full = createState(['red', 'blue', 'red', 'blue', 'red', 'blue', 'red', 'blue', 'red']);

    assert.deepEqual(listColorLinesMoves(state, { row: 1, column: 1 }), []);
    assert.deepEqual(listColorLinesMoves(full, { row: 0, column: 0 }), []);
  });
});
