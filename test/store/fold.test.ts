import { test } from 'ava-ts';
import { ReplaySubject, Subject } from 'rxjs';
import { fold } from '../../src/store';
import { Functor } from '../../types';
import { willAssert } from '../will-assert';

interface Box {
  val: number;
}

const push = (src: Subject<Functor<Box>>) => (val: number) =>
  src.next((x: Box) => ({ val: x.val + val }));

test.cb(
  'fold runs transfomation provided against initial state at first',
  t => {
    const src = new ReplaySubject<Functor<Box>>();
    const actual = src.pipe(fold({ val: 42 }));

    push(src)(8);

    willAssert(t, actual, { val: 50 });
  }
);

test.cb('fold runs transfomartion provided against most recent state', t => {
  const src = new ReplaySubject<Functor<Box>>();
  const actual = src.pipe(fold({ val: 42 }));
  const next = push(src);

  next(8);
  next(50);
  next(100);

  willAssert(t, actual, { val: 200 });
});
