import { Effect } from '../../types';
export declare const doEffects: <T>(...effects: Effect<T>[]) => (...args: any[]) => any;
