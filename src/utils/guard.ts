import { Pred } from '../../types';

export const guard = <T>(pred: Pred) => (x: any): x is T => pred(x);
