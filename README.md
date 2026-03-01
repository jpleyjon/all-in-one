# all-in-one

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A comprehensive TypeScript utility library providing data structures, and string, array, object, date/time, currency, and JSON helpers built from scratch with zero runtime dependencies.

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

### Object Utilities

Functional, immutable object transformation helpers:

- **Selection and projection** - `pick`, `omit`, `pickBy`, `omitBy`
- **Entry transformation** - `mapValues`, `mapKeys`, `mapEntries`, `entries`, `fromEntries`, `toPairs`, `fromPairs`, `filterObject`, `reduceObject`, `renameKeys`, `invert`, `transformKeysDeep`, `transformValuesDeep`
- **Nested path operations** - `get`, `set`, `hasPath`, `unset`, `update`, `deepPick`, `deepOmit`
- **Composition and cloning** - `merge`, `mergeWith`, `deepMerge`, `defaults`, `cloneDeep`, `safeJsonClone`, `deepFreeze`
- **Diagnostics and cleanup** - `isEmptyObject`, `diffObjects`, `cleanObject`
- **Shape conversion** - `flattenObject`, `unflattenObject`

### Date/Time Utilities

Date parsing, formatting, comparison, and calendar boundary helpers:

- **Validation and parsing** - `isValidDate`, `parseDate`
- **Formatting and ISO conversion** - `formatDate`, `toISODate`, `toISODateTime`
- **Date arithmetic** - `addDays`, `addMonths`, `addYears`, `subtractDays`, `subtractMonths`, `subtractYears`
- **Calendar boundaries** - `startOfDay`, `endOfDay`, `startOfWeek`, `endOfWeek`, `startOfMonth`, `endOfMonth`, `startOfYear`, `endOfYear`
- **Differences and comparison** - `differenceInDays`, `differenceInHours`, `differenceInMinutes`, `differenceInSeconds`, `isBefore`, `isAfter`, `isSameDay`, `isSameMonth`
- **Relative-day checks** - `isToday`, `isYesterday`, `isTomorrow`
- **Range and selection** - `minDate`, `maxDate`, `clampDate`
- **Calendar and timestamp helpers** - `getDaysInMonth`, `getWeekday`, `fromUnixTimestamp`, `toUnixTimestamp`
- **Timezone conversion and duration display** - `toUTC`, `toLocalTime`, `humanizeDuration`

### Currency Utilities

Exact money conversion and allocation helpers (no exchange-rate features):

- **Unit conversion** - `dollarsToCents`, `centsToDollars`, `centsToDollarsString`
- **Formatting** - `formatCents`, `toAccountingCurrencyString`
- **Allocation** - `allocateCents`, `splitEvenCents`, `weightedAllocateCents`
- **Math and comparison** - `sumCents`, `subtractCents`, `multiplyCents`, `averageCents`, `applyRateToCents`, `applyBpsToCents`, `taxAmountCents`, `discountAmountCents`, `totalWithTaxCents`, `percentageOfTotal`, `compareCents`, `absCents`, `negateCents`, `clampCents`, `minCents`, `maxCents`
- **Flags** - `isZeroCents`, `isPositiveCents`, `isNegativeCents`
- **Codes and parsing** - `isValidCurrencyCode`, `normalizeCurrencyCode`, `parseCurrencyStringToCents`

### CI Pipeline

GitHub Actions runs unit tests on every `push`, `pull_request`, and manual dispatch via `.github/workflows/unit-tests.yml`.

### JSON Utilities

Safe parsing, formatting, serialization, and redaction helpers:

- **Validation and parsing** - `isValidJson`, `parseJson`, `parseJsonWithReviver`, `safeParseJson`, `parseJsonOrDefault`
- **Formatting** - `prettifyJson`, `minifyJson`
- **Serialization** - `stringifyJson`, `stringifyJsonWithReplacer`, `stableStringifyJson`
- **Diagnostics and safety** - `jsonByteSize`, `redactJson`

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

### Object Helpers

