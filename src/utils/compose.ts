import { Functor } from '../../types';

export const compose = <T extends any[] = any[]>(...fns: Functor<T, any>[]) => (
  ...args: T
) => fns.reduceRight((x, f) => f.call(null, x), args);
