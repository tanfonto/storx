export type Nilable<T> = T | undefined;
export type Pair<T0 = any, T1 = T0> = [T0, T1];
export type Entry<T0 = any, T1 = T0> = [keyof T0, T1];
export interface Dictionary<T> {
  [key: string]: T;
  [key: number]: T;
}
export type Functor<T = any, R = T> = (state: T) => R;
export type BiFunctor<T, P = T, R = T> = (state: T, patch: P) => R;
export type Effect<T> = (state: T) => void;
