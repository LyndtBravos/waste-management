import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080/api';
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  
  setToken(token: string): void {
    if (this.isBrowser) localStorage.setItem('token', token)
  }

  getToken(): string | null {
    if (this.isBrowser) return localStorage.getItem('token');
    
    return null;
  }

  removeToken(): void {
    if (this.isBrowser) localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
  
  get(endpoint: string): Observable<any> {
    const url = endpoint.startsWith('http') ? endpoint : `${this.apiUrl}${endpoint}`;
    return this.http.get(url);
  }

  post(endpoint: string, body: any, options: any = {}): Observable<any> {
    const url = endpoint.startsWith('http') ? endpoint : `${this.apiUrl}${endpoint}`;
    return this.http.post(url, body, options);
  }

  put(endpoint: string, body: any, options: any = {}): Observable<any> {
    const url = endpoint.startsWith('http') ? endpoint : `${this.apiUrl}${endpoint}`;
    return this.http.put(url, body, options);
  }

  delete(endpoint: string): Observable<any> {
    const url = endpoint.startsWith('http') ? endpoint : `${this.apiUrl}${endpoint}`;
    return this.http.delete(url);
  }

  login(username: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/auth/login`, { username, password })
      .pipe(
        tap(response => {
          if (response.token) this.setToken(response.token);
        })
      );
  }
  
  logout(): void {
    this.removeToken();
    console.log('Logged out, token removed');
  }
}