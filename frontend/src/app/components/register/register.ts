import { Component, signal } from '@angular/core';
import { Auth } from '../../services/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  name = signal('');
  email = signal('');
  password = signal('');
  password_confirmation = signal('');
  error = signal<string | null>(null);
  success = signal<string | null>(null);

  constructor(private auth: Auth) {}

  async register() {
    this.error.set(null);
    this.success.set(null);

    try {
      await this.auth.register({
        name: this.name(),
        email: this.email(),
        password: this.password(),
        password_confirmation: this.password_confirmation(),
      });
      this.success.set('Registered Successfully');
    } catch (err: any) {
      this.error.set(err?.error?.message || 'Registeration failed');
    }
  }
}
