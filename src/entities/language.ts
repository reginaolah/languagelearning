import { Collection, Entity, PrimaryKey, Property, ManyToMany, OneToMany } from "@mikro-orm/core";
import { User } from "./user";
import { Lesson } from "./lesson";

// id,language,language_code
@Entity()
export class Language {
  @PrimaryKey()
  id!: number;

  @Property()
  language_code!: string;

  @Property()
  langauge!: string;

  @ManyToMany(() => User, user => user.languages)
  users = new Collection<User>(this);

  @OneToMany(() => Lesson, (lesson) => lesson.language)
  lessons = new Collection<Lesson>(this);
}
