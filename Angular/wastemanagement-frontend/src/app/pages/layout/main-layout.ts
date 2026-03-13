import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../services/auth';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.css']
})

export class MainLayout {
    
    constructor(private authService: AuthService,
        private router: Router,
        @Inject(PLATFORM_ID) private platformId: Object) {
          this.isBrowser = isPlatformBrowser(this.platformId);
        }
    
    sidebarOpen = true;
    isBrowser: boolean;

    toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    }

    isLoginPage(): boolean {
      return this.router.url === '/login';
    }

    isLoggedIn(): boolean {
      if(this.isBrowser)
        return !!localStorage.getItem('token');

      return false;
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}