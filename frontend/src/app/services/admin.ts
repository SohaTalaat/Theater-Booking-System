import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Auth } from './auth';

@Injectable({
  providedIn: 'root',
})
export class Admin {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient, private auth: Auth) {}

  // Theater CRUD
  async createTheater(data: { name: string; location: string }) {
    return await firstValueFrom(
      this.http.post(`${this.apiUrl}/theaters`, data, {
        headers: this.auth.getAuthHeaders(),
      })
    );
  }

  async updateTheater(id: number, data: { name?: string; location?: string }) {
    return await firstValueFrom(
      this.http.put(`${this.apiUrl}/theaters/${id}`, data, {
        headers: this.auth.getAuthHeaders(),
      })
    );
  }

  async deleteTheater(id: number) {
    return await firstValueFrom(
      this.http.delete(`${this.apiUrl}/theaters/${id}`, {
        headers: this.auth.getAuthHeaders(),
      })
    );
  }

  // Show CRUD
  async createShow(data: {
    theater_id: number;
    title: string;
    price: number;
    show_time: string;
    duration: number;
  }) {
    return await firstValueFrom(
      this.http.post(`${this.apiUrl}/shows`, data, {
        headers: this.auth.getAuthHeaders(),
      })
    );
  }

  async updateShow(
    id: number,
    data: {
      theater_id?: number;
      title?: string;
      price?: number;
      show_time?: string;
      duration?: number;
    }
  ) {
    return await firstValueFrom(
      this.http.put(`${this.apiUrl}/shows/${id}`, data, {
        headers: this.auth.getAuthHeaders(),
      })
    );
  }

  async deleteShow(id: number) {
    return await firstValueFrom(
      this.http.delete(`${this.apiUrl}/shows/${id}`, {
        headers: this.auth.getAuthHeaders(),
      })
    );
  }

  // Seat CRUD
  async createSeat(data: { theater_id: number; seat_number: string }) {
    return await firstValueFrom(
      this.http.post(`${this.apiUrl}/seats`, data, {
        headers: this.auth.getAuthHeaders(),
      })
    );
  }

  async updateSeat(id: number, data: { status?: string }) {
    return await firstValueFrom(
      this.http.put(`${this.apiUrl}/seats/${id}`, data, {
        headers: this.auth.getAuthHeaders(),
      })
    );
  }

  async deleteSeat(id: number) {
    return await firstValueFrom(
      this.http.delete(`${this.apiUrl}/seats/${id}`, {
        headers: this.auth.getAuthHeaders(),
      })
    );
  }

  // Addon CRUD
  async createAddon(data: { name: string; price: number }) {
    return await firstValueFrom(
      this.http.post(`${this.apiUrl}/addons`, data, {
        headers: this.auth.getAuthHeaders(),
      })
    );
  }

  async updateAddon(id: number, data: { name?: string; price?: number }) {
    return await firstValueFrom(
      this.http.put(`${this.apiUrl}/addons/${id}`, data, {
        headers: this.auth.getAuthHeaders(),
      })
    );
  }

  async deleteAddon(id: number) {
    return await firstValueFrom(
      this.http.delete(`${this.apiUrl}/addons/${id}`, {
        headers: this.auth.getAuthHeaders(),
      })
    );
  }

  // Bulk seat creation
  async createBulkSeats(theaterId: number, rows: string[], seatsPerRow: number) {
    const promises = [];
    for (const row of rows) {
      for (let i = 1; i <= seatsPerRow; i++) {
        promises.push(
          this.createSeat({
            theater_id: theaterId,
            seat_number: `${row}${i}`,
          })
        );
      }
    }
    return await Promise.all(promises);
  }
}
