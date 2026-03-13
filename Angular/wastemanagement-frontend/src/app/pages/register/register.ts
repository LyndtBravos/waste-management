import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RouterModule, Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { AuthService } from '../../services/auth';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    RouterModule
],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {

  username = '';
  password = '';
  
  constructor(
    private authService: AuthService,
    private notification: NotificationService,
    private router: Router
  ) {}

  loginAfterRegister() {
    this.authService.post('/auth/login', { username: this.username, password: this.password}).subscribe((token: any) => {
        localStorage.setItem('token', token.token);
        this.router.navigate(['/dashboard']);
        this.notification.success("Welcome to Enviro365!");
    });
  }

  register() {
    let body = { username:  this.username, password: this.password };
    this.authService.post('/auth/register', body, { responseType: 'text' }).subscribe({
        next: () => this.loginAfterRegister(),
        error: error => {
            console.error(error);
            this.notification.success("Registration failed, please retry.");
        }
      });
  }
}