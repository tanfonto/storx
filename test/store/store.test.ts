import { GenericCallbackTestContext, test } from 'ava-ts';
import { map, skip } from 'rxjs/operators';
import { Store } from '../../src/store/index';

type Ctx<T = any> = GenericCallbackTestContext<T>;
interface Box<T = number> {
  value: T;
}

const willAssert = <T>(t: Ctx, store: (arg?: any) => any, expected: T) => {
  store()
    .pipe(map(s => t.deepEqual(s, expected)))
    .subscribe(t.end);
};

test.cb('dispatching bound action updates primitive state accordingly', t => {
  const store = Store(1, { inc: (state, patch) => state + patch });

  willAssert(t, store, 4);

  store(['inc', 3]);
});

test.cb('dispatching bound action updates complex state accordingly', t => {
  const store = Store(
    { value: 1 },
    {
      inc: ({ value: v1 }: Box, { value: v2 }: Box) => ({
        value: v1 + v2
      })
    }
  );

  willAssert(t, store, { value: 4 });

  store(['inc', { value: 3 }]);
});

test.cb('dispatching free action updates primitive state accordingly', t => {
  const store = Store(42, {});

  willAssert(t, store, 50);

  store((x: number) => x + 8);
});

test.cb('dispatching free action updates complex state accordingly', t => {
  const store = Store({ value: 42 }, {});

  willAssert(t, store, { value: 50 });

  store(({ value }: Box) => ({ value: value + 8 }));
});

test.cb('a n > 1 chain of changes produces valid output', t => {
  const store = Store(
    { value: 42 },
    {
      inc: ({ value: v1 }: Box, { value: v2 }: Box) => {
        return { value: v1 + v2 };
      }
    }
  );

  store()
    .pipe(
      skip(2),
      map(s => t.deepEqual(s, { value: 70 }))
    )
    .subscribe(t.end);

  store(({ value }: Box) => ({ value: value + 8 }));
  store(['inc', { value: 5 }]);
  store(({ value }: Box) => ({ value: value + 15 }));
});
