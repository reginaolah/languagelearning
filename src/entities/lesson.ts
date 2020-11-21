import { Collection, Entity, PrimaryKey, Property, ManyToOne, OneToMany } from "@mikro-orm/core";
import { User } from "./user";
import { Language } from "./language";
import { StudentLesson } from "./studentlesson";

@Entity()
export class Lesson {
  @PrimaryKey()
  id!: number;

  @Property()
  title!: string;

  @Property()
  price!: number;

  @ManyToOne(() => User)
  teacher!: User;

  @ManyToOne(() => Language)
  language!: Language;

  @OneToMany(() => StudentLesson, (studentlesson) => studentlesson.lesson)
  studentlessons = new Collection<Lesson>(this);

}
