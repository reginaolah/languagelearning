"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passport = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
const secret_1 = require("./secret");
exports.passport = new passport_1.default.Passport();
const opts = {
    jwtFromRequest: (req) => {
        let token = null;
        if (req && req.cookies) {
            token = req.cookies['token'];
        }
        if (req && !token) {
            token = passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken()(req);
        }
        return token;
    },
    secretOrKey: secret_1.secret,
};
exports.passport.use(new passport_jwt_1.Strategy(opts, ((jwt_payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    done(null, {
        id: jwt_payload.sub,
        role: jwt_payload.role,
    });
}))));
