import { test } from 'ava-ts';
import { asFree, isFree } from './types';

test('isFree() returns true if provided with a function', (t) => {
  const fn = () => ({});

  const actual = isFree(fn);

  t.true(actual);
});

test('asFree() makes binary reducer unary', (t) => {
  const fn = <T, P>(_: T, __: P) => ({});

  const actual = asFree({ inc: fn }, { action: 'inc', payload: 42 });

  t.is(typeof actual, 'function');
  t.is(actual.length, 1);
});

test('asFree() produces unary reducer by binding payload to a binary one', (t) => {
  const fn = (_: any, payload: number) => {
    t.is(payload, 42);
  };

  const actual = asFree<any, number>({ inc: fn }, { action: 'inc', payload: 42 });
  actual('42');
});
