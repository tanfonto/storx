import { ActionEntry, StoreConfig } from './types';

export function match<S, P>(config: StoreConfig<S, P>) {
  return ([key, payload]: ActionEntry<S, P>) => (state: S) =>
    config[key](state, payload);
}
