import { Dictionary, BiFunctor, Entry } from '../../types';

export type Setup<T, P> = Dictionary<BiFunctor<T, P>>;
export type Params<T, P> = Entry<Dictionary<BiFunctor<T, P>>, P>;
