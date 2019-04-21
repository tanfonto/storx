"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const apply_1 = require("./apply");
const shareReplayLast = operators_1.shareReplay(1);
exports.calculateState = (seed) => rxjs_1.pipe(operators_1.scan(apply_1.apply, seed), shareReplayLast);
