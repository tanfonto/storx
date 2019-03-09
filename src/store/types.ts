import { BiFunctor, Dictionary, EntryOf } from '../../types';

export type Config<T, U> = Dictionary<BiFunctor<T, U>>;
export type ActionDetails<T, U> = EntryOf<Dictionary<BiFunctor<T, U>>, U>;