```typescript
import {
  pick,
  omit,
  mapValues,
  entries,
  fromEntries,
  get,
  set,
  deepPick,
  deepMerge,
  mergeWith,
  cleanObject,
  diffObjects,
  safeJsonClone,
  transformKeysDeep,
  flattenObject,
  unflattenObject,
} from 'all-in-one';

const user = { id: 1, profile: { name: 'Ada', role: 'admin' } };

console.log(pick(user, ['id'])); // { id: 1 }
console.log(omit(user, ['id'])); // { profile: { name: 'Ada', role: 'admin' } }
console.log(mapValues({ a: 1, b: 2 }, (value) => value * 10)); // { a: 10, b: 20 }
console.log(entries({ a: 1, b: 2 })); // [['a', 1], ['b', 2]]
console.log(
  fromEntries([
    ['a', 1],
    ['b', 2],
  ]),
); // { a: 1, b: 2 }
console.log(get(user, 'profile.name')); // Ada
console.log(set(user, 'profile.role', 'editor')); // { id: 1, profile: { name: 'Ada', role: 'editor' } }
console.log(deepPick(user, ['profile.name'])); // { profile: { name: 'Ada' } }
console.log(deepMerge({ a: { b: 1 } }, { a: { c: 2 } })); // { a: { b: 1, c: 2 } }
console.log(mergeWith((current, incoming) => current ?? incoming, { a: 1 }, { a: 2, b: 3 })); // { a: 1, b: 3 }
console.log(cleanObject({ a: 1, b: null, c: '' })); // { a: 1 }
console.log(diffObjects({ a: 1 }, { a: 2, b: 3 })); // { added: { b: 3 }, removed: {}, changed: { a: { before: 1, after: 2 } } }
console.log(safeJsonClone({ a: 1, list: [1, 2] })); // { a: 1, list: [1, 2] }
console.log(transformKeysDeep({ userProfile: { firstName: 'Ada' } }, (key) => key.toUpperCase())); // { USERPROFILE: { FIRSTNAME: 'Ada' } }
console.log(flattenObject({ user: { profile: { name: 'Ada' } } })); // { 'user.profile.name': 'Ada' }
console.log(unflattenObject({ 'user.profile.name': 'Ada' })); // { user: { profile: { name: 'Ada' } } }
```

### Currency Helpers

```typescript
import {
  dollarsToCents,
  centsToDollars,
  centsToDollarsString,
  formatCents,
  toAccountingCurrencyString,
  allocateCents,
  splitEvenCents,
  weightedAllocateCents,
  sumCents,
  subtractCents,
  multiplyCents,
  averageCents,
  applyRateToCents,
  applyBpsToCents,
  totalWithTaxCents,
  percentageOfTotal,
  parseCurrencyStringToCents,
} from 'all-in-one';

console.log(dollarsToCents('12.34')); // 1234
console.log(centsToDollars(1234)); // 12.34
console.log(centsToDollarsString(1234)); // 12.34
console.log(formatCents(1234)); // $12.34 (en-US default)
console.log(toAccountingCurrencyString(-1234)); // ($12.34)
console.log(allocateCents(10, 3)); // [4, 3, 3]
console.log(splitEvenCents(10, 3)); // [4, 3, 3]
console.log(weightedAllocateCents(100, [1, 2, 3])); // [17, 33, 50]
console.log(sumCents([100, 250, -50])); // 300
console.log(subtractCents(500, 125)); // 375
console.log(multiplyCents(105, 1.1)); // 116
console.log(averageCents([1, 2])); // 2
console.log(applyRateToCents(1000, 0.0825)); // 1083
console.log(applyBpsToCents(1000, 250)); // 1025
console.log(totalWithTaxCents(1000, 0.0825)); // 1083
console.log(percentageOfTotal(250, 1000)); // 25
console.log(parseCurrencyStringToCents('1,234.56')); // 123456
```

### JSON Helpers

