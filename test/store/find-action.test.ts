import { findAction } from '../../src/store/find-action';

test(`when called with (null, functor) select will return functor provided`, () => {
  const fn = x => x;
  const selector = findAction({});

  const actual = selector({ functor: fn, args: null });

  expect(actual).toStrictEqual(fn);
});

test(`when called with (args, null) and matching action relevant routine is returned`, () => {
  const selector = findAction({
    action: (x, y) => [x, y]
  });

  const found = selector({ args: ['action', 42], functor: null });
  const actual = found(9000);

  expect(actual).toEqual([9000, 42]);
});

test(`when called with (args, null) and arbitrary action name TypeError is thrown`, () => {
  const selector = findAction({
    action: (x, y) => [x, y]
  });

  const found = selector({ args: ['arbitrary', 42], functor: null });

  expect(() => found(9000)).toThrow(TypeError);
});
