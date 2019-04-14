"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operators_1 = require("rxjs/operators");
const do_effects_1 = require("./do-effects");
const fold_1 = require("./fold");
const of_1 = require("./of");
const select_1 = require("./select");
function Store(initialState, config, ...effects) {
    const { observable, next } = of_1.of();
    const state = observable.pipe(operators_1.tap(do_effects_1.doEffects(...effects)), operators_1.map(select_1.select(config)), fold_1.fold(initialState));
    return {
        _history: observable,
        dispatch: next,
        state
    };
}
exports.Store = Store;
