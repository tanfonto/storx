import { ReplaySubject } from 'rxjs';
import { head, isFunction } from '../utils';

const template = (src: object) =>
  Object.assign({ args: null, Functor: null }, src);

const normalize = <S, P>(
  args: ActionPayload<S, P>
): ActionRecord<S, P, ActionPayload<S, P>> =>
  template(isFunction(head(args)) ? { functor: head(args) } : { args }) as any;

export const of = <S, P>() => {
  const src = new ReplaySubject<ActionRecord<S, P>>();
  return {
    next: (...args: ActionPayload<S, P>) => src.next(normalize(args)),
    observable: src.asObservable()
  };
};
