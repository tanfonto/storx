import { tap } from '../../src/utils/tap';

test('tap calls the side effect', () => {
  const eff = jest.fn();

  tap(x => x, eff)(42);

  expect(eff).toHaveBeenCalled();
});

test('tap returns the output of the function passed', () => {
  const f = tap(x => x, () => void 0);
  const actual = f(42);

  expect(actual).toBe(42);
});

test('tap is idempotent, likely', () => {
  const f = tap(x => x, () => void 0);
  f(42), f(42), f(42);
  const actual = f(42);

  expect(actual).toBe(42);
});
