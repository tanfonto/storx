import { Observable, ReplaySubject } from 'rxjs';
import { map, scan, shareReplay, tap } from 'rxjs/operators';
import { Effect, Functor } from '../../types';
import { isArray, isEmpty, when, head, len } from '../utils';
import { ap } from './apply';
import { doEffects } from './do-effects';
import { ActionDetails, Config } from './types';

function resolve<S, P>(config: Config<S, P>) {
  return ([key, payload]: ActionDetails<S, P>) => (state: S) =>
    config[key](state, payload);
}

const unpack = when<any[]>(x => len(x) === 1, head);

export function Store<S, P = S>(
  initialState: S,
  config: Config<S, P>,
  ...effects: Array<Effect<S>>
) {
  const state = new ReplaySubject();
  const changes = state.pipe(
    tap(doEffects(...effects)),
    map(when(isArray, resolve(config))),
    scan<Functor<S>, S>(ap, initialState),
    shareReplay(1)
  );

  function main(): Observable<S>;
  function main(xf: Functor<S>): void;
  function main(action: keyof Config<S, P>, payload: P): void;
  function main(...args: [Functor<S>] | ActionDetails<S, P>) {
    return isEmpty(args) ? changes : state.next(unpack(args));
  }

  return main;
}
