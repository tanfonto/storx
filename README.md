[![Build Status](https://travis-ci.org/tanfonto/storx.svg?branch=master)](https://travis-ci.org/tanfonto/storx)
[![Coverage Status](https://coveralls.io/repos/github/tanfonto/storx/badge.svg?branch=master)](https://coveralls.io/github/tanfonto/storx?branch=master)
[![CodeFactor](https://www.codefactor.io/repository/github/tanfonto/storx/badge)](https://www.codefactor.io/repository/github/tanfonto/storx)

## | storx |
Dead simple state management built with [RxJS](https://github.com/ReactiveX/RxJS)

#### about
* 100% functional TypeScript codebase;
* small and focused;
* dependency-free (with an exception of RxJS, obviously);
* dead simple api (see usage & tests);
* RxJS compatible, meaning you can plug it into your pipeline right away;

#### usage

```typescript
  import { Store } from '@tanfonto/storx';

  type No = { value: number };

  const store = Store(
    // initial state
    { value: 1 },
    // a key / value map of action reducers
    {
      inc: ({ value: v1 }: No, { value: v2 }: No) => ({ value: v1 + v2 }),
      dec: ({ value: v1 }: No, { value: v2 }: No) => ({ value: v1 - v2 }),
    }
  );

  // subscribe to state changes
  store().subscribe(console.log);

  // dispatch 'inc' action
  store({ action: 'inc', payload: { value: 4 } });
  // dispatch 'dec' action
  store({ action: 'dec', payload: { value: 2 } })

  // dispatch 'anonymous' action
  store((x: No) => ({ value: x.value + 3 }));

  // dispatch parametrised 'anonymous' action from closure
  function closure(val: number) {
    store((x: No) => ({ value: x.value + val }));  
  }

  closure(4)

  // output:
  // { value: 5 }
  // { value: 3 }
  // { value: 6 }
  // { value: 10 }
```
