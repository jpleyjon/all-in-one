import { describe, it } from 'node:test';
import assert from 'node:assert';
import DoubleNode from './double-node';

describe('Double Node', () => {
  it('should create a double node', () => {
    const _node = new DoubleNode<number>(1);

    assert.ok(_node);
    assert.equal(_node.next, null);
  });

  it('should return the right data value', () => {
    const _node = new DoubleNode<number>(1);

    assert.equal(_node.data, 1);
  });

  it('should set the right next value', () => {
    const _nodeOne = new DoubleNode<number>(1);
    const _nodeTwo = new DoubleNode<number>(2);
    _nodeOne.next = _nodeTwo;

    assert.equal(_nodeOne.next.data, 2);
  });

  it('should set the right previous value', () => {
    const _nodeOne = new DoubleNode<number>(1);
    const _nodeTwo = new DoubleNode<number>(2);
    _nodeOne.prev = _nodeTwo;

    assert.equal(_nodeOne.prev.data, 2);
  });
});
