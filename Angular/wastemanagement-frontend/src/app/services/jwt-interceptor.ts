import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpErrorResponse, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';

import { catchError } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class JwtInterceptorService implements HttpInterceptor {

  constructor(private router: Router,
    private notification: NotificationService,
      @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let token: string | null = null;

    if (isPlatformBrowser(this.platformId))
      token = localStorage.getItem('token');

    let authReq = req;

    if (token) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {

      if((error.status === 401 || error.status === 500) 
        && !req.url.includes('/auth/login')) {
        this.notification.success("Session expired. Please login again");
        
        if (isPlatformBrowser(this.platformId)) localStorage.removeItem('token');

        this.router.navigate(['/login']);
      }      
      return throwError(() => error);
      })
    );
  }
}