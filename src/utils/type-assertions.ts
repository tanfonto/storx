export const isNil = x => x === null || x === undefined;

export const isArray = (x?: any): x is any[] => !isNil(x) && Array.isArray(x);

export const isEmpty = <T extends any[]>(list?: T) =>
  isNil(list) || list!.length === 0;
