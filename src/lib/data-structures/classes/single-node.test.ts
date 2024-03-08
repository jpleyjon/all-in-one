import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert';
import SingleNode from './single-node';
import MockClass from '../fixtures/mock-class';

describe('Simple Node', () => {
  let _mockObject: MockClass;
  let _node: SingleNode<MockClass>;

  beforeEach(() => {
    _mockObject = new MockClass(1);
    _node = new SingleNode<MockClass>(_mockObject);
  });

  it('should create a simple node', () => {
    assert.ok(_node);
    assert.strictEqual(_node.next, null);
  });

  it('should return the right data value', () => {
    assert.strictEqual(_node.data.mockProperty, 1);
  });

  it('should set the right next value', () => {
    const _mockObjectTwo = new MockClass(2);
    const _nodeTwo = new SingleNode<MockClass>(_mockObjectTwo);
    _node.next = _nodeTwo;

    assert.strictEqual(_node.next.data.mockProperty, 2);
  });
});
