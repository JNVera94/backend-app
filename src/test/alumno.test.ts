import app from "../app";
import request from "supertest";
import{describe,it,expect, beforeAll} from 'vitest'

const api = request(app);



describe('POST /api/alumnos', () => {
  it('should add one user', async () => {
    let user1
    const res = await api.post('/api/alumnos').send({
        name: "Juan",
        lastname: "Doe",
        age: 35,
         email:"jjjj3124@gmail.com",
         password:"55541"
    });
    expect(res.statusCode).toBe(201);
    user1 = res.body;
  });

  it('should not add a user if already registered', async () => {
    const res = await api.post('/api/alumnos').send({
        name: "Juan",
        lastname: "Doe",
        age: 35,
         email:"jjjj3124@gmail.com",
         password:"55541"
    });
    expect(res.statusCode).toBe(400);
  });
});

    describe('findOne /api/alumnos', () => {
      it('should return one user', async () => {
        let user1
        const email= 'jjjj3124@gmail.com'
        const res = await api.get('/api/alumnos/email/'+email);
        expect(res.statusCode).toBe(200);
        expect(res.body.data.email).toBe(email);
        expect(res.body.data).not.toBeNull();
      })
    });

    describe ('findOneById /id:', () =>{
      it('should find alumno by ID', async () => {
        const id = '65de47ba31b3c40db1dd0f1c' /* id administrador */
        const res = await api.get('/api/alumnos/'+id);
        expect(res.statusCode).toBe(200);
        expect(res.body.data).not.toBeNull()
      });
      });

      describe('remove /api/alumnos', () => {
        
      
        let token: string;

        beforeAll(async () => {
          const res = await api.post('/api/login').send({
            email: 'jjjj3124@gmail.com',
            password: '55541'
          });
          token = res.body.token;
          console.log('token1', token)
        });

        it('should remove one user', async () => {
          console.log('token', token)
          const id= '65de47ba31b3c40db1dd0f1c'
          const res = await api.delete('/api/alumnos/'+id).set('Authorization', `Bearer ${token}`);
          expect(res.statusCode).toBe(201);
          expect(res.body.message).toBe('alumno eliminado');
        });
      });