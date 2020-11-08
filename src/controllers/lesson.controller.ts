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

  // list all sold lessons of a teacher
  .get("/:id", async (req, res) => {
    const lessons = await req.lessonRepository!.find(
      { teacher_id: parseInt(req.params.id) },
      {
        populate: ["language"],
      }
    );
    res.send(lessons);
  })

  // list all sold lessons of a teacher by language
  .get("/:id/:language", async (req, res) => {
    const lessons = await req.lessonRepository!.find(
      { teacher_id: parseInt(req.params.id) },
      {
        populate: ["language"],
      }
    );
    res.send(lessons);
  })

  // add new lesson for a teacher
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
  });

// list all booked lessons of a teacher
/* .get("", async (req, res) => {
    const teachers = await req.teacherRepository!.findAll({
      populate: ["languages"],
    });
    res.send(teachers);
  }) */

// get one lesson by id
/* .get("/:id", async (req, res) => {
    const teacher = await req.teacherRepository!.findOne(
      { id: parseInt(req.params.id) },
      {
        populate: ["languages"],
      }
    );
    if (!teacher) {
      return res.sendStatus(404);
    }
    res.send(teacher);
  }) */

/*// endpoint to register new teachers
  .post("/apply", async (req, res) => {
    const { username, password, first_name, last_name, is_native, country, type, intro }: AuthenticationDto = req.body;
    let teacher = await req.teacherRepository!.findOne({ username });
    if (teacher) {
      return res.sendStatus(409);
    }

    const hashedPassword = await hashPassword(password);

    teacher = new Teacher();
    wrap(teacher).assign({ ...req.body, password: hashedPassword }, { em: req.orm.em });

    const languages = teacher.languages.getItems();
    if (languages) {
      languages.filter((language: number) => language).forEach((language: number) => req.orm.em.merge(language));
    }

    await req.teacherRepository!.persistAndFlush(teacher);
    res.send(teacher);
    return res.sendStatus(200);
  })*/

interface AuthenticationDto {
  title: string;
  price: number;
}
