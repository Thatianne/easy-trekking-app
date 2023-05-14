import { Injectable } from '@angular/core';
import { City } from '@models/city';
import { ApiService } from '@services/api/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private _apiService: ApiService) { }

  get(): Observable<City[]> {
    return this._apiService.get<City[]>('/city');
  }
}
