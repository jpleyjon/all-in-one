import type IComparable from '../interfaces/comparable';
import type ITree from '../interfaces/tree';
import type { TComparable } from '../types';

/**
 * A generic n-ary tree implementation.
 *
 * The tree accepts primitive values (`string` and `number`) and custom
 * comparable objects that implement `IComparable`.
 *
 * @template T Node value type.
 */
export default class Tree<T extends TComparable> implements ITree<T> {
  protected _data: T;

  protected _children: Tree<T>[];

  /**
   * Returns the current node value.
   *
   * @returns The node data.
   */
  get data(): T {
    return this._data;
  }

  /**
   * Returns the child nodes of the current node.
   *
   * @returns The current node children.
   */
  get children(): Tree<T>[] {
    return this._children;
  }

  /**
   * Creates a tree node with no children.
   *
   * @param data Value stored by the node.
   */
  constructor(data: T) {
    this._data = data;
    this._children = [];
  }

  /**
   * Checks if a value is a primitive comparable.
   *
   * @param value Value to test.
   * @returns `true` when the value is a number or string.
   */
  private _isPrimitive(value: TComparable): value is number | string {
    return typeof value === 'number' || typeof value === 'string';
  }

  /**
   * Compares two node values using either strict equality (primitive values)
   * or `IComparable#isEqual` (objects).
   *
   * @param left Left operand.
   * @param right Right operand.
   * @returns `true` if the values are equal.
   */
  private _isEqual(left: T, right: T): boolean {
    if (this._isPrimitive(left)) {
      return left === right;
    }
    return (left as IComparable).isEqual(right as IComparable);
  }

  /**
   * Inserts a child under the first node that matches `parent`.
   *
   * @param parent Parent value used as insertion target.
   * @param data Value for the new child node.
   * @returns `true` when insertion happened.
   */
  private _insert(parent: T, data: T): boolean {
    if (this._isEqual(this._data, parent)) {
      this._children.push(new Tree(data));
      return true;
    }

    for (const child of this._children) {
      if (child._insert(parent, data)) {
        return true;
      }
    }

    return false;
  }

  /**
   * Inserts `data` as a child node of the first node that matches `parent`.
   *
   * @param parent Parent value used as insertion target.
   * @param data Value for the new child node.
   */
  insert(parent: T, data: T): void {
    this._insert(parent, data);
  }

  /**
   * Performs a pre-order traversal.
   *
   * Visit order: current node, then each child subtree from left to right.
   *
   * @returns Values in pre-order sequence.
   */
  preOrder(): T[] {
    const result: T[] = [this._data];
    this._children.forEach((child) => {
      result.push(...child.preOrder());
    });
    return result;
  }

  /**
   * Performs an in-order traversal for an n-ary tree.
   *
   * Visit order: first child subtree, current node, then remaining child
   * subtrees from left to right. For leaf nodes, this returns only the node.
   *
   * @returns Values in in-order sequence.
   */
  inOrder(): T[] {
    if (this._children.length === 0) {
      return [this._data];
    }

    const result: T[] = [];
    result.push(...this._children[0].inOrder());
    result.push(this._data);

    for (let index = 1; index < this._children.length; index += 1) {
      result.push(...this._children[index].inOrder());
    }

    return result;
  }

  /**
   * Performs a post-order traversal.
   *
   * Visit order: each child subtree from left to right, then current node.
   *
   * @returns Values in post-order sequence.
   */
  postOrder(): T[] {
    const result: T[] = [];

    this._children.forEach((child) => {
      result.push(...child.postOrder());
    });

    result.push(this._data);
    return result;
  }

  /**
   * Performs a level-order (breadth-first) traversal.
   *
   * @returns Values grouped by tree depth, from root to leaves.
   */
  levelOrder(): T[] {
    const result: T[] = [];
    const queue: Tree<T>[] = [this];
    let index = 0;

    while (index < queue.length) {
      const node = queue[index];
      index += 1;

      result.push(node.data);
      queue.push(...node.children);
    }

    return result;
  }
}
