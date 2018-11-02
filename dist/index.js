"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var types_1 = require("./types");
function Store(initialState, bound) {
    var states = new rxjs_1.Subject();
    var stateChanged = states.pipe(operators_1.scan(function (state, fn) { return fn(state); }, initialState), operators_1.distinctUntilChanged());
    return function (patch) {
        if (patch) {
            states.next(types_1.isFree(patch)
                ? patch
                : types_1.asFree(bound, patch));
        }
        return stateChanged;
    };
}
exports.Store = Store;
