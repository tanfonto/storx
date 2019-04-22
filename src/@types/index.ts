declare type Dispatchable<S, P> = (state: S, patch: P) => S;
declare type ActionsConfig<S, P> = Dictionary<Dispatchable<S, P>>;
declare type ActionEntry<S, P> = EntryOf<ActionsConfig<S, P>, P>;
declare type ActionPayload<S, P> = [Functor<S>] | ActionEntry<S, P>;
declare type ActionRecord<
  S,
  P,
  T extends ActionPayload<S, P> = ActionPayload<S, P>
> = T extends ActionEntry<S, P>
  ? { args: null; functor: Functor<S> }
  : { args: ActionEntry<S, P>; functor: null };
