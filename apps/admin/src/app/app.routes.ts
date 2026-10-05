import { Routes } from '@angular/router';

import { Auth } from 'auth';
import { authGuard } from 'auth';

import { adminMenu } from './admin-menu';

import { Layout } from 'layout';
import { Dashboard } from './dashboard/dashboard';

export const routes: Routes = [
    { path: 'login', component: Auth },
    { 
        path: '', 
        component: Layout, 
        canActivate: [ authGuard ], 
        data: { sidebarItems: adminMenu },
        children: [
            {
                path: 'dashboard',
                component: Dashboard
            }
        ]
    }
];
