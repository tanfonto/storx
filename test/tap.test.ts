import { test } from 'ava-ts';
import { tap } from '../utils/tap';

const noop = () => {};

test('tap calls the side effect', t => {
  let actual = false;
  const eff = () => (actual = true);
  tap(noop, eff);
  t.true(actual);
});

test('tap returns the output of the function passed', t => {
  const f = tap(x => x, noop);
  const actual = f(42);
  t.deepEqual(actual, 42);
});
