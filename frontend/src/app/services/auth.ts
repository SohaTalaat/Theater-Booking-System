import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private apiUrl = 'http://localhost:8000'; //From Laravel Backend

  user = signal<any | null>(null);

  constructor(private http: HttpClient) {}

  async checkAuthStatus(): Promise<any> {
    const saved = localStorage.getItem('user');

    if (saved) {
      this.user.set(JSON.parse(saved));
    } else {
      this.user.set(null);
    }
  }

  async register(data: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }) {
    await firstValueFrom(
      this.http.get(`${this.apiUrl}/sanctum/csrf-cookie`, { withCredentials: true })
    );

    const user = await firstValueFrom(
      this.http.post(`${this.apiUrl}/register`, data, { withCredentials: true })
    );

    this.user.set(user);
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  }

  async login(credentials: { email: string; password: string }) {
    await firstValueFrom(
      this.http.get(`${this.apiUrl}/sanctum/csrf-cookie`, { withCredentials: true })
    );

    const user = await firstValueFrom(
      this.http.post(`${this.apiUrl}/login`, credentials, { withCredentials: true })
    );

    this.user.set(user);
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  }

  async getUser() {
    const user = await firstValueFrom(
      this.http.get(`${this.apiUrl}/api/user`, { withCredentials: true })
    );

    this.user.set(user);
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  }

  async logOut() {
    await firstValueFrom(this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }));
    this.user.set(null);
    localStorage.removeItem('user');
  }
}
