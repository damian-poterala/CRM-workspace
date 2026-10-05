import { inject, computed } from '@angular/core';
import { tap, Observable, catchError, of } from 'rxjs';
import { signalStore, withState, withMethods, patchState, withComputed } from '@ngrx/signals';

import { User } from './user.model';

import { AuthService } from './auth.service';
import { TokenService } from './token.service';

export const AuthStore = signalStore(
    { providedIn: 'root' },
    withState({
        user: null as User | null,
        isLoading: false,
        error: null
    }),
    withComputed(({ user }) => ({
        isLoggedIn: computed(() => user() !== null),
    })),
    withMethods((store) => {
        const authService = inject(AuthService);
        const tokenService = inject(TokenService);

        return {
            login(data: { username: string, password: string }) {
                patchState(store, {
                    isLoading: true,
                    error: null
                });

                return authService.login(data).pipe(
                    tap({
                        next: (response) => {
                            tokenService.saveTokens(response.accessToken, response.refreshToken);

                            patchState(store, {
                                user: response.user,
                                isLoading: false,
                            });
                        },
                        error: (error) => {
                            patchState(store, {
                                isLoading: false,
                                error: error?.error?.message ?? 'Logowanie nie powiodło się.',
                            });
                        }
                    })
                )
            },
            logout(): void {
                tokenService.clearTokens();
                
                patchState(store, {
                    user: null,
                    error: null,
                });
            },
            loadUser(): Observable<User | null> {
                const accessToken = tokenService.getAccessToken();

                if(!accessToken) {
                    return of(null);
                }

                patchState(store, {
                    isLoading: true, 
                    error: null,
                });

                return authService.me().pipe(
                    tap({
                        next: (user) => {
                            patchState(store, {
                                user,
                                isLoading: false,
                            });
                        },
                    }),
                    catchError(() => {
                        tokenService.clearTokens();

                        patchState(store, {
                            user: null,
                            isLoading: false,
                        });

                        return of(null);
                    })
                )
            }
        }
    }),
);