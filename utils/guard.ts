export const guard = <T>(x: any, pred: (x: any) => boolean): x is T => pred(x);
