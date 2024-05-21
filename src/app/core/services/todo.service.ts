import { Injectable } from '@angular/core';
import { ITodo } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos: ITodo[] = [
    {
      id: 1,
      title: 'Welcome to Procrast',
      description: 'Click the Add todo button to start adding tasks!',
      status: 'New',
    },
  ];

  constructor() {}

  getAllTodo() {
    return this.todos;
  }

  addTodo(todo: ITodo) {
    const newTodo = {
      ...todo,
      id: this.generateId(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.todos.push(newTodo);
  }

  private generateId(): number {
    return this.todos.length > 0
      ? Math.max(...this.todos.map((todo) => todo.id!)) + 1
      : 1;
  }
}
