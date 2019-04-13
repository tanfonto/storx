[![Build
Status](https://travis-ci.org/tanfonto/storx.svg?branch=master)](https://travis-ci.org/tanfonto/storx) [![Coverage Status](https://coveralls.io/repos/github/tanfonto/storx/badge.svg?branch=master)](https://coveralls.io/github/tanfonto/storx?branch=master)
[![CodeFactor](https://www.codefactor.io/repository/github/tanfonto/storx/badge)](https://www.codefactor.io/repository/github/tanfonto/storx)
[![dependencies
Status](https://david-dm.org/tanfonto/storx/status.svg)](https://david-dm.org/tanfonto/storx) [![devDependencies Status](https://david-dm.org/tanfonto/storx/dev-status.svg)](https://david-dm.org/tanfonto/storx?type=dev)
[![MIT
license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)

## | storx |

Centralised, flexible state management built with
[RxJS](https://github.com/ReactiveX/RxJS) &
[TypeScript](https://github.com/Microsoft/TypeScript) in just few lines
of code;

### about

-   functional, statically typed codebase;

-   small and concise;

-   dependency-free (minus RxJS, obviously);

-   dead simple api (see 'usage' below and tests);

-   RxJS compatible, meaning you can plug it into your streams right
  away;

### installation

```
npm i @tanfonto/storx
```

### usage

#### Basic example

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

const { state, dispatch } = store;

// subscribe to state changes
state.subscribe(console.log);

// dispatch 'inc' action
dispatch('inc', { value: 4 });
// dispatch 'dec' action
dispatch('dec', { value: 2 });

// dispatch 'anonymous' action
dispatch((x: No) => ({ value: x.value + 3 }));

// dispatch parametrised 'unbound' action from closure
function closure(val: number) {
  dispatch((x: No) => ({ value: x.value + val }));
}

closure(4);

// output:
// { value: 5 }
// { value: 3 }
// { value: 6 }
// { value: 10 }
```

#### Using pre-update side effects

```typescript
// since 1.1 - declare a (pre) state update side effect
const storeWithEffects = Store(
  { value: 1 },
  {
    inc: ({ value: v1 }, { value: v2 }) => ({ value: v1 + v2 })
  },
  // Here's the place:
  console.log
);

const { state, dispatch } = store;

dispatch('inc', { value: 42 });
state.subscribe(console.log);
state.subscribe(console.log);

// output (note that side effect was only triggered once despite two 'subscribe' registrations):
// [ 'inc', { value: 42 } ]
// { value: 43 }
// { value: 43 }
```

#### Building blocks & composition

`of : () s p -> SubjectLike ActionRecord s p`

creates a (private) instance of ReplaySubject and returns it converted to
Observable extended with custom `next` function that may take one of two forms:

```
- Functor s -> void
- (key, payload) -> void
```

`doEffects : [ (ActionRecord s p -> void) ] -> void`

fires a list of unary functions with a tuple of (key,
payload) representing action name and patch data as their first and only
argument.

```select : Config s p -> ActionRecord s p -> (Functor s | (p -> Functor s))```

given configuration object, keys of which represent actions names and
values describing binary functions of (state, patch) and argument being
a tuple of (key, payload) or unary function it will detect which of
these forms was used and either shorten a binary functor to curried
unary version bound to patch data or pass the free (unary) one for
further processing.

`fold : state -> Observable Functor s -> Observable s`

runs the emitted functor against current state and emits the result.

The exemplary `Store` implementation consists of these 4 composed in
above order, wrapped in appropriate RxJS operators. Exposing isolated
pipes brings an opportunity of reimplementation to ones flavour, i.e. by
injecting additional pipes or cutting some of the logic.

Please note that 'functor' is used to describe the 'map' function
of CT functor rather than container itself as it is always used in a
context of observable mapping.

#### History api / time travelling

Incoming.
