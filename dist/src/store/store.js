"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operators_1 = require("rxjs/operators");
const calculate_state_1 = require("./calculate-state");
const find_action_1 = require("./find-action");
const of_1 = require("./of");
const run_effects_1 = require("./run-effects");
function Store(initialState, config, ...effects) {
    const { observable, next } = of_1.of();
    const state = observable.pipe(operators_1.tap(run_effects_1.runEffects(...effects)), operators_1.map(find_action_1.findAction(config)), calculate_state_1.calculateState(initialState));
    return {
        _history: observable,
        dispatch: next,
        state
    };
}
exports.Store = Store;
