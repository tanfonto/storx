export interface IMap<T> {
    [key: string]: T;
}
export declare type FreeReducer<T> = (state: T) => T;
export declare type Reducer<T, P = T> = (state: T, patch: P) => T;
export declare type Bindings<T, P> = IMap<Reducer<T, P>>;
export interface IPatch<T, P, K = keyof T> {
    action: K;
    payload: P;
}
export declare type Patch<T, P> = IPatch<Bindings<T, P>, P> | FreeReducer<T>;
export declare function isFree<T, P>(patch: Patch<T, P>): patch is FreeReducer<T>;
export declare const asFree: <T, P>(api: IMap<Reducer<T, P>>, { action, payload }: IPatch<IMap<Reducer<T, P>>, P, string | number>) => (x: T) => T;
