import assert from 'node:assert';
import { describe, it } from 'node:test';
import { jsonByteSize } from './json-byte-size';

describe('jsonByteSize', () => {
  it('returns the UTF-8 byte length of serialized JSON', () => {
    assert.equal(jsonByteSize({ a: 1 }), 7);
  });

  it('handles multi-byte characters', () => {
    const expected = new TextEncoder().encode('{"name":"João"}').byteLength;
    assert.equal(jsonByteSize({ name: 'João' }), expected);
  });

  it('throws for non-serializable values', () => {
    assert.throws(() => jsonByteSize(BigInt(1)), TypeError, 'input must be JSON-serializable.');
    assert.throws(() => jsonByteSize(undefined), TypeError, 'input must be JSON-serializable.');
  });
});

