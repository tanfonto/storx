import { Pred, Functor } from '../../types';
import { Id } from './id';

export const If = <T0, T1, R0 = T0, R1 = T1, S extends T0 | T1 = T0 | T1>(
  pred: Pred<S>,
  t: Functor<T0, R0>,
  f: Functor<T1, R1>
) => <P extends S = S>(x: P): P extends T0 ? R0 : R1 =>
  (pred(x) ? t(x as any) : f(x as any)) as any;

export const when = <T, R = T>(pred: Pred<T>, fn: Functor<T, R>) =>
  If<T, any, R>(pred, fn, Id);
