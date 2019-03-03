import { Pred, Functor } from '../../types';
import { guard } from './guard';
import { Id } from './id';

export const If = <T0, T1, R0 = T0, R1 = T1, P = T0 | T1>(
  pred: Pred<P>,
  t: Functor<T0, R0>,
  f: Functor<T1, R1>
) => (x: P): P extends T0 ? R0 : R1 =>
  (guard<T0>(pred)(x) ? t(x) : f((x as unknown) as T1)) as any;

export const when = <T, R = T>(pred: Pred<T>, fn: Functor<T, R>) =>
  If<T, any, R>(pred, fn, Id);
