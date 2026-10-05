import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Auth } from 'auth';

import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,

    Auth,
    
    ButtonModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('Admin panel');
}
