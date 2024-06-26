import { Injectable } from '@angular/core';
import { ITodo } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly localStorageKey = 'todos';

  private _todos: ITodo[] = [];

  get todos(): ITodo[] {
    return this._todos;
  }

  constructor() {
    const storedTodos = localStorage.getItem(this.localStorageKey);
    if (storedTodos) {
      this._todos = JSON.parse(storedTodos);
    }
  }

  getAllTodo() {
    return this.todos;
  }

  // Push new Todo to Todos array and saving it to localStorage
  addTodo(todo: ITodo) {
    const newTodo = {
      ...todo,
      id: this.generateId(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this._todos.push(newTodo);
    this.saveTodosToLocalStorage();
  }
  // Function for deleting a Todo
  deleteTodo(todoId: number) {
    this._todos = this.todos.filter((todo) => todo.id !== todoId);
    this.saveTodosToLocalStorage();
  }
  // Function for editing a Todo
  updateTodo(updatedTodo: ITodo) {
    const index = this._todos.findIndex((todo) => todo.id === updatedTodo.id);
    if (index !== -1) {
      this._todos[index] = {
        ...updatedTodo,
        updated_at: new Date().toISOString(),
      };
      this.saveTodosToLocalStorage();
    }
  }
  // Generating random ID for each todo
  private generateId(): number {
    return this.todos.length > 0
      ? Math.max(...this.todos.map((todo) => todo.id!)) + 1
      : 1;
  }

  // Saving current Todos to local storage
  private saveTodosToLocalStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this._todos));
  }
}
