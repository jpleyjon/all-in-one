import { describe, it } from 'node:test';
import assert from 'node:assert';
import Stack from './stack';
import MockClass from '../fixtures/mock-class';

describe('Stack', () => {
  it('should create a stack', () => {
    const _mockObject = new MockClass(1);
    const _stack = new Stack<MockClass>(_mockObject);

    assert.ok(_stack);
  });

  it('should false if the stack is not empty', () => {
    const _mockObject = new MockClass(1);
    const _stack = new Stack<MockClass>(_mockObject);

    assert.equal(_stack.isEmpty(), false);
  });

  it('should true if the stack is empty', () => {
    const _stack = new Stack<MockClass>();

    assert.equal(_stack.isEmpty(), true);
  });

  it('should push an item to the stack', () => {
    const _mockObject = new MockClass(1);
    const _stack = new Stack<MockClass>();

    _stack.push(_mockObject);

    assert.equal(_stack.size, 1);
  });

  it('should pop an item from the stack', () => {
    const _mockObject = new MockClass(1);
    const _stack = new Stack<MockClass>();

    _stack.push(_mockObject);
    const _element = _stack.pop();

    assert.ok(_element);
    assert.equal(_element.mockProperty, 1);
    assert.equal(_stack.size, 0);
  });

  it('should return the peak of the stack', () => {
    const _stack = new Stack<number>();

    _stack.push(1);
    _stack.push(2);
    _stack.push(3);

    assert.ok(_stack);
    assert.equal(_stack.peek(), 3);
  });

  it('should pop the last item pushed to the stack', () => {
    const _mockObjectOne = new MockClass(1);
    const _mockObjectTwo = new MockClass(2);
    const _stack = new Stack<MockClass>();

    _stack.push(_mockObjectOne);
    _stack.push(_mockObjectTwo);
    const _element = _stack.pop();

    assert.ok(_element);
    assert.equal(_element.mockProperty, 2);
    assert.equal(_stack.size, 1);
  });

  it('should throw an error if the stack is empty', () => {
    const _stack = new Stack<MockClass>();

    assert.throws(() => _stack.pop(), Error, "Can't pop from an empty stack.");
  });

  it('should throw an error if trying to peek at an empty stack', () => {
    const _stack = new Stack<MockClass>();

    assert.throws(() => _stack.peek(), Error, "Can't peek at an empty stack.");
  });
});
