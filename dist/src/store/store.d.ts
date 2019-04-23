export declare function Store<S>(initialState: S, config: ActionsConfig<S>, ...effects: Array<Effect<S>>): {
    _history: import("rxjs").Observable<{
        args: ActionEntry<S_1, any, string | number>;
        functor: null;
    } | {
        args: null;
        functor: Functor<S, S>;
    }>;
    dispatch: <P = any>(...args: ActionPayload<S, P>) => void;
    state: import("rxjs").Observable<S>;
};
