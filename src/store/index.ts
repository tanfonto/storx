import { Subject } from 'rxjs';
import { distinctUntilChanged, map, scan, tap } from 'rxjs/operators';
import { Effect, Functor } from '../../types';
import { isArray, isNil } from '../utils';
import { If, when } from '../utils/conditional';
import { ap } from './apply';
import { Params, Setup } from './types';
import { withEffects } from './with-effects';

function bind<S, P>(setup: Setup<S, P>) {
  return ([key, payload]: Params<S, P>) => (state: S) =>
    setup[key](state, payload);
}

export function Store<
  S,
  P = S,
  Payload extends Params<S, P> | Functor<S> = Params<S, P> | Functor<S>
>(initialState: S, setup: Setup<S, P>, ...effects: Array<Effect<S>>) {
  const state = new Subject<Payload>();
  const changes = state.pipe(
    tap(withEffects(...effects)),
    map(when(isArray, bind(setup))),
    scan<Functor<S>, S>(ap, initialState),
    distinctUntilChanged()
  );

  return If(isNil, () => changes, (x: Payload) => state.next(x));
}
