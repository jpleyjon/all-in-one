import assert from 'node:assert';
import { describe, it } from 'node:test';

import MockClass from '../fixtures/mock-class';
import type { TComparable } from '../types';

import Graph from './graph';

function createUndirectedGraph(): Graph<number> {
  const graph = new Graph<number>();
  graph.addEdge(1, 2);
  graph.addEdge(1, 3);
  graph.addEdge(2, 4);
  graph.addEdge(3, 5);
  return graph;
}

describe('Graph', () => {
  it('should create an undirected graph by default', () => {
    const graph = new Graph<number>();

    assert.equal(graph.directed, false);
    assert.equal(graph.size, 0);
  });

  it('should create a directed graph', () => {
    const graph = new Graph<number>(true);

    assert.equal(graph.directed, true);
    assert.equal(graph.size, 0);
  });

  it('should add vertices without duplicates', () => {
    const graph = new Graph<number>();

    graph.addVertex(1);
    graph.addVertex(1);
    graph.addVertex(2);

    assert.equal(graph.size, 2);
    assert.deepStrictEqual(graph.getVertices(), [1, 2]);
  });

  it('should add undirected edges in both directions', () => {
    const graph = new Graph<number>();

    graph.addEdge(1, 2);

    assert.equal(graph.hasVertex(1), true);
    assert.equal(graph.hasVertex(2), true);
    assert.equal(graph.hasEdge(1, 2), true);
    assert.equal(graph.hasEdge(2, 1), true);
  });

  it('should add directed edges in one direction', () => {
    const graph = new Graph<number>(true);

    graph.addEdge(1, 2);

    assert.equal(graph.hasEdge(1, 2), true);
    assert.equal(graph.hasEdge(2, 1), false);
  });

  it('should not duplicate the same edge', () => {
    const graph = new Graph<number>();

    graph.addEdge(1, 2);
    graph.addEdge(1, 2);

    assert.deepStrictEqual(graph.getNeighbors(1), [2]);
    assert.deepStrictEqual(graph.getNeighbors(2), [1]);
  });

  it('should remove an edge from both sides in undirected graphs', () => {
    const graph = new Graph<number>();

    graph.addEdge(1, 2);
    graph.removeEdge(1, 2);

    assert.equal(graph.hasEdge(1, 2), false);
    assert.equal(graph.hasEdge(2, 1), false);
  });

  it('should remove an edge only from source in directed graphs', () => {
    const graph = new Graph<number>(true);

    graph.addEdge(1, 2);
    graph.addEdge(2, 1);
    graph.removeEdge(1, 2);

    assert.equal(graph.hasEdge(1, 2), false);
    assert.equal(graph.hasEdge(2, 1), true);
  });

  it('should ignore removeEdge when either vertex does not exist', () => {
    const graph = new Graph<number>();

    graph.addEdge(1, 2);
    graph.removeEdge(1, 999);

    assert.equal(graph.hasEdge(1, 2), true);
    assert.equal(graph.hasEdge(2, 1), true);
  });

  it('should remove a vertex and all connected edges', () => {
    const graph = createUndirectedGraph();

    graph.removeVertex(2);

    assert.equal(graph.hasVertex(2), false);
    assert.equal(graph.hasEdge(1, 2), false);
    assert.equal(graph.hasEdge(4, 2), false);
    assert.deepStrictEqual(graph.getVertices(), [1, 3, 4, 5]);
  });

  it('should ignore removeVertex when vertex does not exist', () => {
    const graph = createUndirectedGraph();

    graph.removeVertex(999);

    assert.equal(graph.size, 5);
    assert.equal(graph.hasEdge(1, 2), true);
  });

  it('should return false for hasEdge when source vertex does not exist', () => {
    const graph = createUndirectedGraph();

    assert.equal(graph.hasEdge(999, 1), false);
  });

  it('should return a copy of neighbors', () => {
    const graph = new Graph<number>();

    graph.addEdge(1, 2);
    const neighbors = graph.getNeighbors(1);
    neighbors.push(3);

    assert.deepStrictEqual(graph.getNeighbors(1), [2]);
  });

  it('should throw when requesting neighbors from unknown vertex', () => {
    const graph = new Graph<number>();

    assert.throws(() => graph.getNeighbors(1), Error, 'Vertex does not exist.');
  });

  it('should traverse the graph with breadth-first search', () => {
    const graph = createUndirectedGraph();

    assert.deepStrictEqual(graph.breadthFirstSearch(1), [1, 2, 3, 4, 5]);
  });

  it('should return an empty array for breadth-first search on missing start', () => {
    const graph = createUndirectedGraph();

    assert.deepStrictEqual(graph.breadthFirstSearch(999), []);
  });

  it('should traverse the graph with depth-first search', () => {
    const graph = createUndirectedGraph();

    assert.deepStrictEqual(graph.depthFirstSearch(1), [1, 2, 4, 3, 5]);
  });

  it('should return an empty array for depth-first search on missing start', () => {
    const graph = createUndirectedGraph();

    assert.deepStrictEqual(graph.depthFirstSearch(999), []);
  });

  it('should support comparable object vertices', () => {
    const graph = new Graph<MockClass>();

    graph.addEdge(new MockClass(1), new MockClass(2));
    graph.addEdge(new MockClass(2), new MockClass(3));

    const vertices = graph.getVertices().map((item) => item.mockProperty);
    const bfs = graph.breadthFirstSearch(new MockClass(1)).map((item) => item.mockProperty);

    assert.deepStrictEqual(vertices, [1, 2, 3]);
    assert.deepStrictEqual(bfs, [1, 2, 3]);
  });

  it('should throw for mixed primitive and object comparable values', () => {
    const graph = new Graph<TComparable>();
    graph.addVertex(1);

    assert.throws(
      () => graph.addVertex(new MockClass(1)),
      (error: unknown) => {
        assert.ok(error instanceof TypeError);
        assert.equal(error.message, 'Cannot compare primitive and object comparable values.');
        return true;
      },
    );
  });
});
