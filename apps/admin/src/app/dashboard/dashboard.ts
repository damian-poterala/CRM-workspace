import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthStore } from 'auth';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  readonly authStore = inject(AuthStore);

  private readonly router = inject(Router);

  logout(): void {
    this.authStore.logout();
    this.router.navigate(['/login']);
  }
}
