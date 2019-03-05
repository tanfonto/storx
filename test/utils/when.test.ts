import { test } from 'ava-ts';
import { when } from '../../src/utils';

type List = Array<any>;

const weaveWhen = when<object, List, number>(
  x => typeof x === 'object',
  () => []
);

test('When should run transformation when pred evaluates to true', t => {
  const actual: List = weaveWhen({});

  t.deepEqual(actual, []);
});

test('When should default to identity when pred evaluates to false', t => {
  const actual: number = weaveWhen(42);

  t.deepEqual(actual, 42);
});
