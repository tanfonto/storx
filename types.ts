export type Key = string | number;
export type EntryOf<T0 = any, T1 = T0> = [keyof T0, T1];
export interface Dictionary<T> {
  [key: string]: T;
  [key: number]: T;
}
export type Functor<T = any, R = T> = (left: T) => R;
export type BiFunctor<T, P = T, R = T> = (...args: [T, P]) => R;
export type Pred<T = any> = Functor<T, boolean>;
export type Effect<T = any> = (state: T) => void;
