# all-in-one

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A comprehensive TypeScript utility library providing data structures, string helpers, and array utilities built from scratch with zero runtime dependencies.

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

### String Utilities

Production-ready functional string helpers:

- **Case conversion** - `toCamelCase`, `toPascalCase`, `toSnakeCase`, `toKebabCase`, `toTitleCase`
- **Formatting** - `capitalize`, `capitalizeWords`, `normalizeWhitespace`
- **Matching** - `equalsIgnoreCase`, `includesIgnoreCase`
- **Transformations** - `slugify`, `stripAccents`
- **Text shaping** - `truncate`, `truncateWords`, `initials`, `mask`

### Array Utilities

Functional, immutable array helpers:

- **Selection** - `isEmpty`, `first`, `last`, `sample`
- **Structure** - `chunk`, `flatten`, `flattenDepth`, `insertAt`, `removeAt`, `move`, `swap`
- **Set-like operations** - `unique`, `uniqueBy`, `difference`, `intersection`, `union`
- **Collection shaping** - `groupBy`, `keyBy`, `partition`, `compact`
- **Sorting and analytics** - `sortBy`, `sum`, `average`, `minBy`, `maxBy`
- **Randomization** - `shuffle`

### CI Pipeline

GitHub Actions runs unit tests on every `push`, `pull_request`, and manual dispatch via `.github/workflows/unit-tests.yml`.

### Object Utilities _(Coming Soon)_

Deep cloning, merging, and transformation utilities for JavaScript objects.

### JSON Utilities _(Coming Soon)_

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

### String Helpers

```typescript
import { toCamelCase, slugify, normalizeWhitespace, truncateWords, mask } from 'all-in-one';

console.log(toCamelCase('hello-world test')); // helloWorldTest
console.log(slugify('Crème Brûlée Recipe')); // creme-brulee-recipe
console.log(normalizeWhitespace('  too   many\nspaces\t')); // too many spaces
console.log(truncateWords('one two three four', 2)); // one two...
console.log(mask('4111111111111111', 4, 4)); // 4111********1111
```

### Array Helpers

```typescript
import { chunk, unique, sortBy, groupBy, move } from 'all-in-one';

console.log(chunk([1, 2, 3, 4, 5], 2)); // [[1, 2], [3, 4], [5]]
console.log(unique([1, 2, 1, 3])); // [1, 2, 3]
console.log(sortBy([{ n: 2 }, { n: 1 }], (item) => item.n)); // [{ n: 1 }, { n: 2 }]
console.log(groupBy(['one', 'two', 'three'], (word) => word.length)); // { 3: ['one', 'two'], 5: ['three'] }
console.log(move(['a', 'b', 'c'], 0, 2)); // ['b', 'c', 'a']
```

## 🧪 Testing

The library uses the Node.js test runner with TypeScript compilation and c8 coverage:

```bash
npm test
```

## 📊 Coverage

Coverage reports are generated as part of `npm test` via c8.

Coverage reports are available in the `coverage/` directory.

## 🛠️ Development

Built with TypeScript for type safety and modern JavaScript features:

```bash
# Install dependencies
npm install

# Run linter
npm run lint

# Check formatting
npm run format:check

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

### Array Utilities

- `isEmpty<T>(input: T[]): boolean` - Check if an array has no items
- `first<T>(input: T[]): T | undefined` - Get first item
- `last<T>(input: T[]): T | undefined` - Get last item
- `compact<T>(input: T[]): T[]` - Remove falsy values
- `chunk<T>(input: T[], size: number): T[][]` - Split into fixed-size chunks
- `flatten<T>(input: (T | T[])[]): T[]` - Flatten one level
- `flattenDepth<T>(input: unknown[], depth = 1): T[]` - Flatten up to depth
- `unique<T>(input: T[]): T[]` - Keep unique values
- `uniqueBy<T, K>(input: T[], selector: (item: T) => K): T[]` - Unique by key
- `groupBy<T, K>(input: T[], selector: (item: T) => K): Record<K, T[]>` - Group items by key
- `keyBy<T, K>(input: T[], selector: (item: T) => K): Record<K, T>` - Index items by key
- `partition<T>(input: T[], predicate: (item: T) => boolean): [T[], T[]]` - Split by predicate
- `difference<T>(left: T[], right: T[]): T[]` - Values in left not in right
- `intersection<T>(left: T[], right: T[]): T[]` - Shared unique values
- `union<T>(...inputs: T[][]): T[]` - Combined unique values
- `sortBy<T>(input: T[], selector: (item: T) => string | number | bigint | Date, direction?: 'asc' | 'desc'): T[]` - Sort by key
- `sum(input: number[]): number` - Sum all values
- `average(input: number[]): number` - Compute arithmetic mean
- `minBy<T>(input: T[], selector: (item: T) => string | number | bigint | Date): T | undefined` - Item with lowest key
- `maxBy<T>(input: T[], selector: (item: T) => string | number | bigint | Date): T | undefined` - Item with highest key
- `shuffle<T>(input: T[]): T[]` - Return shuffled copy
- `sample<T>(input: T[]): T | undefined` - Pick random item
- `insertAt<T>(input: T[], index: number, item: T): T[]` - Insert item at index
- `removeAt<T>(input: T[], index: number): T[]` - Remove item at index
- `move<T>(input: T[], fromIndex: number, toIndex: number): T[]` - Move item between indexes
- `swap<T>(input: T[], leftIndex: number, rightIndex: number): T[]` - Swap two indexes

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

Copyright (c) 2024 Joao Ley

## 🗺️ Roadmap

- [x] Core data structures (Stack, Queue, List, Tree, Binary Search Tree, Graph, Hash Table)
- [x] String manipulation utilities
- [x] Array utilities
- [ ] Object transformation utilities
- [ ] JSON helpers
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
