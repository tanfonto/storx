declare type StoreConfig<T, U> = Dictionary<BiFunctor<T, U>>;
declare type ActionEntry<T, U> = EntryOf<Dictionary<BiFunctor<T, U>>, U>;
declare type ActionPayload<S, P> = [Functor<S>] | ActionEntry<S, P>;
declare type ActionRecord<
  S,
  P,
  T extends ActionPayload<S, P> = ActionPayload<S, P>
> = T extends ActionEntry<S, P>
  ? { args: null; functor: Functor<S> }
  : { args: ActionEntry<S, P>; functor: null };
