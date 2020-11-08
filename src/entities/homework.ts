import { Collection, Entity, PrimaryKey, Property, ManyToOne } from "@mikro-orm/core";
import { User } from "./user";

@Entity()
export class Homework {
  @PrimaryKey()
  id!: number;

  @Property()
  uuid!: string;

  @Property()
  name!: string;

  @Property()
  title!: string;

  @Property()
  description!: string;

  @Property({ nullable: true })
  path_to_solution?: string;

  @ManyToOne(() => User)
  owner!: User;
}
