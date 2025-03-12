import { Publisher, OrderCreatedEvent, Subjects } from '@bin19095/common';
export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent>{
    subject: Subjects.OrderCreated = Subjects.OrderCreated;

}
