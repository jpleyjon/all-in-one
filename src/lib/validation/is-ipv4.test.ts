import assert from 'node:assert';
import { describe, it } from 'node:test';
import { isIPv4 } from './is-ipv4';

describe('isIPv4', () => {
  it('accepts valid IPv4 values', () => {
    assert.equal(isIPv4('127.0.0.1'), true);
    assert.equal(isIPv4('255.255.255.255'), true);
  });

  it('rejects invalid IPv4 values', () => {
    assert.equal(isIPv4(1), false);
    assert.equal(isIPv4('127.0.0'), false);
    assert.equal(isIPv4('127.0.0.1.2'), false);
    assert.equal(isIPv4('127.0.a.1'), false);
    assert.equal(isIPv4('127.0.0.256'), false);
    assert.equal(isIPv4('127.0.00.1'), false);
  });
});
