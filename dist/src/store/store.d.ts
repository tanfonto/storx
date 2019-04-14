import { Effect } from '../../types';
import { StoreConfig } from './types';
export declare function Store<S, P = S>(initialState: S, config: StoreConfig<S, P>, ...effects: Array<Effect<S>>): {
    _history: import("rxjs").Observable<{
        args: null;
        functor: import("../../types").Functor<S, S>;
    } | {
        args: [string | number, P];
        functor: null;
    }>;
    dispatch: (...args: import("./types").ActionPayload<S, P>) => void;
    state: import("rxjs").Observable<{}>;
};
