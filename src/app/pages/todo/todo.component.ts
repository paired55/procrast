import { Component, OnInit } from '@angular/core';
import {
  ITodoStatus,
  TodoCardComponent,
} from '../../shared/components/todo-card/todo-card.component';
import { MatButtonModule } from '@angular/material/button';
import { TodoService } from '../../core/services/todo.service';
import { ITodo } from '../../core/models/todo.model';
import { SlidePanelComponent } from '../../shared/ui/slide-panel/slide-panel.component';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    TodoCardComponent,
    MatButtonModule,
    SlidePanelComponent,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  todoForm!: FormGroup;
  todos: ITodo[] = [];
  todoStatus = ITodoStatus;
  isSlidePanelOpen = false;

  constructor(private todoService: TodoService, private fb: FormBuilder) {
    this.todoForm = this.fb.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      status: new FormControl('New', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getAllTodos();
  }

  getAllTodos() {
    this.todos = this.todoService.getAllTodo();
  }

  openSlidePanel(todo?: ITodo) {
    if (todo) {
      this.todoForm.patchValue(todo);
    } else {
      this.todoForm.reset();
    }
    this.isSlidePanelOpen = true;
  }

  onCloseSlidePanel() {
    this.isSlidePanelOpen = false;
  }

  deleteTodo(todoId: number) {
    this.todoService.deleteTodo(todoId);
    this.getAllTodos();
  }

  onSubmit() {
    if (this.todoForm.valid) {
      const updatedTodo = this.todoForm.value;
      if (updatedTodo.id) {
        this.todoService.updateTodo(updatedTodo);
      } else {
        this.todoService.addTodo(updatedTodo);
      }
      this.todoForm.reset();
      this.onCloseSlidePanel();
      this.getAllTodos();
    } else {
      this.todoForm.markAllAsTouched();
    }
  }
}
