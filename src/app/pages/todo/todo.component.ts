import { Component } from '@angular/core';
import { TodoCardComponent } from '../../shared/components/todo-card/todo-card.component';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [TodoCardComponent],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent {}
