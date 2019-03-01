import { Functor } from '../types';

export const ap = <T, F extends Functor>(...[payload, xf]: [T, F]) =>
  xf(payload);
