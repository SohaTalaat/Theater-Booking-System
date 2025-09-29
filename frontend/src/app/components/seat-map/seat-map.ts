import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seat-map',
  imports: [CommonModule],
  templateUrl: './seat-map.html',
  styleUrl: './seat-map.css',
})
export class SeatMap {
  rows = 5;
  cols = 8;

  selectedSeats = signal<number[]>([]);

  toggleSeat(seatNumber: number) {
    const current = this.selectedSeats();
    if (current.includes(seatNumber)) {
      this.selectedSeats.set(current.filter((s) => s !== seatNumber));
    } else {
      this.selectedSeats.set([...current, seatNumber]);
    }
  }
}
