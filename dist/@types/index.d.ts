declare type Key = string | number;
declare type Nilable<T> = T | undefined | null;
declare type EntryOf<T0 = any, T1 = T0> = [keyof T0, T1];
interface Dictionary<T> {
    [key: string]: T;
    [key: number]: T;
}
declare type BiFunctor<T0 = any, T1 = T0, R = T0> = ((arg0: T0, arg1: T1) => R);
declare type Functor<T = any, R = T> = (arg: T) => R;
declare type Pred<T = any> = Functor<T, boolean>;
declare type Effect<T = any> = (state: T) => void;