```typescript
import {
  isValidJson,
  jsonByteSize,
  minifyJson,
  parseJson,
  parseJsonWithReviver,
  safeParseJson,
  parseJsonOrDefault,
  prettifyJson,
  redactJson,
  stringifyJson,
  stringifyJsonWithReplacer,
  stableStringifyJson,
} from 'all-in-one';

console.log(isValidJson('{ "a": 1 }')); // true
console.log(minifyJson('{ "a": 1, "b": [1, 2] }')); // {"a":1,"b":[1,2]}
console.log(parseJson<{ a: number }>('{ "a": 1 }')); // { a: 1 }
console.log(
  parseJsonWithReviver<{ createdAt: Date }>(
    '{ "createdAt": "2026-01-01T00:00:00.000Z" }',
    (key, value) => (key === 'createdAt' ? new Date(String(value)) : value),
  ),
); // { createdAt: 2026-01-01T00:00:00.000Z }
console.log(safeParseJson('{ invalid }')); // { ok: false, error: SyntaxError(...) }
console.log(parseJsonOrDefault('{ invalid }', { a: 0 })); // { a: 0 }
console.log(prettifyJson('{"a":1}')); // {
//   "a": 1
// }
console.log(stringifyJson({ a: 1 }, 2)); // {
//   "a": 1
// }
console.log(
  stringifyJsonWithReplacer({ keep: 1, secret: 'x' }, (key, value) =>
    key === 'secret' ? undefined : value,
  ),
); // {"keep":1}
console.log(stableStringifyJson({ b: 1, a: 2 })); // {"a":2,"b":1}
console.log(jsonByteSize({ a: 'á' })); // 10
console.log(redactJson({ user: { token: 'abc' } }, ['user.token'])); // { user: { token: '[REDACTED]' } }
```

## 🧪 Testing

The library uses the Node.js test runner with TypeScript compilation and c8 coverage, and runs inside Docker:

```bash
./bin/test
```

## 📊 Coverage

Coverage reports are generated as part of `./bin/test` (or `npm test`) via c8.

Coverage reports are available in the `coverage/` directory.

## 🛠️ Development

For contributors, Docker is the only required local dependency.

```bash
# Run linter
./bin/lint

# Auto-fix lint issues
./bin/lint-fix

# Check formatting
./bin/format-check

# Run tests
./bin/test

# Build
./bin/build
```

The first run will build `Dockerfile.dev` and install dependencies in Docker volumes.
If needed, you can still run local Node-based commands via `npm run <task>:local`.

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

### Object Utilities

