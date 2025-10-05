import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { ShowService } from '../../services/show';
import { Admin } from './../../services/admin';
import { Theater } from '../../services/theater';
import { AddonService } from '../../services/addon';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard implements OnInit {
  activeTab = signal<'theaters' | 'shows' | 'seats' | 'addons'>('theaters');

  // Theater form
  theaterForm = signal({
    id: null as number | null,
    name: '',
    location: '',
  });

  // Show form
  showForm = signal({
    id: null as number | null,
    theater_id: 0,
    title: '',
    price: 0,
    show_time: '',
    duration: 0,
  });

  // Seat form
  seatForm = signal({
    theater_id: 0,
    rows: 'ABCDEFGH',
    seatsPerRow: 10,
  });

  // Addon form
  addonForm = signal({
    id: null as number | null,
    name: '',
    price: 0,
  });

  loading = signal(false);
  message = signal('');

  constructor(
    public auth: Auth,
    private adminService: Admin,
    public showService: ShowService,
    public theaterService: Theater,
    public addonService: AddonService,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {
    await Promise.all([
      this.theaterService.getTheaters(),
      this.showService.getShows(),
      this.addonService.getAddons(),
    ]);
  }

  // Theater Operations
  async saveTheater() {
    this.loading.set(true);
    try {
      const form = this.theaterForm();
      if (form.id) {
        await this.adminService.updateTheater(form.id, {
          name: form.name,
          location: form.location,
        });
        this.message.set('Theater updated successfully!');
      } else {
        await this.adminService.createTheater({
          name: form.name,
          location: form.location,
        });
        this.message.set('Theater created successfully!');
      }
      this.resetTheaterForm();
      await this.theaterService.getTheaters();
    } catch (error: any) {
      this.message.set('Error: ' + (error.error?.message || 'Operation failed'));
    } finally {
      this.loading.set(false);
    }
  }

  editTheater(theater: any) {
    this.theaterForm.set({
      id: theater.id,
      name: theater.name,
      location: theater.location,
    });
  }

  async deleteTheater(id: number) {
    if (confirm('Are you sure you want to delete this theater?')) {
      try {
        await this.adminService.deleteTheater(id);
        this.message.set('Theater deleted successfully!');
        await this.theaterService.getTheaters();
      } catch (error) {
        this.message.set('Error deleting theater');
      }
    }
  }

  resetTheaterForm() {
    this.theaterForm.set({ id: null, name: '', location: '' });
  }

  // Show Operations
  async saveShow() {
    this.loading.set(true);
    try {
      const form = this.showForm();
      const data = {
        theater_id: form.theater_id,
        title: form.title,
        price: form.price,
        show_time: form.show_time,
        duration: form.duration,
      };

      if (form.id) {
        await this.adminService.updateShow(form.id, data);
        this.message.set('Show updated successfully!');
      } else {
        await this.adminService.createShow(data);
        this.message.set('Show created successfully!');
      }
      this.resetShowForm();
      await this.showService.getShows();
    } catch (error: any) {
      this.message.set('Error: ' + (error.error?.message || 'Operation failed'));
    } finally {
      this.loading.set(false);
    }
  }

  editShow(show: any) {
    this.showForm.set({
      id: show.id,
      theater_id: show.theater_id,
      title: show.title,
      price: show.price,
      show_time: show.show_time,
      duration: show.duration,
    });
  }

  async deleteShow(id: number) {
    if (confirm('Are you sure you want to delete this show?')) {
      try {
        await this.adminService.deleteShow(id);
        this.message.set('Show deleted successfully!');
        await this.showService.getShows();
      } catch (error) {
        this.message.set('Error deleting show');
      }
    }
  }

  resetShowForm() {
    this.showForm.set({
      id: null,
      theater_id: 0,
      title: '',
      price: 0,
      show_time: '',
      duration: 0,
    });
  }

  // Seat Operations
  async createBulkSeats() {
    this.loading.set(true);
    try {
      const form = this.seatForm();
      const rows = form.rows.split('');
      await this.adminService.createBulkSeats(form.theater_id, rows, form.seatsPerRow);
      this.message.set(`Created ${rows.length * form.seatsPerRow} seats successfully!`);
      this.resetSeatForm();
    } catch (error: any) {
      this.message.set('Error: ' + (error.error?.message || 'Operation failed'));
    } finally {
      this.loading.set(false);
    }
  }

  resetSeatForm() {
    this.seatForm.set({
      theater_id: 0,
      rows: 'ABCDEFGH',
      seatsPerRow: 10,
    });
  }

  // Addon Operations
  async saveAddon() {
    this.loading.set(true);
    try {
      const form = this.addonForm();
      if (form.id) {
        await this.adminService.updateAddon(form.id, {
          name: form.name,
          price: form.price,
        });
        this.message.set('Addon updated successfully!');
      } else {
        await this.adminService.createAddon({
          name: form.name,
          price: form.price,
        });
        this.message.set('Addon created successfully!');
      }
      this.resetAddonForm();
      await this.addonService.getAddons();
    } catch (error: any) {
      this.message.set('Error: ' + (error.error?.message || 'Operation failed'));
    } finally {
      this.loading.set(false);
    }
  }

  editAddon(addon: any) {
    this.addonForm.set({
      id: addon.id,
      name: addon.name,
      price: addon.price,
    });
  }

  async deleteAddon(id: number) {
    if (confirm('Are you sure you want to delete this addon?')) {
      try {
        await this.adminService.deleteAddon(id);
        this.message.set('Addon deleted successfully!');
        await this.addonService.getAddons();
      } catch (error) {
        this.message.set('Error deleting addon');
      }
    }
  }

  resetAddonForm() {
    this.addonForm.set({ id: null, name: '', price: 0 });
  }

  logout() {
    this.auth.logOut();
    this.router.navigate(['/login']);
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
