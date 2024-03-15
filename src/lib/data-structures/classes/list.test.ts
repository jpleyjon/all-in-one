import { describe, it } from 'node:test';
import assert from 'node:assert';
import List from './list';
import MockClass from '../fixtures/mock-class';

describe('List', () => {
  it('should create a list', () => {
    const _mockObject = new MockClass(1);
    const _list = new List<MockClass>(_mockObject);

    assert.ok(_list);
  });

  it('should false if the list is not empty', () => {
    const _mockObject = new MockClass(1);
    const _list = new List<MockClass>(_mockObject);

    assert.equal(_list.isEmpty(), false);
  });

  it('should push an item to the list', () => {
    const _mockObject = new MockClass(1);
    const _list = new List<MockClass>();

    _list.push(_mockObject);

    assert.equal(_list.size, 1);
  });

  it('should remove the only item from the list, given its index', () => {
    const _list = new List<number>(1);

    _list.remove(0);

    assert.equal(_list.size, 0);
  });

  it('should find an item in the list, given its index', () => {
    const _list = new List<number>(1);

    _list.push(2);
    _list.push(3);
    _list.push(4);

    const _item = _list.find(2);
    assert.equal(_item, 3);
  });

  it('should remove an item from the list, given its index', () => {
    const _list = new List<number>(1);

    _list.push(2);
    _list.push(3);
    _list.push(4);

    _list.remove(3);
    assert.equal(_list.size, 3);
  });

  it('should return an array with the items in the list', () => {
    const _list = new List<number>(1);

    _list.push(2);
    _list.push(3);
    _list.push(4);

    const _array = _list.toArray();

    assert.deepEqual(_array, [1, 2, 3, 4]);
  });

  it('should throw an error if the index is out of bounds finding', () => {
    const _list = new List<number>(1);

    assert.throws(() => {
      _list.find(1);
    });

    assert.throws(() => {
      _list.find(2);
    });
  });

  it('should throw an error if the index is out of bounds when removing', () => {
    const _list = new List<number>(1);

    assert.throws(() => {
      _list.remove(1);
    });
  });
});
