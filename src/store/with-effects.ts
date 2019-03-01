import { tap, Id, list } from '../utils';
import { Effect } from '../../types';

export const withEffects = <T>(...effects: Array<Effect<T>>) =>
  tap(Id, x => list(effects).forEach(eff => eff(x)));
