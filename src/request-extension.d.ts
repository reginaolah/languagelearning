import { EntityRepository, MikroORM, IDatabaseDriver } from "@mikro-orm/core";


declare global {
  namespace Express {

    interface User {
      id: number;
      role: UserRole;
    }

    interface Request {
      orm: MikroORM<IDatabaseDriver>;
      userRepository?: EntityRepository<ApplicationUser>;
      lessonRepository?: EntityRepository<ApplicationUser>;
	    languageRepository?: EntityRepository<ApplicationUser>;
      studentLessonRepository?: EntityRepository<ApplicationUser>;
      homeworkRepository?: EntityRepository<ApplicationUser>;
    }
  }
}
