import { Bindings, FreeReducer } from './types';
export declare function Store<T = any, P = T>(initialState: T, bound: Bindings<T, P>): (patch?: FreeReducer<T> | import("./types").IPatch<import("./types").IMap<import("./types").Reducer<T, P>>, P, string | number> | undefined) => import("rxjs/internal/Observable").Observable<T>;
