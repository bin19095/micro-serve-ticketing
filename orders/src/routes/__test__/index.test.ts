import request from 'supertest';
import { app } from '../../app';

import { Order } from '../../models/order';

import { Ticket } from '../../models/ticket';

const buildTicket = async() => {
    const ticket = Ticket.build({
      //  id: new mongoose.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 20
    });
    await ticket.save()
    return ticket
}

it('fetches order for an particular user', async () => {
    //Create three tickets
    const ticketOne = await buildTicket();
    const ticketTwo = await buildTicket();
    const ticketThree = await buildTicket();
        //Create one order as User #2

    const userOne = global.signIn();
    const userTwo = global.signIn();
    
    await request(app)
    .post('/api/orders')
    .set('Cookie', userOne)	
    .send({ ticketId: ticketOne.id })
    .expect(201);
    
    // const { body:orderOne} =await request(app)
    // .get('/api/orders')
    // .set('Cookie', userOne)	
    // .expect(200);
    // console.log("response orderOne",orderOne.id);

//Create two order as User#2
    const { body:orderOne } = await request(app)
    .post('/api/orders')
        .set('Cookie', userTwo)
        .send({ ticketId: ticketTwo.id})
        .expect(201);
        const { body: orderTwo} = await request(app)
        .post('/api/orders')
        .set('Cookie', userTwo)
        .send({ ticketId: ticketThree.id})
        .expect(201);
        console.log("response orderTwo",orderTwo);

  
    //Make request to get orders for User #2
    const  response = await request(app)
    .get('/api/orders')
    .set('Cookie', userTwo)	
    .expect(200);
    expect(response.body.length).toEqual(2);
    //expect(response.body[0].id).toEqual(orderOne.id);
    console.log("response body =>",response.body[0].id);
    console.log("response One",orderOne);
    console.log("response Two",orderTwo);



    
    

    //Make sure we only got the ordres for User #2
});
