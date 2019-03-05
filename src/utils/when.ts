import { Functor, Pred } from '../../types';
import { Id } from './id';

export function when<T0, R = T0, T1 = T0>(
  pred: Pred<T0 | T1>,
  fn: Functor<T0, R>
) {
  return (arg: T0 | T1) => (pred(arg) ? fn(arg as T0) : Id(arg as T1)) as any;
}
