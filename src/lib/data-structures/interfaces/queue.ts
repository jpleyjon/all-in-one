// c8 ignore file
import ILinearStructure from './linear-structure';

/**
 * Interface for a queue data structure.
 * @extends {ILinearStructure}
 * @template T The type of elements in the queue.
 */
export interface IQueue<T> extends ILinearStructure {
  /**
   * Removes an element from the queue and returns it.
   * @returns The removed element, or null if the queue is empty.
   */
  pop(): T;

  /**
   * Adds an element to the queue.
   * @param data - The element to add to the queue.
   */
  push(data: T): void;
}
