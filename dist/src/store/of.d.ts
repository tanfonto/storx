export declare const of: <S>() => {
    next: <P = any>(...args: ActionPayload<S, P>) => void;
    observable: import("rxjs").Observable<{
        args: ActionEntry<S, any, string | number>;
        functor: null;
    } | {
        args: null;
        functor: Functor<S, S>;
    }>;
};
