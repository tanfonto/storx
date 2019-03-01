import { test } from 'ava-ts';
import { Id } from '../../src/utils';

test('Id fixes the value to itself', t => {
  const out = Id(42);
  t.deepEqual(out, 42);
});
