export type Priority = 'low' | 'medium' | 'high' | 'urgent';
export type Category = 'personal' | 'work' | 'health' | 'shopping' | 'finance' | 'other';

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: Priority;
  category: Category;
  dueDate: string;
  createdAt: string;
  completedAt?: string;
}

export type FilterStatus = 'all' | 'active' | 'completed';
export type SortBy = 'dueDate' | 'priority' | 'createdAt' | 'title';
