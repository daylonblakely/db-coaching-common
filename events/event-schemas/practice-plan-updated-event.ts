import { Subjects } from '../subjects';

export interface PracticePlanUpdatedEvent {
  subject: Subjects.PracticePlanUpdated;
  data: {
    id: string;
    title: string;
    userId: string;
  };
}
