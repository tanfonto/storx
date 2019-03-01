import { Effect } from '../../types';

export const tap = <R, Args extends any[] = any[]>(
  fn: (...args: any[]) => R,
  eff: Effect<R>
) => (...args: Args) => {
  const out = fn.apply(null, args);
  return eff(out), out;
};
