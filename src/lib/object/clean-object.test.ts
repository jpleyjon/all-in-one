import assert from 'node:assert';
import { describe, it } from 'node:test';
import { cleanObject } from './clean-object';

describe('cleanObject', () => {
  it('removes undefined, null and empty strings deeply by default', () => {
    const input = {
      keep: 1,
      removeUndefined: undefined,
      removeNull: null,
      removeEmpty: '',
      nested: {
        keep: 'value',
        remove: '',
      },
      list: [1, null, '', { keep: true, remove: undefined }],
    };

    assert.deepEqual(cleanObject(input), {
      keep: 1,
      nested: { keep: 'value' },
      list: [1, { keep: true }],
    });
  });

  it('supports shallow clean mode', () => {
    const input = {
      a: null,
      nested: {
        b: null,
      },
    };

    assert.deepEqual(cleanObject(input, { deep: false }), {
      nested: { b: null },
    });
  });

  it('does not recurse into nested arrays when deep is false', () => {
    const nestedObject = { remove: null };
    const input = {
      keep: 1,
      list: [null, '', nestedObject],
    };

    const result = cleanObject(input, { deep: false });

    assert.deepEqual(result, {
      keep: 1,
      list: [null, '', { remove: null }],
    });
    assert.notStrictEqual(result.list, input.list);
    assert.notStrictEqual((result.list as unknown[])[2], nestedObject);
  });

  it('supports keeping default-removed values and removing empty containers', () => {
    const input = {
      a: '',
      b: null,
      c: undefined,
      nested: {},
      list: [],
    };

    assert.deepEqual(
      cleanObject(input, {
        removeEmptyString: false,
        removeNull: false,
        removeUndefined: false,
        removeEmptyObject: true,
        removeEmptyArray: true,
      }),
      {
        a: '',
        b: null,
        c: undefined,
      },
    );
  });

  it('throws for invalid input', () => {
    assert.throws(() => cleanObject([] as never), TypeError, 'input must be a plain object.');
  });
});
