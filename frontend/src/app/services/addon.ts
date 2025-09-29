import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface Addon {
  id: number;
  name: string;
  price: number;
}

@Injectable({
  providedIn: 'root',
})
export class AddonService {
  private apiUrl = 'http://localhost:8000/api';
  addons = signal<Addon[]>([]);

  constructor(private http: HttpClient) {}

  async getAddons() {
    const addons = await firstValueFrom(this.http.get<Addon[]>(`${this.apiUrl}/addons`));
    this.addons.set(addons);
    return addons;
  }
}
