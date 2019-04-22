"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function findAction(config) {
    return ({ args, Functor }) => Functor ||
        ((state) => {
            const [key, payload] = args;
            return config[key](state, payload);
        });
}
exports.findAction = findAction;
