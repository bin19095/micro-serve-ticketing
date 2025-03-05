import request from 'supertest';
import { app } from '../../app';

it('responds with details the current user', async() =>{
    // const authResponse =await request(app)
    // .post('/api/users/signup')
    // .send({
    //     email: 'test@test.com',
    //     password: 'password',
    // })
    // .expect(201);
    
    // const cookie = authResponse.get('Set-Cookie');

    // if (!cookie) {
    //     throw new Error("Cookie not set after signup");
    //   }

    const cookie = await global.signIn();
    if(!cookie) {
      throw new Error("Failed to get cookie from response");
    }
    const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200);
    
    expect(response.body.currentUser.email).toEqual('test@test.com')

});

it('responds with null if sign out', async () => {
  const response = await request(app)
      .post('/api/users/signout')
      .send()
      .expect(200);

  console.log(response.body);
  expect(response.body.currentUser).toBeNull();
});
