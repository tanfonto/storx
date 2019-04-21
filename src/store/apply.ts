export const apply = <T, F extends Functor<T>>(payload: T, xf: F) =>
  xf(payload);
