import { Id, list, tap } from '../utils';

export const doEffects = <T>(...effects: Array<Effect<T>>) =>
  tap(Id, x => list(effects).forEach(eff => eff(x)));
