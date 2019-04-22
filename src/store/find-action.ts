export function findAction<S, P>(config: ActionsConfig<S, P>) {
  return ({ args, Functor }: ActionRecord<S, P>) =>
    Functor ||
    ((state: S) => {
      const [key, payload] = args as ActionEntry<S, P>;
      return config[key](state, payload);
    });
}
