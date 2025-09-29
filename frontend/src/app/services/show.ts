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
    const shows = await firstValueFrom(this.http.get<Show[]>(`${this.apiUrl}/shows`));
    this.shows.set(shows);
    return shows;
  }

  async getShow(id: number) {
    return firstValueFrom(this.http.get<Show>(`${this.apiUrl}/shows/${id}`));
  }
}
