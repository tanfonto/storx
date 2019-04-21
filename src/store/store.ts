import { map, tap } from 'rxjs/operators';
import { runEffects } from './run-effects';
import { calculate } from './calculate-state';
import { of } from './of';
import { find } from './find-action';

export function Store<S, P = S>(
  initialState: S,
  config: StoreConfig<S, P>,
  ...effects: Array<Effect<S>>
) {
  const { observable, next } = of<S, P>();
  const state = observable.pipe(
    tap<ActionRecord<S, P>>(runEffects(...effects)),
    map(find(config)),
    calculate<S>(initialState)
  );

  return {
    _history: observable,
    dispatch: next,
    state
  };
}
