import { describe, it } from 'node:test';
import assert from 'assert';
import MockNode from '../fixtures/mock-node';

describe('Node', () => {
  it('should store data', () => {
    const data = 'test data';
    const node = new MockNode(data);
    assert.strictEqual(node.data, data);
  });
});
