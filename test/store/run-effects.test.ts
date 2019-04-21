import { runEffects } from '../../src/store/run-effects';

test('does not fail when no effects are defined', () => {
  runEffects()();
});

test('fires all the effects provided, likely', () => {
  let counter = 0;
  const inc = () => counter++;
  const effects = new Array<Effect>(5).fill(inc);

  runEffects(...effects)(true);

  expect(counter).toEqual(5);
});
