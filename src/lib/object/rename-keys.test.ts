import assert from 'node:assert';
import { describe, it } from 'node:test';
import { renameKeys } from './rename-keys';

describe('renameKeys', () => {
  it('renames keys using mapping', () => {
    const result = renameKeys(
      { firstName: 'Ada', lastName: 'Lovelace' },
      { firstName: 'first_name', lastName: 'last_name' },
    );

    assert.deepEqual(result, { first_name: 'Ada', last_name: 'Lovelace' });
  });

  it('keeps keys not present in mapping', () => {
    const result = renameKeys({ id: 1, name: 'Ada' }, { name: 'full_name' });
    assert.deepEqual(result, { id: 1, full_name: 'Ada' });
  });

  it('throws for invalid inputs', () => {
    assert.throws(() => renameKeys(null as never, {}), TypeError, 'input must be a plain object.');
    assert.throws(
      () => renameKeys({ id: 1 }, [] as never),
      TypeError,
      'mapping must be a plain object.',
    );
  });
});
