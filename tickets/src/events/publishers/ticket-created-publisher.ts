import { Publisher, Subjects, TicketCreatedEvent } from '@mdshafeeq-repo/ticketing-common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
