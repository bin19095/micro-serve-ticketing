import { Subjects, Publisher, OrderCancelledEvent } from '@bin19095/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent>{
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
