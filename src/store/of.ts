import { ReplaySubject } from 'rxjs';
import { head, len } from '../utils';
import { ActionPayload, ActionRecord } from './types';

const template = (src: object) =>
  Object.assign({ args: null, functor: null }, src);

export const normalize = <S, P>(
  args: ActionPayload<S, P>
): ActionRecord<S, P, ActionPayload<S, P>> =>
  template(len(args) > 1 ? { args } : { functor: head(args) }) as any;

export const of = <S, P>() => {
  const src = new ReplaySubject<ActionRecord<S, P>>();
  return {
    next: (...args: ActionPayload<S, P>) => src.next(normalize(args)),
    observable: src.asObservable()
  };
};
