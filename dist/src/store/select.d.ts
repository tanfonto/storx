import { StoreConfig } from './types';
export declare function select<S, P>(config: StoreConfig<S, P>): ({ args, functor }: {
    args: null;
    functor: import("../../types").Functor<S, S>;
} | {
    args: [string | number, P];
    functor: null;
}) => import("../../types").Functor<S, S>;
