import { Id } from '../../src/utils';

test('Id fixes value to itself', () => {
  const out = Id(42);
  expect(out).toBe(42);
});
