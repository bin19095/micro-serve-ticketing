import nats from 'node-nats-streaming';
import { TicketCreatedPublisher } from './events/ticket-created-publisher';
console.clear()
const stan = nats.connect('tickets', 'publisher', {
    url: 'http://localhost:4222'
});

stan.on('connect', async() => {
console.log('Publisher connected to NATS');
//const publisher = new TicketCreatedPublisher(stan);
// try{
// await publisher.publish({
//     id: '123',
//     title: 'Test Ticket',
//     price: 19.99,
//     //userId: 'abc123'  // Add this line for user-specific events (optional)
//  });
// } catch(err){
//     console.error(err);
// }
})

    // console.log('Publisher connected to NATS');
    // const data = JSON.stringify({
    //     id: '123',
    //     title: 'Test Ticket',
    //     price: 19.99
    // });

    // stan.publish('ticket:created', data,() =>{
    //     console.log('Event published');
    // })
//});



stan.on('error', (err) => {
    console.error('Error connecting to NATS:', err);
});

