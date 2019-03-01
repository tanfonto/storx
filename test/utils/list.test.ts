import { test } from 'ava-ts';
import { list } from '../../src/utils';

test('If a list is provided, list() returns it', t => {
  const expected = [];
  const out = list(expected);
  t.deepEqual(out, expected);
});

test('If nil is provided, an empty list is returned', t => {
  const out = list();
  t.deepEqual(out, []);
});
