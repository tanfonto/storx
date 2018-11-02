"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isFree(patch) {
    return typeof patch === 'function';
}
exports.isFree = isFree;
exports.asFree = function (api, _a) {
    var action = _a.action, payload = _a.payload;
    return function (x) { return api[action](x, payload); };
};
