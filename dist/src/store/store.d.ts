export declare function Store<S, P = S>(initialState: S, config: ActionsConfig<S, P>, ...effects: Array<Effect<S>>): {
    _history: import("rxjs").Observable<{
        args: null;
        Functor: Functor<S, S>;
    } | {
        args: [string | number, P];
        Functor: null;
    }>;
    dispatch: (...args: ActionPayload<S, P>) => void;
    state: import("rxjs").Observable<{}>;
};
