import { Injectable } from '@angular/core';
import { ITodo } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos: ITodo[] = [
    {
      id: 1,
      title: 'Testing this',
      description: 'For Testing Purposes',
      status: 'New',
    },
  ];

  constructor() {}

  getAllTodo() {
    return this.todos;
  }
}
