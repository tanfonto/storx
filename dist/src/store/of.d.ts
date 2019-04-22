export declare const normalize: <S, P>(args: ActionPayload<S, P>) => {
    args: null;
    Functor: Functor<S, S>;
} | {
    args: [string | number, P];
    Functor: null;
};
export declare const of: <S, P>() => {
    next: (...args: ActionPayload<S, P>) => void;
    observable: import("rxjs").Observable<{
        args: null;
        Functor: Functor<S, S>;
    } | {
        args: [string | number, P];
        Functor: null;
    }>;
};
