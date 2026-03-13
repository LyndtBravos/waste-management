import { Injectable } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Observable } from 'rxjs';
import { Pickup } from '../pickups/pickups';

@Injectable({
  providedIn: 'root'
})
export class PickupService {

  constructor(private authService: AuthService) {}

  getAll(): Observable<Pickup[]> {
    return this.authService.get('/pickups');
  }

  getById(id: number): Observable<Pickup> {
    return this.authService.get(`/pickups/${id}`);
  }

  create(pickup: Pickup): Observable<Pickup> {
    return this.authService.post('/pickups', pickup);
  }

  updateStatus(id: number, status: string): Observable<any> {
    return this.authService.put(`/pickups/${id}/status`, status);
  }

  delete(id: number): Observable<any> {
    return this.authService.delete(`/pickups/${id}`);
  }
}