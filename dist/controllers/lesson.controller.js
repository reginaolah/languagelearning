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
exports.lessonRouter = void 0;
const core_1 = require("@mikro-orm/core");
const express_1 = require("express");
const lesson_1 = require("../entities/lesson");
const user_1 = require("../entities/user");
const passport_1 = require("../security/passport");
exports.lessonRouter = express_1.Router();
exports.lessonRouter
    .use((req, res, next) => {
    req.lessonRepository = req.orm.em.getRepository(lesson_1.Lesson);
    next();
})
    // list all sold lessons of a teacher
    .get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const lessons = yield req.lessonRepository.find({ teacher_id: parseInt(req.params.id) }, {
        populate: ["language"],
    });
    res.send(lessons);
}))
    // list all sold lessons of a teacher by language
    .get("/:id/:language", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const lessons = yield req.lessonRepository.find({ teacher_id: parseInt(req.params.id) }, {
        populate: ["language"],
    });
    res.send(lessons);
}))
    // add new lesson for a teacher
    .post("/newlesson", passport_1.passport.authenticate("jwt", { session: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user.role === user_1.UserRole.Teacher) {
        const { title, price } = req.body;
        const lesson = new lesson_1.Lesson();
        core_1.wrap(lesson).assign(req.body, { em: req.orm.em });
        lesson.teacher = req.orm.em.getReference(user_1.User, req.user.id);
        const language = lesson.language;
        if (language) {
            (language) => req.orm.em.merge(language);
        }
        yield req.lessonRepository.persistAndFlush(lesson);
        res.send(lesson);
    }
    return res.sendStatus(403);
}));
