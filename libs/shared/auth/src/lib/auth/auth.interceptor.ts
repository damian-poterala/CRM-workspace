import {
  HttpContextToken,
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  catchError,
  finalize,
  Observable,
  shareReplay,
  switchMap,
  throwError,
} from 'rxjs';

import { AuthService } from './auth.service';
import { TokenService } from './token.service';

const RETRY_REQUEST = new HttpContextToken<boolean>(() => false);

let refreshRequest$: Observable<string> | null = null;

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const authService = inject(AuthService);
  const router = inject(Router);

  const isLoginRequest = req.url.endsWith('/auth/login');
  const isRefreshRequest = req.url.endsWith('/auth/refresh');

  if (isLoginRequest || isRefreshRequest) {
    return next(req);
  }

  const accessToken = tokenService.getAccessToken();

  const authReq = accessToken
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status !== 401) {
        return throwError(() => error);
      }

      if (req.context.get(RETRY_REQUEST)) {
        tokenService.clearTokens();
        router.navigate(['/login']);

        return throwError(() => error);
      }

      const refreshToken = tokenService.getRefreshToken();

      if (!refreshToken) {
        tokenService.clearTokens();
        router.navigate(['/login']);

        return throwError(() => error);
      }

      if (!refreshRequest$) {
        refreshRequest$ = authService.refresh(refreshToken).pipe(
          switchMap((response) => {
            tokenService.saveTokens(
              response.accessToken,
              response.refreshToken,
            );

            return [response.accessToken];
          }),
          catchError((refreshError) => {
            tokenService.clearTokens();
            router.navigate(['/login']);

            return throwError(() => refreshError);
          }),
          finalize(() => {
            refreshRequest$ = null;
          }),
          shareReplay({
            bufferSize: 1,
            refCount: false,
          }),
        );
      }

      return refreshRequest$.pipe(
        switchMap((newAccessToken) => {
          const retryRequest = req.clone({
            context: req.context.set(RETRY_REQUEST, true),
            setHeaders: {
              Authorization: `Bearer ${newAccessToken}`,
            },
          });

          return next(retryRequest);
        }),
      );
    }),
  );
};