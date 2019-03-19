import { BiFunctor, Dictionary, EntryOf, Functor } from '../../types';

export type StoreConfig<T, U> = Dictionary<BiFunctor<T, U>>;
export type ActionEntry<T, U> = EntryOf<Dictionary<BiFunctor<T, U>>, U>;
export type ActionPayload<S, P> = [Functor<S>] | ActionEntry<S, P>;
export type ActionRecord<
  S,
  P,
  T extends ActionPayload<S, P> = ActionPayload<S, P>
> = T extends ActionEntry<S, P>
  ? { args: never; functor: Functor<S> }
  : { args: ActionEntry<S, P>; functor: never };
