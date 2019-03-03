import { Subject } from 'rxjs';
import { distinctUntilChanged, map, scan, tap as rxTap } from 'rxjs/operators';
import { Effect, Functor } from '../../types';
import { isArray, isNil } from '../utils';
import { If, when } from '../utils/conditional';
import { ap } from './apply';
import { Action, Actions } from './types';
import { withEffects } from './with-effects';

export const bind = <S, P>(actions: Actions<S, P>) => ([key, payload]: Action<
  S,
  P
>) => (state: S) => actions[key](state, payload);

export function Store<
  S,
  P = S,
  Payload extends Action<S, P> = Action<S, P>,
  In extends Payload | Functor<S> = Payload | Functor<S>
>(initialState: S, actions: Actions<S, P>, ...effects: Array<Effect<S>>) {
  const state = new Subject<In>();
  const changes = state.pipe(
    rxTap(withEffects(...effects)),
    map(when(isArray, bind(actions))),
    scan<Functor<S>, S>(ap, initialState),
    distinctUntilChanged()
  );

  return If(isNil, () => changes, (x: In) => state.next(x));
}
