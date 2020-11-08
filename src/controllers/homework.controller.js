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
exports.homeworkRouter = void 0;
const core_1 = require("@mikro-orm/core");
const express_1 = require("express");
const homework_1 = require("../entities/homework");
const user_1 = require("../entities/user");
const passport_1 = require("../security/passport");
const uuid_1 = require("uuid");
exports.homeworkRouter = express_1.Router();
exports.homeworkRouter
    .use((req, res, next) => {
    req.homeworkRepository = req.orm.em.getRepository(homework_1.Homework);
    next();
})
    // list all homweworks of a teacher
    .get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const homeworks = yield req.homeworkRepository.findAll({ teacher_id: parseInt(req.params.id) });
    res.send(homeworks);
}))
    // add new lesson for a teacher
    .post("/newhomework", passport_1.passport.authenticate("jwt", { session: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user.role === user_1.UserRole.Teacher) {
        const { uuid, name, title, description, path_to_solution } = req.body;
        const homework = new homework_1.Homework();
        core_1.wrap(homework).assign(Object.assign(Object.assign({}, req.body), { uuid: uuid_1.v4() }), { em: req.orm.em });
        homework.owner = req.orm.em.getReference(user_1.User, req.user.id);
        yield req.homeworkRepository.persistAndFlush(homework);
        res.send(homework);
    }
    return res.sendStatus(403);
}));
