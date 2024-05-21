import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Check if the user is already logged in
    if (this.authService.isLoggedIn) {
      // Redirect to the todo page or any other appropriate page
      this.router.navigate(['/todo']);
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      const isLoggedIn = this.authService.login(username, password);
      if (isLoggedIn) {
        // Redirect to the todo page
        this.router.navigate(['/todo']);
      } else {
        // Display an error message
        this.toastr.error('Invalid username or password', 'Login Error');
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
