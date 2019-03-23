import { test } from 'ava-ts';
import { map, skip, tap } from 'rxjs/operators';
import { Store } from '../../src/store';
import { Effect } from '../../types';
import { willAssert } from '../will-assert';

const testStore = (value: number, ...effects: Array<Effect<any>>) =>
  Store<{ value: number }>(
    { value },
    {
      dec: ({ value: v1 }, { value: v2 }) => ({ value: v1 - v2 }),
      inc: ({ value: v1 }, { value: v2 }) => ({ value: v1 + v2 })
    },
    ...effects
  );

test.cb('dispatching bound action updates primitive state accordingly', t => {
  const { dispatch, state } = Store(1, {
    inc: (state, patch) => state + patch
  });

  willAssert(t, state, 4);

  dispatch('inc', 3);
});

test.cb('dispatching bound action updates complex state accordingly', t => {
  const { dispatch, state } = testStore(1);

  willAssert(t, state, { value: 4 });

  dispatch('inc', { value: 3 });
});

test.cb('dispatching free action updates primitive state accordingly', t => {
  const { dispatch, state } = Store(42, {});

  willAssert(t, state, 50);

  dispatch((x: number) => x + 8);
});

test.cb('dispatching free action updates complex state accordingly', t => {
  const { dispatch, state } = Store({ value: 42 }, {});

  willAssert(t, state, { value: 50 });

  dispatch(({ value }) => ({ value: value + 8 }));
});

test.cb('consequent changes are getting applied correctly', t => {
  const { dispatch, state } = testStore(42);

  state
    .pipe(
      skip(2),
      map(s => t.deepEqual(s, { value: 60 }))
    )
    .subscribe(t.end);

  dispatch('inc', { value: 5 });
  dispatch(({ value }) => ({ value: value + 15 }));
  dispatch('dec', { value: 2 });
});

test.cb('late subscribers receive up-to-date state', t => {
  const { dispatch, state } = testStore(42);

  dispatch('inc', { value: 5 });
  dispatch(({ value }) => ({ value: value + 15 }));
  dispatch('inc', { value: 8 });

  state.pipe(map(s => t.deepEqual(s, { value: 70 }))).subscribe(t.end);
});

test.cb('effects are triggered', t => {
  let counter = 0;
  const { dispatch, state } = testStore(0, () => counter++);

  dispatch('inc', { value: 42 });
  dispatch('inc', { value: 42 });

  state.pipe(tap(() => t.deepEqual(counter, 2))).subscribe(() => t.end());
});

test.cb('effects are triggered per action rather than per subscriber', t => {
  let counter = 0;
  const { dispatch, state } = testStore(0, () => counter++);

  state.subscribe(() => t.log('subscribed early'));

  dispatch('inc', { value: 42 });
  dispatch('inc', { value: 42 });

  state.pipe(tap(() => t.deepEqual(counter, 2))).subscribe(() => t.end());
});
