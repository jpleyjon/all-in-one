import { describe, it } from 'node:test';
import assert from 'node:assert';
import Queue from './queue';
import MockClass from '../fixtures/mock-class';

describe('Queue', () => {
  it('should create a queue', () => {
    const _mockObject = new MockClass(1);
    const _queue = new Queue<MockClass>(_mockObject);

    assert.ok(_queue);
  });

  it('should false if the queue is not empty', () => {
    const _mockObject = new MockClass(1);
    const _queue = new Queue<MockClass>(_mockObject);

    assert.equal(_queue.isEmpty(), false);
  });

  it('should true if the queue is empty', () => {
    const _queue = new Queue<MockClass>();

    assert.equal(_queue.isEmpty(), true);
  });

  it('should push an item to the queue', () => {
    const _mockObject = new MockClass(1);
    const _queue = new Queue<MockClass>();

    _queue.push(_mockObject);

    assert.equal(_queue.size, 1);
  });

  it('should pop an item from the queue', () => {
    const _mockObject = new MockClass(1);
    const _queue = new Queue<MockClass>();

    _queue.push(_mockObject);
    const _element = _queue.pop();

    assert.ok(_element);
    assert.equal(_element.mockProperty, 1);
    assert.equal(_queue.size, 0);
  });

  it('should pop the last item pushed to the queue', () => {
    const _mockObjectOne = new MockClass(1);
    const _mockObjectTwo = new MockClass(2);
    const _queue = new Queue<MockClass>();

    _queue.push(_mockObjectOne);
    _queue.push(_mockObjectTwo);
    const _element = _queue.pop();

    assert.ok(_element);
    assert.equal(_element.mockProperty, 1);
  });

  it('should return null if the stack is empty', () => {
    const _queue = new Queue<MockClass>();

    assert.equal(_queue.pop(), null);
  });
});
