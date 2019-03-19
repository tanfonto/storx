import { ReplaySubject } from 'rxjs';
import { Functor } from '../../types';
import { head, len } from '../utils';
import { ActionPayload, ActionRecord } from './types';

const { assign, is } = Object;
const record = (src: object) => assign({ args: null, functor: null }, src);
const isFunctor = <S, P>(p: ActionPayload<S, P>): p is [Functor<S>] =>
  is(len(p), 1);

const normalize = <S, P>(
  args: ActionPayload<S, P>
): ActionRecord<S, P, ActionPayload<S, P>> =>
  record(isFunctor(args) ? { functor: head(args) } : { args }) as any;

export const of = <S, P>() => {
  const src = new ReplaySubject<ActionRecord<S, P>>();
  return {
    observable: src.asObservable(),
    next: (...args: ActionPayload<S, P>) => src.next(normalize(args))
  };
};
