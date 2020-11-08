"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const lesson_controller_1 = require("./lesson.controller");
const homework_controller_1 = require("./homework.controller");
exports.routes = express_1.Router();
exports.routes.use('/users', user_controller_1.userRouter);
exports.routes.use('/lessons', lesson_controller_1.lessonRouter);
exports.routes.use('/homeworks', homework_controller_1.homeworkRouter);
//routes.use('/issues', passport.authenticate('jwt', { session: false }), issuesRouter);
// (\_ _/)
// (=^.^=)
// (;;)(;;)
