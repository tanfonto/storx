import { findAction } from '../../src/store/find-action';

test(`when called with (null, Functor) findAction will return Functor provided`, () => {
  const fn = x => x;
  const finder = findAction({});

  const actual = finder({ functor: fn, args: null });

  expect(actual).toStrictEqual(fn);
});

test(`when called with (args, null) and matching action relevant routine is returned`, () => {
  const finder = findAction({
    action: (x, y) => [ x, y ]
  });

  const found = finder({ args: [ 'action', 42 ], functor: null });
  const actual = found(9000);

  expect(actual).toEqual([ 9000, 42 ]);
});

test(`when called with (args, null) and arbitrary action name TypeError is thrown`, () => {
  const finder = findAction({
    action: (x, y) => [ x, y ]
  });

  const found = finder({ args: [ 'arbitrary', 42 ], functor: null });

  expect(() => found(9000)).toThrow(TypeError);
});
