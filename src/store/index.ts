import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, scan } from 'rxjs/operators';
import { Effect, Functor, Nilable } from '../../types';
import { guard, isArray, isFunction } from '../utils';
import { ap } from './apply';
import { ActionPayload, ActionsConfig } from './types';
import { withEffects } from './with-effects';

export function Store<
  S,
  P = S,
  Config extends ActionsConfig<S, P> = ActionsConfig<S, P>,
  Payload extends ActionPayload<S, P, Config> = ActionPayload<S, P, Config>
>(initialState: S, actions: Config, ...effects: Array<Effect<S>>) {
  const state = new Subject<Functor<S>>();
  const changes = state.pipe(
    scan<Functor<S>, S>(
      // compose<[S, Functor<S>]>(ap),
      (x, f) => withEffects(...effects)(ap(x, f)),
      initialState
    ),
    distinctUntilChanged()
  );
  const bound = ([key, payload]: Payload) => (state: S) =>
    actions[key](state, payload);

  function out(): Observable<S>;
  function out(patch?: Nilable<Functor<S> | Payload>): void;
  function out(patch?: Nilable<Functor<S> | Payload>) {
    if (guard<Functor<S>>(patch, isFunction)) return state.next(patch);
    else if (guard<Payload>(patch, isArray)) return state.next(bound(patch));
    return changes;
  }

  return out;
}
