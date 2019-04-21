import { ReplaySubject, Subject } from 'rxjs';
import { fold } from '../../src/store';
import { onEmit } from '../on-emit';

interface Box {
  val: number;
}

const push = (src: Subject<Functor<Box>>) => (val: number) =>
  src.next((x: Box) => ({ val: x.val + val }));

test('fold runs transfomation provided against initial state at first', done => {
  const src = new ReplaySubject<Functor<Box>>();
  const actual = src.pipe(fold({ val: 42 }));

  push(src)(8);

  onEmit(done, actual, { val: 50 });
});

test('fold runs transfomartion provided against most recent state', done => {
  const src = new ReplaySubject<Functor<Box>>();
  const actual = src.pipe(fold({ val: 42 }));
  const next = push(src);

  next(8);
  next(50);
  next(100);

  onEmit(done, actual, { val: 200 });
});
