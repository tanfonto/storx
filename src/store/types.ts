import { Dictionary, BiFunctor, Entry } from '../../types';

export type ActionsConfig<T, P> = Dictionary<BiFunctor<T, P>>;
export type ActionPayload<T, P, C extends ActionsConfig<T, P>> = Entry<C, P>;
