import ILinearStructure from '../interfaces/linear-structure';
import { IDoubleNode } from '../interfaces/double-node';
import DoubleNode from './double-node';

/**
 * @class List
 * @extends ALinearStructure<T>
 * @implements {Iterable<T>}
 *
 * @description
 * A doubly-linked list implementation.
 *
 * @template T The type of data stored in the list.
 */
export class List<T> implements ILinearStructure, Iterable<T> {
  /**
   * @description
   * The head of the list.
   * @protected
   * @type {(IDoubleNode<T> | null)}
   */
  protected _head: IDoubleNode<T> | null = null;

  /**
   * @description
   * The tail of the list.
   * @protected
   * @type {(IDoubleNode<T> | null)}
   */
  protected _tail: IDoubleNode<T> | null = null;

  /**
   * @description
   * The number of elements in the list.
   * @protected
   * @type {number}
   */
  protected _size = 0;

  /**
   * @description
   * The head of the list.
   *
   * @returns {(IDoubleNode<T> | null)}
   */
  public get head(): IDoubleNode<T> | null {
    return this._head;
  }

  /**
   * @description
   * The tail of the list.
   *
   * @returns {(IDoubleNode<T> | null)}
   */
  public get tail(): IDoubleNode<T> | null {
    return this._tail;
  }

  /**
   * @description
   * The number of elements in the list.
   *
   * @returns {number}
   */
  public get size(): number {
    return this._size;
  }

  /**
   * @description
   * Adds a new element to the end of the list.
   *
   * @param {T} data The data to add.
   * @returns {IDoubleNode<T>} The newly created node.
   */
  public push(data: T): IDoubleNode<T> {
    const newNode = new DoubleNode(data);

    if (!this._head) {
      this._head = newNode;
      this._tail = newNode;
    } else {
      newNode.prev = this._tail;
      this._tail!.next = newNode;
      this._tail = newNode;
    }

    this._size++;
    return newNode;
  }

  /**
   * @description
   * Adds a new element to the beginning of the list.
   *
   * @param {T} data The data to add.
   * @returns {IDoubleNode<T>} The newly created node.
   */
  public unshift(data: T): IDoubleNode<T> {
    const newNode = new DoubleNode(data);

    if (!this._head) {
      this._head = newNode;
      this._tail = newNode;
    } else {
      newNode.next = this._head;
      this._head.prev = newNode;
      this._head = newNode;
    }

    this._size++;
    return newNode;
  }

  /**
   * @description
   * Inserts a new element at a specific index.
   *
   * @param {number} index The index to insert at.
   * @param {T} data The data to insert.
   * @returns {(IDoubleNode<T> | null)} The newly created node, or null if the index is out of bounds.
   */
  public insertAt(index: number, data: T): IDoubleNode<T> | null {
    if (index < 0 || index > this._size) {
      return null; // Index out of bounds
    }

    if (index === 0) {
      return this.unshift(data);
    }

    if (index === this._size) {
      return this.push(data);
    }

    const newNode = new DoubleNode(data);
    let current = this._head;
    for (let i = 0; i < index; i++) {
      current = current!.next;
    }

    const prevNode = current!.prev;
    prevNode!.next = newNode;
    newNode.prev = prevNode;
    newNode.next = current;
    current!.prev = newNode;

    this._size++;
    return newNode;
  }

  /**
   * @description
   * Removes and returns the last element of the list.
   *
   * @returns {(T | null)} The data of the removed element, or null if the list is empty.
   */
  public pop(): T | null {
    if (!this._tail) {
      return null;
    }

    const removedNode = this._tail;
    if (this._head === this._tail) {
      this._head = null;
      this._tail = null;
    } else {
      this._tail = removedNode.prev;
      this._tail!.next = null;
    }

    this._size--;
    return removedNode.data;
  }

  /**
   * @description
   * Removes and returns the first element of the list.
   *
   * @returns {(T | null)} The data of the removed element, or null if the list is empty.
   */
  public shift(): T | null {
    if (!this._head) {
      return null;
    }

    const removedNode = this._head;
    if (this._head === this._tail) {
      this._head = null;
      this._tail = null;
    } else {
      this._head = removedNode.next as IDoubleNode<T>;
      this._head.prev = null;
    }

    this._size--;
    return removedNode.data;
  }

  /**
   * @description
   * Removes an element at a specific index.
   *
   * @param {number} index The index of the element to remove.
   * @returns {(T | null)} The data of the removed element, or null if the index is out of bounds.
   */
  public removeAt(index: number): T | null {
    if (index < 0 || index >= this._size) {
      return null; // Index out of bounds
    }

    if (index === 0) {
      return this.shift();
    }

    if (index === this._size - 1) {
      return this.pop();
    }

    let current = this._head;
    for (let i = 0; i < index; i++) {
      current = current!.next;
    }

    const removedNode = current!;
    const prevNode = removedNode.prev;
    const nextNode = removedNode.next;

    prevNode!.next = nextNode;
    nextNode!.prev = prevNode;

    this._size--;
    return removedNode.data;
  }

  /**
   * @description
   * Finds the first node that satisfies the provided testing function.
   *
   * @param {(data: T) => boolean} callback The function to execute on each element.
   * @returns {(IDoubleNode<T> | null)} The first node that satisfies the callback, or null if not found.
   */
  public find(callback: (data: T) => boolean): IDoubleNode<T> | null {
    let current = this._head;
    while (current) {
      if (callback(current.data)) {
        return current;
      }
      current = current.next;
    }
    return null;
  }

  /**
   * @description
   * Reverses the list in-place.
   */
  public reverse(): void {
    let current = this._head;
    let temp: IDoubleNode<T> | null = null;

    this._tail = this._head;

    while (current) {
      temp = current.prev;
      current.prev = current.next;
      current.next = temp;
      this._head = current;
      current = current.prev as IDoubleNode<T>;
    }
  }

  /**
   * @description
   * Checks if the list is empty.
   *
   * @returns {boolean}
   */
  public isEmpty(): boolean {
    return this._size === 0;
  }

  /**
   * @description
   * Clears the list.
   */
  public clear(): void {
    this._head = null;
    this._tail = null;
    this._size = 0;
  }

  /**
   * @description
   * Converts the list to an array.
   *
   * @returns {T[]}
   */
  public toArray(): T[] {
    const array: T[] = [];
    let current = this._head;
    while (current) {
      array.push(current.data);
      current = current.next;
    }
    return array;
  }

  /**
   * @description
   * Creates an iterator for the list.
   *
   * @returns {Iterator<T>}
   */
  public [Symbol.iterator](): Iterator<T> {
    let current = this._head;
    return {
      next: (): IteratorResult<T> => {
        if (current) {
          const value = current.data;
          current = current.next;
          return { value, done: false };
        } else {
          return { value: undefined, done: true };
        }
      },
    };
  }
}
