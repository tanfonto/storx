export const head = <T extends any[]>(items: T) => items[0];

export const list = <T extends any[]>(items?: T) => items || [];

export const len = <T extends any[]>({ length }: T) => length;
