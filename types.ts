export interface IMap<T> {
  [ key: string ]: T;
}
export type FreeReducer<T> = (state: T) => T;
export type Reducer<T, P = T> = (state: T, patch: P) => T;
export type Bindings<T, P> = IMap<Reducer<T, P>>;
export interface IPatch<T, P, K = keyof T> { action: K; payload: P; }
export type Patch<T, P> = IPatch<Bindings<T, P>, P> | FreeReducer<T>;

export function isFree<T, P>(patch: Patch<T, P>): patch is FreeReducer<T> {
  return typeof patch === 'function';
}

export const asFree =
   <T, P>(api: Bindings<T, P>, { action, payload }: IPatch<Bindings<T, P>, P>) =>
   (x: T) => api[action](x, payload) as T;
