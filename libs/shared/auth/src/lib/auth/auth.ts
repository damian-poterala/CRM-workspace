import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthStore } from './auth.store';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'lib-auth',
  imports: [
    ReactiveFormsModule,

    ButtonModule,
    InputTextModule,
    PasswordModule,
  ],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  readonly authStore = inject(AuthStore);

  loginForm = this.fb.nonNullable.group({
    username: ['', [ Validators.required, Validators.minLength(3), Validators.maxLength(40) ]],
    password: ['', [ Validators.required, Validators.minLength(8) ]],
  });

  login(): void {
    if(this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { username, password } = this.loginForm.getRawValue();

    this.authStore.login({ username, password }).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      }
    });
  }
}
