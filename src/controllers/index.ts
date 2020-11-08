import { Router } from "express";
import { userRouter } from "./user.controller";
import { lessonRouter } from "./lesson.controller";
import { homeworkRouter } from "./homework.controller";
import { passport } from "../security/passport";

export const routes = Router();

routes.use('/users', userRouter);

routes.use('/lessons', lessonRouter);

routes.use('/homeworks', homeworkRouter);

//routes.use('/issues', passport.authenticate('jwt', { session: false }), issuesRouter);

// (\_ _/)
// (=^.^=)
// (;;)(;;)