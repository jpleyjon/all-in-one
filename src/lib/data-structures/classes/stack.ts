import { IStack } from '../interfaces/stack';
import ALinearStructure from './linear-structure';
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
 * @extends {ALinearStructure<T>}
 * @implements {IStack<T>}
 *
 * Represents a stack data structure.
 * Each operation (push, pop, peek) can be performed in O(1) time.
 *
 * @example
 * const stack = new Stack<number>();
 * stack.push(1);
 * stack.push(2);
 * console.log(stack.pop()); // Outputs: 2
 */
export default class Stack<T> extends ALinearStructure<T> implements IStack<T> {
  /**
   * Pushes a new element to the top of the stack.
   * @param {T} data - The data to be pushed onto the stack.
   *
   * @example
   * stack.push(3);
   * console.log(stack.peek()); // Outputs: 3
   */
  push(data: T): void {
    const newHead = new SingleNode(data);
    if (null === this._head) {
      this._head = newHead;
      return;
    }
    newHead.next = this._head;
    this._head = newHead;
  }

  /**
   * Removes the top element from the stack and returns its data.
   * @throws {StackUnderflowError} If the stack is empty.
   * @returns {T} The data of the top element of the stack.
   *
   * @example
   * console.log(stack.pop()); // Outputs: 3
   */
  pop(): T {
    if (null === this._head) {
      throw new StackUnderflowError("Can't pop from an empty stack.");
    }
    const data = this._head.data;
    this._head = this._head.next;
    return data;
  }

  /**
   * Returns the data of the top element of the stack without removing it.
   * @throws {StackUnderflowError} If the stack is empty.
   * @returns {T} The data of the top element of the stack.
   *
   * @example
   * console.log(stack.peek()); // Outputs: 1
   */
  peek(): T {
    if (null === this._head) {
      throw new StackUnderflowError("Can't peek at an empty stack.");
    }
    return this._head.data;
  }
}
