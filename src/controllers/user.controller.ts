import { Collection, wrap } from "@mikro-orm/core";
import { Router } from "express";
import { User, UserRole, TeacherType } from "../entities/user";
import { hashPassword } from "../security/password-utils";
import { generateJwt } from '../security/jwtGenerator';
import { passport } from "../security/passport";

export const userRouter = Router();

userRouter
  .use((req, res, next) => {
    req.userRepository = req.orm.em.getRepository(User);
    next();
  })

  // list all users
  // protected
  .get("", passport.authenticate('jwt', { session: false }), async (req, res) => {
    const users = await req.userRepository!.findAll({
      populate: ["languages","lessons"],
    });
    res.send(users);
  })

  // get one user by id
  // protected
  .get("/:id", passport.authenticate('jwt', { session: false }), async (req, res) => {
    const user = await req.userRepository!.findOne(
      { id: parseInt(req.params.id) },
      {
        populate: ["languages","lessons"],
      }
    );
    if (!user) {
      return res.sendStatus(404);
    }
    res.send(user);
  })

  //get user profile
  //protected
  .post("/profile", passport.authenticate('jwt', { session: false }), async (req, res) => {
    let authUser = req.orm.em.getReference(User, req.user!.id);
    const user = await req.userRepository!.findOne(
      { id: authUser.id },
      {
        populate: ["languages"],
      }
    );
    if (!user) {
      return res.sendStatus(404);
    }
    res.send(user);
  })

  // endpoint to register new user
  .post("/signup", async (req, res) => {
    const { username, password, first_name, last_name, country, is_native, type, intro, role }: AuthenticationDto = req.body;
    let user = await req.userRepository!.findOne({ username });

    // check if user exists
    if (user) {
      return res.sendStatus(409);
    }

    const hashedPassword = await hashPassword(password);

    user = new User();
    wrap(user).assign({ ...req.body, password: hashedPassword }, { em: req.orm.em });

    const languages = user.languages.getItems();
    if (languages) {
      languages.filter((language: number) => language).forEach((language: number) => req.orm.em.merge(language));
    }

    const lessons = user.lessons.getItems();
    if (lessons) {
      lessons.filter((lesson: number) => lesson).forEach((lesson: number) => req.orm.em.merge(lesson));
    }

    await req.userRepository!.persistAndFlush(user);
    res.send(user);
    return res.sendStatus(200);
  })

  // endpoint to sign in user
  .post('/signin', async (req, res) => {
    const { username, password }: AuthenticationDto = req.body;
    const user = await req.userRepository!.findOne({ username });
    if (!user) {
      return res.sendStatus(401);
    }
    const hashedPassword = await hashPassword(password);
    if (hashedPassword !== user.password) {
      return res.sendStatus(401);
    }
    return res.send(generateJwt(user));
  });

interface AuthenticationDto {
  username: string;
  password: string;
  role: UserRole;
  first_name: string;
  last_name: string;
  country: string;
  is_native: boolean;
  type: TeacherType;
  intro: string;
  
}
