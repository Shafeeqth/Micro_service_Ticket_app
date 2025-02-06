import {
  Publisher,
  Subjects,
  PaymentCreatedEvent,
} from "@mdshafeeq-repo/ticketing-common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
