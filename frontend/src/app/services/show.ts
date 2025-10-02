import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface Show {
  id: number;
  theater_id: number;
  title: string;
  price: number;
  show_time: string;
  duration: number;
  theater?: any;
}

@Injectable({
  providedIn: 'root',
})
export class ShowService {
  private apiUrl = 'http://localhost:8000/api';
  shows = signal<Show[]>([]);

  constructor(private http: HttpClient) {}

  async getShows() {
    const response: any = await firstValueFrom(
      this.http.get(`${this.apiUrl}/shows`)
    );
    // Backend returns raw array, not wrapped in 'data'
    const shows = Array.isArray(response) ? response : (response.data || response);
    this.shows.set(shows);
    return shows;
  }

  async getShow(id: number) {
    const response: any = await firstValueFrom(
      this.http.get(`${this.apiUrl}/shows/${id}`)
    );
    return response.data || response;
  }
}