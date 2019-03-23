import { GenericCallbackTestContext } from 'ava-ts';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

type Ctx<T = any> = GenericCallbackTestContext<T>;

export const willAssert = <T>(t: Ctx, stream: Observable<T>, expected: T) => {
  stream.pipe(map(s => t.deepEqual(s, expected))).subscribe(t.end);
};
