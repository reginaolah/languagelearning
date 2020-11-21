import { IDatabaseDriver, Configuration, Options } from "@mikro-orm/core";
import { env } from "process";
import { User } from "./entities/user";
import { Language } from "./entities/language";
import { Lesson } from "./entities/lesson";
import { StudentLesson } from "./entities/studentlesson";
import { Homework } from "./entities/homework";

export default {
  entities: [User, Language, Lesson, StudentLesson, Homework],
  dbName: env.NODE_ENV === "test" ? "italki.test.sqlite" : "italki.sqlite",
  type: "sqlite",
} as Options<IDatabaseDriver> | Configuration<IDatabaseDriver>;
