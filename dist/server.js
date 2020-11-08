"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const entities_1 = require("./entities");
const mikro_orm_config_1 = __importDefault(require("./mikro-orm.config"));
const controllers_1 = require("./controllers");
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const passport_1 = require("./security/passport");
exports.app = express_1.default();
exports.app.use(body_parser_1.default.json());
//auth
exports.app.use(cookie_parser_1.default());
exports.app.use(passport_1.passport.initialize());
//database
exports.app.use(entities_1.mikroorm(mikro_orm_config_1.default));
//endpoints
exports.app.use(controllers_1.routes);