- `ObjectRecord = Record<string, unknown>` - Generic plain object type
- `ObjectPath = string | (string | number)[]` - Nested path input
- `PathSegment = string | number` - Single path segment type
- `CleanObjectOptions` - Options for `cleanObject`
- `DiffValueChange = { before: unknown; after: unknown }` - Change record type for `diffObjects`
- `DiffObjectsResult = { added: ObjectRecord; removed: ObjectRecord; changed: Record<string, DiffValueChange> }` - Diff result type
- `MergeWithResolver = (currentValue, incomingValue, key) => unknown` - Merge conflict resolver signature
- `pick<T, K>(input: T, keys: K[]): Pick<T, K>` - Return only selected keys
- `omit<T, K>(input: T, keys: K[]): Omit<T, K>` - Exclude selected keys
- `pickBy<T>(input: T, predicate: (value, key, input) => boolean): Partial<T>` - Keep entries matching predicate
- `omitBy<T>(input: T, predicate: (value, key, input) => boolean): Partial<T>` - Remove entries matching predicate
- `mapValues<T, R>(input: T, mapper: (value, key, input) => R): Record<string, R>` - Map values, preserve keys
- `mapKeys<T>(input: T, mapper: (key, value, input) => string): ObjectRecord` - Map keys, preserve values
- `mapEntries<T>(input: T, mapper: (value, key, input) => [string, unknown]): ObjectRecord` - Map entries into new key/value pairs
- `entries<T>(input: T): [key, value][]` - Return object entries
- `fromEntries(input: [string, unknown][]): ObjectRecord` - Build object from entries
- `toPairs<T>(input: T): [key, value][]` - Convert object to key/value pairs
- `fromPairs(input: [string, unknown][]): ObjectRecord` - Build object from key/value pairs
- `filterObject<T>(input: T, predicate: (value, key, input) => boolean): Partial<T>` - Filter entries by predicate
- `reduceObject<T, R>(input: T, reducer: (acc, value, key, input) => R, initialValue: R): R` - Reduce entries into a single value
- `renameKeys<T>(input: T, mapping: Record<string, string>): ObjectRecord` - Rename keys using mapping
- `invert(input: ObjectRecord): ObjectRecord` - Swap keys and values
- `isEmptyObject(input: ObjectRecord): boolean` - Check whether object has no own keys
- `get(input: object, path: ObjectPath, defaultValue?): unknown` - Safely read nested value
- `set<T>(input: T, path: ObjectPath, value: unknown): T` - Immutable nested write
- `hasPath(input: object, path: ObjectPath): boolean` - Check whether path exists
- `unset<T>(input: T, path: ObjectPath): T` - Immutable nested delete
- `update<T>(input: T, path: ObjectPath, updater: (currentValue: unknown) => unknown): T` - Update nested value by callback
- `deepPick<T>(input: T, paths: ObjectPath[]): Partial<T>` - Keep only selected nested paths
- `deepOmit<T>(input: T, paths: ObjectPath[]): T` - Remove selected nested paths
- `merge(...inputs: ObjectRecord[]): ObjectRecord` - Shallow merge objects
- `mergeWith(resolver: MergeWithResolver, ...inputs: ObjectRecord[]): ObjectRecord` - Shallow merge with custom conflict resolver
- `deepMerge(...inputs: ObjectRecord[]): ObjectRecord` - Deep merge objects recursively
- `defaults(input: ObjectRecord, ...sources: ObjectRecord[]): ObjectRecord` - Fill undefined keys from defaults
- `cloneDeep<T>(input: T): T` - Deep clone object/array/date structures
- `safeJsonClone<T>(input: T): T` - Clone with JSON serialization semantics
- `deepFreeze<T>(input: T): T` - Deep freeze object/array graph
- `cleanObject(input: ObjectRecord, options?: CleanObjectOptions): ObjectRecord` - Remove configurable empty values
- `diffObjects(left: ObjectRecord, right: ObjectRecord): DiffObjectsResult` - Diff added, removed, and changed paths
- `transformKeysDeep(input: ObjectRecord, mapper: (key, value, path) => string): ObjectRecord` - Recursively transform object keys
- `transformValuesDeep(input: ObjectRecord, mapper: (value, path) => unknown): ObjectRecord` - Recursively transform leaf values
- `flattenObject(input: ObjectRecord, options?: FlattenObjectOptions): ObjectRecord` - Flatten nested structure into path keys
- `unflattenObject(input: ObjectRecord, options?: UnflattenObjectOptions): ObjectRecord` - Expand path keys into nested structure

### Date/Time Utilities

