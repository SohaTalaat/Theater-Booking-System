import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private apiUrl = 'http://localhost:8000'; //From Laravel Backend

  user = signal<any | null>(null);

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  async checkAuthStatus(): Promise<any> {
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (savedUser && token) {
      this.user.set(JSON.parse(savedUser));
      return JSON.parse(savedUser);
    } else {
      this.user.set(null);
      return null;
    }
  }

  async register(data: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }) {
    const response: any = await firstValueFrom(this.http.post(`${this.apiUrl}/api/register`, data));

    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    this.user.set(response.user);
    return response.user;
  }

  async login(credentials: { email: string; password: string }) {
    const response: any = await firstValueFrom(
      this.http.post(`${this.apiUrl}/api/login`, credentials)
    );

    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    this.user.set(response.user);
    return response.user;
  }

  async getUser() {
    try {
      const user: any = await firstValueFrom(
        this.http.get(`${this.apiUrl}/api/user`, { headers: this.getAuthHeaders() })
      );
      this.user.set(user);
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (err) {
      this.user.set(null);
      localStorage.removeItem('user');
      return null;
    }
  }

  async logOut() {
    try {
      await firstValueFrom(
        this.http.post(`${this.apiUrl}/api/logout`, {}, { headers: this.getAuthHeaders() })
      );
    } catch (err) {
      console.warn('Logout failed', err);
    } finally {
      this.user.set(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }
}
