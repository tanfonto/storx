declare type Dispatchable<S, P> = (state: S, patch: P) => S | ((state: S) => S);
declare type ActionsConfig<S, P = any> = Dictionary<Dispatchable<S, P>>;
declare type ActionEntry<S, P> = EntryOf<ActionsConfig<S, P>, P> | [ keyof ActionsConfig<S, P>];
declare type ActionPayload<S, P> = [Functor<S>] | ActionEntry<S, P>;
declare type ActionRecord<
  S,
  P,
  T extends ActionPayload<S, P> = ActionPayload<S, P>
> = T extends ActionEntry<S, P>
  ? { args: ActionEntry<S, P>; functor: null }
  : { args: null; functor: Functor<S> };
