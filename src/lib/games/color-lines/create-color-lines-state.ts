import { isInteger } from '../../number/is-integer';
import { DEFAULT_COLOR_LINES_CONFIG } from './default-config';
import { spawnColorLinesBalls } from './spawn-color-lines-balls';
import type { ColorLinesConfig, ColorLinesRandom, ColorLinesState } from './types';

function validateConfig(config: ColorLinesConfig): void {
  if (!isInteger(config.rows) || config.rows <= 0) {
    throw new RangeError('config.rows must be a positive integer.');
  }

  if (!isInteger(config.columns) || config.columns <= 0) {
    throw new RangeError('config.columns must be a positive integer.');
  }

  if (!isInteger(config.minLineLength) || config.minLineLength < 2) {
    throw new RangeError('config.minLineLength must be an integer greater than or equal to 2.');
  }

  if (!isInteger(config.spawnCount) || config.spawnCount < 0) {
    throw new RangeError('config.spawnCount must be a non-negative integer.');
  }

  if (!isInteger(config.previewCount) || config.previewCount < 0) {
    throw new RangeError('config.previewCount must be a non-negative integer.');
  }

  if (!Array.isArray(config.palette) || config.palette.length === 0) {
    throw new TypeError('config.palette must be a non-empty array.');
  }

  if (config.palette.some((color) => typeof color !== 'string' || color.length === 0)) {
    throw new TypeError('config.palette must contain non-empty strings.');
  }

  if (
    config.spawnPolicy !== 'after_non_clear_move' &&
    config.spawnPolicy !== 'after_every_valid_move'
  ) {
    throw new TypeError('config.spawnPolicy is not supported.');
  }

  if (config.moveRule !== 'path_through_empty_cells') {
    throw new TypeError('config.moveRule is not supported.');
  }

  if (!isInteger(config.pointsPerClearedBall) || config.pointsPerClearedBall < 0) {
    throw new RangeError('config.pointsPerClearedBall must be a non-negative integer.');
  }
}

/**
 * Creates a new Color Lines game state.
 *
 * @param config Optional configuration overrides.
 * @param rng Random source used for preview generation and initial spawn.
 * @returns New Color Lines state.
 */
export function createColorLinesState(
  config: Partial<ColorLinesConfig> = {},
  rng: ColorLinesRandom = Math.random,
): ColorLinesState {
  const normalizedConfig: ColorLinesConfig = {
    ...DEFAULT_COLOR_LINES_CONFIG,
    ...config,
    palette: config.palette ?? DEFAULT_COLOR_LINES_CONFIG.palette,
  };

  validateConfig(normalizedConfig);

  const baseState: ColorLinesState = {
    board: new Array(normalizedConfig.rows * normalizedConfig.columns).fill(null),
    config: normalizedConfig,
    preview: [],
    score: 0,
    status: 'in_progress',
    turn: 0,
  };

  const initialState = spawnColorLinesBalls(
    {
      ...baseState,
      preview: normalizedConfig.palette.slice(0, 0),
    },
    rng,
  );

  return {
    ...initialState,
    score: 0,
    turn: 0,
  };
}
