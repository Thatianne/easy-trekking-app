import { Injectable } from '@angular/core';
import { Trekking } from '@models/trekking';
import { ApiService } from '@services/api/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuideTrekkingsService {

  constructor(private _apiService: ApiService) { }

  getAbleToGuide(userId: number): Observable<Trekking[]> {
    return this._apiService.get(`/trekkings/able-to-guide/${userId}`);
  }

  defineAbleToGuide(userId: number, trekkingIds: number[]): Observable<void> {
    return this._apiService.post(`/trekkings/able-to-guide/${userId}`, {
      trekkings: trekkingIds
    });
  }
}
