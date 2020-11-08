import { Collection, Entity, PrimaryKey, Property, Enum, ManyToMany, OneToMany } from "@mikro-orm/core";
import { Language } from "./language";
import { Lesson } from "./lesson";
import { StudentLesson } from "./studentlesson";
import { Homework } from "./homework";

@Entity()
export class User {
  @PrimaryKey()
  id!: number;

  @Property()
  username!: string;

  @Property()
  password!: string;

  @Property()
  first_name!: string;

  @Property()
  last_name!: string;

  @Property({ nullable: true })
  country?: string;

  @Property({ nullable: true })
  is_native?: boolean;

  @Enum({ nullable: true })
  type?: TeacherType;

  @Property({ nullable: true })
  intro?: string;

  @Enum()
  role!: UserRole;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @ManyToMany(() => Language, "users", { owner: true })
  languages = new Collection<Language>(this);

  @OneToMany(() => StudentLesson, (studentlesson) => studentlesson.user)
  studentlessons = new Collection<StudentLesson>(this);

  @OneToMany(() => Lesson, (lesson) => lesson.teacher)
  lessons = new Collection<Lesson>(this);

  @OneToMany(() => Homework, (homework) => homework.owner)
  homeworks = new Collection<Homework>(this);


}

export enum UserRole {
  Student = "STUDENT",
  Teacher = "TEACHER",
}

export enum TeacherType {
  Professional = "PROFESSIONAL",
  Community = "COMMUNITY",
}
