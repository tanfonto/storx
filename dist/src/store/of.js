"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const utils_1 = require("../utils");
const template = (src) => Object.assign({ args: null, Functor: null }, src);
const normalize = (args) => template(utils_1.isFunction(utils_1.head(args)) ? { functor: utils_1.head(args) } : { args });
exports.of = () => {
    const src = new rxjs_1.ReplaySubject();
    return {
        next: (...args) => src.next(normalize(args)),
        observable: src.asObservable()
    };
};
