export declare type Key = string | number;
export declare type EntryOf<T0 = any, T1 = T0> = [keyof T0, T1];
export interface Dictionary<T> {
    [key: string]: T;
    [key: number]: T;
}
export declare type Functor<T = any, R = T> = (left: T) => R;
export declare type BiFunctor<T, P = T, R = T> = (...args: [T, P]) => R;
export declare type Pred<T = any> = Functor<T, boolean>;
export declare type Effect<T = any> = (state: T) => void;
