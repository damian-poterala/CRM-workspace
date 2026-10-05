import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from './user.model';

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    user: User
}

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private readonly http = inject(HttpClient);

    login(data: { username: string, password: string }) {
        return this.http.post<LoginResponse>(`http://localhost:3000/api/auth/login`, data,);
    }

    me() {
        return this.http.get<User>(`http://localhost:3000/api/auth/me`);
    }

    refresh(refreshToken: string) {
        return this.http.post<{ accessToken: string, refreshToken: string }>(`http://localhost:3000/api/auth/refresh`, { refreshToken });
    }
}