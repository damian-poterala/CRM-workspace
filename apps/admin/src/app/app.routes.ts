import { Routes } from '@angular/router';

import { Auth } from 'auth';
import { authGuard } from 'auth';

import { Dashboard } from './dashboard/dashboard';

export const routes: Routes = [
    { path: 'login', component: Auth },
    { path: 'dashboard', component: Dashboard, canActivate: [ authGuard ] },
];
