import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = signal('');
  password = signal('');
  error = signal('');
  loading = signal(false);
  isRegister = signal(false);
  name = signal('');
  passwordConfirmation = signal('');

  constructor(private auth: Auth, private router: Router) {}

  async onSubmit() {
    this.error.set('');
    this.loading.set(true);

    try {
      if (this.isRegister()) {
        await this.auth.register({
          name: this.name(),
          email: this.email(),
          password: this.password(),
          password_confirmation: this.passwordConfirmation(),
        });
      } else {
        await this.auth.login({
          email: this.email(),
          password: this.password(),
        });
      }
      this.router.navigate(['/']);
    } catch (err: any) {
      this.error.set(err.error?.message || 'Authentication failed');
    } finally {
      this.loading.set(false);
    }
  }

  toggleMode() {
    this.isRegister.update((v) => !v);
    this.error.set('');
  }
}
