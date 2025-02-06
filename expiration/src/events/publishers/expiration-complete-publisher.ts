import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from '@mdshafeeq-repo/ticketing-common';

export class ExpirationCompletePublisher extends Publisher<
  ExpirationCompleteEvent
> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
