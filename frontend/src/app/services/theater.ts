import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface Seat {
  id: number;
  seat_number: string;
  theater_id: number;
  status: 'available' | 'booked';
}

export interface Theater {
  id: number;
  name: string;
  location: string;
  seats?: Seat[];
  shows?: any[];
}

@Injectable({
  providedIn: 'root',
})
export class Theater {
  private apiUrl = 'http://localhost:8000/api';
  theaters = signal<Theater[]>([]);
  selectedTheaterSeats = signal<Seat[]>([]);

  constructor(private http: HttpClient) {}

  async getTheaters() {
    const response: any = await firstValueFrom(this.http.get(`${this.apiUrl}/theaters`));
    const theaters = response.data || response;
    this.theaters.set(theaters);
    return theaters;
  }

  async getTheaterSeats(theaterId: number, showId?: number) {
    const url = showId
      ? `${this.apiUrl}/theaters/${theaterId}/seats?show_id=${showId}`
      : `${this.apiUrl}/theaters/${theaterId}/seats`;

    const response: any = await firstValueFrom(this.http.get(url));
    const seats = response.data || response;
    this.selectedTheaterSeats.set(seats);
    return seats;
  }
}
