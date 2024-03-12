// c8 ignore file
import ILinearStructure from './linear-structure';

/**
 * @template T
 * The IStack interface extends the ILinearStructure interface and provides a contract for a Stack data structure.
 */
export interface IStack<T> extends ILinearStructure {
  /**
   * Removes the top element from the stack and returns it.
   * @returns {T | null} The removed top element from the stack, or null if the stack is empty.
   */
  pop(): T | null;

  /**
   * Adds an element to the top of the stack.
   * @param {T} data - The element to be added to the stack.
   */
  push(data: T): void;

  /**
   * Returns the top element of the stack without removing it.
   * @returns {T | null} The top element of the stack, or null if the stack is empty.
   */
  peek(): T | null;
}
