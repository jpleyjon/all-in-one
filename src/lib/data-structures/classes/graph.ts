import IComparable from '../interfaces/comparable';
import { TComparable } from '../types';

type TAdjacencyNode<T> = {
  vertex: T;
  neighbors: T[];
};

/**
 * Graph implementation based on an adjacency list.
 *
 * Supports primitive vertices (`number`, `string`) and comparable object
 * vertices that implement `IComparable`.
 *
 * @template T Vertex value type.
 */
export default class Graph<T extends TComparable> {
  private _adjacencyList: TAdjacencyNode<T>[];

  private _directed: boolean;

  /**
   * Creates a new graph.
   *
   * @param directed When `true`, edges are one-way. Defaults to `false`.
   */
  constructor(directed = false) {
    this._adjacencyList = [];
    this._directed = directed;
  }

  /**
   * Returns whether this graph is directed.
   *
   * @returns `true` when the graph is directed.
   */
  get directed(): boolean {
    return this._directed;
  }

  /**
   * Returns the number of vertices in the graph.
   *
   * @returns Vertex count.
   */
  get size(): number {
    return this._adjacencyList.length;
  }

  /**
   * Returns all vertices in insertion order.
   *
   * @returns A shallow copy of graph vertices.
   */
  getVertices(): T[] {
    return this._adjacencyList.map((node) => node.vertex);
  }

  /**
   * Adds a vertex if it does not exist yet.
   *
   * @param vertex Vertex to add.
   */
  addVertex(vertex: T): void {
    if (this.hasVertex(vertex)) {
      return;
    }

    this._adjacencyList.push({
      vertex,
      neighbors: [],
    });
  }

  /**
   * Removes a vertex and all incident edges.
   *
   * @param vertex Vertex to remove.
   */
  removeVertex(vertex: T): void {
    if (!this.hasVertex(vertex)) {
      return;
    }

    this._adjacencyList = this._adjacencyList.filter((node) => !this._isEqual(node.vertex, vertex));

    this._adjacencyList.forEach((node) => {
      node.neighbors = node.neighbors.filter((neighbor) => !this._isEqual(neighbor, vertex));
    });
  }

  /**
   * Checks if a vertex exists in the graph.
   *
   * @param vertex Vertex to look for.
   * @returns `true` when the vertex exists.
   */
  hasVertex(vertex: T): boolean {
    return this._findNode(vertex) !== undefined;
  }

  /**
   * Adds an edge between two vertices.
   *
   * Missing vertices are created automatically.
   *
   * @param source Source vertex.
   * @param destination Destination vertex.
   */
  addEdge(source: T, destination: T): void {
    this.addVertex(source);
    this.addVertex(destination);

    const sourceNode = this._findNode(source) as TAdjacencyNode<T>;
    const destinationNode = this._findNode(destination) as TAdjacencyNode<T>;

    if (!this._contains(sourceNode.neighbors, destinationNode.vertex)) {
      sourceNode.neighbors.push(destinationNode.vertex);
    }

    if (!this._directed && !this._contains(destinationNode.neighbors, sourceNode.vertex)) {
      destinationNode.neighbors.push(sourceNode.vertex);
    }
  }

  /**
   * Removes an edge from source to destination.
   *
   * For undirected graphs, the reverse edge is also removed.
   *
   * @param source Source vertex.
   * @param destination Destination vertex.
   */
  removeEdge(source: T, destination: T): void {
    const sourceNode = this._findNode(source);
    const destinationNode = this._findNode(destination);

    if (!sourceNode || !destinationNode) {
      return;
    }

    sourceNode.neighbors = sourceNode.neighbors.filter(
      (neighbor) => !this._isEqual(neighbor, destinationNode.vertex),
    );

    if (!this._directed) {
      destinationNode.neighbors = destinationNode.neighbors.filter(
        (neighbor) => !this._isEqual(neighbor, sourceNode.vertex),
      );
    }
  }

