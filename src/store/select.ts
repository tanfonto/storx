import { ActionRecord, StoreConfig } from './types';

export function select<S, P>(config: StoreConfig<S, P>) {
  return ({ args, functor }: ActionRecord<S, P>) =>
    functor ||
    ((state: S) => {
      const [key, payload] = args;
      return config[key](state, payload);
    });
}
