import { Injectable } from '@angular/core';
import { AddTrekkingRequest, Trekking } from '@models/trekking';
import { TrekkingImage } from '@models/trekking-image';
import { ApiService } from '@services/api/api.service';
import { Observable } from 'rxjs';
import { IRequestGet } from './interfaces/request-get';
import { Group } from '@models/group';

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

  subscribe(trekkingId: number, userId: number, date: Date): Observable<Group> {
    return this._apiService.post(`/trekkings/${trekkingId}/subscribe/${userId}`, {
      date: date.toISOString()
    });
  }

  add(trekking: AddTrekkingRequest): Observable<void> {
    return this._apiService.post('/trekkings', trekking);
  }

  edit(id: number, trekking: AddTrekkingRequest): Observable<void> {
    return this._apiService.put(`/trekkings/${id}`, trekking);
  }
}
