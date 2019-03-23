import { test } from 'ava-ts';
import { select } from '../../src/store/select';

test(`when called with (null, functor) select will return functor provided`, t => {
  const fn = x => x;
  const selector = select({});

  const actual = selector({ functor: fn, args: null });

  t.deepEqual(actual, fn);
});

test(`when called with (args, null) and matching action relevant routine is returned`, t => {
  const selector = select({
    action: (x, y) => [x, y]
  });

  const found = selector({ args: ['action', 42], functor: null });
  const actual = found(9000);

  t.deepEqual(actual, [9000, 42]);
});

test(`when called with (args, null) and arbitrary action name TypeError is thrown`, t => {
  const selector = select({
    action: (x, y) => [x, y]
  });

  const found = selector({ args: ['arbitrary', 42], functor: null });

  t.throws(() => found(9000), TypeError);
});
