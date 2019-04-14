import { Functor } from '../../types';
export declare const apply: <T, F extends Functor<T, T>>(payload: T, xf: F) => T;
