import { pipe } from 'rxjs';
import { scan, shareReplay } from 'rxjs/operators';
import { Functor } from '../../types';
import { apply } from './apply';

const shareReplayLast = shareReplay(1);

export const fold = <S>(seed: S) =>
  pipe(
    scan<Functor<S>, S>(apply, seed),
    shareReplayLast
  );
