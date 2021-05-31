import { Subjects } from '../subjects';
import { DrillCategories } from '../../types/drill-categories';

export interface DrillCreatedEvent {
  subject: Subjects.DrillCreated;
  data: {
    id: string;
    title: string;
    description?: string;
    category?: DrillCategories;
    comments?: string;
    userId: string;
    version: number;
  };
}
