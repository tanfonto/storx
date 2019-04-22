declare type Key = string | number;
declare type EntryOf<T0 = any, T1 = T0> = [keyof T0, T1];
declare interface Dictionary<T> {
  [key: string]: T;
  [key: number]: T;
}
declare type Functor<T = any, R = T> = (arg: T) => R;
declare type Pred<T = any> = Functor<T, boolean>;
declare type Effect<T = any> = (state: T) => void;
