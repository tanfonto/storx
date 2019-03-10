import { test } from 'ava-ts';
import { list, head, len } from '../../src/utils';

test('If a list is provided, list() returns it', t => {
  const expected = [];
  const out = list(expected);
  t.deepEqual(out, expected);
});

test('If nil is provided, an empty list is returned', t => {
  const out = list();
  t.deepEqual(out, []);
});

test('Head returns first element of the list', t => {
  const items = [1, 2, 3, 4];
  const actual = head(items);
  t.deepEqual(actual, 1);
});

test('Len returns array length', t => {
  const items = [1, 2, 3, 4];
  const actual = len(items);
  t.deepEqual(actual, 4);
});
