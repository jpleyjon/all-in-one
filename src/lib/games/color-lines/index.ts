export type {
  ColorLinesCell,
  ColorLinesColor,
  ColorLinesConfig,
  ColorLinesMoveRule,
  ColorLinesPosition,
  ColorLinesRandom,
  ColorLinesSpawnPolicy,
  ColorLinesState,
  ColorLinesStatus,
} from './types';

export { canMoveColorLinesBall } from './can-move-color-lines-ball';
export { createColorLinesState } from './create-color-lines-state';
export { findColorLinesMatches } from './find-color-lines-matches';
export { isColorLinesGameOver } from './is-color-lines-game-over';
export { listColorLinesMoves } from './list-color-lines-moves';
export { moveColorLinesBall } from './move-color-lines-ball';
export { spawnColorLinesBalls } from './spawn-color-lines-balls';
