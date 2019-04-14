import { Functor } from '../../types';
export declare const fold: <S>(seed: S) => import("rxjs").UnaryFunction<import("rxjs").Observable<Functor<S, S>>, import("rxjs").Observable<{}>>;
