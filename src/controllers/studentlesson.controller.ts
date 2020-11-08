import { Collection, wrap } from "@mikro-orm/core";
import { Router } from "express";
import { StudentLesson } from "../entities/studentlesson";
import { User, UserRole } from "../entities/user";
import { hashPassword } from "../security/password-utils";
import { passport } from "../security/passport";
import { v4 } from "uuid";

export const studentlessonRouter = Router();

studentlessonRouter
  .use((req, res, next) => {
    req.studentLessonRepository = req.orm.em.getRepository(StudentLesson);
    next();
  })

  // list all homweworks of a teacher
  .get("/:id", async (req, res) => {
    const homeworks = await req.studentLessonRepository!.findAll({ teacher_id: parseInt(req.params.id) });
    res.send(homeworks);
  })

interface AuthenticationDto {
  uuid: string;
  name: number;
  title: string;
  description: string;
  path_to_solution: string;
}
