import { app } from '../src/server';
import supertest from 'supertest';
import { TeacherType, User, UserRole } from '../src/entities/user';

describe('Language Learning Platform', () => {
  const user = { id:3, username: 'hgyozo', password: 'mester',email: 'hgyozo@elte.hu', first_name:'test', last_name:'user', role: 'TEACHER', createdAt: 20201109, updatedAt: 20201109,languages:[1], lessons:[1]};

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

    describe('Language Learning Platform Controller', () => {
      let token: string;

      beforeEach(async () => {
        const loginResponse = await requestHandle.post('/users/signin').send(user);
        token = `Bearer ${loginResponse.body.token}`;
      });
  
      describe('/users', () => {
        it('should not list when user is not provided', async () => {
          await requestHandle.get('/users').expect(401);
        });

        it('should return list of users', async () => {
          await requestHandle
            .get('/users')
            .set('Authorization', token)
            .expect(200)
            .expect(res => {
                res.body
            })
        });
      });
      

      describe('/users/teachers/:language', () => {
        it('should return the teachers who teaches the language with the provided id ', async () => {
          await requestHandle.get('/users/teachers/:language').expect(200);
        });
      });

      
      describe('/users/teacher/:id/:language', () => {

        it('should return the teachers course by language id ', async () => {
          await requestHandle
          .get('/users/teacher/2/2')
          .expect(200)
          .expect(res => {
              res.body
          })
        });
      });
      

     describe('/users/profile', () => {
        it('should not list when user is not provided', async () => {
          await requestHandle.get('/users/profile').expect(401);
        });

        /*
        it('should get profile of user', async () => {
          await requestHandle.get('/users/profile')
          .set('Authorization', token)
          .expect(200)
          .expect(res =>{
            res.body
          })
        });
        */
      });
     
      describe('/users/:id', () => {
        it('should not get user by id when user is not provided', async () => {
          await requestHandle.get('/users/1').expect(401);
        });

        it('should get user by id when user is provided', async () => {
          await requestHandle.get('/users/3')
          .set('Authorization', token)
          .expect(200)
          .expect(res =>{
            res.body
          })
        });
      });

      describe('/users/update', () => {
        it('should not update when user is not provided', async () => {
          await requestHandle.patch('/users/update').expect(401);
        });

        
        it('should update the profile of the signed in user', async () => {
          await requestHandle
              .patch('/users/update')
              .set('Authorization', token)
              .send({
                is_native: 'true'
              })
              .expect(200)
              .expect(res => {
                res.body
            })
          });
      });

      describe('/users/delete', () => {
        it('should not delete when user is not provided', async () => {
          await requestHandle.delete('/users/delete').expect(401);
        });

        it('should delete the profile of the signed in user', async () => {
        await requestHandle
            .delete('/users/delete')
            .set('Authorization', token)
            .expect(200)
        });

      });

      describe('/lessons/newlesson', () => {
        it('should not create new lesson if user is not provided', async () => {
          await requestHandle  
              .post('/lessons/newlesson')
              .send({
                title: 'lesson3',
                price: 1400, 
                language: "2"
              })
              .expect(401)
        });
        
        /*
        it('should create new lesson if user is provided', async () => {
          await requestHandle
              .post('/lessons/newlesson')
              .set('Authorization', token)
              .send({
                title: 'lesson3',
                price: 1400,
                language: 1
              })
              .expect(200)
        });
        */
      });

      describe('/lessons/update/:id', () => {
        it('should not update when user is not provided', async () => {
          await requestHandle.patch('/lessons/update/1').expect(401);
        });

        /*
        it('should update the lesson of the signed in user', async () => {
          await requestHandle
              .patch('/lessons/update/3')
              .set('Authorization', token)
              .send({
                title: 'new title'
              })
              .expect(200)
        });
        */
      });
        

        
      describe('/lessons/delete/:id', () => {
        it('should not delete when user is not provided', async () => {
          await requestHandle.delete('/lessons/delete/3').expect(401);
        });

        /*
        it('should delete the lesson of the signed in user', async () => {
        await requestHandle
            .delete('/lessons/delete/2')
            .set('Authorization', token)
            .expect(200)
        });
        */
      });
    });
});
