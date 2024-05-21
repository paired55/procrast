import { Component, Input, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ITodo } from '../../../core/models/todo.model';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

export type ITodoType = 'New' | 'In Progress' | 'Done';
export const ITodoStatus = ['New', 'In Progress', 'Done'];

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [RouterModule, MatButtonModule, CommonModule],
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss'],
})
export class TodoCardComponent {
  @Input() todo!: ITodo;
  @Output() editTodoEvent = new EventEmitter<ITodo>();
  @Output() deleteTodoEvent = new EventEmitter<number>();

  editTodo(todo: ITodo) {
    this.editTodoEvent.emit(todo);
  }

  deleteTodo(todoId: number) {
    this.deleteTodoEvent.emit(todoId);
  }
}
