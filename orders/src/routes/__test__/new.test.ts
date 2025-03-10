import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';
import { Order, OrderStatus } from '../../models/order';

it('returns an error if the ticket does not exist', async() =>{
    const ticketId = new mongoose.Types.ObjectId();
    //const ticketId = "67cc3d93954d8c7333115a57";
    console.log('ticketId', ticketId);
    const response =  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signIn())
    .send({ ticketId:ticketId })
    .expect(404);
    console.log('response', response.body);
});

it('returns an error if the ticket is already reserved', async() =>{
    const ticket = Ticket.build({
        title: 'concert',
        price: 20
    });
    await ticket.save();
    const order = Order.build({
        ticket,
        userId: 'sdfdsfsdf',
        status: OrderStatus.Created,
        expiresAt: new Date()
    })
    await order.save();

    await request(app)
    .post('/api/orders')
    .set('Cookie', global.signIn())	
    .send({ ticketId: ticket.id})
     .expect(400);
});

it('reserves a ticket', async() =>{
    const ticket = Ticket.build({
        title: 'concert',
        price: 20
    });
    await ticket.save();

    await request(app)
    .post( '/api/orders')
    .set('Cookie', global.signIn())
    .send({ ticketId: ticket.id})
    .expect(201);
        
    
});
