import { test } from 'ava-ts';
import { tap } from '../../src/utils/tap';

test('tap calls the side effect', t => {
  t.context = false;
  const eff = () => (t.context = true);
  tap(x => x, eff)(42);
  t.true(t.context);
});

test('tap returns the output of the function passed', t => {
  const f = tap(x => x, () => {});
  const actual = f(42);
  t.deepEqual(actual, 42);
});

test('tap is idempotent, likely', t => {
  const f = tap(x => x, () => void 0);
  f(42), f(42), f(42);
  const actual = f(42);
  t.deepEqual(actual, 42);
});
