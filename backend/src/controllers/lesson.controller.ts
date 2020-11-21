import { Collection, wrap } from "@mikro-orm/core";
import { Router } from "express";
import { Lesson } from "../entities/lesson";
import { User, UserRole } from "../entities/user";
import { hashPassword } from "../security/password-utils";
import { passport } from "../security/passport";

export const lessonRouter = Router();

lessonRouter
  .use((req, res, next) => {
    req.lessonRepository = req.orm.em.getRepository(Lesson);
    next();
  })

  // return all sold lessons of a teacher by {language} by {id}
  .get("/:id/:language", async (req, res) => {
    const lessons = await req.lessonRepository!.find(
      { teacher_id: parseInt(req.params.id), language: parseInt(req.params.language)  },
    );
    res.send(lessons);
  })

  // teachers use to create new lesson type
  .post("/newlesson", passport.authenticate("jwt", { session: false }), async (req, res) => {
    if (req.user!.role === UserRole.Teacher) {
      const { title, price }: AuthenticationDto = req.body;
      const lesson = new Lesson();

      wrap(lesson).assign(req.body, { em: req.orm.em });

      lesson.teacher = req.orm.em.getReference(User, req.user!.id);

      const language = lesson.language;
      if (language) {
        (language: number) => req.orm.em.merge(language);
      }

      await req.lessonRepository!.persistAndFlush(lesson);

      res.send(lesson);
    }
    return res.sendStatus(403);
  })

  // teachers use to update lesson type
  .patch("/update/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const authUser = req.orm.em.getReference(User, req.user!.id);
    const teacherid = authUser.id;
    const id = req.params.id;
    const { title, price }: AuthenticationDto = req.body;
    const lesson = await req.lessonRepository!.findOne({ id: parseInt(req.params.id) ,teacher_id: teacherid});
    if (!lesson) {
      return res.sendStatus(401);
    }
    if (lesson) {
      const updateCount = await req.lessonRepository?.nativeUpdate({ id }, req.body);
      if (updateCount) {
        return res.sendStatus(200);
      }
    }
    return res.sendStatus(404);
  })

  // teachers use to delete lesson type
  .delete("/delete/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const authUser = req.orm.em.getReference(User, req.user!.id);
    const teacherid = authUser.id;
    const id = req.params.id;
    const lesson = await req.lessonRepository!.findOne({ id: parseInt(req.params.id) ,teacher_id: teacherid});
    if (!lesson) {
      return res.sendStatus(401);
    }
    if (lesson) {
      const deletedCount = await req.lessonRepository?.nativeDelete({ id });
      if (deletedCount) {
        return res.sendStatus(200);
      }
    }
    return res.sendStatus(404);
  });

interface AuthenticationDto {
  title: string;
  price: number;
}
