# All-in-One Data Structures Library

[![CI](https://github.com/joaoley/all-in-one/actions/workflows/ci.yml/badge.svg)](https://github.com/joaoley/all-in-one/actions/workflows/ci.yml)
[![Unit Tests](https://github.com/joaoley/all-in-one/actions/workflows/unit-tests.yml/badge.svg)](https://github.com/joaoley/all-in-one/actions/workflows/unit-tests.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue.svg)](https://www.typescriptlang.org/)
[![Coverage](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg)](https://github.com/joaoley/all-in-one)

A comprehensive TypeScript library implementing common data structures with 100% test coverage.

## 📦 Data Structures

### Linear Data Structures
- **List**: Doubly-linked list implementation
- **Stack**: LIFO (Last In, First Out) stack
- **Queue**: FIFO (First In, First Out) queue

### Node Types
- **Node**: Generic node with data and comparison methods
- **SingleNode**: Node with next pointer for singly-linked structures
- **DoubleNode**: Node with next and previous pointers for doubly-linked structures

### Tree Data Structures
- **GeneralTree**: N-ary tree implementation supporting any number of children per node
- **BinaryTree**: Binary tree implementation with left and right child constraints

## ✨ Features

- **100% TypeScript**: Fully typed with generics and interfaces
- **100% Test Coverage**: Comprehensive test suite with 358 tests
- **Generic Support**: Works with any data type
- **Comparable Interface**: Support for custom comparison logic
- **Iterator Protocol**: Full support for for...of loops and spread operators
- **Robust Error Handling**: Custom exceptions and validation
- **Modern ES6+**: Uses modern JavaScript features and patterns

## 🚀 Installation

```bash
npm install all-in-one
```

## 📋 Usage

```typescript
import { List, Stack, Queue, GeneralTree, BinaryTree } from 'all-in-one';

// List example
const list = new List<number>();
list.push(1);
list.push(2);
list.push(3);
console.log([...list]); // [1, 2, 3]

// Stack example
const stack = new Stack<string>();
stack.push('first');
stack.push('second');
console.log(stack.pop()); // 'second'

// Queue example
const queue = new Queue<string>();
queue.push('first');
queue.push('second');
console.log(queue.pop()); // 'first'

// General Tree example
const tree = new GeneralTree<number>();
const root = tree.setRoot(1);
tree.addChild(root, 2);
tree.addChild(root, 3);
console.log(tree.preOrder()); // [1, 2, 3]

// Binary Tree example
const binaryTree = new BinaryTree<number>();
const bRoot = binaryTree.setRoot(10);
binaryTree.addLeft(bRoot, 5);
binaryTree.addRight(bRoot, 15);
console.log(binaryTree.inOrder()); // [5, 10, 15]
```

## 🧪 Testing

Run the test suite:

```bash
npm test
```

The library maintains 100% test coverage across:
- **100% Statement Coverage** (2773/2773)
- **100% Branch Coverage** (380/380) 
- **100% Function Coverage** (151/151)
- **100% Line Coverage** (2773/2773)

## 🏗️ Development

```bash
# Install dependencies
npm install

# Compile TypeScript
npx tsc

# Run tests with coverage
npm test

# Type checking
npx tsc --noEmit
```

## 📄 License

MIT License - see LICENSE file for details.