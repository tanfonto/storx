export const head = <T extends any[]>(items: T) => items[0];

export const list = <T extends any[]>(items?: T) => items || [];
