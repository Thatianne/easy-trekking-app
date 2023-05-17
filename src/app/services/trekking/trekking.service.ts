import { Injectable } from '@angular/core';
import { Trekking } from '@models/trekking';
import { ApiService } from '@services/api/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrekkingService {

  constructor(private _apiService: ApiService) { }

  get(): Observable<Trekking[]> {
    return this._apiService.get<Trekking[]>('/trekkings');
  }

  getById(id: number): Observable<Trekking> {
    return this._apiService.get<Trekking>(`/trekkings/${id}`);
  }

  subscribe(id: number): Observable<void> {
    return this._apiService.post(`/trekkings/${id}/subscribe`);
  }
}
