import { pipe } from 'rxjs';
import { scan, shareReplay } from 'rxjs/operators';
import { apply } from './apply';

const shareReplayLast = shareReplay(1);

export const calculateState = <S>(seed: S) =>
  pipe(
    scan<Functor<S>, S>(apply, seed),
    shareReplayLast
  );
