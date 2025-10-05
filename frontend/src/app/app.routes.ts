import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { AdminDashboard } from './components/admin-dashboard/admin-dashboard';
// import { authGuard } from './guards/auth-guard';
import { adminGuard } from './guards/admin-guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  {
    path: 'admin',
    component: AdminDashboard,
    canActivate: [adminGuard],
  },
  { path: '**', redirectTo: '' },
];
