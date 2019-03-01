export const isNil = x => x === null || x === undefined;

export const isFunction = (x: any): x is Function =>
  Object.is(typeof x, 'function');

export const isArray = (x?: any): x is Array<any> =>
  !isNil(x) && Array.isArray(x);
