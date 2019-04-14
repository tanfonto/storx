export declare const head: <T extends any[]>(items: T) => any;
export declare const list: <T extends any[]>(items?: T | undefined) => T | never[];
export declare const len: <T extends any[]>({ length }: T) => number;
