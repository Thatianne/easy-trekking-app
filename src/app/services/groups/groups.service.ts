import { Injectable } from '@angular/core';
import { Group } from '@models/group';
import { ApiService } from '@services/api/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private _apiService: ApiService) { }

  get(): Observable<Group[]> {
    return this._apiService.get('/groups');
  }
}
