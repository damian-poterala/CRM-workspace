import { inject } from '@angular/core';
import { map } from 'rxjs';

import { CanActivateFn, Router } from '@angular/router';

import { AuthStore } from './auth.store';

export const authGuard: CanActivateFn = () => {
    const authStore = inject(AuthStore);
    const router = inject(Router);

    return authStore.loadUser().pipe(
        map(() => {
            if(authStore.isLoggedIn()) {
                return true;
            }

            return router.createUrlTree(['/login']);
        })
    )
}