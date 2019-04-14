"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
exports.doEffects = (...effects) => utils_1.tap(utils_1.Id, x => utils_1.list(effects).forEach(eff => eff(x)));
