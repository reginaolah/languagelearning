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
exports.studentlessonRouter = void 0;
const express_1 = require("express");
const studentlesson_1 = require("../entities/studentlesson");
exports.studentlessonRouter = express_1.Router();
exports.studentlessonRouter
    .use((req, res, next) => {
    req.studentLessonRepository = req.orm.em.getRepository(studentlesson_1.StudentLesson);
    next();
})
    // list all homweworks of a teacher
    .get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const homeworks = yield req.studentLessonRepository.findAll({ teacher_id: parseInt(req.params.id) });
    res.send(homeworks);
}));