- `DateInput = Date | string | number` - Accepted date input type
- `isValidDate(value: DateInput): boolean` - Check whether input is a valid date
- `parseDate(value: DateInput): Date | null` - Parse date input safely
- `formatDate(date: DateInput, pattern: string): string` - Format using `YYYY`, `MM`, `DD`, `HH`, `mm`, `ss`, `SSS`
- `toISODate(date: DateInput): string` - ISO date (`YYYY-MM-DD`)
- `toISODateTime(date: DateInput): string` - ISO date-time string
- `addDays(date: DateInput, amount: number): Date` - Add days
- `addMonths(date: DateInput, amount: number): Date` - Add months
- `addYears(date: DateInput, amount: number): Date` - Add years
- `subtractDays(date: DateInput, amount: number): Date` - Subtract days
- `subtractMonths(date: DateInput, amount: number): Date` - Subtract months
- `subtractYears(date: DateInput, amount: number): Date` - Subtract years
- `startOfDay(date: DateInput): Date` - Start of local day
- `endOfDay(date: DateInput): Date` - End of local day
- `startOfWeek(date: DateInput, weekStartsOn?: number): Date` - Start of local week
- `endOfWeek(date: DateInput, weekStartsOn?: number): Date` - End of local week
- `startOfMonth(date: DateInput): Date` - Start of local month
- `endOfMonth(date: DateInput): Date` - End of local month
- `startOfYear(date: DateInput): Date` - Start of local year
- `endOfYear(date: DateInput): Date` - End of local year
- `differenceInDays(a: DateInput, b: DateInput): number` - Signed whole-day difference
- `differenceInHours(a: DateInput, b: DateInput): number` - Signed whole-hour difference
- `differenceInMinutes(a: DateInput, b: DateInput): number` - Signed whole-minute difference
- `differenceInSeconds(a: DateInput, b: DateInput): number` - Signed whole-second difference
- `isBefore(a: DateInput, b: DateInput): boolean` - Check if `a` is before `b`
- `isAfter(a: DateInput, b: DateInput): boolean` - Check if `a` is after `b`
- `isSameDay(a: DateInput, b: DateInput): boolean` - Check if both dates are on the same day
- `isSameMonth(a: DateInput, b: DateInput): boolean` - Check if both dates are in the same month
- `isToday(date: DateInput): boolean` - Check if date is today
- `isYesterday(date: DateInput): boolean` - Check if date is yesterday
- `isTomorrow(date: DateInput): boolean` - Check if date is tomorrow
- `minDate(dates: DateInput[]): Date | undefined` - Earliest date in a list
- `maxDate(dates: DateInput[]): Date | undefined` - Latest date in a list
- `clampDate(date: DateInput, min: DateInput, max: DateInput): Date` - Clamp date between bounds
- `getDaysInMonth(date: DateInput): number` - Number of days in month
- `getWeekday(date: DateInput): number` - Weekday index (`0`-`6`)
- `fromUnixTimestamp(seconds: number): Date` - Date from UNIX seconds
- `toUnixTimestamp(date: DateInput): number` - UNIX seconds from date
- `toUTC(date: DateInput): Date` - Convert local components to UTC-based date
- `toLocalTime(date: DateInput): Date` - Convert UTC components to local-time date
- `humanizeDuration(milliseconds: number): string` - Human-readable duration

### Currency Utilities

- `MoneyInput = number | string` - Accepted money input for exact dollar-to-cent conversion
- `dollarsToCents(amount: MoneyInput): number` - Convert decimal dollars to integer cents
- `centsToDollars(cents: number): number` - Convert integer cents to decimal dollars
- `centsToDollarsString(cents: number): string` - Convert integer cents to exact fixed-point dollar string
- `formatCents(cents: number, options?: FormatCentsOptions): string` - Localized currency formatting from cents
- `toAccountingCurrencyString(cents: number, options?: AccountingFormatCentsOptions): string` - Localized currency formatting with parentheses for negatives
- `allocateCents(cents: number, parts: number): number[]` - Split cents into near-equal integer parts
- `splitEvenCents(totalCents: number, parts: number): number[]` - Convenience even split wrapper
- `weightedAllocateCents(cents: number, weights: number[]): number[]` - Split cents using weighted allocation
- `sumCents(values: number[]): number` - Sum cent amounts
- `subtractCents(a: number, b: number): number` - Subtract one cent value from another
- `multiplyCents(cents: number, factor: number, mode?: RoundingMode): number` - Multiply and round cents
- `averageCents(values: number[], mode?: RoundingMode): number` - Average cent values with rounding
- `applyRateToCents(cents: number, rate: number, mode?: RoundingMode): number` - Apply a percentage-like rate to cents
- `applyBpsToCents(cents: number, bps: number, mode?: RoundingMode): number` - Apply basis points to cents
- `taxAmountCents(subtotalCents: number, taxRate: number, mode?: RoundingMode): number` - Compute tax amount from subtotal
- `discountAmountCents(subtotalCents: number, discountRate: number, mode?: RoundingMode): number` - Compute discount amount from subtotal
- `totalWithTaxCents(subtotalCents: number, taxRate: number, mode?: RoundingMode): number` - Compute subtotal plus tax
- `percentageOfTotal(partCents: number, totalCents: number, precision?: number): number` - Compute percentage represented by a part
- `isZeroCents(cents: number): boolean` - Check if cents is exactly zero
- `isPositiveCents(cents: number): boolean` - Check if cents is positive
- `isNegativeCents(cents: number): boolean` - Check if cents is negative
- `compareCents(a: number, b: number): -1 | 0 | 1` - Compare two cent values
- `absCents(cents: number): number` - Absolute cents value
- `negateCents(cents: number): number` - Negate a cent value
- `clampCents(cents: number, min: number, max: number): number` - Clamp cents between bounds
- `minCents(values: number[]): number | undefined` - Smallest cent value in a list
- `maxCents(values: number[]): number | undefined` - Largest cent value in a list
- `isValidCurrencyCode(code: string): boolean` - Validate 3-letter ISO currency code
- `normalizeCurrencyCode(code: string): string` - Normalize and validate currency code
- `parseCurrencyStringToCents(input: string): number` - Parse currency-like strings into cents

