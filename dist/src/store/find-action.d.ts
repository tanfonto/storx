export declare function findAction<S>(config: ActionsConfig<S>): <P = any>({ args, functor }: {
    args: ActionEntry<S, P>;
    functor: null;
} | {
    args: null;
    functor: Functor<S, S>;
}) => Functor<S, S>;
