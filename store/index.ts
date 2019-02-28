import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, scan } from 'rxjs/operators';
import { Effect, Functor, Nilable } from '../types';
import { guard, isArray, isFunction, tap } from '../utils';
import { ActionsConfig, ActionPayload } from './types';

export const withEffects = <T>(...effects: Array<Effect<T>>) => (
  state: T,
  fn: Functor<T>
) => tap(fn, x => effects.forEach(eff => eff(x)))(state);

export function Store<
  S,
  P = S,
  Actions extends ActionsConfig<S, P> = ActionsConfig<S, P>,
  Payload extends ActionPayload<S, P, Actions> = ActionPayload<S, P, Actions>
>(initialState: S, actions: Actions, ...effects: Array<Effect<S>>) {
  const ap = new Subject<Functor<S>>();
  const stateChanges = ap.pipe(
    scan(withEffects(...effects), initialState),
    distinctUntilChanged()
  );
  const proceed = ap.next;
  const bound = ([ key, payload ]: Payload) => (state: S) =>
    actions[key](state, payload);

  function out(): Observable<S>;
  function out(patch?: Nilable<Functor<S> | Payload>): void;
  function out(patch?: Nilable<Functor<S> | Payload>) {
    if (guard<Functor<S>>(patch, isFunction)) return proceed(patch);
    else if (guard<Payload>(patch, isArray)) return proceed(bound(patch));
    return stateChanges;
  }

  return out;
}
