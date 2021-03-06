import { Router } from "express";
import { userRouter } from "./user.controller";
import { lessonRouter } from "./lesson.controller";
import { languageRouter } from "./language.controller";
import { homeworkRouter } from "./homework.controller";
import { studentlessonRouter } from "./studentlesson.controller";
import { passport } from "../security/passport";

export const routes = Router();

routes.use("/users", userRouter);
routes.use("/lessons", lessonRouter);
routes.use("/languages", languageRouter);
routes.use("/studentlessons", passport.authenticate("jwt", { session: false }), studentlessonRouter);
routes.use("/homeworks", passport.authenticate("jwt", { session: false }), homeworkRouter);

//routes.use('/issues', passport.authenticate('jwt', { session: false }), issuesRouter);

// (\_ _/)
// (=^.^=)
// (;;)(;;)
