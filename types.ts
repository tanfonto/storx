export type Nilable<T> = T | undefined;
export type Entry<T0 = any, T1 = T0> = [keyof T0, T1];
export interface Dictionary<T> {
  [key: string]: T;
  [key: number]: T;
}
export type Functor<T = any, R = T> = (left: T) => R;
export type BiFunctor<T, P = T, R = T> = (...args: [T, P]) => R;
export type Pred<T = any> = Functor<T, boolean>;
export type Effect<T> = (state: T) => void;
export type MultiFunctor<T extends any[] = any[], R = any> = (...args: T) => R;
