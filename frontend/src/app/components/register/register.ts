import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth } from '../../services/auth';

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
  passwordConfirmation = signal('');
  error = signal('');
  loading = signal(false);

  constructor(private auth: Auth, private router: Router) {}

  async onSubmit() {
    this.error.set('');
    this.loading.set(true);

    try {
      await this.auth.register({
        name: this.name(),
        email: this.email(),
        password: this.password(),
        password_confirmation: this.passwordConfirmation(),
      });
      this.router.navigate(['/']);
    } catch (err: any) {
      this.error.set(err.error?.message || 'Registration failed');
    } finally {
      this.loading.set(false);
    }
  }
}
