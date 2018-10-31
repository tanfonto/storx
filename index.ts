import { Subject } from 'rxjs';
import { distinctUntilChanged, scan } from 'rxjs/operators';
import { asFree, Bindings, FreeReducer, isFree, Patch } from './types';

export function Store<T = any, P = T>(
  initialState: T,
  bound: Bindings<T, P>,
) {
  const states = new Subject<FreeReducer<T>>();

  const stateChanged = states.pipe(
    scan((state: T, fn: FreeReducer<T>) => fn(state), initialState),
    distinctUntilChanged(),
  );

  return (patch?: Patch<T, P>) => {
    if (patch) {
      states.next(
        isFree(patch)
        ? patch
        : asFree(bound, patch),
      );
    }
    return stateChanged;
  };
}
