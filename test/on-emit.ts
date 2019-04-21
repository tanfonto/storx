import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const onEmit = <T>(
  cb: jest.DoneCallback,
  stream: Observable<T>,
  expected: T
) => {
  stream.pipe(map(s => expect(s).toStrictEqual(expected))).subscribe(cb);
};
