import assert from 'node:assert';
import { describe, it } from 'node:test';
import { defaults } from './defaults';

describe('defaults', () => {
  it('fills undefined values from defaults', () => {
    const result = defaults(
      { id: 1, role: undefined },
      { role: 'admin', active: true },
      { active: false, locale: 'en-US' },
    );

    assert.deepEqual(result, { id: 1, role: 'admin', active: true, locale: 'en-US' });
  });

  it('clones nested defaults values', () => {
    const source = { settings: { darkMode: true } };
    const result = defaults({}, source);

    assert.deepEqual(result, source);
    assert.notEqual(result.settings, source.settings);
  });

  it('throws for invalid inputs', () => {
    assert.throws(() => defaults(null as never), TypeError, 'input must be a plain object.');
    assert.throws(
      () => defaults({}, null as never),
      TypeError,
      'sources[0] must be a plain object.',
    );
  });
});
