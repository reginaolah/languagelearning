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
    // return all sold lessons of a teacher by {language} by {id}
    .get("/:id/:language", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const lessons = yield req.lessonRepository.find({ teacher_id: parseInt(req.params.id), language: parseInt(req.params.language) });
    res.send(lessons);
}))
    // teachers use to create new lesson type
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
}))
    // teachers use to update lesson type
    .patch("/update/:id", passport_1.passport.authenticate("jwt", { session: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const authUser = req.orm.em.getReference(user_1.User, req.user.id);
    const teacherid = authUser.id;
    const id = req.params.id;
    const { title, price } = req.body;
    const lesson = yield req.lessonRepository.findOne({ id: parseInt(req.params.id), teacher_id: teacherid });
    if (!lesson) {
        return res.sendStatus(401);
    }
    if (lesson) {
        const updateCount = yield ((_a = req.lessonRepository) === null || _a === void 0 ? void 0 : _a.nativeUpdate({ id }, req.body));
        if (updateCount) {
            return res.sendStatus(200);
        }
    }
    return res.sendStatus(404);
}))
    // teachers use to delete lesson type
    .delete("/delete/:id", passport_1.passport.authenticate("jwt", { session: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const authUser = req.orm.em.getReference(user_1.User, req.user.id);
    const teacherid = authUser.id;
    const id = req.params.id;
    const lesson = yield req.lessonRepository.findOne({ id: parseInt(req.params.id), teacher_id: teacherid });
    if (!lesson) {
        return res.sendStatus(401);
    }
    if (lesson) {
        const deletedCount = yield ((_b = req.lessonRepository) === null || _b === void 0 ? void 0 : _b.nativeDelete({ id }));
        if (deletedCount) {
            return res.sendStatus(200);
        }
    }
    return res.sendStatus(404);
}));
