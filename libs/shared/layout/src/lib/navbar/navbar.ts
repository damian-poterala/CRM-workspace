import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthStore } from 'auth';

import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'lib-navbar',
  imports: [
    ButtonModule,
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  readonly authStore = inject(AuthStore);

  private readonly router = inject(Router);

  readonly user = this.authStore.user;

  logout(): void {
    this.authStore.logout();
    this.router.navigate(['/login']);
  }
}
