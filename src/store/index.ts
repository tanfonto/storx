import { Observable, ReplaySubject } from 'rxjs';
import { map, scan, shareReplay, tap } from 'rxjs/operators';
import { Effect, Functor } from '../../types';
import { isArray, isNil, when } from '../utils';
import { ap } from './apply';
import { doEffects } from './do-effects';
import { ActionDetails, Config } from './types';

function resolve<S, P>(config: Config<S, P>) {
  return ([key, payload]: ActionDetails<S, P>) => (state: S) =>
    config[key](state, payload);
}

export function Store<
  S,
  P = S,
  ActionParams = ActionDetails<S, P> | Functor<S>
>(initialState: S, config: Config<S, P>, ...effects: Array<Effect<S>>) {
  const state = new ReplaySubject<ActionParams>();
  const changes = state.pipe(
    tap(doEffects(...effects)),
    map(when(isArray, resolve(config))),
    scan<Functor<S>, S>(ap, initialState),
    shareReplay(1)
  );

  function store(): Observable<S>;
  function store(arg: ActionParams): void;
  function store(arg?: ActionParams) {
    return isNil(arg) ? changes : state.next(arg);
  }

  return store;
}
