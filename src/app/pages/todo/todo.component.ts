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
import { ITodoType } from '../../shared/components/todo-card/todo-card.component';
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
  filteredTodos: ITodo[] = [];
  todoStatus = ITodoStatus;
  isSlidePanelOpen = false;
  activeFilter: ITodoType | 'All' = 'All';
  isEditMode = false;

  constructor(private todoService: TodoService, private fb: FormBuilder) {
    this.todoForm = this.fb.group({
      id: new FormControl(null),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      status: new FormControl('New', [Validators.required]),
    });
  }

  // Call the getAllTodos function at application start
  ngOnInit(): void {
    this.getAllTodos();
  }

  // Set the filter and display Todos
  getAllTodos() {
    this.todos = this.todoService.getAllTodo();
    this.filterTodos(this.activeFilter);
  }

  // Using patchValue to edit an existing Todo
  openSlidePanel(todo?: ITodo) {
    this.isEditMode = !!todo;
    if (todo) {
      this.todoForm.patchValue(todo);
    } else {
      this.todoForm.reset();
    }
    this.isSlidePanelOpen = true;
  }

  onCloseSlidePanel() {
    this.isSlidePanelOpen = false;
    this.isEditMode = false;
    this.todoForm.reset();
  }

  onSubmit() {
    if (this.todoForm.valid) {
      const updatedTodo = this.todoForm.value;
      if (this.isEditMode) {
        this.todoService.updateTodo(updatedTodo);
      } else {
        this.todoService.addTodo(updatedTodo);
      }
      this.onCloseSlidePanel();
      this.getAllTodos();
    } else {
      this.todoForm.markAllAsTouched();
    }
  }

  deleteTodo(todoId: number) {
    this.todoService.deleteTodo(todoId);
    this.getAllTodos();
  }

  filterTodos(filter: ITodoType | 'All') {
    this.activeFilter = filter;
    if (filter === 'All') {
      this.filteredTodos = [...this.todos];
    } else {
      this.filteredTodos = this.todos.filter((todo) => todo.status === filter);
    }
  }
}
