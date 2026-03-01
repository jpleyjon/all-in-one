import assert from 'node:assert';
import { describe, it } from 'node:test';
import { isHexColor } from './is-hex-color';

describe('isHexColor', () => {
  it('accepts valid hex colors', () => {
    assert.equal(isHexColor('#fff'), true);
    assert.equal(isHexColor('#ffff'), true);
    assert.equal(isHexColor('#ffffff'), true);
    assert.equal(isHexColor('#ffffffff'), true);
  });

  it('rejects invalid hex colors', () => {
    assert.equal(isHexColor(1), false);
    assert.equal(isHexColor('fff'), false);
    assert.equal(isHexColor('#ff'), false);
    assert.equal(isHexColor('#zzzzzz'), false);
  });
});
