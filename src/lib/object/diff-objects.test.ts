import assert from 'node:assert';
import { describe, it } from 'node:test';
import { diffObjects } from './diff-objects';

describe('diffObjects', () => {
  it('returns added, removed and changed nested paths', () => {
    const left = {
      id: 1,
      user: {
        name: 'Ada',
        age: 36,
      },
      tags: ['math'],
      date: new Date('2024-01-01T00:00:00.000Z'),
    };
    const right = {
      id: 1,
      user: {
        name: 'Grace',
      },
      tags: ['math', 'logic'],
      active: true,
      date: new Date('2024-01-01T00:00:00.000Z'),
    };

    const diff = diffObjects(left, right);

    assert.deepEqual(diff.added, {
      active: true,
    });
    assert.deepEqual(diff.removed, {
      'user.age': 36,
    });
    assert.deepEqual(diff.changed, {
      'user.name': { before: 'Ada', after: 'Grace' },
      tags: { before: ['math'], after: ['math', 'logic'] },
    });
  });

  it('returns empty diff for deeply equal objects', () => {
    const input = { user: { name: 'Ada' }, tags: ['math'] };
    assert.deepEqual(diffObjects(input, input), {
      added: {},
      removed: {},
      changed: {},
    });
  });

  it('treats deeply-equal arrays of objects as unchanged', () => {
    const left = { items: [{ id: 1, meta: { ok: true } }] };
    const right = { items: [{ id: 1, meta: { ok: true } }] };

    assert.deepEqual(diffObjects(left, right), {
      added: {},
      removed: {},
      changed: {},
    });
  });

  it('detects changed arrays when nested object shape differs', () => {
    const left = { items: [{ id: 1, meta: { ok: true, role: 'admin' } }] };
    const right = { items: [{ id: 1, meta: { ok: true } }] };

    assert.deepEqual(diffObjects(left, right).changed, {
      items: {
        before: [{ id: 1, meta: { ok: true, role: 'admin' } }],
        after: [{ id: 1, meta: { ok: true } }],
      },
    });
  });

  it('handles nested add/remove paths and clones output values', () => {
    const right = { user: { profile: { name: 'Ada' } } };
    const diff = diffObjects({}, right);

    assert.deepEqual(diff.added, { user: { profile: { name: 'Ada' } } });
    assert.notEqual(diff.added.user, right.user);
    assert.deepEqual(diff.removed, {});
    assert.deepEqual(diff.changed, {});
  });

  it('throws for invalid inputs', () => {
    assert.throws(() => diffObjects([] as never, {}), TypeError, 'left must be a plain object.');
    assert.throws(() => diffObjects({}, [] as never), TypeError, 'right must be a plain object.');
  });
});
