import { app } from '../src/server';
import supertest from 'supertest';

describe('Language Learning Platform', () => {
  const user = { username: 'user', password: 'password', first_name:'regina', last_name:'olah', role: 'STUDENT'};

  let requestHandle: supertest.SuperTest<supertest.Test>;

  beforeEach(() => {
    requestHandle = supertest(app);
  });

  describe('Authentication', () => {
    it('should register', async () => {
      await requestHandle.post('/users/signup').send(user).expect(200);
    });
 });


});
