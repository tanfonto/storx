"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isFree(patch) {
    return typeof patch === 'function';
}
exports.isFree = isFree;
exports.asFree = (api, { action, payload }) => (x) => api[action](x, payload);
