export declare function findAction<S, P>(config: ActionsConfig<S, P>): ({ args, functor }: {
    args: null;
    functor: Functor<S, S>;
} | {
    args: [string | number, P];
    functor: null;
}) => Functor<S, S>;
