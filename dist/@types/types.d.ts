export declare type Nilable<T> = T | undefined;
export declare type Pair<T0 = any, T1 = T0> = [T0, T1];
export declare type Entry<T0 = any, T1 = T0> = [keyof T0, T1];
export interface Dictionary<T> {
    [key: string]: T;
    [key: number]: T;
}
export declare type Functor<T = any, R = T> = (state: T) => R;
export declare type BiFunctor<T, P = T, R = T> = (state: T, patch: P) => R;
export declare type Effect<T> = (state: T) => void;
