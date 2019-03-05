import { test } from 'ava-ts';
import { If, when } from '../../src/utils';

type List = Array<any>;

const weaveIf = If<object, string, List, number>(
  x => typeof x === 'object',
  () => [],
  () => 43
);

const weaveWhen = when<object, List>(x => typeof x === 'object', () => []);

test('If should use left transformation when pred evaluates to true', t => {
  const actual: List = weaveIf({});

  t.deepEqual(actual, []);
});

test('If should use right transformation when pred evaluates to false', t => {
  const actual: number = weaveIf('');

  t.deepEqual(actual, 43);
});

test('When should run transformation when pred evaluates to true', t => {
  const actual: List = weaveWhen({});

  t.deepEqual(actual, []);
});

test('When should default to identity when pred evaluates to false', t => {
  const actual: number = weaveWhen(42);

  t.deepEqual(actual, 42);
});
