import { Collection, wrap } from "@mikro-orm/core";
import { Router } from "express";
import { StudentLesson } from "../entities/studentlesson";
import { User, UserRole } from "../entities/user";
import { Lesson } from "../entities/lesson";
import { hashPassword } from "../security/password-utils";
import { passport } from "../security/passport";
import { v4 } from "uuid";

export const studentlessonRouter = Router();

studentlessonRouter
  .use((req, res, next) => {
    req.studentLessonRepository = req.orm.em.getRepository(StudentLesson);
    next();
  })

  // students use to check their booked lessons
  .get("/", async (req, res) => {
    const authUser = req.orm.em.getReference(User, req.user!.id);
    const studentlessons = await req.studentLessonRepository!.findAll({ id: authUser.id });
    res.send(studentlessons);
  })

  // students use to book a lesson by {lesson_id}
  .post("/book/:id",async (req, res) => {
    const { date }: AuthenticationDto = req.body;
    const studentlesson = new StudentLesson();

    wrap(studentlesson).assign(req.body, { em: req.orm.em });

    studentlesson.user = req.orm.em.getReference(User, req.user!.id);
    studentlesson.lesson = req.orm.em.getReference(Lesson, parseInt(req.params.id));

    await req.studentLessonRepository!.persistAndFlush(studentlesson);

    res.sendStatus(200);
  })

  // students use to delete a booked lesson
  .delete("/delete/:id", async (req, res) => {
    const authUser = req.orm.em.getReference(User, req.user!.id);
    const studentid = authUser.id;
    const id = req.params.id;
    const lesson = await req.studentLessonRepository!.findOne({ id: parseInt(req.params.id) ,user_id: studentid});
    if (lesson) {
      const deletedCount = await req.studentLessonRepository?.nativeDelete({ id });
      if (deletedCount) {
        return res.sendStatus(200);
      }
    }
    return res.sendStatus(500);
  });

interface AuthenticationDto {
  date: Date;
}
