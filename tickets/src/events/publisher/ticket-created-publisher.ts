import { Publisher, Subjects, TicketCreatedEvent } from '@bin19095/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    subject: Subjects.TicketCreated = Subjects.TicketCreated;

}

