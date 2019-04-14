import { ActionPayload } from './types';
export declare const normalize: <S, P>(args: ActionPayload<S, P>) => {
    args: null;
    functor: import("../../types").Functor<S, S>;
} | {
    args: [string | number, P];
    functor: null;
};
export declare const of: <S, P>() => {
    next: (...args: ActionPayload<S, P>) => void;
    observable: import("rxjs").Observable<{
        args: null;
        functor: import("../../types").Functor<S, S>;
    } | {
        args: [string | number, P];
        functor: null;
    }>;
};
