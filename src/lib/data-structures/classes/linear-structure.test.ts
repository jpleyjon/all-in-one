import { describe, it } from 'node:test';
import assert from 'node:assert';
import MockLinearStructure from '../fixtures/mock-linear-structure';
import SingleNode from './single-node';

describe('ALinearStructure', () => {
  it('constructor initializes correctly with data', () => {
    const structure = new MockLinearStructure<number>(1);

    assert.ok(structure.head instanceof SingleNode);
    assert.strictEqual(structure.head.data, 1);
  });

  it('constructor initializes correctly without data', () => {
    const structure = new MockLinearStructure<number>();

    assert.strictEqual(structure.head, null);
  });

  it('size returns correct size', () => {
    const structure = new MockLinearStructure<number>();
    structure.push(1);
    structure.push(2);
    structure.push(3);

    assert.strictEqual(structure.size, 3);
  });

  it('isEmpty returns true for empty structure', () => {
    const structure = new MockLinearStructure<number>();

    assert.strictEqual(structure.isEmpty(), true);
  });

  it('isEmpty returns false for non-empty structure', () => {
    const structure = new MockLinearStructure<number>();
    structure.push(1);

    assert.strictEqual(structure.isEmpty(), false);
  });
});
