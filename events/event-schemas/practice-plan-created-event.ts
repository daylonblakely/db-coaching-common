import { Subjects } from '../subjects';

// defines the shape of a plan created event and ties it to a subject
export interface PracticePlanCreatedEvent {
  subject: Subjects.PracticePlanCreated;
  data: {
    id: string;
    title: string;
    seasonId?: string;
  };
}
