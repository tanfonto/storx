import { Observable, ReplaySubject } from 'rxjs';
import { map, scan, shareReplay, tap } from 'rxjs/operators';
import { Effect, Functor } from '../../types';
import { isArray, isEmpty, when, head, len } from '../utils';
import { ap } from './apply';
import { doEffects } from './do-effects';
import { ActionDetails, Config, ActionPayload } from './types';

const { is } = Object;

function resolve<S, P>(config: Config<S, P>) {
  return ([key, payload]: ActionDetails<S, P>) => (state: S) =>
    config[key](state, payload);
}

export function Store<S, P = S>(
  initialState: S,
  config: Config<S, P>,
  ...effects: Array<Effect<S>>
) {
  const unpack = when<ActionPayload<S, P>>(x => is(len(x), 1), head);
  const state = new ReplaySubject<Functor<S> | ActionDetails<S, P>>();
  const changes = state.pipe(
    tap(doEffects(...effects)),
    map(when(isArray, resolve(config))),
    scan<Functor<S>, S>(ap, initialState),
    shareReplay(1)
  );

  function main(): Observable<S>;
  function main(xf: Functor<S>): void;
  function main(...args: ActionDetails<S, P>): void;
  function main(...args: ActionPayload<S, P>) {
    return isEmpty(args) ? changes : state.next(unpack(args));
  }

  return main;
}
