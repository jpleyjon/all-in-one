import { inRange } from '../../number/in-range';
import { isInteger } from '../../number/is-integer';
import { getTicTacToeStatus } from './get-tic-tac-toe-status';
import { getTicTacToeWinner } from './get-tic-tac-toe-winner';
import { isTicTacToeGameOver } from './is-tic-tac-toe-game-over';
import type { TicTacToePosition, TicTacToeState } from './types';

function getBoardIndex(position: TicTacToePosition): number {
  if (typeof position !== 'object' || position === null) {
    throw new TypeError('position must be an object.');
  }

  if (!('row' in position) || !('column' in position)) {
    throw new TypeError('position must include row and column.');
  }

  if (!isInteger(position.row)) {
    throw new TypeError('position.row must be an integer.');
  }

  if (!isInteger(position.column)) {
    throw new TypeError('position.column must be an integer.');
  }

  if (!inRange(position.row, 0, 2)) {
    throw new RangeError('position.row must be between 0 and 2.');
  }

  if (!inRange(position.column, 0, 2)) {
    throw new RangeError('position.column must be between 0 and 2.');
  }

  return position.row * 3 + position.column;
}

/**
 * Applies a player move and returns the next game state.
 *
 * @param state Current game state.
 * @param position Target board position.
 * @returns Next game state after the move.
 * @throws {Error} If the move is illegal.
 */
export function playTicTacToeMove(
  state: TicTacToeState,
  position: TicTacToePosition,
): TicTacToeState {
  if (isTicTacToeGameOver(state)) {
    throw new Error('cannot play a move after the game is over.');
  }

  const index = getBoardIndex(position);

  if (state.board[index] !== null) {
    throw new Error('cell is already occupied.');
  }

  const nextBoard = [...state.board];
  nextBoard[index] = state.currentPlayer;

  const nextState: TicTacToeState = {
    board: nextBoard,
    currentPlayer: state.currentPlayer,
    winner: null,
    status: 'in_progress',
    movesPlayed: state.movesPlayed + 1,
  };

  const winner = getTicTacToeWinner(nextState);
  const status = getTicTacToeStatus({
    ...nextState,
    winner,
  });

  return {
    ...nextState,
    currentPlayer:
      status === 'in_progress' ? (state.currentPlayer === 'X' ? 'O' : 'X') : state.currentPlayer,
    winner,
    status,
  };
}