### JSON Utilities

- `JsonReviver = (key: string, value: unknown) => unknown` - JSON parse reviver signature
- `JsonReplacer = (key: string, value: unknown) => unknown` - JSON stringify replacer signature
- `SafeParseJsonSuccess<T> = { ok: true; value: T }` - Successful safe parse result type
- `SafeParseJsonFailure = { ok: false; error: SyntaxError }` - Failed safe parse result type
- `SafeParseJsonResult<T> = SafeParseJsonSuccess<T> | SafeParseJsonFailure` - Safe parse result union type
- `isValidJson(input: string): boolean` - Check whether input is valid JSON text
- `minifyJson(input: string): string` - Remove unnecessary whitespace from JSON text
- `parseJson<T = unknown>(input: string): T` - Parse JSON and throw on invalid input
- `parseJsonWithReviver<T = unknown>(input: string, reviver: JsonReviver): T` - Parse JSON using a custom reviver
- `safeParseJson<T = unknown>(input: string): SafeParseJsonResult<T>` - Parse JSON without throwing
- `parseJsonOrDefault<T>(input: string, fallback: T): T` - Parse JSON or return fallback
- `prettifyJson(input: string, space?: number): string` - Format JSON text with indentation
- `redactJson(input: unknown, paths: string[], mask?: unknown): unknown` - Redact selected dot-paths from a cloned value
- `jsonByteSize(input: unknown): number` - Compute UTF-8 byte length of serialized JSON
- `stringifyJson(input: unknown, space?: number): string` - Serialize JSON-safe values
- `stringifyJsonWithReplacer(input: unknown, replacer: JsonReplacer, space?: number): string` - Serialize with a custom replacer
- `stableStringifyJson(input: unknown, space?: number): string` - Serialize with deterministic key ordering

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

Copyright (c) 2024 Joao Ley

## 🗺️ Roadmap

- [x] Core data structures (Stack, Queue, List, Tree, Binary Search Tree, Graph, Hash Table)
- [x] String manipulation utilities
- [x] Array utilities
- [x] Object transformation utilities
- [x] JSON helpers
- [ ] Number utilities
- [x] Date/Time helpers
- [ ] Validation utilities
- [x] Currency helpers

## 💡 Why all-in-one?

This library was created to provide a comprehensive utility toolkit while maintaining the educational value of understanding how these structures and algorithms work under the hood. By avoiding external dependencies, it offers:

- **Transparency** - See exactly how everything works
- **Reliability** - No dependency security concerns
- **Performance** - Optimized implementations without bloat
- **Learning** - Great resource for understanding data structures

---

Built with ❤️ using TypeScript and Node.js
