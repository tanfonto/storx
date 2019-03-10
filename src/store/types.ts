import { BiFunctor, Dictionary, EntryOf, Functor } from '../../types';

export type Config<T, U> = Dictionary<BiFunctor<T, U>>;
export type ActionDetails<T, U> = EntryOf<Dictionary<BiFunctor<T, U>>, U>;
export type ActionPayload<S, P> = [Functor<S>] | ActionDetails<S, P>;
