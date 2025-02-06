import { Publisher, OrderCreatedEvent, Subjects } from '@mdshafeeq-repo/ticketing-common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
