import { map, tap } from 'rxjs/operators';
import { Effect } from '../../types';
import { doEffects } from './do-effects';
import { fold } from './fold';
import { select } from './select';
import { of } from './of';
import { ActionRecord, StoreConfig } from './types';

export function Store<S, P = S>(
  initialState: S,
  config: StoreConfig<S, P>,
  ...effects: Array<Effect<S>>
) {
  const { observable, next } = of<S, P>();
  const state = observable.pipe(
    tap<ActionRecord<S, P>>(doEffects(...effects)),
    map(select(config)),
    fold<S>(initialState)
  );

  return {
    _history: observable,
    dispatch: next,
    state
  };
}
