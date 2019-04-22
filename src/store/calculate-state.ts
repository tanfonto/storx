import { pipe } from 'rxjs';
import { scan, shareReplay } from 'rxjs/operators';
import { apply } from './apply';

export const calculateState = <S>(seed: S) =>
  pipe(
    scan<Functor<S>, S>(apply, seed),
    shareReplay(1)
  );
