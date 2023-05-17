import { Injectable } from '@angular/core';
import { State } from '@models/state';
import { ApiService } from '@services/api/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(private _apiService: ApiService) { }

  get(): Observable<State[]> {
    return this._apiService.get<State[]>('/states');
  }
}
