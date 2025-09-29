import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { Home } from './components/home/home';
import { Login } from './components/login/login';

export const routes: Routes = [
  { path: '', component: Home, canActivate: [authGuard] },
  { path: 'login', component: Login },
];
