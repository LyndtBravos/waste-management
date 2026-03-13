import { ApplicationConfig } from '@angular/core';
import { provideClientHydration, withNoHttpTransferCache } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptorService } from './services/jwt-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(
      withNoHttpTransferCache()
    ),
    provideHttpClient(
      withInterceptorsFromDi(),
      withFetch()
    ),
    // Register the interceptor properly
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    }
  ],
};