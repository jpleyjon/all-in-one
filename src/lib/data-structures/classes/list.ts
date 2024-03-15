import ALinearStructure from './linear-structure';
import SingleNode from './single-node';

/**
 * @class
 * @extends {ALinearStructure<T>}
 *
 * Represents a singly linked list data structure.
 */
export default class List<T> extends ALinearStructure<T> {
  /**
   * Returns the data of the node at the specified index in the list.
   * @throws {Error} If the index is out of bounds.
   * @returns {T} The data of the node at the specified index.
   */
  find(index: number): T {
    let header = this._head;
    let counter = 0;
    while (header && counter !== index) {
      header = header.next;
      counter++;
    }
    if (!header) {
      throw new Error('Index out of bounds.');
    }

    return header.data;
  }

  /**
   * Removes the node at the specified index from the list.
   * @throws {Error} If the index is out of bounds.
   */
  remove(index: number): void {
    if (!this._head || this.size - 1 < index) {
      throw new Error('Index out of bounds.');
    }
    if (0 === index && this._head) {
      this._head = this._head.next;
      return;
    }
    let header: SingleNode<T> | null = this._head;
    let prev: SingleNode<T> | null = null;
    let counter = 0;
    while (header && counter !== index) {
      counter++;
      prev = header;
      header = header.next;
    }
    if (prev && header) {
      prev.next = header.next;
    }
  }

  /**
   * Returns an array that contains the data of all nodes in the list.
   * @returns {Array<T>} An array that contains the data of all nodes in the list.
   */
  toArray(): Array<T> {
    const _array: Array<T> = [];
    let header = this._head;
    while (header) {
      _array.push(header.data);
      header = header.next;
    }
    return _array;
  }
}
