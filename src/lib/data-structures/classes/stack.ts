import { IStack } from '../interfaces/stack';
import ILinearStructure from '../interfaces/linear-structure';
import SingleNode from './single-node';

/**
 * @class
 * @extends {Error}
 *
 * Represents an error that occurs when an operation is attempted on an empty stack.
 *
 * @example
 * try {
 *   stack.pop();
 * } catch (error) {
 *   if (error instanceof StackUnderflowError) {
 *     console.error('Attempted to pop from an empty stack');
 *   }
 * }
 */
export class StackUnderflowError extends Error {
  /**
   * Creates a new instance of the StackUnderflowError class.
   * @param {string} [message] - The error message.
   */
  constructor(message?: string) {
    super(message);
    this.name = 'StackUnderflowError';
  }
}

/**
 * @class
 * @implements {IStack<T>}
 * @implements {ILinearStructure}
 *
 * A generic Stack data structure implementation using a singly linked list.
 * Supports LIFO (Last In, First Out) operations with O(1) time complexity
 * for push, pop, and peek operations.
 *
 * Key features:
 * - O(1) push, pop, peek operations
 * - O(1) size tracking
 * - Type-safe generic implementation
 * - Iterator support for ES6 iteration protocols
 * - Comprehensive error handling
 * - JSON serialization support
 *
 * @template T The type of elements stored in the stack
 *
 * @example
 * ```typescript
 * const stack = new Stack<number>();
 * stack.push(1);
 * stack.push(2);
 * stack.push(3);
 * 
 * console.log(stack.peek()); // 3
 * console.log(stack.pop());  // 3
 * console.log(stack.size);   // 2
 * 
 * // Iterator support
 * for (const item of stack) {
 *   console.log(item); // 2, 1
 * }
 * ```
 */
export default class Stack<T> implements IStack<T>, ILinearStructure {
  private _head: SingleNode<T> | null = null;
  private _size: number = 0;

  /**
   * Gets the head node of the stack.
   * @returns {SingleNode<T> | null} The head node, or null if stack is empty
   */
  get head(): SingleNode<T> | null {
    return this._head;
  }

  /**
   * Creates a new Stack instance.
   * @param {T} [data] - Optional initial data to push onto the stack
   *
   * @example
   * ```typescript
   * const emptyStack = new Stack<number>();
   * const stackWithData = new Stack<string>('initial');
   * ```
   */
  constructor(data?: T) {
    if (data !== undefined) {
      this._head = new SingleNode<T>(data);
      this._size = 1;
    }
  }

  /**
   * Gets the current number of elements in the stack.
   * Time complexity: O(1)
   * @returns {number} The number of elements in the stack
   */
  get size(): number {
    return this._size;
  }

  /**
   * Checks if the stack is empty.
   * Time complexity: O(1)
   * @returns {boolean} True if the stack is empty, false otherwise
   *
   * @example
   * ```typescript
   * const stack = new Stack<number>();
   * console.log(stack.isEmpty()); // true
   * stack.push(1);
   * console.log(stack.isEmpty()); // false
   * ```
   */
  isEmpty(): boolean {
    return this._head === null;
  }
  /**
   * Pushes a new element to the top of the stack.
   * Time complexity: O(1)
   * @param {T} data - The data to be pushed onto the stack
   *
   * @example
   * ```typescript
   * stack.push(3);
   * console.log(stack.peek()); // 3
   * console.log(stack.size);   // increased by 1
   * ```
   */
  push(data: T): void {
    const newHead = new SingleNode(data);
    if (this._head !== null) {
      newHead.next = this._head;
    }
    this._head = newHead;
    this._size++;
  }

