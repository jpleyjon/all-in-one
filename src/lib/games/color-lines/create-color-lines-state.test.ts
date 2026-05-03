import assert from 'node:assert';
import { describe, it } from 'node:test';

import { createColorLinesState } from './create-color-lines-state';

describe('createColorLinesState', () => {
  it('creates a game using defaults and initial spawn', () => {
    const state = createColorLinesState({}, () => 0);

    assert.equal(state.board.length, 81);
    assert.equal(state.board.filter((cell) => cell !== null).length, 3);
    assert.deepEqual(state.preview, ['red', 'red', 'red']);
    assert.equal(state.score, 0);
    assert.equal(state.status, 'in_progress');
    assert.equal(state.turn, 0);
  });

  it('supports custom configuration', () => {
    const state = createColorLinesState(
      {
        rows: 4,
        columns: 5,
        spawnCount: 2,
        previewCount: 2,
        minLineLength: 4,
        palette: ['ruby', 'emerald'],
      },
      () => 0,
    );

    assert.equal(state.board.length, 20);
    assert.equal(state.board.filter((cell) => cell !== null).length, 2);
    assert.deepEqual(state.preview, ['ruby', 'ruby']);
    assert.equal(state.config.minLineLength, 4);
  });

  it('validates configuration values', () => {
    assert.throws(() => createColorLinesState({ rows: 0 }), RangeError);
    assert.throws(() => createColorLinesState({ columns: 0 }), RangeError);
    assert.throws(() => createColorLinesState({ minLineLength: 1 }), RangeError);
    assert.throws(() => createColorLinesState({ spawnCount: -1 }), RangeError);
    assert.throws(() => createColorLinesState({ previewCount: -1 }), RangeError);
    assert.throws(() => createColorLinesState({ palette: [] }), TypeError);
    assert.throws(() => createColorLinesState({ palette: [''] }), TypeError);
    assert.throws(() => createColorLinesState({ spawnPolicy: 'never' as never }), TypeError);
    assert.throws(() => createColorLinesState({ moveRule: 'teleport' as never }), TypeError);
    assert.throws(() => createColorLinesState({ pointsPerClearedBall: -1 }), RangeError);
  });
});
