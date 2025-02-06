import { Subjects, Publisher, OrderCancelledEvent } from '@mdshafeeq-repo/ticketing-common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
