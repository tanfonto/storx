declare type ActionsConfig<S, P> = Dictionary<((state: S, patch: P) => S)>;
declare type ActionEntry<S, P> = EntryOf<ActionsConfig<S, P>, P>;
declare type ActionPayload<S, P> = [Functor<S>] | ActionEntry<S, P>;
declare type ActionRecord<
  S,
  P,
  T extends ActionPayload<S, P> = ActionPayload<S, P>
> = T extends ActionEntry<S, P>
  ? { args: ActionEntry<S, P>; Functor: null }
  : { args: null; Functor: Functor<S> };
