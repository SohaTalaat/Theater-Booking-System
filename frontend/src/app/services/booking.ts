import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Auth } from './auth';

export interface Ibooking {
  id: number;
  status: string;
  total_cost: number;
  user_id: number;
  show_id: number;
  show?: any;
  seats?: any[];
  addons?: any[];
  created_at: string;
}

@Injectable({
  providedIn: 'root',
})
export class Booking {
  private apiUrl = 'http://localhost:8000/api';
  bookings = signal<Ibooking[]>([]);

  constructor(private http: HttpClient, private auth: Auth) {}

  async getBookings() {
    const response: any = await firstValueFrom(
      this.http.get(`${this.apiUrl}/bookings`, {
        headers: this.auth.getAuthHeaders(),
      })
    );
    const bookings = response.data || response;
    this.bookings.set(bookings);
    return bookings;
  }

  async createBooking(data: {
    show_id: number;
    seat_ids: number[];
    addons?: Array<{ addon_id: number; quantity: number }>;
  }) {
    // Transform the data to match backend
    const bookingData = {
      show_id: data.show_id,
      seats: data.seat_ids,
      addons: data.addons?.map((addon) => ({
        id: addon.addon_id,
        quantity: addon.quantity,
        total_price: 0, // Will be calculated by backend
      })),
      total_cost: 0, // Will be calculated by backend
    };

    const response: any = await firstValueFrom(
      this.http.post(`${this.apiUrl}/bookings`, bookingData, {
        headers: this.auth.getAuthHeaders(),
      })
    );
    const booking = response.data || response;
    this.bookings.update((bookings) => [...bookings, booking]);
    return booking;
  }

  async cancelBooking(id: number) {
    await firstValueFrom(
      this.http.delete(`${this.apiUrl}/bookings/${id}`, {
        headers: this.auth.getAuthHeaders(),
      })
    );
    this.bookings.update((bookings) => bookings.filter((b) => b.id !== id));
  }
}
