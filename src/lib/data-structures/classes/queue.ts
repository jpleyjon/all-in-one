import { IQueue } from '../interfaces/queue';
import ALinearStructure from './linear-structure';

/**
 * @class
 * @extends {Error}
 *
 * Represents an error that occurs when an operation is attempted on an empty queue.
 */
export class QueueUnderflowError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'QueueUnderflowError';
  }
}

/**
 * @class
 * @extends {ALinearStructure<T>}
 * @implements {IQueue<T>}
 *
 * Represents a queue data structure.
 */
export default class Queue<T> extends ALinearStructure<T> implements IQueue<T> {
  /**
   * Removes the first element from the queue and returns its data.
   * @throws {QueueUnderflowError} If the queue is empty.
   * @returns {T} The data of the first element of the queue.
   */
  pop(): T {
    if (!this._head) {
      throw new QueueUnderflowError("Can't dequeue from an empty queue.");
    }
    const data = this._head.data;
    this._head = this._head.next;
    return data;
  }
}
