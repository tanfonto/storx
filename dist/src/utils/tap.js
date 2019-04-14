"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tap = (fn, eff) => (...args) => {
    const out = fn.apply(null, args);
    return eff(out), out;
};
