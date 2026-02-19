# all-in-one

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A comprehensive TypeScript utility library providing a collection of data structures, string manipulation, object utilities, and more—all built from scratch using only Node.js built-in features, with zero external dependencies.

## 🎯 Philosophy

Similar to lodash, but with a twist: **all-in-one** is built entirely without external libraries, relying solely on Node.js features. This ensures:
- Zero dependencies
- Full control over implementation
- Educational value for understanding data structures and algorithms
- Lightweight and efficient

## 📦 Installation

```bash
npm install all-in-one
```

## 🚀 Features

### Data Structures

Robust, type-safe implementations of fundamental computer science data structures:

- **Node Structures** - SingleNode and DoubleNode for building linked structures
- **Stack** - LIFO (Last In, First Out) data structure
- **Queue** - FIFO (First In, First Out) data structure
- **List** - Singly linked list with find and remove operations
- **Tree** - Generic tree structure with multiple children
- **Binary Search Tree** - Binary tree with ordered insertion and traversal methods
- **Graph** - Adjacency-list graph with directed/undirected edges and BFS/DFS
- **Hash Table** - Key/value storage with separate chaining collision handling

### String Utilities *(Coming Soon)*

Powerful string manipulation functions for common operations.

### Object Utilities *(Coming Soon)*

Deep cloning, merging, and transformation utilities for JavaScript objects.

### JSON Utilities *(Coming Soon)*

Safe parsing, stringification, and validation helpers.

## 📖 Usage

### Stack

```typescript
import { Stack } from 'all-in-one';

const stack = new Stack<number>();
stack.push(1);
stack.push(2);
stack.push(3);

console.log(stack.pop()); // 3
console.log(stack.peek()); // 2
console.log(stack.isEmpty()); // false
```

### Queue

```typescript
import { Queue } from 'all-in-one';

const queue = new Queue<string>();
queue.push('first');
queue.push('second');
queue.push('third');

console.log(queue.pop()); // 'first'
console.log(queue.isEmpty()); // false
```

### Binary Search Tree

```typescript
import { BinarySearchTree } from 'all-in-one';

const tree = new BinarySearchTree<number>(10);
tree.insert(5);
tree.insert(15);
tree.insert(3);
tree.insert(7);

console.log(tree.inOrder()); // [3, 5, 7, 10, 15]
console.log(tree.preOrder()); // [10, 5, 3, 7, 15]
console.log(tree.levelOrder()); // [10, 5, 15, 3, 7]
```

### Graph

```typescript
import { Graph } from 'all-in-one';

const graph = new Graph<number>();
graph.addEdge(1, 2);
graph.addEdge(1, 3);
graph.addEdge(2, 4);

console.log(graph.breadthFirstSearch(1)); // [1, 2, 3, 4]
console.log(graph.depthFirstSearch(1)); // [1, 2, 4, 3]
```

### Hash Table

```typescript
import { HashTable } from 'all-in-one';

const table = new HashTable<number>();
table.set('apples', 3);
table.set('oranges', 5);

console.log(table.get('apples')); // 3
console.log(table.has('oranges')); // true
table.remove('apples');
console.log(table.size); // 1
```

### List

```typescript
import { List } from 'all-in-one';

const list = new List<number>();
list.push(10);
list.push(20);
list.push(30);

console.log(list.find(1)); // 20
list.remove(1);
console.log(list.size); // 2
```

## 🧪 Testing

The library includes comprehensive test coverage using a custom test runner:

```bash
npm test
```

## 📊 Coverage

Code coverage reports are generated using c8:

```bash
npm run coverage
```

Coverage reports are available in the `coverage/` directory.

## 🛠️ Development

Built with TypeScript for type safety and modern JavaScript features:

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build
npm run build
```

## 📋 API Documentation

### Data Structures

#### Stack\<T>
- `push(data: T): void` - Add element to the top
- `pop(): T` - Remove and return the top element
- `peek(): T` - View the top element without removing it
- `isEmpty(): boolean` - Check if stack is empty
- `size: number` - Get the number of elements

#### Queue\<T>
- `push(data: T): void` - Add element to the end
- `pop(): T` - Remove and return the first element
- `isEmpty(): boolean` - Check if queue is empty
- `size: number` - Get the number of elements

#### List\<T>
- `push(data: T): void` - Add element to the end
- `find(index: number): T` - Get element at index
- `remove(index: number): void` - Remove element at index
- `isEmpty(): boolean` - Check if list is empty
- `size: number` - Get the number of elements

#### BinarySearchTree\<T>
- `insert(data: T): void` - Insert a new node
- `inOrder(): T[]` - In-order traversal
- `preOrder(): T[]` - Pre-order traversal
- `postOrder(): T[]` - Post-order traversal
- `levelOrder(): T[]` - Level-order traversal

#### Tree\<T>
- `insert(parent: T, data: T): void` - Insert a child into the first matching parent
- `preOrder(): T[]` - Pre-order traversal
- `inOrder(): T[]` - In-order traversal (n-ary variant)
- `postOrder(): T[]` - Post-order traversal
- `levelOrder(): T[]` - Level-order traversal

#### Graph\<T>
- `addVertex(vertex: T): void` - Add a vertex
- `removeVertex(vertex: T): void` - Remove a vertex and connected edges
- `addEdge(source: T, destination: T): void` - Add an edge
- `removeEdge(source: T, destination: T): void` - Remove an edge
- `hasVertex(vertex: T): boolean` - Check whether a vertex exists
- `hasEdge(source: T, destination: T): boolean` - Check whether an edge exists
- `getNeighbors(vertex: T): T[]` - Get vertex neighbors
- `breadthFirstSearch(start: T): T[]` - Breadth-first traversal
- `depthFirstSearch(start: T): T[]` - Depth-first traversal

#### HashTable\<T>
- `set(key: string, value: T): void` - Insert or update a value
- `get(key: string): T | undefined` - Get a value by key
- `has(key: string): boolean` - Check whether a key exists
- `remove(key: string): boolean` - Remove a key/value pair
- `clear(): void` - Remove all entries
- `keys(): string[]` - Get all keys
- `values(): T[]` - Get all values
- `entries(): [string, T][]` - Get all entries
- `size: number` - Get current entry count

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

Copyright (c) 2024 Joao Ley

## 🗺️ Roadmap

- [x] Core data structures (Stack, Queue, List, Tree, Binary Search Tree, Graph, Hash Table)
- [ ] String manipulation utilities
- [ ] Object transformation utilities
- [ ] JSON helpers
- [ ] Array utilities
- [ ] Number utilities
- [ ] Date/Time helpers
- [ ] Validation utilities
- [ ] Currency helpers

## 💡 Why all-in-one?

This library was created to provide a comprehensive utility toolkit while maintaining the educational value of understanding how these structures and algorithms work under the hood. By avoiding external dependencies, it offers:

- **Transparency** - See exactly how everything works
- **Reliability** - No dependency security concerns
- **Performance** - Optimized implementations without bloat
- **Learning** - Great resource for understanding data structures

---

Built with ❤️ using TypeScript and Node.js
