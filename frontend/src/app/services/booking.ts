import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface Booking {
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
  bookings = signal<Booking[]>([]);

  constructor(private http: HttpClient) {}

  async getBookings() {
    const bookings = await firstValueFrom(
      this.http.get<Booking[]>(`${this.apiUrl}/bookings`, { withCredentials: true })
    );
    this.bookings.set(bookings);
    return bookings;
  }

  async createBooking(data: {
    show_id: number;
    seat_ids: number[];
    addons?: Array<{ addon_id: number; quantity: number }>;
  }) {
    const booking = await firstValueFrom(
      this.http.post<Booking>(`${this.apiUrl}/bookings`, data, { withCredentials: true })
    );
    this.bookings.update((bookings) => [...bookings, booking]);
    return booking;
  }

  async cancelBooking(id: number) {
    const booking = await firstValueFrom(
      this.http.post<Booking>(`${this.apiUrl}/bookings/${id}/cancel`, {}, { withCredentials: true })
    );
    this.bookings.update((bookings) => bookings.map((b) => (b.id === id ? booking : b)));
    return booking;
  }
}
