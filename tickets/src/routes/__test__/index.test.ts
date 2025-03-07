import request from 'supertest';
import { app } from '../../app';



test('can fetch a list of tickets', async () => {
    const response1 =await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signIn())
    .send({
        title: 'Another test ticket',
        price: 20
    });
    console.log('testing can fetched all', response1.body)


    const response = await request(app)
        .get('/api/tickets')
        .send()
        .expect(200);
      

         console.log('show all', response.body)

    // expect(response.body.length).toEqual(1);
}); // Increase the timeout value to 20000 ms (20 seconds)
