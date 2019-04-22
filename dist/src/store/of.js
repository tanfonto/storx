"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const utils_1 = require("../utils");
const template = (src) => Object.assign({ args: null, Functor: null }, src);
exports.normalize = (args) => template(utils_1.len(args) > 1 ? { args } : { Functor: utils_1.head(args) });
exports.of = () => {
    const src = new rxjs_1.ReplaySubject();
    return {
        next: (...args) => src.next(exports.normalize(args)),
        observable: src.asObservable()
    };
};
