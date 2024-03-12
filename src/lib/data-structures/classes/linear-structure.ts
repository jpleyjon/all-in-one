import ILinearStructure from '../interfaces/linear-structure';
import SingleNode from './single-node';

/**
 * @class
 * @implements {ILinearStructure}
 *
 * Represents a linear data structure.
 */
export default abstract class ALinearStructure<T> implements ILinearStructure {
  protected _head: SingleNode<T> | null;

  /**
   * Gets the head node of the linear structure.
   * @returns {SingleNode<T> | null} The head node of the linear structure, or null if the structure is empty.
   */
  get head(): SingleNode<T> | null {
    return this._head;
  }

  /**
   * Creates a new instance of the ALinearStructure class.
   * @param {T} data - Optional initial data for the structure.
   */
  constructor(data?: T) {
    if (data) {
      this._head = new SingleNode<T>(data);
      return;
    }
    this._head = null;
  }

  /**
   * Returns the size of the structure.
   * @returns {number} The size of the structure.
   */
  get size(): number {
    let size = 0;
    let header = this._head;
    while (null !== header) {
      header = header.next;
      size++;
    }
    return size;
  }

  /**
   * Checks if the structure is empty.
   * @returns {boolean} `true` if the structure is empty, `false` otherwise.
   */
  isEmpty(): boolean {
    return null === this._head;
  }

  /**
   * Adds a new element to the end of the structure.
   * @param {T} data - The data to be added to the structure.
   */
  push(data: T): void {
    const newElement = new SingleNode(data);
    if (null === this._head) {
      this._head = newElement;
      return;
    }
    let header = this._head;
    while (header.next) {
      header = header.next;
    }
    header.next = newElement;
  }
}
