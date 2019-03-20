import { ReplaySubject } from 'rxjs';
import { head, len } from '../utils';
import { ActionPayload, ActionRecord } from './types';

const record = (src: object) =>
  Object.assign({ args: null, functor: null }, src);

const normalize = <S, P>(
  args: ActionPayload<S, P>
): ActionRecord<S, P, ActionPayload<S, P>> =>
  record(len(args) > 1 ? { args } : { functor: head(args) }) as any;

export const of = <S, P>() => {
  const src = new ReplaySubject<ActionRecord<S, P>>();
  return {
    observable: src.asObservable(),
    next: (...args: ActionPayload<S, P>) => src.next(normalize(args))
  };
};
