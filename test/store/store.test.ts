import { map, skip, tap } from 'rxjs/operators';
import { Store } from '../../src/store';
import { onEmit } from '../on-emit';

type Effect<T> = (arg: T) => void;

const testStore = (value: number, ...effects: Array<Effect<any>>) =>
  Store<{ value: number }>(
    { value },
    {
      dec: ({ value: v1 }, { value: v2 }) => ({ value: v1 - v2 }),
      inc: ({ value: v1 }, { value: v2 }) => ({ value: v1 + v2 }),
      incOne: ({ value: v1 }) => ({ value: v1 + 1 })
    },
    ...effects
  );

test('dispatching bound action updates primitive state accordingly', done => {
  const { dispatch, state } = Store(1, {
    inc: (s, patch) => s + patch
  });

  onEmit(done, state, 4);

  dispatch('inc', 3);
});

test('dispatching bound action updates complex state accordingly', done => {
  const { dispatch, state } = testStore(1);

  onEmit(done, state, { value: 4 });

  dispatch('inc', { value: 3 });
});

test('dispatching bound, unary action updates complex state accordingly', done => {
  const { dispatch, state } = testStore(3);

  onEmit(done, state, { value: 4 });

  dispatch('incOne');
});

test('dispatching free action updates primitive state accordingly', done => {
  const { dispatch, state } = Store(42, {});

  onEmit(done, state, 50);

  dispatch((x: number) => x + 8);
});

test('dispatching free action updates complex state accordingly', done => {
  const { dispatch, state } = Store({ value: 42 }, {});

  onEmit(done, state, { value: 50 });

  dispatch(({ value }) => ({ value: value + 8 }));
});

test('consequent changes are getting applied correctly', done => {
  const { dispatch, state } = testStore(42);

  state
    .pipe(skip(2), map(s => expect(s).toEqual({ value: 60 })))
    .subscribe(done);

  dispatch('inc', { value: 5 });
  dispatch(({ value }) => ({ value: value + 15 }));
  dispatch('dec', { value: 2 });
});

test('late subscribers receive up-to-date state', done => {
  const { dispatch, state } = testStore(42);

  dispatch('inc', { value: 5 });
  dispatch(({ value }) => ({ value: value + 15 }));
  dispatch('inc', { value: 8 });

  state.pipe(map(s => expect(s).toEqual({ value: 70 }))).subscribe(done);
});

test('effects are triggered', done => {
  let counter = 0;
  const { dispatch, state } = testStore(0, () => counter++);

  dispatch('inc', { value: 42 });
  dispatch('inc', { value: 42 });

  state.pipe(tap(() => expect(counter).toBe(2))).subscribe(() => done());
});

test('effects are triggered per action rather than per subscriber', done => {
  let counter = 0;
  const { dispatch, state } = testStore(0, () => counter++);

  // tslint:disable-next-line: no-console
  state.subscribe(() => console.log('subscribed early'));

  dispatch('inc', { value: 42 });
  dispatch('inc', { value: 42 });

  state.pipe(tap(() => expect(counter).toBe(2))).subscribe(() => done());
});
