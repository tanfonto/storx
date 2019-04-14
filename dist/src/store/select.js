"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function select(config) {
    return ({ args, functor }) => functor ||
        ((state) => {
            const [key, payload] = args;
            return config[key](state, payload);
        });
}
exports.select = select;
