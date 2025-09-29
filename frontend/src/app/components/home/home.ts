import { Booking } from './../../services/booking';
import { Auth } from './../../services/auth';
import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ShowService, Show } from '../../services/show';
import { Theater, Seat } from '../../services/theater';
import { AddonService, Addon } from '../../services/addon';
@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  selectedShow = signal<Show | null>(null);
  selectedSeats = signal<number[]>([]);
  selectedAddons = signal<Map<number, number>>(new Map());

  totalCost = computed(() => {
    let cost = 0;
    const show = this.selectedShow();
    if (show) {
      cost += show.price * this.selectedSeats().length;
    }

    this.selectedAddons().forEach((quantity, addonId) => {
      const addon = this.addonService.addons().find((a) => a.id === addonId);
      if (addon) {
        cost += addon.price * quantity;
      }
    });

    return cost;
  });

  constructor(
    public auth: Auth,
    public showService: ShowService,
    public theaterService: Theater,
    public bookingService: Booking,
    public addonService: AddonService,
    private router: Router
  ) {}

  async ngOnInit() {
    await Promise.all([
      this.showService.getShows(),
      this.addonService.getAddons(),
      this.bookingService.getBookings(),
    ]);
  }

  async selectShow(show: Show) {
    this.selectedShow.set(show);
    this.selectedSeats.set([]);
    await this.theaterService.getTheaterSeats(show.theater_id, show.id);
  }

  toggleSeat(seatId: number) {
    this.selectedSeats.update((seats) => {
      const index = seats.indexOf(seatId);
      if (index > -1) {
        return seats.filter((id) => id !== seatId);
      } else {
        return [...seats, seatId];
      }
    });
  }

  updateAddonQuantity(addonId: number, quantity: number) {
    this.selectedAddons.update((map) => {
      const newMap = new Map(map);
      if (quantity > 0) {
        newMap.set(addonId, quantity);
      } else {
        newMap.delete(addonId);
      }
      return newMap;
    });
  }

  async bookTickets() {
    const show = this.selectedShow();
    if (!show || this.selectedSeats().length === 0) {
      alert('Please select a show and at least one seat');
      return;
    }

    try {
      const addons = Array.from(this.selectedAddons().entries()).map(([addon_id, quantity]) => ({
        addon_id,
        quantity,
      }));

      await this.bookingService.createBooking({
        show_id: show.id,
        seat_ids: this.selectedSeats(),
        addons: addons.length > 0 ? addons : undefined,
      });

      alert('Booking successful!');
      this.selectedShow.set(null);
      this.selectedSeats.set([]);
      this.selectedAddons.set(new Map());
      await this.bookingService.getBookings();
    } catch (err: any) {
      alert(err.error?.error || 'Booking failed');
    }
  }

  async cancelBooking(bookingId: number) {
    if (confirm('Are you sure you want to cancel this booking?')) {
      try {
        await this.bookingService.cancelBooking(bookingId);
        alert('Booking cancelled successfully');
      } catch (err) {
        alert('Failed to cancel booking');
      }
    }
  }

  async logout() {
    await this.auth.logOut();
    this.router.navigate(['/login']);
  }
}
