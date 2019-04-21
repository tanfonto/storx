import { Id, list, tap } from '../utils';

export const runEffects = <T>(...effects: Array<Effect<T>>) =>
  tap(Id, x => list(effects).forEach(eff => eff(x)));
