[![Build Status](https://travis-ci.org/tanfonto/storx.svg?branch=master)](https://travis-ci.org/tanfonto/storx)
[![Coverage Status](https://coveralls.io/repos/github/tanfonto/storx/badge.svg?branch=master)](https://coveralls.io/github/tanfonto/storx?branch=master)
[![CodeFactor](https://www.codefactor.io/repository/github/tanfonto/storx/badge)](https://www.codefactor.io/repository/github/tanfonto/storx)
[![dependencies Status](https://david-dm.org/tanfonto/storx/status.svg)](https://david-dm.org/tanfonto/storx)
[![devDependencies Status](https://david-dm.org/tanfonto/storx/dev-status.svg)](https://david-dm.org/tanfonto/storx?type=dev)
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)

## | storx |

Dead simple state management built with [RxJS](https://github.com/ReactiveX/RxJS) & [TypeScript](https://github.com/Microsoft/TypeScript) in just few lines of code;

#### about

- functional, statically typed codebase;
- small and concise;
- dependency-free (minus RxJS, obviously);
- dead simple api (see 'usage' below and tests);
- RxJS compatible, meaning you can plug it into your streams right away;

#### installation

```
npm i @tanfonto/storx
```

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
    dec: ({ value: v1 }: No, { value: v2 }: No) => ({ value: v1 - v2 })
  }
);

// subscribe to state changes
store().subscribe(console.log);

// dispatch 'inc' action
store({ action: 'inc', payload: { value: 4 } });
// dispatch 'dec' action
store({ action: 'dec', payload: { value: 2 } });

// dispatch 'anonymous' action
store((x: No) => ({ value: x.value + 3 }));

// dispatch parametrised 'anonymous' action from closure
function closure(val: number) {
  store((x: No) => ({ value: x.value + val }));
}

closure(4);

// output:
// { value: 5 }
// { value: 3 }
// { value: 6 }
// { value: 10 }

// since 1.1 - declare a (pre) state update side effect
const storeWithEffects = Store(
  { value: 1 },
  {
    inc: ({ value: v1 }, { value: v2 }) => ({ value: v1 + v2 })
  },
  console.log
);

storeWithEffects(['inc', { value: 42 }]);
storeWithEffects().subscribe(console.log);
storeWithEffects().subscribe(console.log);

// output (note that side effect was only triggered once despite 2 subscribe registrations):
// [ 'inc', { value: 42 } ]
// { value: 43 }
// { value: 43 }
```
