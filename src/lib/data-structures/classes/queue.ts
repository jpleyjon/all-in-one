import { IQueue } from '../interfaces/queue';
import ALinearStructure from './linear-structure';
import SingleNode from './single-node';

/**
 * Custom error class for queue underflow operations.
 * 
 * @extends {Error}
 * 
 * @example
 * ```typescript
 * try {
 *   queue.pop();
 * } catch (error) {
 *   if (error instanceof QueueUnderflowError) {
 *     console.error('Queue is empty');
 *   }
 * }
 * ```
 */
export class QueueUnderflowError extends Error {
  /**
   * Creates a new QueueUnderflowError.
   * 
   * @param {string} [message] Optional error message.
   */
  constructor(message?: string) {
    super(message);
    this.name = 'QueueUnderflowError';
  }
}

/**
 * Represents a queue data structure (FIFO - First In, First Out).
 * Provides efficient O(1) enqueue and dequeue operations.
 * 
 * @template T The type of data stored in the queue.
 * 
 * @example
 * ```typescript
 * const queue = new Queue<number>();
 * queue.push(1);
 * queue.push(2);
 * queue.push(3);
 * 
 * console.log(queue.pop()); // 1 (first in, first out)
 * console.log(queue.peek()); // 2 (next to be removed)
 * 
 * for (const item of queue) {
 *   console.log(item); // 2, 3
 * }
 * ```
 */
export default class Queue<T> extends ALinearStructure<T> implements IQueue<T>, Iterable<T> {
  private _size: number = 0;
  private _tail: SingleNode<T> | null = null;

  /**
   * Creates a new Queue instance.
   * 
   * @param {T} [data] Optional initial data for the queue.
   * 
   * @example
   * ```typescript
   * const emptyQueue = new Queue<string>();
   * const queueWithData = new Queue<string>("first");
   * ```
   */
  constructor(data?: T) {
    super(data);
    if (data !== undefined) {
      this._size = 1;
      this._tail = this._head;
    }
  }

  /**
   * Gets the size of the queue in O(1) time.
   * 
   * @returns {number} The number of elements in the queue.
   * 
   * @example
   * ```typescript
   * const queue = new Queue<number>();
   * console.log(queue.size); // 0
   * queue.push(1);
   * console.log(queue.size); // 1
   * ```
   */
  get size(): number {
    return this._size;
  }

  /**
   * Gets the tail node of the queue.
   * 
   * @returns {SingleNode<T> | null} The tail node or null if empty.
   */
  get tail(): SingleNode<T> | null {
    return this._tail;
  }

  /**
   * Adds an element to the rear of the queue (enqueue operation) in O(1) time.
   * 
   * @param {T} data The data to add to the queue.
   * 
   * @example
   * ```typescript
   * const queue = new Queue<string>();
   * queue.push("first");
   * queue.push("second");
   * console.log(queue.toArray()); // ["first", "second"]
   * ```
   */
  push(data: T): void {
    const newNode = new SingleNode(data);
    
    if (this._head === null) {
      this._head = newNode;
      this._tail = newNode;
    } else {
      this._tail!.next = newNode;
      this._tail = newNode;
    }
    
    this._size++;
  }

  /**
   * Removes and returns the element from the front of the queue (dequeue operation) in O(1) time.
   * 
   * @returns {T} The data from the front of the queue.
   * @throws {QueueUnderflowError} If the queue is empty.
   * 
   * @example
   * ```typescript
   * const queue = new Queue<number>();
   * queue.push(1);
   * queue.push(2);
   * console.log(queue.pop()); // 1
   * console.log(queue.pop()); // 2
   * ```
   */
  pop(): T {
    if (this._head === null) {
      throw new QueueUnderflowError("Cannot dequeue from an empty queue.");
    }
    
    const data = this._head.data;
    this._head = this._head.next;
    
    // Update tail if queue becomes empty
    if (this._head === null) {
      this._tail = null;
    }
    
    this._size--;
    return data;
  }

