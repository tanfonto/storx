import { map, tap } from 'rxjs/operators';
import { calculateState } from './calculate-state';
import { findAction } from './find-action';
import { of } from './of';
import { runEffects } from './run-effects';

export function Store<S, P = S>(
  initialState: S,
  config: StoreConfig<S, P>,
  ...effects: Array<Effect<S>>
) {
  const { observable, next } = of<S, P>();
  const state = observable.pipe(
    tap<ActionRecord<S, P>>(runEffects(...effects)),
    map(findAction(config)),
    calculateState<S>(initialState)
  );

  return {
    _history: observable,
    dispatch: next,
    state
  };
}
