import { ActionEntry, ActionRecord, StoreConfig } from './types';

export function select<S, P>(config: StoreConfig<S, P>) {
  return ({ args, functor }: ActionRecord<S, P>) =>
    functor ||
    ((state: S) => {
      const [key, payload] = args as ActionEntry<S, P>;
      return config[key](state, payload);
    });
}
