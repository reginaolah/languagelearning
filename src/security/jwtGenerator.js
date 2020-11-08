"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret_1 = require("./secret");
function generateJwt(user) {
    const payload = {
        sub: user.id,
        role: user.role,
    };
    const token = jsonwebtoken_1.default.sign(payload, secret_1.secret);
    return token;
}
exports.generateJwt = generateJwt;
