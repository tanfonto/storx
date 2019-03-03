import { Dictionary, BiFunctor, Entry } from '../../types';

export type Actions<T, P> = Dictionary<BiFunctor<T, P>>;
export type Action<T, P> = Entry<Dictionary<BiFunctor<T, P>>, P>;
