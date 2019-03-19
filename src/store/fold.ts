import { Observable } from 'rxjs';
import { scan, shareReplay } from 'rxjs/operators';
import { Functor } from '../../types';
import { ap } from './apply';

export const fold = <S>(seed: S) => (x: Observable<Functor<S>>) =>
  x.pipe(
    scan<Functor<S>, S>(ap, seed),
    shareReplay<S>(1)
  );
