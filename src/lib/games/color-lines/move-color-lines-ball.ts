import { assertGridPosition } from '../shared/assert-grid-position';
import { positionToIndex } from '../shared/position-to-index';
import { canMoveColorLinesBall } from './can-move-color-lines-ball';
import { findColorLinesMatches } from './find-color-lines-matches';
import { isColorLinesGameOver } from './is-color-lines-game-over';
import { spawnColorLinesBalls } from './spawn-color-lines-balls';
import type { ColorLinesPosition, ColorLinesRandom, ColorLinesState } from './types';

/**
 * Moves a ball and resolves clears, spawning, scoring, and status.
 *
 * @param state Current game state.
 * @param from Source position.
 * @param to Destination position.
 * @param rng Random source used when spawning new balls.
 * @returns Next game state after resolving the move.
 * @throws {Error} If the move is illegal.
 */
export function moveColorLinesBall(
  state: ColorLinesState,
  from: ColorLinesPosition,
  to: ColorLinesPosition,
  rng: ColorLinesRandom = Math.random,
): ColorLinesState {
  assertGridPosition(from, state.config.rows, state.config.columns);
  assertGridPosition(to, state.config.rows, state.config.columns);

  if (isColorLinesGameOver(state)) {
    throw new Error('cannot move a ball after the game is over.');
  }

  const fromIndex = positionToIndex(from, state.config.columns);
  const toIndex = positionToIndex(to, state.config.columns);

  if (fromIndex === toIndex) {
    throw new Error('source and destination must be different.');
  }

  if (typeof state.board[fromIndex] !== 'string') {
    throw new Error('source cell does not contain a ball.');
  }

  if (state.board[toIndex] !== null) {
    throw new Error('destination cell is already occupied.');
  }

  if (!canMoveColorLinesBall(state, from, to)) {
    throw new Error('no valid path exists between source and destination.');
  }

  const nextBoard = [...state.board];
  nextBoard[toIndex] = nextBoard[fromIndex];
  nextBoard[fromIndex] = null;

  const movedState: ColorLinesState = {
    ...state,
    board: nextBoard,
  };

  const matches = findColorLinesMatches(movedState);

  if (matches.length > 0) {
    const clearedBoard = [...movedState.board];

    matches.forEach((position) => {
      clearedBoard[positionToIndex(position, state.config.columns)] = null;
    });

    const clearedState: ColorLinesState = {
      ...movedState,
      board: clearedBoard,
      score: movedState.score + matches.length * state.config.pointsPerClearedBall,
    };

    const resolvedState =
      state.config.spawnPolicy === 'after_every_valid_move'
        ? spawnColorLinesBalls(clearedState, rng)
        : ({
            ...clearedState,
            status: 'in_progress',
          } satisfies ColorLinesState);

    return {
      ...resolvedState,
      turn: state.turn + 1,
    };
  }

  const spawnedState = spawnColorLinesBalls(movedState, rng);

  return {
    ...spawnedState,
    turn: state.turn + 1,
  };
}
