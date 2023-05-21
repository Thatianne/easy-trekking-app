import { Injectable } from '@angular/core';
import { AddTrekkingRequest, Trekking } from '@models/trekking';
import { TrekkingImage } from '@models/trekking-image';
import { ApiService } from '@services/api/api.service';
import { Observable } from 'rxjs';
import { IRequestGet } from './interfaces/request-get';

@Injectable({
  providedIn: 'root'
})
export class TrekkingService {

  constructor(private _apiService: ApiService) { }

  get(params: IRequestGet = {}): Observable<Trekking[]> {
    return this._apiService.get<Trekking[]>('/trekkings', params);
  }

  getById(id: number): Observable<Trekking> {
    return this._apiService.get<Trekking>(`/trekkings/${id}`);
  }

  getImagesById(id: number): Observable<TrekkingImage[]> {
    return this._apiService.get<TrekkingImage[]>(`/trekkings/${id}/images`);
  }

  subscribe(id: number): Observable<void> {
    return this._apiService.post(`/trekkings/${id}/subscribe`);
  }

  add(trekking: AddTrekkingRequest): Observable<void> {
    return this._apiService.post('/trekkings', trekking);
  }

  edit(id: number, trekking: AddTrekkingRequest): Observable<void> {
    return this._apiService.put(`/trekkings/${id}`, trekking);
  }
}
