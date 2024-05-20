import { Component } from '@angular/core';
import { TodoCardComponent } from '../../shared/components/todo-card/todo-card.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [TodoCardComponent, MatButtonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent {}
