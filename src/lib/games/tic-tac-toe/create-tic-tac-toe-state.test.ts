import assert from 'node:assert';
import { describe, it } from 'node:test';

import { createTicTacToeState } from './create-tic-tac-toe-state';

describe('createTicTacToeState', () => {
  it('creates an empty game with player X to move', () => {
    const state = createTicTacToeState();

    assert.deepEqual(state.board, [null, null, null, null, null, null, null, null, null]);
    assert.equal(state.currentPlayer, 'X');
    assert.equal(state.winner, null);
    assert.equal(state.status, 'in_progress');
    assert.equal(state.movesPlayed, 0);
  });
});
