import { doEffects } from '../../src/store/do-effects';

test('does not fail when no effects are defined', () => {
  doEffects()();
});

test('fires all the effects provided, likely', () => {
  let counter = 0;
  const inc = () => counter++;
  const effects = new Array<Effect>(5).fill(inc);

  doEffects(...effects)(true);

  expect(counter).toEqual(5);
});
