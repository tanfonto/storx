import { isFunction, isNil } from '../../src/utils/type-assertions';

test('isNil is true if fed with null', () => {
  const actual = isNil(null);
  expect(actual).toBe(true);
});

test('isNil is true if fed with undefined', () => {
  const actual = isNil(undefined);
  expect(actual).toBe(true);
});

test('isNil is false if fed with object', () => {
  const actual = isNil({});
  expect(actual).toBe(false);
});

test('isNil is false if fed with primitive', () => {
  const actual = isNil(42);
  expect(actual).toBe(false);
});

test('isFunction is true if fed with function', () => {
  const actual = isFunction(function() {});
  expect(actual).toBe(true);
});

test('isFunction is true if fed with arrow function', () => {
  const actual = isFunction(() => {});
  expect(actual).toBe(true);
});

test('isFunction is false if fed with object', () => {
  const actual = isFunction({});
  expect(actual).toBe(false);
});

test('isFunction is false if fed with primitive', () => {
  const actual = isFunction(42);
  expect(actual).toBe(false);
});
