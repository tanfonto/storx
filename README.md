[![Build
Status](https://travis-ci.org/tanfonto/storx.svg?branch=master)](https://travis-ci.org/tanfonto/storx) [![Coverage Status](https://coveralls.io/repos/github/tanfonto/storx/badge.svg?branch=master)](https://coveralls.io/github/tanfonto/storx?branch=master)
[![CodeFactor](https://www.codefactor.io/repository/github/tanfonto/storx/badge)](https://www.codefactor.io/repository/github/tanfonto/storx)
[![dependencies
Status](https://david-dm.org/tanfonto/storx/status.svg)](https://david-dm.org/tanfonto/storx) [![devDependencies Status](https://david-dm.org/tanfonto/storx/dev-status.svg)](https://david-dm.org/tanfonto/storx?type=dev)
[![MIT
license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)

## | storx |

Centralised state management powered by
[RxJS](https://github.com/ReactiveX/RxJS) &
[TypeScript](https://github.com/Microsoft/TypeScript);

*   [`Features`](#Features)
*   [`Installation`](#Installation)
*   [`Usage examples`](#Usage-examples)
*   [`Core concepts`](#Core-concepts)
*   [`Building blocks and
composition`](#Building-blocks-and-composition)
*   [`Incoming`](#Incoming)

### Features

*   small and concise;

*   dependency-free (minus RxJS, obviously);

*   dead simple api (see 'usage' below and tests);

*   RxJS compatible, meaning you can plug it into your streams right
    away;

*   functional, statically typed codebase;

### Installation

```
npm i @tanfonto/storx
```
or

```
yarn add @tanfonto/storx
```

### Usage examples

#### basic

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

#### with pre-update side effects

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

### Core concepts

#### actions

In contrast to popular state management libraries, `Storx` actions
represent actual transformations rather then intents or descriptors.
This decision has obvious flexibility / granularity implications but
also helps reducing boilerplate and overall complexity. It's a
simplicity-oriented tradeoff but the main driver for this design is to
serve as a lightweight
[scan](http://reactivex.io/documentation/operators/scan.html) operator
wrapper and RxJS pipeline rather than custom state management
implementation.

#### state calculation

Because of how `Storx` defines actions it does not need an
explicit `reducer` layer. Whatever gets dispatched to the store will
implicitly transform the state and emit the result to subscribers.

#### listening to state changes

Given `Store` instance is an RxJS observable the only functional
limatation  to its streaming capabilities is RxJS api pipeline, meaning
more or less -  unlimited power, some ideas follow:

*   Streamlining your store emissions with external sources using
[combination](https://www.learnrxjs.io/operators/combination/)
operators;

*   Subsetting your state for particular listeners (aks `selectors` or
`view-models`) with
[transformation](https://www.learnrxjs.io/operators/transformation/)
operators, i.e.
[map](https://www.learnrxjs.io/operators/transformation/map.html),
[pluck](https://www.learnrxjs.io/operators/transformation/pluck.html);

*   Fine-grained performance optimizations with
with
[distinctUntilChanged](https://www.learnrxjs.io/operators/filtering/distinctuntilchanged.html), [audit](https://www.learnrxjs.io/operators/filtering/audit.html), [debounce](https://www.learnrxjs.io/operators/filtering/debounce.html) and others;  

### Building blocks and composition

`of : () s p -> SubjectLike ActionRecord s p`

Constructor. creates a (private) instance of ReplaySubject and returns
it converted to Observable extended with custom `next` function that may
take one of two forms:

```
- Functor s -> void
- (key, payload) -> void
```

`runEffects : [ (ActionRecord s p -> void) ] -> void`

fires a list of unary functions with a tuple of (key,
payload) representing action name and patch data as their first and only
argument.

```findAction : Config s p -> ActionRecord s p -> (Functor s | (p -> Functor s))```

given configuration object, keys of which represent actions names and
values describing binary functions of (state, patch) and argument being
a (1) tuple of (key, payload) or (2) unary function it will detect which of
these 2 forms was used and either shorten a binary functor to curried
unary version (by closing on patch data) or pass the free (unary) one for
further processing.

`calculateState : state -> Observable Functor s -> Observable s`

runs the emitted functor against current state and emits the result.

The exemplary `Store` implementation consists of these 4 composed in
above order, wrapped in appropriate RxJS operators. Exposing isolated
pipes brings an opportunity of reimplementation to ones flavour, i.e. by
injecting additional pipes or cutting some of the logic.

Please note that 'functor' is used to describe the 'map' function
of CT functor rather than container itself as it is always used in a
context of observable mapping.

### Incoming

*   History api / time travelling

*   Snapshots
