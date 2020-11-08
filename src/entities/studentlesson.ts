import { Collection, Entity, PrimaryKey, Property, ManyToOne, OneToMany } from "@mikro-orm/core";
import { User } from "../entities/user";
import { Lesson } from "./lesson";

@Entity()
export class StudentLesson {
  @PrimaryKey()
  id!: number;

  @Property()
  date!: Date;

  @ManyToOne(() => User)
  user!: User;

  @ManyToOne(() => Lesson)
  lesson!: Lesson;
}
