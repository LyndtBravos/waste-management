import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { loginGuard } from './guards/login-guard';

import { Login } from './pages/login/login';
import { Bins } from './pages/bins/bins';
import { Dashboard } from './pages/dashboard/dashboard';
import { PickupsComponent } from './pages/pickups/pickup-component';
import { WasteRecords } from './pages/waste-records/waste-records';
import { MainLayout } from './pages/layout/main-layout';
import { Register } from './pages/register/register'

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
    canActivate: [loginGuard]
  },
  { 
    path: 'register', 
    component: Register, 
    canActivate: [loginGuard] 
  },
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: Dashboard },
      { path: 'bins', component: Bins },
      { path: 'waste', component: WasteRecords },
      { path: 'pickups', component: PickupsComponent }
    ]
  },
  { path: '**', redirectTo: 'dashboard' }

];