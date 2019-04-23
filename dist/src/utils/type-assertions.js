"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNil = x => x === null || x === undefined;
exports.isType = (type) => (x) => typeof x === type;
exports.isFunction = exports.isType('function');
