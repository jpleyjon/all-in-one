import { positionToIndex } from '../shared/position-to-index';
import { findColorLinesMatches } from './find-color-lines-matches';
import { isColorLinesGameOver } from './is-color-lines-game-over';
import type { ColorLinesColor, ColorLinesRandom, ColorLinesState } from './types';

function pickRandomIndex(length: number, rng: ColorLinesRandom): number {
  return Math.min(length - 1, Math.max(0, Math.floor(rng() * length)));
}

function createPreview(
  palette: readonly ColorLinesColor[],
  previewCount: number,
  rng: ColorLinesRandom,
): ColorLinesColor[] {
  const preview: ColorLinesColor[] = [];

  for (let index = 0; index < previewCount; index++) {
    preview.push(palette[pickRandomIndex(palette.length, rng)]);
  }

  return preview;
}

/**
 * Spawns preview balls onto random empty cells and refreshes the preview queue.
 *
 * @param state Current game state.
 * @param rng Random source used for preview generation and placement.
 * @returns Next game state after spawning.
 */
export function spawnColorLinesBalls(
  state: ColorLinesState,
  rng: ColorLinesRandom = Math.random,
): ColorLinesState {
  const emptyIndexes = state.board
    .map((cell, index) => (cell === null ? index : -1))
    .filter((index) => index >= 0);

  if (emptyIndexes.length === 0) {
    return {
      ...state,
      preview: createPreview(state.config.palette, state.config.previewCount, rng),
      status: 'game_over',
    };
  }

  const colorsToPlace = [...state.preview];

  while (colorsToPlace.length < state.config.spawnCount) {
    colorsToPlace.push(state.config.palette[pickRandomIndex(state.config.palette.length, rng)]);
  }

  const nextBoard = [...state.board];
  const placementCount = Math.min(state.config.spawnCount, emptyIndexes.length);

  for (let index = 0; index < placementCount; index++) {
    const choiceIndex = pickRandomIndex(emptyIndexes.length, rng);
    const boardIndex = emptyIndexes.splice(choiceIndex, 1)[0];
    nextBoard[boardIndex] = colorsToPlace[index];
  }

  const spawnedState: ColorLinesState = {
    ...state,
    board: nextBoard,
    preview: createPreview(state.config.palette, state.config.previewCount, rng),
  };

  const matches = findColorLinesMatches(spawnedState);

  if (matches.length === 0) {
    return {
      ...spawnedState,
      status: isColorLinesGameOver(spawnedState) ? 'game_over' : 'in_progress',
    };
  }

  const clearedBoard = [...spawnedState.board];

  matches.forEach((position) => {
    clearedBoard[positionToIndex(position, state.config.columns)] = null;
  });

  const resolvedState: ColorLinesState = {
    ...spawnedState,
    board: clearedBoard,
    score: spawnedState.score + matches.length * state.config.pointsPerClearedBall,
  };

  return {
    ...resolvedState,
    status: 'in_progress',
  };
}
