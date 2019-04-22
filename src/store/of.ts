import { ReplaySubject } from 'rxjs';
import { head, isFunction } from '../utils';

const template = (src: object) =>
  Object.assign({ args: null, functor: null }, src);

const normalize = <S, P>(
  args: ActionPayload<S, P>
): ActionRecord<S, P, ActionPayload<S, P>> =>
  template(isFunction(head(args)) ? { functor: head(args) } : { args }) as any;

export const of = <S>() => {
  const src = new ReplaySubject<ActionRecord<S, any>>();
  return {
    next: <P = any>(...args: ActionPayload<S, P>) => src.next(normalize(args)),
    observable: src.asObservable()
  };
};
