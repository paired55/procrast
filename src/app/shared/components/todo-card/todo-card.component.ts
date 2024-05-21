import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ITodo } from '../../../core/models/todo.model';

export type ITodoType = 'New' | 'In Progress' | 'Done';
export const ITodoStatus = ['New', 'In Progress', 'Done'];

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss',
})
export class TodoCardComponent {
  @Input() type: ITodoType = 'New';
  @Input() todo!: ITodo;
}
