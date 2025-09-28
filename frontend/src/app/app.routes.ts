import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { Home } from './home/home';
import { Login } from './login/login';

export const routes: Routes = [
  { path: '', component: Home, canActivate: [authGuard] },
  { path: '/login', component: Login },
];
