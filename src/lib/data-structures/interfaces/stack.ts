// c8 ignore file
import ILinearStructure from './linear-structure';

/**
 * @template T
 * The IStack interface extends the ILinearStructure interface and provides a contract for a Stack data structure.
 * Defines the operations for a LIFO (Last In, First Out) data structure.
 */
export interface IStack<T> extends ILinearStructure {
  /**
   * Removes the top element from the stack and returns it.
   * @throws {Error} If the stack is empty
   * @returns {T} The removed top element from the stack
   */
  pop(): T;

  /**
   * Adds an element to the top of the stack.
   * @param {T} data - The element to be added to the stack
   */
  push(data: T): void;

  /**
   * Returns the top element of the stack without removing it.
   * @throws {Error} If the stack is empty
   * @returns {T} The top element of the stack
   */
  peek(): T;

  /**
   * Alias for peek() method. Returns the top element without removing it.
   * @throws {Error} If the stack is empty
   * @returns {T} The top element of the stack
   */
  top(): T;

  /**
   * Checks if the stack contains a specific element.
   * @param {T} data - The element to search for
   * @returns {boolean} True if the element is found, false otherwise
   */
  contains(data: T): boolean;

  /**
   * Removes all elements from the stack.
   */
  clear(): void;

  /**
   * Converts the stack to an array with elements from top to bottom.
   * @returns {T[]} An array containing all stack elements
   */
  toArray(): T[];

  /**
   * Returns a string representation of the stack.
   * @returns {string} String representation of the stack
   */
  toString(): string;

  /**
   * Returns a JSON representation of the stack.
   * @returns {object} JSON object containing stack metadata and elements
   */
  toJSON(): object;
}
