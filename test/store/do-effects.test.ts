import { test } from 'ava-ts';
import { doEffects } from '../../src/store/do-effects';
import { Effect } from '../../types';

test('does not fail when no effects are defined', t => {
  doEffects()();
  t.pass();
});

test('fires all the effects provided, likely', t => {
  let counter = 0;
  const inc = () => counter++;
  const effects = new Array<Effect>(5).fill(inc);

  doEffects(...effects)(true);

  t.deepEqual(counter, 5);
});
