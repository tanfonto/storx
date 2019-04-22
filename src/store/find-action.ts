export function findAction<S, P>(config: ActionsConfig<S, P>) {
  return ({ args, functor }: ActionRecord<S, P>) =>
    functor ||
    ((state: S) => {
      const [ key, payload ] = args as ActionEntry<S, P>;
      return config[key](state, payload);
    });
}
