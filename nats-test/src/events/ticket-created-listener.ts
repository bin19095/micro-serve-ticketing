import { Message} from 'node-nats-streaming';
import { Listener } from './base-listener';
import { TicketCreatedEvent } from './ticket-created-events';
import { Subjects } from './subjects';
export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
   readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
    queueGroupName = 'payments-service';
    onMessage(data:TicketCreatedEvent['data'], msg: Message) {
        console.log('Event data!', data.id);
        console.log('Event data!', data.title);
        console.log('Event data!', data.price);

        msg.ack();
    }
}
