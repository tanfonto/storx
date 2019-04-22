export declare const of: <S, P>() => {
    next: (...args: ActionPayload<S, P>) => void;
    observable: import("rxjs").Observable<{
        args: [string | number, P];
        functor: null;
    } | {
        args: null;
        functor: Functor<S, S>;
    }>;
};
