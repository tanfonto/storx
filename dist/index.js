"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const types_1 = require("./types");
function Store(initialState, bound) {
    const states = new rxjs_1.Subject();
    const stateChanged = states.pipe(operators_1.scan((state, fn) => fn(state), initialState), operators_1.distinctUntilChanged());
    return (patch) => {
        if (patch) {
            states.next(types_1.isFree(patch)
                ? patch
                : types_1.asFree(bound, patch));
        }
        return stateChanged;
    };
}
exports.Store = Store;
