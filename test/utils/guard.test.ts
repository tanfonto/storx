import { Context, GenericTestContext, test } from 'ava-ts';
import { guard } from '../../src/utils/guard';

const type = (name: string) => (x: any) => Object.is(typeof x, name);

function macro<E>(
  t: GenericTestContext<Context<any>>,
  input: any,
  [pred, typeName]: [(x: any) => boolean, string]
) {
  if (guard<E>(pred)(input)) {
    const typeAssert: E = input;
    t.deepEqual(typeof input, typeName, `${typeAssert}`);
  } else {
    t.fail();
  }
}

test('function type is correctly inferred', macro, function() {}, [
  type('function'),
  'function'
]);

test('arrow function type is correctly inferred', macro, () => {}, [
  type('function'),
  'function'
]);

test('object type is correctly inferred', macro, {}, [
  type('object'),
  'object'
]);

test('number type is correctly inferred', macro, 42, [
  type('number'),
  'number'
]);