  /**
   * Removes and returns the top element from the stack.
   * Time complexity: O(1)
   * @throws {StackUnderflowError} If the stack is empty
   * @returns {T} The data of the top element of the stack
   *
   * @example
   * ```typescript
   * stack.push(1);
   * stack.push(2);
   * console.log(stack.pop()); // 2
   * console.log(stack.size);  // 1
   * ```
   */
  pop(): T {
    if (this._head === null) {
      throw new StackUnderflowError("Cannot pop from an empty stack");
    }
    
    const data = this._head.data;
    this._head = this._head.next;
    this._size--;
    return data;
  }

  /**
   * Returns the data of the top element without removing it.
   * Time complexity: O(1)
   * @throws {StackUnderflowError} If the stack is empty
   * @returns {T} The data of the top element of the stack
   *
   * @example
   * ```typescript
   * stack.push(1);
   * console.log(stack.peek()); // 1
   * console.log(stack.size);   // still 1
   * ```
   */
  peek(): T {
    if (this._head === null) {
      throw new StackUnderflowError("Cannot peek at an empty stack");
    }
    return this._head.data;
  }

  /**
   * Returns the top element of the stack without removing it.
   * Alias for peek() method to provide stack-specific naming.
   * Time complexity: O(1)
   * @throws {StackUnderflowError} If the stack is empty
   * @returns {T} The data of the top element of the stack
   */
  top(): T {
    return this.peek();
  }

  /**
   * Checks if the stack contains a specific element.
   * Time complexity: O(n)
   * @param {T} data - The data to search for
   * @returns {boolean} True if the element is found, false otherwise
   *
   * @example
   * ```typescript
   * stack.push(1);
   * stack.push(2);
   * console.log(stack.contains(1)); // true
   * console.log(stack.contains(3)); // false
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
   * Removes all elements from the stack.
   * Time complexity: O(1)
   *
   * @example
   * ```typescript
   * stack.push(1);
   * stack.push(2);
   * stack.clear();
   * console.log(stack.isEmpty()); // true
   * console.log(stack.size);      // 0
   * ```
   */
  clear(): void {
    this._head = null;
    this._size = 0;
  }

  /**
   * Converts the stack to an array.
   * Elements are ordered from top to bottom (top element first).
   * Time complexity: O(n)
   * @returns {T[]} An array containing all stack elements
   *
   * @example
   * ```typescript
   * stack.push(1);
   * stack.push(2);
   * stack.push(3);
   * console.log(stack.toArray()); // [3, 2, 1]
   * ```
   */
  toArray(): T[] {
    const result: T[] = [];
    let current = this._head;
    while (current !== null) {
      result.push(current.data);
      current = current.next;
    }
    return result;
  }

  /**
   * Returns a string representation of the stack.
   * Elements are shown from top to bottom.
   * @returns {string} String representation of the stack
   *
   * @example
   * ```typescript
   * stack.push(1);
   * stack.push(2);
   * console.log(stack.toString()); // "Stack(2) [2, 1]"
   * ```
   */
  toString(): string {
    if (this.isEmpty()) {
      return 'Stack(0) []';
    }
    const elements = this.toArray().join(', ');
    return `Stack(${this._size}) [${elements}]`;
  }

  /**
   * Returns a JSON representation of the stack.
   * @returns {object} JSON object containing stack metadata and elements
   *
   * @example
   * ```typescript
   * stack.push(1);
   * stack.push(2);
   * console.log(stack.toJSON()); 
   * // { type: 'Stack', size: 2, elements: [2, 1] }
   * ```
   */
  toJSON(): object {
    return {
      type: 'Stack',
      size: this._size,
      isEmpty: this.isEmpty(),
      elements: this.toArray()
    };
  }

  /**
   * Makes the stack iterable using the ES6 iteration protocol.
   * Iterates from top to bottom.
   * @returns {Iterator<T>} An iterator for the stack elements
   *
   * @example
   * ```typescript
   * stack.push(1);
   * stack.push(2);
   * stack.push(3);
   * 
   * for (const item of stack) {
   *   console.log(item); // 3, 2, 1
   * }
   * 
   * const array = [...stack]; // [3, 2, 1]
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
