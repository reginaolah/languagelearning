import { app } from '../src/server';
import supertest from 'supertest';

describe('Language Learning Platform', () => {
  const user = { username: 'barna', password: 'passw', first_name:'test', last_name:'user', role: 'STUDENT'};

    let requestHandle: supertest.SuperTest<supertest.Test>;
  
    beforeEach(() => {
      requestHandle = supertest(app);
    });
  
    describe('Authentication', () => {
      it('should register', async () => {
        await requestHandle.post('/users/signup').send(user).expect(200);
      });
  
      it('should fail on same user registration', async () => {
        await requestHandle.post('/users/signup').send(user).expect(409);
      });
  
      it('should login with registered user', async () => {
        await requestHandle.post('/users/signin').send(user).expect(200);
      });
    });

});
