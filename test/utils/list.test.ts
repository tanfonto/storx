import { list, head, len } from '../../src/utils';

test('If a list is provided, list() returns it', () => {
  const expected = [];
  const out = list(expected);
  expect(out).toEqual(expected);
});

test('If nil is provided, an empty list is returned', () => {
  const out = list();
  expect(out).toEqual([]);
});

test('Head returns first element of the list', () => {
  const items = [1, 2, 3, 4];
  const actual = head(items);
  expect(actual).toBe(1);
});

test('Len returns array length', () => {
  const items = [1, 2, 3, 4];
  const actual = len(items);
  expect(actual).toBe(4);
});
