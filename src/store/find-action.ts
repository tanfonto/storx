export function findAction<S>(config: ActionsConfig<S>) {
  return <P = any>({ args, functor }: ActionRecord<S, P>) =>
    functor ||
    (((state: S) => {
      const [ key, payload ] = args as ActionEntry<S, P>;
      return config[key](state, payload);
    }) as Functor<S>);
}
