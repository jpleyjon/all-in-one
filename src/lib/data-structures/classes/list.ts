import ALinearStructure from './linear-structure';
import SingleNode from './single-node';

/**
 * Represents a singly linked list data structure.
 * Provides efficient operations for managing a sequence of elements.
 * 
 * @template T The type of data stored in the list.
 * 
 * @example
 * ```typescript
 * const list = new List<number>();
 * list.push(1);
 * list.push(2);
 * list.insert(1, 1.5); // [1, 1.5, 2]
 * 
 * for (const item of list) {
 *   console.log(item); // 1, 1.5, 2
 * }
 * ```
 */
export default class List<T> extends ALinearStructure<T> implements Iterable<T> {
  private _size: number = 0;
  private _tail: SingleNode<T> | null = null;

  /**
   * Creates a new List instance.
   * 
   * @param {T} [data] Optional initial data for the list.
   * 
   * @example
   * ```typescript
   * const emptyList = new List<string>();
   * const listWithData = new List<string>("first");
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
   * Gets the size of the list in O(1) time.
   * 
   * @returns {number} The number of elements in the list.
   * 
   * @example
   * ```typescript
   * const list = new List<number>();
   * console.log(list.size); // 0
   * list.push(1);
   * console.log(list.size); // 1
   * ```
   */
  get size(): number {
    return this._size;
  }

  /**
   * Gets the tail node of the list.
   * 
   * @returns {SingleNode<T> | null} The tail node or null if empty.
   */
  get tail(): SingleNode<T> | null {
    return this._tail;
  }

  /**
   * Adds an element to the end of the list in O(1) time.
   * 
   * @param {T} data The data to add to the list.
   * 
   * @example
   * ```typescript
   * const list = new List<string>();
   * list.push("first");
   * list.push("second");
   * console.log(list.toArray()); // ["first", "second"]
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
   * Adds an element to the beginning of the list in O(1) time.
   * 
   * @param {T} data The data to add to the beginning of the list.
   * 
   * @example
   * ```typescript
   * const list = new List<string>();
   * list.push("second");
   * list.prepend("first");
   * console.log(list.toArray()); // ["first", "second"]
   * ```
   */
  prepend(data: T): void {
    const newNode = new SingleNode(data);

    if (this._head === null) {
      this._head = newNode;
      this._tail = newNode;
    } else {
      newNode.next = this._head;
      this._head = newNode;
    }

    this._size++;
  }

  /**
   * Inserts an element at the specified index.
   * 
   * @param {number} index The index at which to insert the element.
   * @param {T} data The data to insert.
   * @throws {Error} If the index is out of bounds.
   * 
   * @example
   * ```typescript
   * const list = new List<number>();
   * list.push(1);
   * list.push(3);
   * list.insert(1, 2); // [1, 2, 3]
   * ```
   */
  insert(index: number, data: T): void {
    if (index < 0 || index > this._size) {
      throw new Error('Index out of bounds.');
    }

    if (index === 0) {
      this.prepend(data);
      return;
    }

    if (index === this._size) {
      this.push(data);
      return;
    }

    const newNode = new SingleNode(data);
    let current = this._head!;

    // Navigate to the node before the insertion point
    for (let i = 0; i < index - 1; i++) {
      current = current.next!;
    }

    newNode.next = current.next;
    current.next = newNode;
    this._size++;
  }

  /**
   * Returns the data of the node at the specified index.
   * 
   * @param {number} index The index of the element to retrieve.
   * @returns {T} The data at the specified index.
   * @throws {Error} If the index is out of bounds.
   * 
   * @example
   * ```typescript
   * const list = new List<string>();
   * list.push("first");
   * list.push("second");
   * console.log(list.find(1)); // "second"
   * ```
   */
  find(index: number): T {
    if (index < 0 || index >= this._size) {
      throw new Error('Index out of bounds.');
    }

    let current = this._head!;
    for (let i = 0; i < index; i++) {
      current = current.next!;
    }

    return current.data;
  }

  /**
   * Finds the index of the first occurrence of the specified data.
   * 
   * @param {T} data The data to search for.
   * @returns {number} The index of the data, or -1 if not found.
   * 
   * @example
   * ```typescript
   * const list = new List<string>();
   * list.push("first");
   * list.push("second");
   * console.log(list.indexOf("second")); // 1
   * console.log(list.indexOf("third")); // -1
   * ```
   */
  indexOf(data: T): number {
    let current = this._head;
    let index = 0;

    while (current !== null) {
      if (current.hasData(data)) {
        return index;
      }
      current = current.next;
      index++;
    }

    return -1;
  }

