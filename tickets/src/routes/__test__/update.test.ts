import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { natsWrapper } from '../../nats-wrapper';

it('returns a 404 if the provided id does not exist', async () =>{
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', global.signIn())
    .send({
        title: 'updatedTitle',
        price: 15
    })
    .expect(404);

});
it('returns a 404 if the user does not  authenticated', async () =>{
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
    .put(`/api/tickets/${id}`)
    .send({
        title: 'updates--Title2',
        price: 15
    })
    .expect(401);
});
it('returns a 404 if the user does not own the ticket', async () =>{
   const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signIn())
    .send({
        title: 'Test-Ticket',
        price: 11
    })

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', global.signIn())
        .send({
            title: 'Again updatedTitle',
            price: 1000
        })
        .expect(401);
    });



it('returns a 400 if the user provides and invalid title or price ', async () =>{
    const cookie = global.signIn();
    const response = await request(app)
    .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            title: 'test',
            price: 200
        });

        await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: '',
            price: 200
        }).expect(400);
        await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: '',
            price: -200
        }).expect(400);

});
it('updates the ticket provided valid inputs ', async () =>{
    const cookie = global.signIn();
    const response = await request(app)
    .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            title: 'test',
            price: 200
        });

        await request(app)
        .put(`/api/tickets/${response.body.id}`)	
        .set('Cookie', cookie)
        .send({
            title: 'newTitle',
            price: 100
        }).expect(200);
    
            const ticketResponse = await request(app)
            .get(`/api/tickets/${response.body.id}`)
            .send();
            expect(ticketResponse.body.title).toEqual('newTitle');
            expect(ticketResponse.body.price).toEqual(100);
});

it('publishes an event', async () =>{
    const cookie = global.signIn();
    const response = await request(app)
    .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            title: 'test',
            price: 200
        });

        await request(app)
        .put(`/api/tickets/${response.body.id}`)	
        .set('Cookie', cookie)
        .send({
            title: 'newTitle',
            price: 100
        }).expect(200);
    
        expect(natsWrapper.client.publish).toHaveBeenCalled();
} )   