  /**
   * Returns the element at the front of the queue without removing it.
   * 
   * @returns {T} The data at the front of the queue.
   * @throws {QueueUnderflowError} If the queue is empty.
   * 
   * @example
   * ```typescript
   * const queue = new Queue<string>();
   * queue.push("first");
   * queue.push("second");
   * console.log(queue.peek()); // "first"
   * console.log(queue.size); // 2 (unchanged)
   * ```
   */
  peek(): T {
    if (this._head === null) {
      throw new QueueUnderflowError("Cannot peek at an empty queue.");
    }
    
    return this._head.data;
  }

  /**
   * Returns the element at the rear of the queue without removing it.
   * 
   * @returns {T} The data at the rear of the queue.
   * @throws {QueueUnderflowError} If the queue is empty.
   * 
   * @example
   * ```typescript
   * const queue = new Queue<string>();
   * queue.push("first");
   * queue.push("second");
   * console.log(queue.rear()); // "second"
   * ```
   */
  rear(): T {
    if (this._tail === null) {
      throw new QueueUnderflowError("Cannot access rear of an empty queue.");
    }
    
    return this._tail.data;
  }

  /**
   * Checks if the queue is empty.
   * 
   * @returns {boolean} True if the queue is empty, false otherwise.
   * 
   * @example
   * ```typescript
   * const queue = new Queue<number>();
   * console.log(queue.isEmpty()); // true
   * queue.push(1);
   * console.log(queue.isEmpty()); // false
   * ```
   */
  isEmpty(): boolean {
    return this._size === 0;
  }

  /**
   * Removes all elements from the queue.
   * 
   * @example
   * ```typescript
   * const queue = new Queue<number>();
   * queue.push(1);
   * queue.push(2);
   * queue.clear();
   * console.log(queue.isEmpty()); // true
   * ```
   */
  clear(): void {
    this._head = null;
    this._tail = null;
    this._size = 0;
  }

  /**
   * Checks if the queue contains the specified data.
   * 
   * @param {T} data The data to search for.
   * @returns {boolean} True if the data is found, false otherwise.
   * 
   * @example
   * ```typescript
   * const queue = new Queue<string>();
   * queue.push("first");
   * console.log(queue.contains("first")); // true
   * console.log(queue.contains("second")); // false
   * ```
   */
  contains(data: T): boolean {
    let current = this._head;
    
    while (current !== null) {
      if (current.hasData(data)) {
        return true;
      }
      current = current.next;
    }
    
    return false;
  }

  /**
   * Returns an array containing all elements in the queue from front to rear.
   * 
   * @returns {Array<T>} An array containing all elements in the queue.
   * 
   * @example
   * ```typescript
   * const queue = new Queue<number>();
   * queue.push(1);
   * queue.push(2);
   * queue.push(3);
   * console.log(queue.toArray()); // [1, 2, 3]
   * ```
   */
  toArray(): Array<T> {
    const array: Array<T> = [];
    let current = this._head;
    
    while (current !== null) {
      array.push(current.data);
      current = current.next;
    }
    
    return array;
  }

  /**
   * Returns a string representation of the queue.
   * 
   * @returns {string} String representation of the queue.
   * 
   * @example
   * ```typescript
   * const queue = new Queue<number>();
   * queue.push(1);
   * queue.push(2);
   * console.log(queue.toString()); // "Queue(2)[1, 2]"
   * ```
   */
  toString(): string {
    return `Queue(${this._size})[${this.toArray().join(', ')}]`;
  }

  /**
   * Returns a JSON representation of the queue.
   * 
   * @returns {object} JSON object with size and data array.
   * 
   * @example
   * ```typescript
   * const queue = new Queue<number>();
   * queue.push(1);
   * queue.push(2);
   * console.log(queue.toJSON()); // { size: 2, data: [1, 2] }
   * ```
   */
  toJSON(): { size: number; data: T[] } {
    return {
      size: this._size,
      data: this.toArray()
    };
  }

  /**
   * Makes the queue iterable with for...of loops.
   * 
   * @returns {Iterator<T>} An iterator for the queue elements.
   * 
   * @example
   * ```typescript
   * const queue = new Queue<number>();
   * queue.push(1);
   * queue.push(2);
   * queue.push(3);
   * 
   * for (const item of queue) {
   *   console.log(item); // 1, 2, 3
   * }
   * ```
   */
  *[Symbol.iterator](): Iterator<T> {
    let current = this._head;
    while (current !== null) {
      yield current.data;
      current = current.next;
    }
  }
}