  /**
   * Checks if the list contains the specified data.
   * 
   * @param {T} data The data to search for.
   * @returns {boolean} True if the data is found, false otherwise.
   * 
   * @example
   * ```typescript
   * const list = new List<string>();
   * list.push("first");
   * console.log(list.contains("first")); // true
   * console.log(list.contains("second")); // false
   * ```
   */
  contains(data: T): boolean {
    return this.indexOf(data) !== -1;
  }

  /**
   * Removes the element at the specified index.
   * 
   * @param {number} index The index of the element to remove.
   * @throws {Error} If the index is out of bounds.
   * 
   * @example
   * ```typescript
   * const list = new List<number>();
   * list.push(1);
   * list.push(2);
   * list.push(3);
   * list.remove(1); // Removes 2, list is now [1, 3]
   * ```
   */
  remove(index: number): void {
    if (index < 0 || index >= this._size) {
      throw new Error('Index out of bounds.');
    }

    // Remove head
    if (index === 0) {
      this._head = this._head!.next;
      if (this._size === 1) {
        this._tail = null;
      }
      this._size--;
      return;
    }

    // Find the node before the one to remove
    let current = this._head!;
    for (let i = 0; i < index - 1; i++) {
      current = current.next!;
    }

    const nodeToRemove = current.next!;
    current.next = nodeToRemove.next;

    // Update tail if removing the last element
    if (index === this._size - 1) {
      this._tail = current;
    }

    this._size--;
  }

  /**
   * Removes the first occurrence of the specified data.
   * 
   * @param {T} data The data to remove.
   * @returns {boolean} True if the data was found and removed, false otherwise.
   * 
   * @example
   * ```typescript
   * const list = new List<string>();
   * list.push("first");
   * list.push("second");
   * console.log(list.removeData("first")); // true
   * console.log(list.removeData("third")); // false
   * ```
   */
  removeData(data: T): boolean {
    const index = this.indexOf(data);
    if (index === -1) {
      return false;
    }
    this.remove(index);
    return true;
  }

  /**
   * Removes all elements from the list.
   * 
   * @example
   * ```typescript
   * const list = new List<number>();
   * list.push(1);
   * list.push(2);
   * list.clear();
   * console.log(list.isEmpty()); // true
   * ```
   */
  clear(): void {
    this._head = null;
    this._tail = null;
    this._size = 0;
  }

  /**
   * Checks if the list is empty.
   * 
   * @returns {boolean} True if the list is empty, false otherwise.
   * 
   * @example
   * ```typescript
   * const list = new List<number>();
   * console.log(list.isEmpty()); // true
   * list.push(1);
   * console.log(list.isEmpty()); // false
   * ```
   */
  isEmpty(): boolean {
    return this._size === 0;
  }

  /**
   * Returns an array containing all elements in the list.
   * 
   * @returns {Array<T>} An array containing all elements in the list.
   * 
   * @example
   * ```typescript
   * const list = new List<number>();
   * list.push(1);
   * list.push(2);
   * list.push(3);
   * console.log(list.toArray()); // [1, 2, 3]
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
   * Returns a string representation of the list.
   * 
   * @returns {string} String representation of the list.
   * 
   * @example
   * ```typescript
   * const list = new List<number>();
   * list.push(1);
   * list.push(2);
   * console.log(list.toString()); // "List(2)[1, 2]"
   * ```
   */
  toString(): string {
    return `List(${this._size})[${this.toArray().join(', ')}]`;
  }

  /**
   * Returns a JSON representation of the list.
   * 
   * @returns {object} JSON object with size and data array.
   * 
   * @example
   * ```typescript
   * const list = new List<number>();
   * list.push(1);
   * list.push(2);
   * console.log(list.toJSON()); // { size: 2, data: [1, 2] }
   * ```
   */
  toJSON(): { size: number; data: T[]; } {
    return {
      size: this._size,
      data: this.toArray()
    };
  }

  /**
   * Makes the list iterable with for...of loops.
   * 
   * @returns {Iterator<T>} An iterator for the list elements.
   * 
   * @example
   * ```typescript
   * const list = new List<number>();
   * list.push(1);
   * list.push(2);
   * list.push(3);
   * 
   * for (const item of list) {
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
