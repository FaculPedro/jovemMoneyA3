import { Component, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { createLogger } from '../utils';
import { AuthService } from '../auth.guard';
import { User } from '../models';

const logger = createLogger('login-component');

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);

  currentState = signal<'login' | 'registering'>('login');

  loginForm!: FormGroup;
  registerForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      password: ['', Validators.required]
    });
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      password: ['', Validators.required],
      confirm: ['', Validators.required]
    });
  }

  async onLogin() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      try {
        const user = await this.userService.login(loginData.cpf, loginData.password);
        this.redirect(user);
      } catch (err) {
        logger.error('Error during login:', err);
      }

    }
  }

  async onRegister() {
    if (this.registerForm.valid) {
      const registerData = this.registerForm.value;
      try {
        const data = await this.userService.createUser(registerData)
        this.redirect(data);
      } catch (err) {
        logger.error('Error during registration:', err);
      }
    }
  }

  async redirect(data: any) {
    if(data.token) {
      this.authService.login(data);
    }
  }
}
