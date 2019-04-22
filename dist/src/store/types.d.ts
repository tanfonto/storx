export declare type ActionsConfig<S, P> = Dictionary<BiFunctor<S, P> | Functor<S>>;
export declare type ActionEntry<S, P> = EntryOf<ActionsConfig<S, P>, P>;
export declare type ActionPayload<S, P> = [Functor<S>] | ActionEntry<S, P>;
export declare type ActionRecord<S, P, T extends ActionPayload<S, P> = ActionPayload<S, P>> = T extends ActionEntry<S, P> ? {
    args: null;
    functor: Functor<S>;
} : {
    args: ActionEntry<S, P>;
    functor: null;
};
