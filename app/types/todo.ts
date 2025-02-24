import { ColorKey } from '@/constants/colors';

export interface Todo {
  id: string;
  title: string;
  color?: ColorKey | '';
  completed: boolean;
  status: string;
}

export const defaultTodo: Todo = {
  id: '',
  title: '',
  color: '',
  completed: false,
  status: '',
}; 
