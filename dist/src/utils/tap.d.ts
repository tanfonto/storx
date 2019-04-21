export declare const tap: <R, Args extends any[] = any[]>(fn: (...args: any[]) => R, eff: Effect<R>) => (...args: Args) => R;
