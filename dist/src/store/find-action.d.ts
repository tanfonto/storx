export declare function findAction<S, P>(config: ActionsConfig<S, P>): ({ args, Functor }: {
    args: [string | number, P];
    Functor: null;
} | {
    args: null;
    Functor: Functor<S, S>;
}) => Functor<S, S>;
