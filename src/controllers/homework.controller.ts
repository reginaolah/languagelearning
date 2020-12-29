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

  // teachers use to list all homeworks they created
  .get("/", async (req, res) => {
    const authUser = req.orm.em.getReference(User, req.user!.id);
    const teacherid = authUser.id;
    const homeworks = await req.homeworkRepository!.findAll({ teacher_id: teacherid });
    res.send(homeworks);
  })

  // users use to access a homework page by its uuid
  .get("/:uuid", async (req, res) => {
    const homework = await req.homeworkRepository!.find({ uuid: req.params.uuid });
    res.send(homework); //TODO return?
  })

  // teachers use to create new homeworks for students
  .post("/newhomework", async (req, res) => {
    if (req.user!.role === UserRole.Teacher) {
      const { uuid, name, title, description, path_to_solution }: AuthenticationDto = req.body;
      const homework = new Homework();

      wrap(homework).assign({ ...req.body, uuid: v4() }, { em: req.orm.em });

      homework.owner = req.orm.em.getReference(User, req.user!.id);

      await req.homeworkRepository!.persistAndFlush(homework);

      res.send(homework);
    }
    return res.sendStatus(403);
  })

  //teachers use to update a homework
  .patch("/update/:uuid", async (req, res) => {
    const authUser = req.orm.em.getReference(User, req.user!.id);
    const teacherid = authUser.id;
    const uuid = req.params.uuid;
    const { name, title, description }: AuthenticationDto = req.body;
    const homework = await req.homeworkRepository!.findOne({ uuid: req.params.uuid, owner_id: teacherid });
    if (homework) {
      const updateCount = await req.homeworkRepository?.nativeUpdate({ uuid }, req.body);
      if (updateCount) {
        return res.sendStatus(200);
      }
    }
    return res.sendStatus(500);
  })

  //teachers use to delete a homework
  .delete("/delete/:uuid", async (req, res) => {
    const authUser = req.orm.em.getReference(User, req.user!.id);
    const teacherid = authUser.id;
    const uuid = req.params.uuid;
    const homework = await req.homeworkRepository!.findOne({ uuid: req.params.uuid, owner_id: teacherid });
    if (homework) {
      const deletedCount = await req.homeworkRepository?.nativeDelete({ uuid });
      if (deletedCount) {
        return res.sendStatus(200);
      }
    }
    return res.sendStatus(500);
  });

interface AuthenticationDto {
  uuid:string;
  name: string;
  title: number;
  description: string;
  path_to_solution: string;
}
