import { test } from 'ava-ts';
import { If } from '../../src/utils';

type List = Array<any>;

const fn = If<object, string, List, number>(
  x => typeof x === 'object',
  () => [],
  () => 43
);

test('If should use left transformation when pred evaluates to true', t => {
  const out: List = fn({});

  t.deepEqual(out, []);
});

test('If should use right transformation when pred evaluates to false', t => {
  const out: number = fn('');

  t.deepEqual(out, 43);
});
