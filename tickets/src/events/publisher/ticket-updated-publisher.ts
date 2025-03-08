import { Publisher, Subjects, TicketUpdatedEvent } from '@bin19095/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;

}

