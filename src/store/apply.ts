import { Functor } from '../../types';

export const ap = <T, F extends Functor<T>>(payload: T, xf: F) => xf(payload);
