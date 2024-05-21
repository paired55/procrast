import { ITodoType } from '../../shared/components/todo-card/todo-card.component';

// This is the template which all Todos will share
export interface ITodo {
  id?: number;
  title?: string;
  description?: string;
  status?: ITodoType;
  created_at?: string;
  updated_at?: string;
}
