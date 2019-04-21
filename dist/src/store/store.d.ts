export declare function Store<S, P = S>(initialState: S, config: StoreConfig<S, P>, ...effects: Array<Effect<S>>): {
    _history: import("rxjs").Observable<{
        args: [string | number, P];
        functor: null;
    } | {
        args: null;
        functor: Functor<S, S>;
    }>;
    dispatch: (...args: ActionPayload<S, P>) => void;
    state: import("rxjs").Observable<{}>;
};
