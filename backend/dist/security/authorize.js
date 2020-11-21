"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
function authorize(role) {
    return (req, res, next) => {
        var _a;
        if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) === role) {
            return next();
        }
        return res.sendStatus(403);
    };
}
exports.authorize = authorize;
