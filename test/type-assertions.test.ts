import { test } from 'ava-ts';
import { isArray, isFunction, isNil } from '../utils/type-assertions';

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

test('isFunction is true if fed with function', t => {
  const actual = isFunction(function() {});
  t.true(actual);
});

test('isFunction is true if fed with arrow function', t => {
  const actual = isFunction(() => {});
  t.true(actual);
});

test('isFunction is false if fed with object', t => {
  const actual = isFunction({});
  t.false(actual);
});

test('isFunction is false if fed with primitive', t => {
  const actual = isFunction(42);
  t.false(actual);
});

test('isArray is true if fed with array', t => {
  const actual = isArray([]);
  t.true(actual);
});

test('isArray is false if fed with object', t => {
  const actual = isArray({});
  t.false(actual);
});

test('isArray is false if fed with array-like object', t => {
  const pseudoArray = Object.assign({}, []);
  const actual = isArray(pseudoArray);
  t.false(actual);
});