  /**
   * Checks if an edge exists from source to destination.
   *
   * @param source Source vertex.
   * @param destination Destination vertex.
   * @returns `true` when the edge exists.
   */
  hasEdge(source: T, destination: T): boolean {
    const sourceNode = this._findNode(source);

    if (!sourceNode) {
      return false;
    }

    return this._contains(sourceNode.neighbors, destination);
  }

  /**
   * Returns neighbors for a given vertex.
   *
   * @param vertex Vertex to query.
   * @returns A shallow copy of neighbors.
   * @throws {Error} If vertex does not exist.
   */
  getNeighbors(vertex: T): T[] {
    const node = this._findNode(vertex);

    if (!node) {
      throw new Error('Vertex does not exist.');
    }

    return [...node.neighbors];
  }

  /**
   * Performs breadth-first traversal starting at `start`.
   *
   * @param start Starting vertex.
   * @returns Visited vertices in BFS order. Empty when start does not exist.
   */
  breadthFirstSearch(start: T): T[] {
    const startNode = this._findNode(start);

    if (!startNode) {
      return [];
    }

    const visited: T[] = [];
    const queue: T[] = [startNode.vertex];

    while (queue.length > 0) {
      const vertex = queue.shift() as T;
      visited.push(vertex);

      const currentNode = this._findNode(vertex) as TAdjacencyNode<T>;

      currentNode.neighbors.forEach((neighbor) => {
        if (!this._contains(visited, neighbor) && !this._contains(queue, neighbor)) {
          queue.push(neighbor);
        }
      });
    }

    return visited;
  }

  /**
   * Performs depth-first traversal starting at `start`.
   *
   * @param start Starting vertex.
   * @returns Visited vertices in DFS order. Empty when start does not exist.
   */
  depthFirstSearch(start: T): T[] {
    const startNode = this._findNode(start);

    if (!startNode) {
      return [];
    }

    const visited: T[] = [];
    const stack: T[] = [startNode.vertex];

    while (stack.length > 0) {
      const vertex = stack.pop() as T;
      visited.push(vertex);

      const currentNode = this._findNode(vertex) as TAdjacencyNode<T>;

      for (let index = currentNode.neighbors.length - 1; index >= 0; index -= 1) {
        const neighbor = currentNode.neighbors[index];
        if (!this._contains(visited, neighbor) && !this._contains(stack, neighbor)) {
          stack.push(neighbor);
        }
      }
    }

    return visited;
  }

  /**
   * Checks whether a value is a primitive comparable.
   *
   * @param value Value to evaluate.
   * @returns `true` when `value` is `number` or `string`.
   */
  private _isPrimitive(value: TComparable): value is number | string {
    return typeof value === 'number' || typeof value === 'string';
  }

  /**
   * Compares two values for equality.
   *
   * Primitive values are compared with strict equality and object values are
   * compared with `IComparable#isEqual`.
   *
   * @param left Left operand.
   * @param right Right operand.
   * @returns `true` when both values are equal.
   * @throws {TypeError} If values are mixed primitive/object comparables.
   */
  private _isEqual(left: T, right: T): boolean {
    if (this._isPrimitive(left) && this._isPrimitive(right)) {
      return left === right;
    }

    if (!this._isPrimitive(left) && !this._isPrimitive(right)) {
      return (left as IComparable).isEqual(right as IComparable);
    }

    throw new TypeError('Cannot compare primitive and object comparable values.');
  }

  /**
   * Finds a node by vertex.
   *
   * @param vertex Vertex to search for.
   * @returns The adjacency-list node or `undefined`.
   */
  private _findNode(vertex: T): TAdjacencyNode<T> | undefined {
    return this._adjacencyList.find((node) => this._isEqual(node.vertex, vertex));
  }

  /**
   * Checks whether an array contains the given value.
   *
   * @param array Values to search.
   * @param value Value to find.
   * @returns `true` if `value` exists in `array`.
   */
  private _contains(array: T[], value: T): boolean {
    return array.some((item) => this._isEqual(item, value));
  }
}
