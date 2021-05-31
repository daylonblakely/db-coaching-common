import { Subjects } from '../subjects';
import { DrillCategories } from '../../types/drill-categories';

export interface DrillUpdatedEvent {
  subject: Subjects.DrillUpdated;
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
