import IComparable from '../interfaces/comparable';
import ITree from '../interfaces/tree';
import { TComparable } from '../types';

/**
 * Binary Search Tree implementation for primitive and comparable object values.
 *
 * Primitive values (`number`, `string`) are compared with native operators.
 * Object values are compared with `IComparable#isLesserThan`.
 *
 * @template T Node value type.
 */
export default class BinarySearchTree<T extends TComparable>
  implements ITree<T>
{
  private _data: T;

  private _left: BinarySearchTree<T> | null = null;

  private _right: BinarySearchTree<T> | null = null;

  /**
   * Creates a binary search tree node.
   *
   * @param data Value stored by the node.
   */
  constructor(data: T) {
    this._data = data;
  }

  /**
   * Returns the node value.
   *
   * @returns Node data.
   */
  get data(): T {
    return this._data;
  }

  /**
   * Checks whether a value is a primitive comparable.
   *
   * @param value Value to test.
   * @returns `true` when value is `number` or `string`.
   */
  private _isPrimitive(value: TComparable): value is number | string {
    return typeof value === 'number' || typeof value === 'string';
  }

  /**
   * Determines whether `left` should be placed before `right` in the BST.
   *
   * @param left Left operand.
   * @param right Right operand.
   * @returns `true` when `left` is lesser than `right`.
   * @throws {TypeError} If values are mixed primitive/object comparable.
   */
  private _isLesserThan(left: T, right: T): boolean {
    if (this._isPrimitive(left) && this._isPrimitive(right)) {
      return left < right;
    }

    if (!this._isPrimitive(left) && !this._isPrimitive(right)) {
      return (left as IComparable).isLesserThan(right as IComparable);
    }

    throw new TypeError('Cannot compare primitive and object comparable values.');
  }

  /**
   * Inserts a value into the binary search tree.
   *
   * Values lesser than the current node are inserted to the left subtree.
   * Greater or equal values are inserted to the right subtree.
   *
   * @param data Value to insert.
   */
  insert(data: T): void {
    if (this._isLesserThan(data, this.data)) {
      if (!this._left) {
        this._left = new BinarySearchTree(data);
        return;
      }
      this._left.insert(data);
      return;
    }

    if (!this._right) {
      this._right = new BinarySearchTree(data);
      return;
    }
    this._right.insert(data);
  }

  /**
   * Performs a pre-order traversal.
   *
   * Visit order: current node, left subtree, right subtree.
   *
   * @returns Values in pre-order sequence.
   */
  preOrder(): T[] {
    const result: T[] = [];
    result.push(this.data);
    if (this._left) {
      result.push(...this._left.preOrder());
    }
    if (this._right) {
      result.push(...this._right.preOrder());
    }
    return result;
  }

  /**
   * Performs an in-order traversal.
   *
   * Visit order: left subtree, current node, right subtree.
   *
   * @returns Values in in-order sequence.
   */
  inOrder(): T[] {
    const result: T[] = [];
    if (this._left) {
      result.push(...this._left.inOrder());
    }
    result.push(this.data);
    if (this._right) {
      result.push(...this._right.inOrder());
    }
    return result;
  }

  /**
   * Performs a post-order traversal.
   *
   * Visit order: left subtree, right subtree, current node.
   *
   * @returns Values in post-order sequence.
   */
  postOrder(): T[] {
    const result: T[] = [];
    if (this._left) {
      result.push(...this._left.postOrder());
    }
    if (this._right) {
      result.push(...this._right.postOrder());
    }
    result.push(this.data);
    return result;
  }

  /**
   * Performs a level-order (breadth-first) traversal.
   *
   * @returns Values grouped by tree depth from root to leaves.
   */
  levelOrder(): T[] {
    const result: T[] = [];
    const queue: BinarySearchTree<T>[] = [this];
    let index = 0;

    while (index < queue.length) {
      const node = queue[index];
      index += 1;

      result.push(node.data);

      if (node._left) {
        queue.push(node._left);
      }

      if (node._right) {
        queue.push(node._right);
      }
    }

    return result;
  }
}
