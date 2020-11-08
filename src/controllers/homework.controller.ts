import { Collection, wrap } from "@mikro-orm/core";
import { Router } from "express";
import { Homework } from "../entities/homework";
import { User, UserRole } from "../entities/user";
import { hashPassword } from "../security/password-utils";
import { passport } from "../security/passport";
import { v4 } from "uuid";

export const homeworkRouter = Router();

homeworkRouter
  .use((req, res, next) => {
    req.homeworkRepository = req.orm.em.getRepository(Homework);
    next();
  })

  // list all homweworks of a teacher
  .get("/:id", async (req, res) => {
    const homeworks = await req.homeworkRepository!.findAll({ teacher_id: parseInt(req.params.id) });
    res.send(homeworks);
  })

  // add new lesson for a teacher
  .post("/newhomework", passport.authenticate("jwt", { session: false }), async (req, res) => {
    if (req.user!.role === UserRole.Teacher) {
      const { uuid, name, title, description, path_to_solution }: AuthenticationDto = req.body;
      const homework = new Homework();

      wrap(homework).assign({...req.body, uuid: v4()}, { em: req.orm.em });

      homework.owner = req.orm.em.getReference(User, req.user!.id);

      await req.homeworkRepository!.persistAndFlush(homework);

      res.send(homework);
    }
    return res.sendStatus(403);
  });

interface AuthenticationDto {
  uuid: string;
  name: number;
  title: string;
  description: string;
  path_to_solution: string;
}
