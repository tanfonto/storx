import { test } from 'ava-ts';
import { isNil } from '../../src/utils/type-assertions';

test('isNil is true if fed with null', t => {
  const actual = isNil(null);
  t.true(actual);
});

test('isNil is true if fed with undefined', t => {
  const actual = isNil(undefined);
  t.true(actual);
});

test('isNil is false if fed with object', t => {
  const actual = isNil({});
  t.false(actual);
});

test('isNil is false if fed with primitive', t => {
  const actual = isNil(42);
  t.false(actual);
});
