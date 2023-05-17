import { Injectable } from '@angular/core';
import { Association } from '@models/association';
import { ApiService } from '@services/api/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssociationService {

  constructor(private _apiService: ApiService) { }

  get(): Observable<Association[]> {
    return this._apiService.get<Association[]>('/associations');
  }

}
