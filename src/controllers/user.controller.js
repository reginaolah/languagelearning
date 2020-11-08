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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const core_1 = require("@mikro-orm/core");
const express_1 = require("express");
const user_1 = require("../entities/user");
const password_utils_1 = require("../security/password-utils");
const jwtGenerator_1 = require("../security/jwtGenerator");
const passport_1 = require("../security/passport");
exports.userRouter = express_1.Router();
exports.userRouter
    .use((req, res, next) => {
    req.userRepository = req.orm.em.getRepository(user_1.User);
    next();
})
    // list all users
    // protected
    .get("", passport_1.passport.authenticate('jwt', { session: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield req.userRepository.findAll({
        populate: ["languages", "lessons"],
    });
    res.send(users);
}))
    // get one user by id
    // protected
    .get("/:id", passport_1.passport.authenticate('jwt', { session: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield req.userRepository.findOne({ id: parseInt(req.params.id) }, {
        populate: ["languages", "lessons"],
    });
    if (!user) {
        return res.sendStatus(404);
    }
    res.send(user);
}))
    //get user profile
    //protected
    .post("/profile", passport_1.passport.authenticate('jwt', { session: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let authUser = req.orm.em.getReference(user_1.User, req.user.id);
    const user = yield req.userRepository.findOne({ id: authUser.id }, {
        populate: ["languages"],
    });
    if (!user) {
        return res.sendStatus(404);
    }
    res.send(user);
}))
    // endpoint to register new user
    .post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, first_name, last_name, country, is_native, type, intro, role } = req.body;
    let user = yield req.userRepository.findOne({ username });
    // check if user exists
    if (user) {
        return res.sendStatus(409);
    }
    const hashedPassword = yield password_utils_1.hashPassword(password);
    user = new user_1.User();
    core_1.wrap(user).assign(Object.assign(Object.assign({}, req.body), { password: hashedPassword }), { em: req.orm.em });
    const languages = user.languages.getItems();
    if (languages) {
        languages.filter((language) => language).forEach((language) => req.orm.em.merge(language));
    }
    const lessons = user.lessons.getItems();
    if (lessons) {
        lessons.filter((lesson) => lesson).forEach((lesson) => req.orm.em.merge(lesson));
    }
    yield req.userRepository.persistAndFlush(user);
    res.send(user);
    return res.sendStatus(200);
}))
    // endpoint to sign in user
    .post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield req.userRepository.findOne({ username });
    if (!user) {
        return res.sendStatus(401);
    }
    const hashedPassword = yield password_utils_1.hashPassword(password);
    if (hashedPassword !== user.password) {
        return res.sendStatus(401);
    }
    return res.send(jwtGenerator_1.generateJwt(user));
}));
