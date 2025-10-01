import { Component, signal, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  email = signal('');
  password = signal('');
  error = signal('');
  loading = signal(false);
  returnUrl = signal('/');

  constructor(private auth: Auth, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    // Get return URL from route parameters or default to '/'
    this.returnUrl.set(this.route.snapshot.queryParams['returnUrl'] || '/');
  }

  async onSubmit() {
    this.error.set('');
    this.loading.set(true);

    try {
      await this.auth.login({
        email: this.email(),
        password: this.password(),
      });
      this.router.navigate([this.returnUrl()]);
    } catch (err: any) {
      this.error.set(err.error?.message || 'Login failed');
    } finally {
      this.loading.set(false);
    }
  }
}
