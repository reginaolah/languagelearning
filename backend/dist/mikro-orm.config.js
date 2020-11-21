"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("process");
const user_1 = require("./entities/user");
const language_1 = require("./entities/language");
const lesson_1 = require("./entities/lesson");
const studentlesson_1 = require("./entities/studentlesson");
const homework_1 = require("./entities/homework");
exports.default = {
    entities: [user_1.User, language_1.Language, lesson_1.Lesson, studentlesson_1.StudentLesson, homework_1.Homework],
    dbName: process_1.env.NODE_ENV === "test" ? "italki.test.sqlite" : "italki.sqlite",
    type: "sqlite",
};
